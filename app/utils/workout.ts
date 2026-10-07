import { z } from 'zod'
import type { SavedProgram } from './program-editor-types'
import type { ProgramExercise, ProgramSettings, WorkoutDay } from './program-types'
import { findExercise, requiredEquipment } from './exercise-helpers'
import { settingsSchema } from './program-validation'

export interface LoggedSet {
  id: string
  weight: number | null
  reps: number | null
  done: boolean
}

export interface WorkoutExercise {
  id: string
  exerciseId?: string
  name: string
  originalName?: string
  targetReps: string
  unit: 'reps' | 'seconds'
  restSeconds: number
  sets: LoggedSet[]
}

export interface WorkoutSession {
  id: string
  programId: string
  programName: string
  dayId: string
  dayIndex: number
  focus: string
  startedAt: string
  completedAt: string | null
  durationSeconds: number
  pausedAt: number | null
  pausedSeconds: number
  restEndsAt: number | null
  exercises: WorkoutExercise[]
  settings: ProgramSettings
  adaptation: string | null
  effort: 'easy' | 'right' | 'hard' | null
  notes: string
}

const numberOrNull = z.number().finite().min(0).max(2000).nullable()
export const workoutSchema = z.object({
  id: z.string().uuid(), programId: z.string().max(150), programName: z.string().max(160),
  dayId: z.string().max(160), dayIndex: z.number().int().min(0).max(30), focus: z.string().max(160),
  startedAt: z.string().datetime(), completedAt: z.string().datetime().nullable(),
  durationSeconds: z.number().min(0), pausedAt: z.number().nullable(), pausedSeconds: z.number().min(0), restEndsAt: z.number().nullable(),
  exercises: z.array(z.object({
    id: z.string(), exerciseId: z.string().optional(), name: z.string().max(160), originalName: z.string().max(160).optional(),
    targetReps: z.string().max(30), unit: z.enum(['reps', 'seconds']), restSeconds: z.number().min(0).max(1800),
    sets: z.array(z.object({ id: z.string(), weight: numberOrNull, reps: z.number().int().min(1).max(3600).nullable(), done: z.boolean() }).refine(set => !set.done || set.reps !== null, 'Une série validée doit contenir une répétition ou une durée.')).min(1).max(20)
  })).min(1).max(30), settings: settingsSchema, adaptation: z.string().max(500).nullable(),
  effort: z.enum(['easy', 'right', 'hard']).nullable(), notes: z.string().max(1000)
})

export function restSeconds(value: string): number {
  const values = value.match(/\d+(?:[.,]\d+)?/g)?.map(v => Number(v.replace(',', '.'))) || [60]
  const seconds = Math.max(...values) * (/min|\dm\b/.test(value) ? 60 : 1)
  return Math.min(1800, Math.max(0, seconds))
}

export function repRange(value: string) {
  const numbers = value.match(/\d+/g)?.map(Number) || [10]
  return { min: numbers[0]!, max: numbers[numbers.length - 1]! }
}

// Initial product estimate: allow for equipment changes and delays beyond planned rests.
export const SESSION_TIME_BUFFER = 0.2

export function estimateMinutes(day: WorkoutDay): number {
  const seconds = day.exercises.reduce((sum, exercise) => {
    const work = /\b(s|sec|seconds?)\b/i.test(exercise.reps) ? repRange(exercise.reps).max : Math.max(30, repRange(exercise.reps).max * 3)
    return sum + exercise.sets * work + Math.max(0, exercise.sets - 1) * restSeconds(exercise.rest) + 45
  }, 300)
  return Math.ceil(seconds * (1 + SESSION_TIME_BUFFER) / 60)
}

export function adaptDayToDuration(day: WorkoutDay, minutes: number) {
  if (!Number.isFinite(minutes) || minutes < 10) throw new Error('La durée doit être de 10 minutes minimum.')
  const result: WorkoutDay = { ...day, exercises: day.exercises.map(exercise => ({ ...exercise })) }
  let removedSets = 0
  const removedExercises: string[] = []
  // Preserve order, movement priorities and recovery times; reduce accessory volume first.
  for (let index = result.exercises.length - 1; index >= 0 && estimateMinutes(result) > minutes; index--) {
    const exercise = result.exercises[index]!
    while (exercise.sets > 2 && estimateMinutes(result) > minutes) { exercise.sets--; removedSets++ }
  }
  while (result.exercises.length > 2 && estimateMinutes(result) > minutes) {
    const removed = result.exercises.pop()!
    removedExercises.push(removed.name)
    removedSets += removed.sets
  }
  return { day: result, removedSets, removedExercises, estimatedMinutes: estimateMinutes(result), fits: estimateMinutes(result) <= minutes }
}

