export interface ProgramFormData {
  name: string
  goals: ('muscle_building' | 'fat_loss' | 'strength' | 'endurance' | 'general_fitness')[]
  experience: 'beginner' | 'intermediate' | 'advanced'
  daysPerWeek: number
  sessionDuration: number
  splitPreference: 'auto' | 'full_body' | 'upper_lower' | 'push_pull_legs'
  equipment: string[]
  focusAreas: string[]
  excludeAreas: string[]
}

export interface ProgramExercise {
  name: string
  sets: number
  reps: string
  rest: string
}

export interface WorkoutDay {
  day: string
  focus: string
  exercises: ProgramExercise[]
}

export interface GeneratedProgram {
  name: string
  goal: string
  schedule: WorkoutDay[]
  tips: string[]
}

export interface ClarificationQA {
  question: string
  answer: string
}

export interface GenerateProgramRequestBody {
  formData: ProgramFormData
  clarifications?: ClarificationQA[]
}

export type GenerateProgramResponseBody =
  | { status: 'needs_clarification', questions: string[] }
  | { status: 'ready', program: GeneratedProgram, source: 'ai' | 'fallback' }

export const fitnessGoals = [
  { value: 'muscle_building', label: 'Build Muscle', description: 'Focus on hypertrophy and muscle growth' },
  { value: 'fat_loss', label: 'Lose Fat', description: 'Burn calories and improve body composition' },
  { value: 'strength', label: 'Get Stronger', description: 'Increase your 1-rep max on compound lifts' },
  { value: 'endurance', label: 'Build Endurance', description: 'Improve stamina and cardiovascular health' },
  { value: 'general_fitness', label: 'General Fitness', description: 'Overall health and well-being' }
] as const

export const experienceLevels = [
  { value: 'beginner', label: 'Beginner', description: 'New to lifting (0-1 years)' },
  { value: 'intermediate', label: 'Intermediate', description: 'Consistent training (1-3 years)' },
  { value: 'advanced', label: 'Advanced', description: 'Experienced lifter (3+ years)' }
] as const

export const splitPreferences = [
  { value: 'auto', label: 'No Preference', description: 'We will pick the best split for your schedule' },
  { value: 'full_body', label: 'Full Body', description: 'Train your whole body every session' },
  { value: 'upper_lower', label: 'Upper / Lower', description: 'Alternate between upper body and lower body days' },
  { value: 'push_pull_legs', label: 'Push / Pull / Legs', description: 'Classic push, pull, and legs rotation' }
] as const

export const equipmentOptions = [
  { value: 'barbell', label: 'Barbell' },
  { value: 'dumbbell', label: 'Dumbbell' },
  { value: 'kettlebell', label: 'Kettlebell' },
  { value: 'machine', label: 'Machine' },
  { value: 'cable', label: 'Cable' },
  { value: 'bodyweight', label: 'Bodyweight Only' },
  { value: 'bands', label: 'Resistance Bands' },
  { value: 'ez-bar', label: 'EZ Bar' },
  { value: 'plate', label: 'Weight Plate' },
  { value: 'exercise-ball', label: 'Exercise Ball' },
  { value: 'landmine', label: 'Landmine' },
  { value: 'trap-bar', label: 'Trap Bar' }
] as const
