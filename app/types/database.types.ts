import type { ProgramSettings, WorkoutDay } from '../utils/program-types'
import type { WorkoutSession } from '../utils/workout'

type ProgramRow = {
  id: string
  user_id: string
  name: string
  goal: string
  source: 'ai' | 'manual'
  schedule: WorkoutDay[]
  tips: string[]
  settings: ProgramSettings | null
  is_active: boolean
  created_at: string
  updated_at: string
}
type WorkoutRow = { id: string, user_id: string, program_id: string, completed_at: string, payload: WorkoutSession, created_at: string }
export type Database = {
  public: {
    Tables: {
      programs: { Row: ProgramRow, Insert: Pick<ProgramRow, 'user_id' | 'name' | 'goal' | 'source' | 'schedule' | 'tips'> & Partial<ProgramRow>, Update: Partial<ProgramRow>, Relationships: [] }
      workout_sessions: { Row: WorkoutRow, Insert: Omit<WorkoutRow, 'created_at'>, Update: Partial<WorkoutRow>, Relationships: [] }
    }
    Views: { [_ in never]: never }
    Functions: { set_active_program: { Args: { target_id: string }, Returns: undefined } }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}
