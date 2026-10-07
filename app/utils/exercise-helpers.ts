import { exercises, muscleFilterGroups, type Exercise } from './exercises'
import type { ProgramSettings } from './program-types'

const labels: Record<string, string> = {
  strength: 'Musculation', cardio: 'Cardio', flexibility: 'Mobilité', bodyweight: 'Poids du corps',
  beginner: 'Débutant', intermediate: 'Intermédiaire', advanced: 'Avancé', none: 'Sans matériel',
  barbell: 'Barre', dumbbell: 'Haltères', machine: 'Machines', cable: 'Poulies', bands: 'Élastiques',
  kettlebell: 'Kettlebell', 'ez-bar': 'Barre EZ', plate: 'Disque', 'exercise-ball': 'Swiss ball',
  landmine: 'Landmine', 'trap-bar': 'Trap bar', other: 'Autre', bench: 'Banc', rack: 'Rack',
  'pull-up-bar': 'Barre de traction', 'parallel-bars': 'Barres parallèles',
  Chest: 'Pectoraux', Back: 'Dos', Lats: 'Dorsaux', 'Upper Back': 'Haut du dos', 'Lower Back': 'Lombaires',
  Traps: 'Trapèzes', Shoulders: 'Épaules', 'Rear Delts': 'Arrière des épaules', Arms: 'Bras',
  Biceps: 'Biceps', Triceps: 'Triceps', Forearms: 'Avant-bras', Core: 'Ceinture abdominale',
  Abs: 'Abdominaux', Obliques: 'Obliques', Legs: 'Jambes', Quadriceps: 'Quadriceps',
  Hamstrings: 'Ischio-jambiers', Glutes: 'Fessiers', Calves: 'Mollets', Adductors: 'Adducteurs',
  Abductors: 'Abducteurs', 'Hip Flexors': 'Fléchisseurs de hanche', 'Full Body': 'Corps entier',
  'Upper Body': 'Haut du corps', 'Lower Body': 'Bas du corps', Push: 'Poussée', Pull: 'Tirage'
}

export const equipmentChoices = ['dumbbell', 'barbell', 'machine', 'cable', 'bodyweight', 'bands', 'kettlebell', 'bench', 'rack', 'pull-up-bar', 'parallel-bars', 'ez-bar', 'plate', 'exercise-ball', 'landmine', 'trap-bar']
export const gymEquipment = ['barbell', 'dumbbell', 'machine', 'cable', 'bodyweight', 'bench', 'rack', 'pull-up-bar', 'parallel-bars']
export const label = (value: string) => labels[value] || value

export function focusLabel(value: string): string {
  const suffix = value.match(/ ([A-Z])$/)?.[0] || ''
  return label(suffix ? value.slice(0, -2) : value) + suffix
}

export function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '')
}

const aliases: Record<string, string> = {
  'push-up': 'pompe pompes', 'pull-up': 'traction tractions', 'chin-up': 'traction supination',
  'barbell-bench-press': 'developpe couche', 'dumbbell-bench-press': 'developpe couche halteres',
  'barbell-squat': 'squat barre', 'barbell-deadlift': 'souleve de terre',
  'dumbbell-lateral-raise': 'elevation laterale', plank: 'gainage planche'
}

export function matchesExercise(exercise: Exercise, query: string) {
  const needle = normalizeSearch(query)
  const text = [exercise.name, aliases[exercise.id] || '', ...exercise.muscles.flatMap(m => [m, label(m)]), label(exercise.equipment)].join(' ')
  return !needle || normalizeSearch(text).includes(needle)
}

export function findExercise(nameOrId: string) {
  return exercises.find(e => e.id === nameOrId || e.name === nameOrId)
}

