import type { Ref } from 'vue'
import type { EditableDay, EditableProgramExercise } from '~/utils/program-editor-types'
import type { ProgramExercise } from '~/utils/program-types'

function renumberDays(schedule: EditableDay[]) {
  schedule.forEach((day, index) => {
    day.day = `Day ${index + 1}`
  })
}

export function useProgramEditor(schedule: Ref<EditableDay[]>) {
  function addDay() {
    schedule.value.push({ day: '', focus: '', notes: '', exercises: [] })
    renumberDays(schedule.value)
  }

  function removeDay(dayIndex: number) {
    schedule.value.splice(dayIndex, 1)
    renumberDays(schedule.value)
  }

  function addExercise(dayIndex: number, exercise: ProgramExercise) {
    const day = schedule.value[dayIndex]
    if (!day) return
    const editableExercise: EditableProgramExercise = { ...exercise, id: crypto.randomUUID() }
    day.exercises.push(editableExercise)
  }

  function removeExercise(dayIndex: number, exerciseId: string) {
    const day = schedule.value[dayIndex]
    if (!day) return
    day.exercises = day.exercises.filter(ex => ex.id !== exerciseId)
  }

  function moveExercise(dayIndex: number, exerciseId: string, direction: 'up' | 'down') {
    const day = schedule.value[dayIndex]
    if (!day) return
    const index = day.exercises.findIndex(ex => ex.id === exerciseId)
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (index === -1 || targetIndex < 0 || targetIndex >= day.exercises.length) return
    const [exercise] = day.exercises.splice(index, 1)
    day.exercises.splice(targetIndex, 0, exercise)
  }

  function updateDayFocus(dayIndex: number, value: string) {
    const day = schedule.value[dayIndex]
    if (day) day.focus = value
  }

  function updateDayNotes(dayIndex: number, value: string) {
    const day = schedule.value[dayIndex]
    if (day) day.notes = value
  }

  function updateExercise(dayIndex: number, exerciseId: string, patch: Partial<Pick<EditableProgramExercise, 'sets' | 'reps' | 'rest'>>) {
    const day = schedule.value[dayIndex]
    const exercise = day?.exercises.find(ex => ex.id === exerciseId)
    if (exercise) Object.assign(exercise, patch)
  }

  return { addDay, removeDay, addExercise, removeExercise, moveExercise, updateDayFocus, updateDayNotes, updateExercise }
}
