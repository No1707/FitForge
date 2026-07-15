import type { WorkoutDay } from './program-types'

export interface SavedProgram {
  id: string
  name: string
  goal: string
  source: 'ai' | 'manual'
  isActive: boolean
  schedule: WorkoutDay[]
  tips: string[]
  createdAt: string
  updatedAt: string
}

export interface SavedProgramInput {
  name: string
  goal: string
  source: 'ai' | 'manual'
  schedule: WorkoutDay[]
  tips: string[]
}

interface ProgramDbRow {
  id: string
  name: string
  goal: string
  source: 'ai' | 'manual'
  is_active: boolean
  schedule: WorkoutDay[]
  tips: string[]
  created_at: string
  updated_at: string
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
    updatedAt: row.updated_at
  }
}
