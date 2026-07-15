import { exercises, muscleFilterGroups, type Exercise } from './exercises'
import type { ProgramFormData, GeneratedProgram, WorkoutDay, ProgramExercise } from './program-types'

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const difficultyByExperience: Record<ProgramFormData['experience'], string[]> = {
  beginner: ['beginner', 'none'],
  intermediate: ['beginner', 'intermediate', 'none'],
  advanced: ['beginner', 'intermediate', 'advanced', 'none']
}

type Goal = ProgramFormData['goals'][number]

const setsRepsRestByGoal: Record<Goal, { sets: number, reps: string, rest: string }> = {
  muscle_building: { sets: 4, reps: '8-12', rest: '75s' },
  strength: { sets: 4, reps: '3-6', rest: '150s' },
  fat_loss: { sets: 3, reps: '12-20', rest: '30s' },
  endurance: { sets: 3, reps: '15-25', rest: '30s' },
  general_fitness: { sets: 3, reps: '10-15', rest: '60s' }
}

const goalLabels: Record<Goal, string> = {
  muscle_building: 'Muscle Building',
  strength: 'Strength',
  fat_loss: 'Fat Loss',
  endurance: 'Endurance',
  general_fitness: 'General Fitness'
}

const tipsByGoal: Record<Goal, string[]> = {
  muscle_building: [
    'Aim for progressive overload - increase weight or reps each week',
    'Eat in a slight caloric surplus (200-300 calories above maintenance)',
    'Get 7-9 hours of sleep for optimal recovery',
    'Consume 1.6-2.2g of protein per kg of bodyweight daily'
  ],
  strength: [
    'Focus on compound movements with heavy weights',
    'Rest 3-5 minutes between heavy sets for full recovery',
    'Deload every 4-6 weeks to prevent overtraining',
    'Track your lifts and aim to beat previous records'
  ],
  fat_loss: [
    'Maintain a moderate caloric deficit (300-500 calories below maintenance)',
    'Keep protein high to preserve muscle mass (2g per kg bodyweight)',
    'Add 2-3 cardio sessions per week for additional calorie burn',
    'Stay consistent - sustainable fat loss takes time'
  ],
  endurance: [
    'Focus on higher rep ranges with shorter rest periods',
    'Incorporate circuit training for improved cardiovascular fitness',
    'Stay hydrated before, during, and after workouts',
    'Gradually increase workout duration over time'
  ],
  general_fitness: [
    'Balance strength training with cardiovascular exercise',
    'Focus on movement quality over quantity',
    'Listen to your body and take rest days when needed',
    'Make fitness a sustainable part of your lifestyle'
  ]
}

interface SplitDay {
  name: string
  groups: string[]
}