export function settingsForProgram(program: SavedProgram): ProgramSettings {
  return program.settings || {
    equipment: [...new Set(['bodyweight', ...program.schedule.flatMap(day => day.exercises.flatMap(ex => {
      const found = findExercise(ex.exerciseId || ex.name)
      return found ? requiredEquipment(found) : []
    }))])],
    excludeAreas: [], experience: 'beginner', sessionDuration: 45, daysPerWeek: program.schedule.length
  }
}

export function dayKey(day: WorkoutDay, index: number) { return day.id || `${index}:${day.day}:${day.focus}` }

export function nextDayIndex(program: SavedProgram, sessions: WorkoutSession[]) {
  if (!program.schedule.length) return 0
  const last = sessions.filter(s => s.programId === program.id && s.completedAt).sort((a, b) => b.completedAt!.localeCompare(a.completedAt!))[0]
  if (!last) return 0
  const previous = program.schedule.findIndex((day, index) => dayKey(day, index) === last.dayId)
  return previous < 0 ? 0 : (previous + 1) % program.schedule.length
}

export function previousPerformance(sessions: WorkoutSession[], name: string) {
  for (const session of [...sessions].filter(s => s.completedAt).sort((a, b) => b.completedAt!.localeCompare(a.completedAt!))) {
    const exercise = session.exercises.find(ex => ex.name === name && ex.sets.some(set => set.done))
    if (exercise) return { exercise, session }
  }
  return null
}

export function createWorkoutExercise(exercise: ProgramExercise, history: WorkoutSession[]): WorkoutExercise {
  const previous = previousPerformance(history, exercise.name)
  const unit = /\b(s|sec|seconds?)\b/i.test(exercise.reps) ? 'seconds' : 'reps'
  const previousSets = previous?.exercise.unit === unit ? previous.exercise.sets.filter(set => set.done) : []
  return {
    id: crypto.randomUUID(), exerciseId: exercise.exerciseId || findExercise(exercise.name)?.id,
    name: exercise.name, targetReps: exercise.reps, restSeconds: restSeconds(exercise.rest), unit,
    sets: Array.from({ length: Math.min(10, Math.max(1, exercise.sets)) }, (_, index) => ({
      id: crypto.randomUUID(), weight: previousSets[index]?.weight ?? null,
      reps: previousSets[index]?.reps ?? repRange(exercise.reps).min, done: false
    }))
  }
}

export function createWorkout(program: SavedProgram, dayIndex: number, day: WorkoutDay, history: WorkoutSession[], adaptation: string | null = null): WorkoutSession {
  return {
    id: crypto.randomUUID(), programId: program.id, programName: program.name,
    dayId: dayKey(program.schedule[dayIndex]!, dayIndex), dayIndex, focus: day.focus,
    startedAt: new Date().toISOString(), completedAt: null, durationSeconds: 0,
    pausedAt: null, pausedSeconds: 0, restEndsAt: null,
    exercises: day.exercises.map(exercise => createWorkoutExercise(exercise, history)),
    settings: settingsForProgram(program), adaptation, effort: null, notes: ''
  }
}

export function elapsedSeconds(session: WorkoutSession, now = Date.now()) {
  if (session.completedAt) return session.durationSeconds
  return Math.max(0, Math.floor(((session.pausedAt ?? now) - Date.parse(session.startedAt)) / 1000) - session.pausedSeconds)
}

export function completedSets(session: WorkoutSession) { return session.exercises.flatMap(ex => ex.sets).filter(set => set.done).length }
export function totalSets(session: WorkoutSession) { return session.exercises.reduce((total, ex) => total + ex.sets.length, 0) }

export function finishWorkout(session: WorkoutSession, now = Date.now()): WorkoutSession {
  if (completedSets(session) === 0) throw new Error('Valide au moins une série avant de terminer la séance.')
  const completed = { ...session, durationSeconds: elapsedSeconds(session, now), completedAt: new Date(now).toISOString(), pausedAt: null, restEndsAt: null }
  return workoutSchema.parse(completed)
}

export function formatDuration(seconds: number) {
  return `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`
}

export function progressionHint(exercise: WorkoutExercise, history: WorkoutSession[]) {
  const previous = previousPerformance(history, exercise.name)
  if (!previous) return ''
  if (previous.session.effort === 'hard') return 'Dernière séance jugée difficile. Évite d’augmenter la charge sans vérifier ton exécution.'
  const sets = previous.exercise.sets
  if (sets.every(set => set.done && (set.reps ?? 0) >= repRange(exercise.targetReps).max)) return 'Objectif atteint sur toutes les séries précédentes. Si tu maîtrises le mouvement, tu peux envisager la plus petite augmentation de charge disponible.'
  return ''
}