export function requiredEquipment(exercise: Exercise): string[] {
  const required = exercise.equipment === 'none' || exercise.equipment === 'bodyweight' ? [] : [exercise.equipment as string]
  const name = exercise.name.toLowerCase()
  if (/pull-up|chin-up|hanging|dead hang|toes.to.bar/.test(name)) required.push('pull-up-bar')
  if (/bench|incline.*(press|fly|curl)|chest.supported|preacher/.test(name) && exercise.equipment !== 'machine') required.push('bench')
  if (/dip/.test(name) && !/bench|machine|hip dip/.test(name)) required.push('parallel-bars')
  if (/incline push-up|decline push-up|decline sit-up|copenhagen plank|bulgarian split squat|step-up|single-leg hip thrust/.test(name)) required.push('bench')
  if (/dumbbell flyes|dumbbell pullover|close-grip dumbbell press|neutral-grip dumbbell press|spider curl/.test(name)) required.push('bench')
  if (/seated|concentration curl/.test(name) && ['dumbbell', 'barbell', 'ez-bar'].includes(exercise.equipment)) required.push('bench')
  if (/hyperextension|glute-ham raise/.test(name)) required.push('machine')
  if (/nordic/.test(name)) required.push('specialist-anchor')
  if (/inverted row/.test(name)) required.push('rack')
  if (exercise.equipment === 'barbell' && /squat|bench press/.test(name)) required.push('rack')
  if (/ab.wheel/.test(name)) required.push('other')
  return [...new Set(required)]
}

export function isExerciseAllowed(exercise: Exercise, settings: Pick<ProgramSettings, 'equipment' | 'experience' | 'excludeAreas'>) {
  if (exercise.category === 'flexibility' || exercise.category === 'cardio') return false
  const difficulties = settings.experience === 'beginner' ? ['beginner', 'none'] : settings.experience === 'intermediate' ? ['beginner', 'intermediate', 'none'] : ['beginner', 'intermediate', 'advanced', 'none']
  const excluded = settings.excludeAreas.flatMap(area => [...(muscleFilterGroups.find(g => g.label === area)?.values || [area])])
  return difficulties.includes(exercise.difficulty)
    && requiredEquipment(exercise).every(item => settings.equipment.includes(item))
    && !exercise.muscles.some(m => excluded.includes(m))
    && !(excluded.length && exercise.muscles.includes('Full Body'))
}

export function movementPattern(exercise: Exercise): string {
  const name = exercise.name.toLowerCase()
  if (/leg curl|nordic|hamstring curl/.test(name)) return 'leg-curl'
  if (/leg extension/.test(name)) return 'leg-extension'
  if (/calf|calves/.test(name)) return 'calves'
  if (/deadlift|good morning|pull-through/.test(name)) return 'hinge'
  if (/hip thrust|glute bridge/.test(name)) return 'hip-extension'
  if (/squat|lunge|leg press|step-up|split squat/.test(name)) return 'squat'
  if (/row/.test(name)) return 'row'
  if (/pull-up|chin-up|pulldown/.test(name)) return 'vertical-pull'
  if (/lateral raise/.test(name)) return 'lateral-raise'
  if (/reverse fly|rear delt|face pull/.test(name)) return 'rear-delt'
  if (/overhead press|shoulder press|military press|arnold press|pike push/.test(name)) return 'overhead-press'
  if (/bench press|chest press|push-up|dip/.test(name)) return 'chest-press'
  if (/fly|pec deck/.test(name)) return 'chest-fly'
  if (/curl/.test(name)) return 'biceps'
  if (/tricep|skull crusher|pushdown/.test(name)) return 'triceps'
  if (/plank|hold|wall sit|dead hang/.test(name)) return 'isometric'
  return `muscle:${exercise.muscles[0]}`
}

export function replacementsFor(original: Exercise, settings: ProgramSettings, alreadyUsed: string[] = []) {
  const pattern = movementPattern(original)
  return exercises.filter(candidate => candidate.id !== original.id
    && !alreadyUsed.includes(candidate.name)
    && isExerciseAllowed(candidate, settings)
    && movementPattern(candidate) === pattern
    && candidate.muscles[0] === original.muscles[0])
}