const splitCycles: Record<'full_body' | 'upper_lower' | 'push_pull_legs', SplitDay[]> = {
  full_body: [
    { name: 'Full Body', groups: ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'] }
  ],
  upper_lower: [
    { name: 'Upper Body', groups: ['Chest', 'Back', 'Shoulders', 'Arms'] },
    { name: 'Lower Body', groups: ['Legs', 'Core'] }
  ],
  push_pull_legs: [
    { name: 'Push', groups: ['Chest', 'Shoulders', 'Arms'] },
    { name: 'Pull', groups: ['Back', 'Arms', 'Core'] },
    { name: 'Legs', groups: ['Legs', 'Core'] }
  ]
}

// Sensible default split per day count when the user has no split preference.
const autoCycleByDays: Record<number, SplitDay[]> = {
  2: splitCycles.full_body,
  3: splitCycles.push_pull_legs,
  4: splitCycles.upper_lower,
  5: [
    { name: 'Chest', groups: ['Chest', 'Core'] },
    { name: 'Back', groups: ['Back', 'Core'] },
    { name: 'Legs', groups: ['Legs'] },
    { name: 'Shoulders', groups: ['Shoulders', 'Core'] },
    { name: 'Arms', groups: ['Arms', 'Core'] }
  ],
  6: splitCycles.push_pull_legs
}

function buildDayPattern(daysPerWeek: number, splitPreference: ProgramFormData['splitPreference']): SplitDay[] {
  const cycle = splitPreference === 'auto'
    ? (autoCycleByDays[daysPerWeek] || splitCycles.push_pull_legs)
    : splitCycles[splitPreference]

  const pattern: SplitDay[] = []
  for (let i = 0; i < daysPerWeek; i++) {
    pattern.push(cycle[i % cycle.length])
  }

  // When a day name repeats (e.g. a 6-day PPL cycle repeats twice), suffix it
  // with A/B/C so each day in the schedule reads as distinct.
  const totalByName: Record<string, number> = {}
  pattern.forEach(day => { totalByName[day.name] = (totalByName[day.name] || 0) + 1 })
  const seenByName: Record<string, number> = {}

  return pattern.map(day => {
    if (totalByName[day.name] <= 1) return day
    seenByName[day.name] = (seenByName[day.name] || 0) + 1
    const suffix = String.fromCharCode(64 + seenByName[day.name])
    return { name: `${day.name} ${suffix}`, groups: day.groups }
  })
}

function poolForGroup(group: string, formData: ProgramFormData): Exercise[] {
  const groupDef = muscleFilterGroups.find(g => g.label === group)
  if (!groupDef) return []

  const allowedDifficulty = difficultyByExperience[formData.experience]
  const excludedMuscles = new Set(
    formData.excludeAreas.flatMap(area => muscleFilterGroups.find(g => g.label === area)?.values || [])
  )

  return exercises.filter((exercise) => {
    // Stretches don't fit a sets/reps training program - leave them out.
    if (exercise.category === 'flexibility') return false
    const matchesGroup = groupDef.values.some(v => exercise.muscles.includes(v))
    if (!matchesGroup) return false
    if (exercise.muscles.some(m => excludedMuscles.has(m))) return false
    const hasEquipment = exercise.equipment === 'bodyweight' || formData.equipment.includes(exercise.equipment)
    if (!hasEquipment) return false
    if (!allowedDifficulty.includes(exercise.difficulty)) return false
    return true
  })
}

function exercisesPerDay(sessionDuration: number): number {
  if (sessionDuration <= 30) return 4
  if (sessionDuration <= 45) return 5
  if (sessionDuration <= 60) return 6
  if (sessionDuration <= 90) return 8
  return 10
}

export function generateProgram(formData: ProgramFormData): GeneratedProgram {
  const pattern = buildDayPattern(formData.daysPerWeek, formData.splitPreference)
  const targetCount = exercisesPerDay(formData.sessionDuration)
  // The deterministic fallback can't blend rep schemes across goals like the
  // AI can, so it uses the first selected goal to drive sets/reps/rest.
  const primaryGoal = formData.goals[0] || 'general_fitness'
  const setsRepsRest = setsRepsRestByGoal[primaryGoal]

  const schedule: WorkoutDay[] = pattern.map((day, index) => {
    const groups = day.groups
    const perGroup = Math.max(1, Math.floor(targetCount / groups.length))
    const usedNames = new Set<string>()
    const exercisesForDay: ProgramExercise[] = []

    groups.forEach((group) => {
      const isFocus = formData.focusAreas.includes(group)
      const count = isFocus ? perGroup + 1 : perGroup
      const pool = shuffle(poolForGroup(group, formData)).filter(ex => !usedNames.has(ex.name))
      pool.slice(0, count).forEach((ex) => {
        usedNames.add(ex.name)
        exercisesForDay.push({ name: ex.name, ...setsRepsRest })
      })
    })

    // Safety net: if nothing matched (equipment too restrictive, everything
    // excluded, etc.) fall back to bodyweight core work so no day is empty.
    if (exercisesForDay.length === 0) {
      shuffle(poolForGroup('Core', formData)).slice(0, 3).forEach((ex) => {
        exercisesForDay.push({ name: ex.name, ...setsRepsRest })
      })
    }

    return {
      day: `Day ${index + 1}`,
      focus: day.name,
      exercises: exercisesForDay.slice(0, targetCount + 2)
    }
  })

  const goalLabel = formData.goals.map(g => goalLabels[g]).join(' & ')
  const tips = [...new Set(formData.goals.flatMap(g => tipsByGoal[g]))].slice(0, 6)

  return {
    name: `${formData.name}'s ${goalLabel} Program`,
    goal: goalLabel,
    schedule,
    tips
  }
}
