import type { ProgramExercise, WorkoutDay, ProgramSettings } from './program-types'

export interface EditableProgramExercise extends ProgramExercise {
  id: string
}

export interface EditableDay {
  id?: string
  day: string
  focus: string
  notes: string
  exercises: EditableProgramExercise[]
}

// Normalizes either a fresh AI/blank-start schedule (no id/notes) or a
// previously-saved editable schedule (round-tripped from the jsonb column,
// already has id/notes) into the same editable shape - preserving existing
// ids/notes rather than regenerating them avoids id churn across edit sessions.
export function toEditableSchedule(schedule: (WorkoutDay | EditableDay)[]): EditableDay[] {
  return schedule.map(day => ({
    ...day,
    id: day.id ?? crypto.randomUUID(),
    day: day.day,
    focus: day.focus,
    notes: (day as Partial<EditableDay>).notes ?? '',
    exercises: day.exercises.map(ex => ({
      ...ex,
      id: (ex as Partial<EditableProgramExercise>).id ?? crypto.randomUUID()
    }))
  }))
}

export interface SavedProgram {
  id: string
  name: string
  goal: string
  source: 'ai' | 'manual' | 'fallback'
  isActive: boolean
  schedule: WorkoutDay[]
  tips: string[]
  createdAt: string
  updatedAt: string
  settings?: ProgramSettings
  localOnly?: boolean
}

export interface SavedProgramInput {
  name: string
  goal: string
  source: 'ai' | 'manual' | 'fallback'
  schedule: WorkoutDay[]
  tips: string[]
  settings?: ProgramSettings
}

interface ProgramDbRow {
  id: string
  name: string
  goal: string
  source: 'ai' | 'manual' | 'fallback'
  is_active: boolean
  schedule: WorkoutDay[]
  tips: string[]
  created_at: string
  updated_at: string
  settings?: ProgramSettings | null
}

export function fromDbRow(row: ProgramDbRow): SavedProgram {
  return {
    id: row.id,
    name: row.name,
    goal: row.goal,
    source: row.source,
    isActive: row.is_active,
    schedule: row.schedule,
    tips: row.tips,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    settings: row.settings || undefined
  }
}
