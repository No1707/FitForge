import { z } from 'zod'
import { muscleFilterGroups } from './exercises'
import { equipmentChoices, findExercise, isExerciseAllowed } from './exercise-helpers'
import type { GeneratedProgram, ProgramFormData, ProgramSettings } from './program-types'

export const formSchema = z.object({
  name: z.string().trim().max(80).default(''),
  goals: z.array(z.enum(['muscle_building', 'strength', 'general_fitness', 'fat_loss', 'endurance'])).min(1).max(1),
  experience: z.enum(['beginner', 'intermediate', 'advanced']),
  scheduleType: z.enum(['weekly', 'fixed']),
  daysPerWeek: z.number().int().min(2).max(14),
  sessionDuration: z.number().int().min(20).max(120),
  splitPreference: z.enum(['auto', 'full_body', 'upper_lower', 'push_pull_legs']),
  equipment: z.array(z.string().refine(v => equipmentChoices.includes(v))).min(1, 'Choisis au moins un matériel ou le poids du corps.').max(20),
  focusAreas: z.array(z.string().refine(v => muscleFilterGroups.some(g => g.label === v))).max(7),
  excludeAreas: z.array(z.string().refine(v => muscleFilterGroups.some(g => g.label === v))).max(7),
  additionalNotes: z.literal('').default(''),
  useAi: z.boolean().default(false)
}).superRefine((value, context) => {
  if (value.scheduleType === 'weekly' && value.daysPerWeek > 6) context.addIssue({ code: 'custom', path: ['daysPerWeek'], message: 'Choisis entre 2 et 6 séances par semaine.' })
  if (value.focusAreas.some(area => value.excludeAreas.includes(area))) context.addIssue({ code: 'custom', path: ['excludeAreas'], message: 'Une zone ne peut pas être prioritaire et exclue.' })
})

export const settingsSchema = z.object({
  equipment: z.array(z.string()).max(30), excludeAreas: z.array(z.string()).max(20),
  experience: z.enum(['beginner', 'intermediate', 'advanced']),
  sessionDuration: z.number().min(10).max(240), daysPerWeek: z.number().int().min(1).max(14)
})

export const exerciseSchema = z.object({
  id: z.string().optional(), exerciseId: z.string().optional(), name: z.string().trim().min(1).max(160),
  sets: z.number().int().min(1).max(10), reps: z.string().regex(/^\d{1,3}(?:\s*[-–]\s*\d{1,3})?(?:\s*(?:s|sec|seconds?|rép\.?))?$/i).refine(value => {
    const values = value.match(/\d+/g)?.map(Number) || []
    return values.length > 0 && values.every(number => number > 0) && values[0]! <= values[values.length - 1]!
  }),
  rest: z.string().regex(/^\d{1,3}(?:[.,]\d+)?(?:\s*[-–]\s*\d{1,3}(?:[.,]\d+)?)?\s*(?:s|sec|seconds?|min|m)?$/i).refine(value => {
    const values = value.match(/\d+(?:[.,]\d+)?/g)?.map(number => Number(number.replace(',', '.'))) || []
    const maximum = /min|m$/i.test(value) ? 30 : 1800
    return values.length > 0 && values.every(number => number <= maximum) && values[0]! <= values[values.length - 1]!
  })
})

export const programSchema = z.object({
  name: z.string().trim().min(1).max(100), goal: z.string().trim().min(1).max(150),
  schedule: z.array(z.object({
    id: z.string().optional(), day: z.string().min(1).max(50), focus: z.string().min(1).max(100),
    exercises: z.array(exerciseSchema).min(1).max(12)
  })).min(1).max(14),
  tips: z.array(z.string().max(400)).max(8), settings: settingsSchema.optional()
})

export function settingsFromForm(form: ProgramFormData): ProgramSettings {
  return { equipment: [...form.equipment], excludeAreas: [...form.excludeAreas], experience: form.experience, sessionDuration: form.sessionDuration, daysPerWeek: form.daysPerWeek }
}

export function validateGeneratedProgram(input: unknown, form: ProgramFormData): GeneratedProgram {
  const program = programSchema.parse(input)
  const settings = settingsFromForm(form)
  if (program.schedule.length !== form.daysPerWeek) throw new Error('Le nombre de séances ne correspond pas au programme demandé.')
  for (const day of program.schedule) {
    const names = new Set<string>()
    for (const exercise of day.exercises) {
      const catalog = findExercise(exercise.name)
      if (!catalog || !isExerciseAllowed(catalog, settings) || names.has(exercise.name)) throw new Error('Le programme ne respecte pas le matériel, le niveau ou les exclusions.')
      names.add(exercise.name)
      exercise.exerciseId = catalog.id
    }
  }
  return { ...program, settings }
}

export function safeRedirect(value: unknown, fallback = '/') {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//') || /[\\\u0000-\u0020]/.test(value)) return fallback
  return value
}
