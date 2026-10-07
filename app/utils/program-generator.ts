import { exercises, muscleFilterGroups, type Exercise } from './exercises'
import { isExerciseAllowed, movementPattern } from './exercise-helpers'
import { settingsFromForm, validateGeneratedProgram } from './program-validation'
import { adaptDayToDuration } from './workout'
import type { ProgramFormData, GeneratedProgram, WorkoutDay } from './program-types'

const preferred = ['barbell-bench-press', 'dumbbell-bench-press', 'push-up', 'barbell-back-squat', 'dumbbell-goblet-squat', 'walking-lunge', 'bent-over-barbell-row', 'one-arm-dumbbell-row', 'seated-cable-row', 'lat-pulldown', 'seated-dumbbell-shoulder-press', 'dumbbell-romanian-deadlift', 'romanian-deadlift', 'plank']
const cycles = {
  full_body: [{ focus: 'Corps entier', groups: ['Quadriceps', 'Chest', 'Back', 'Hamstrings', 'Shoulders', 'Core'] }],
  upper_lower: [
    { focus: 'Haut du corps', groups: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps'] },
    { focus: 'Bas du corps', groups: ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves', 'Core'] }
  ],
  push_pull_legs: [
    { focus: 'Poussée', groups: ['Chest', 'Shoulders', 'Triceps'] },
    { focus: 'Tirage', groups: ['Back', 'Biceps', 'Forearms'] },
    { focus: 'Jambes', groups: ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves'] }
  ]
}

function matchesGroup(exercise: Exercise, group: string) {
  const muscles: readonly string[] = muscleFilterGroups.find(g => g.label === group)?.values || [group]
  return muscles.includes(exercise.muscles[0] || '')
}

export function generateProgram(form: ProgramFormData): GeneratedProgram {
  if (form.additionalNotes?.trim()) throw new Error('Les notes libres ne sont pas interprétées. Utilise les choix de matériel et les zones à exclure.')
  const settings = settingsFromForm(form)
  const split = form.splitPreference === 'auto' ? (form.daysPerWeek <= 3 ? 'full_body' : form.daysPerWeek === 4 ? 'upper_lower' : 'push_pull_legs') : form.splitPreference
  const cycle = cycles[split]
  const pool = exercises.filter(exercise => isExerciseAllowed(exercise, settings)).sort((a, b) => {
    const rank = (ex: Exercise) => { const index = preferred.indexOf(ex.id); return index < 0 ? 100 : index }
    return rank(a) - rank(b) || a.id.localeCompare(b.id)
  })
  const strength = form.goals[0] === 'strength'
  const schedule: WorkoutDay[] = Array.from({ length: form.daysPerWeek }, (_, index) => {
    const template = cycle[index % cycle.length]!
    const selected: Exercise[] = []
    const priorityMuscles = form.focusAreas.flatMap(area => [...(muscleFilterGroups.find(group => group.label === area)?.values || [area])])
    const prioritised = (group: string) => (muscleFilterGroups.find(item => item.label === group)?.values || [group]).some(muscle => priorityMuscles.includes(muscle))
    const groups = [...template.groups]
    // Full-body sessions can include an arm priority; split sessions keep their own scope.
    if (split === 'full_body' && form.focusAreas.includes('Arms')) groups.push('Biceps', 'Triceps')
    groups.sort((a, b) => Number(prioritised(b)) - Number(prioritised(a)))
    for (const group of groups) {
      const candidates = pool.filter(ex => matchesGroup(ex, group) && !selected.includes(ex))
      const candidate = candidates.find(ex => !selected.some(existing => movementPattern(existing) === movementPattern(ex))) || candidates[0]
      if (candidate) selected.push(candidate)
    }
    for (const candidate of pool) {
      if (selected.length >= 5) break
      if (!selected.includes(candidate) && groups.some(group => matchesGroup(candidate, group)) && !selected.some(existing => movementPattern(existing) === movementPattern(candidate))) selected.push(candidate)
    }
    if (!selected.length) throw new Error('Aucun exercice ne correspond à ces contraintes pour une des séances. Modifie la répartition ou crée ton programme manuellement ; les exclusions restent prioritaires.')
    const repeats = form.daysPerWeek > cycle.length
    const day: WorkoutDay = {
      id: `session-${index + 1}`, day: `Séance ${index + 1}`,
      focus: `${template.focus}${repeats ? ` ${String.fromCharCode(65 + Math.floor(index / cycle.length))}` : ''}`,
      exercises: selected.map(ex => ({ exerciseId: ex.id, name: ex.name, sets: 3, reps: movementPattern(ex) === 'isometric' ? '30 s' : strength ? '5-8' : '8-12', rest: strength ? '120s' : '90s' }))
    }
    return adaptDayToDuration(day, form.sessionDuration).day
  })
  const goal = strength ? 'Gagner en force' : form.goals[0] === 'muscle_building' ? 'Construire du muscle' : 'Entretenir ma forme'
  return validateGeneratedProgram({
    name: form.name.trim() || `Programme · ${form.daysPerWeek} séances`, goal, schedule, settings,
    tips: [
      'Commence par quelques minutes d’échauffement et des séries de préparation adaptées aux mouvements.',
      'Conserve les mêmes exercices pour comparer tes charges et répétitions entre les séances.',
      'Note seulement les séries réalisées. Adapte la charge à ta maîtrise du mouvement.',
      'Prends le temps de récupérer entre les séances. Une douleur inhabituelle est une raison d’arrêter le mouvement.'
    ]
  }, form)
}
