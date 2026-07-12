export interface ProgramFormData {
  name: string
  goal: 'muscle_building' | 'fat_loss' | 'strength' | 'endurance' | 'general_fitness'
  experience: 'beginner' | 'intermediate' | 'advanced'
  daysPerWeek: number
  sessionDuration: number
  equipment: string[]
  focusAreas: string[]
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

export const equipmentOptions = [
  { value: 'barbell', label: 'Barbells' },
  { value: 'dumbbell', label: 'Dumbbells' },
  { value: 'kettlebell', label: 'Kettlebells' },
  { value: 'machine', label: 'Machines' },
  { value: 'cable', label: 'Cable Machine' },
  { value: 'bodyweight', label: 'Bodyweight Only' }
] as const

export const muscleGroups = [
  { value: 'chest', label: 'Chest' },
  { value: 'back', label: 'Back' },
  { value: 'shoulders', label: 'Shoulders' },
  { value: 'arms', label: 'Arms' },
  { value: 'legs', label: 'Legs' },
  { value: 'core', label: 'Core' }
] as const
