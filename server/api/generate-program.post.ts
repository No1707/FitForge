import { GoogleGenAI, Type } from '@google/genai'
import { generateProgram } from '~/utils/program-generator'
import { formSchema, validateGeneratedProgram } from '~/utils/program-validation'
import type { GenerateProgramResponseBody } from '~/utils/program-types'
import { isRateLimited } from '../utils/rate-limit'

export default defineEventHandler(async (event): Promise<GenerateProgramResponseBody> => {
  const body = await readBody(event)
  const parsed = formSchema.safeParse(body?.formData)
  if (!parsed.success) throw createError({ statusCode: 400, statusMessage: 'Invalid program preferences', data: { message: 'Vérifie tes choix : un objectif, 2 à 6 séances par semaine et du matériel disponible. Les notes médicales ou personnelles ne sont pas nécessaires.' } })
  const form = parsed.data
  let base
  try { base = generateProgram(form) }
  catch (error) { throw createError({ statusCode: 422, statusMessage: 'Incompatible preferences', data: { message: error instanceof Error ? error.message : 'Ces contraintes ne permettent pas de préparer un programme.' } }) }
  const fallback = (): GenerateProgramResponseBody => ({ status: 'ready', program: base, source: 'fallback' })
  const config = useRuntimeConfig()
  // The external provider is optional. No names, free text or health information are sent.
  if (!form.useAi || !config.geminiApiKey || isRateLimited(getRequestIP(event) || 'unknown')) return fallback()
  try {
    const ai = new GoogleGenAI({ apiKey: config.geminiApiKey })
    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: `Write up to 3 short practical explanations in French for this strength training plan. Explain its organisation and how to record progress. Use direct factual sentences. Omit slogans, motivational phrases, metaphors, rhetorical questions and introductions. Each tip must add a specific instruction about this plan. Do not provide medical, rehabilitation or nutrition advice. Do not claim professional review. Do not change the exercises or prescribe extra training. Return only a JSON object with a tips array.\n${JSON.stringify({ goal: base.goal, schedule: base.schedule })}`,
      config: {
        httpOptions: { timeout: 12000 }, responseMimeType: 'application/json',
        responseSchema: { type: Type.OBJECT, properties: { tips: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ['tips'] }
      }
    })
    const enrichment = JSON.parse(response.text || '{}')
    const program = validateGeneratedProgram({ ...base, tips: enrichment.tips }, form)
    return { status: 'ready', program, source: 'ai' }
  } catch { return fallback() }
})
