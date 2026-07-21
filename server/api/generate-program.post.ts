import { GoogleGenAI, Type } from '@google/genai'
import { exercises } from '~/utils/exercises'
import { generateProgram } from '~/utils/program-generator'
import type { GenerateProgramRequestBody, GenerateProgramResponseBody, GeneratedProgram } from '~/utils/program-types'
import { isRateLimited } from '../utils/rate-limit'

const MAX_QUESTIONS = 8

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    status: { type: Type.STRING, enum: ['ready', 'needs_clarification'] },
    questions: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    program: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        goal: { type: Type.STRING },
        schedule: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              day: { type: Type.STRING },
              focus: { type: Type.STRING },
              exercises: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    sets: { type: Type.INTEGER },
                    reps: { type: Type.STRING },
                    rest: { type: Type.STRING }
                  },
                  required: ['name', 'sets', 'reps', 'rest']
                }
              }
            },
            required: ['day', 'focus', 'exercises']
          }
        },
        tips: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      },
      required: ['name', 'goal', 'schedule', 'tips']
    }
  },
  required: ['status']
}

function buildCatalog() {
  return exercises.map(ex => ({
    name: ex.name,
    muscles: ex.muscles,
    equipment: ex.equipment,
    difficulty: ex.difficulty,
    category: ex.category
  }))
}

function buildPrompt(body: GenerateProgramRequestBody, catalog: ReturnType<typeof buildCatalog>) {
  const { formData, clarifications } = body

  const answeredClarifications = clarifications && clarifications.length > 0
    ? `\n\nThe user already answered these follow-up questions:\n${clarifications.map(c => `Q: ${c.question}\nA: ${c.answer}`).join('\n')}\n\nYou now have enough information - you MUST return status "ready" with a full program. Do not ask further questions.`
    : `\n\nBefore generating, consider whether a short clarifying question could help you build a better, more personalized program - for example: stated experience level doesn't match available equipment, an injury area overlaps with a requested focus area, the goal and schedule seem mismatched, the split preference doesn't suit their days per week, or their additional notes raise something worth digging into. If you have any reasonable question that would help you tailor the program, ask it (up to ${MAX_QUESTIONS} short, specific questions) rather than guessing. Only skip straight to status "ready" if the request is already fully clear and you have no useful follow-up.`

  const scheduleFraming = formData.scheduleType === 'fixed'
    ? `\n\nThis is a fixed ${formData.daysPerWeek}-day program, not a weekly cadence - treat the days as a single training block/rotation, not literal days of a week.`
    : ''

  return `You are a fitness coach building a personalized workout program.

User's questionnaire answers:
${JSON.stringify(formData, null, 2)}
${answeredClarifications}${scheduleFraming}

Exercise catalog you MUST choose exercises from (do not invent exercises outside this list - use the exact "name" field):
${JSON.stringify(catalog)}

When you return a program:
- Only use exercise names that appear exactly in the catalog above.
- The user's equipment list is what's available to them, not a requirement - bodyweight exercises are always appropriate regardless of what's selected, and not every exercise needs to use one of the listed equipment types. Just never pick an exercise that needs equipment NOT in their list.
- Respect the user's excluded areas and focus areas.
- Match difficulty to their experience level, but you can fit a few exercises that would be a bit hard for them, the goal is for them to improve.
- Give each day a clear "day" label (e.g. "Day 1") and a "focus" label (e.g. "Push", "Full Body").
- Every exercise chosen for a day MUST match that day's focus label and its underlying muscle groups - e.g. a "Push" day should only contain pushing movements (chest, shoulders, triceps), never pulling/back or biceps exercises; a "Pull" day should only contain back/biceps/forearms pulling movements, never pushing exercises; a "Legs" day only lower-body exercises. Do not mix muscle groups that contradict the day's stated split.
- Keep sets/reps/rest realistic for their goal.
- If the user provided additional notes, take them into account when choosing exercises and structuring the program.
- Include 3-5 practical tips for this specific program.`
}

function isTransientError(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err)
  return message.includes('"code":503') || message.includes('"code":429') || message.includes('UNAVAILABLE')
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default defineEventHandler(async (event): Promise<GenerateProgramResponseBody> => {
  const body = await readBody<GenerateProgramRequestBody>(event)
  const config = useRuntimeConfig()

  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'

  const fallback = (): GenerateProgramResponseBody => ({
    status: 'ready',
    program: generateProgram(body.formData),
    source: 'fallback'
  })

  if (!config.geminiApiKey) {
    return fallback()
  }

  if (isRateLimited(ip)) {
    return fallback()
  }

  try {
    const ai = new GoogleGenAI({ apiKey: config.geminiApiKey })
    const catalog = buildCatalog()
    const prompt = buildPrompt(body, catalog)

    const request = {
      model: 'gemini-flash-latest',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema
      }
    }

    // The free tier occasionally returns a transient 503 "high demand" error -
    // one quick retry recovers most of those instead of falling back needlessly.
    let response
    try {
      response = await ai.models.generateContent(request)
    } catch (err) {
      if (!isTransientError(err)) throw err
      await delay(800)
      response = await ai.models.generateContent(request)
    }

    const text = response.text
    if (!text) return fallback()

    const parsed = JSON.parse(text) as { status: string, questions?: string[], program?: GeneratedProgram }

    if (parsed.status === 'needs_clarification' && parsed.questions?.length) {
      return {
        status: 'needs_clarification',
        questions: parsed.questions.slice(0, MAX_QUESTIONS)
      }
    }

    if (parsed.status === 'ready' && parsed.program) {
      return {
        status: 'ready',
        program: parsed.program,
        source: 'ai'
      }
    }

    return fallback()
  } catch (err) {
    console.error('[generate-program] Gemini call failed:', err)
    return fallback()
  }
})
