import { z } from 'zod'
import { workoutSchema, type WorkoutSession } from './workout'
import { settingsSchema } from './program-validation'
import type { SavedProgram } from './program-editor-types'
import type { GeneratedProgram, ProgramFormData } from './program-types'

export interface ProgramDraft {
  program: GeneratedProgram
  source: 'ai' | 'fallback'
  form: ProgramFormData
}

export interface TrainingData {
  version: 1
  programs: SavedProgram[]
  workouts: WorkoutSession[]
  draft: WorkoutSession | null
  pendingWorkouts: string[]
  deletedWorkouts: string[]
  importedPrograms: Record<string, string>
  importedWorkouts: Record<string, string>
}

export function emptyTrainingData(): TrainingData {
  return { version: 1, programs: [], workouts: [], draft: null, pendingWorkouts: [], deletedWorkouts: [], importedPrograms: {}, importedWorkouts: {} }
}

const savedProgramSchema = z.object({
  id: z.string(), name: z.string().max(160), goal: z.string().max(200), source: z.enum(['ai', 'manual', 'fallback']),
  isActive: z.boolean(), createdAt: z.string(), updatedAt: z.string(), localOnly: z.boolean().optional(), settings: settingsSchema.optional(),
  tips: z.array(z.string()), schedule: z.array(z.object({
    id: z.string().optional(), day: z.string(), focus: z.string(), notes: z.string().optional(),
    exercises: z.array(z.object({ id: z.string().optional(), exerciseId: z.string().optional(), name: z.string(), sets: z.number().int().min(1).max(10), reps: z.string(), rest: z.string() }))
  }))
})

const storageSchema = z.object({
  version: z.literal(1), programs: z.array(savedProgramSchema), workouts: z.array(workoutSchema),
  draft: workoutSchema.nullable(), pendingWorkouts: z.array(z.string()), deletedWorkouts: z.array(z.string()).default([]),
  importedPrograms: z.record(z.string()).default({}), importedWorkouts: z.record(z.string()).default({})
})

export function parseTrainingData(raw: string | null): TrainingData {
  if (!raw) return emptyTrainingData()
  return storageSchema.parse(JSON.parse(raw))
}

export function storageKey(owner: string | null) { return `fitforge:training:v1:${owner || 'guest'}` }

export function mergeWorkouts(local: WorkoutSession[], remote: WorkoutSession[], pending: string[], deleted: string[]) {
  const rows = new Map(remote.map(session => [session.id, session]))
  // A successful complete fetch is authoritative, including deletions from another device.
  for (const session of local) if (pending.includes(session.id)) rows.set(session.id, session)
  for (const id of deleted) rows.delete(id)
  return [...rows.values()].sort((a, b) => (b.completedAt || '').localeCompare(a.completedAt || ''))
}
