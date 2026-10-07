const { test } = require('node:test')
const assert = require('node:assert/strict')
const { generateProgram } = require('../app/utils/program-generator.ts')
const { formSchema, exerciseSchema, validateGeneratedProgram, safeRedirect } = require('../app/utils/program-validation.ts')
const { findExercise, gymEquipment, matchesExercise, isExerciseAllowed, replacementsFor, requiredEquipment } = require('../app/utils/exercise-helpers.ts')
const { createWorkout, createWorkoutExercise, adaptDayToDuration, estimateMinutes, finishWorkout, completedSets, elapsedSeconds, nextDayIndex, previousPerformance, restSeconds, workoutSchema } = require('../app/utils/workout.ts')
const { parseTrainingData, emptyTrainingData, storageKey, mergeWorkouts } = require('../app/utils/training-storage.ts')

const form = (overrides = {}) => ({ name: '', goals: ['muscle_building'], experience: 'beginner', scheduleType: 'weekly', daysPerWeek: 3, sessionDuration: 45, splitPreference: 'auto', equipment: [...gymEquipment], focusAreas: [], excludeAreas: [], additionalNotes: '', useAi: false, ...overrides })
const saved = (overrides = {}) => ({ ...generateProgram(form()), id: 'local-test', isActive: true, source: 'fallback', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), ...overrides })

test('duration includes a 20 percent buffer without altering actual session timing', () => {
  // 5 min warm-up + 3 x 30 s work + 2 x 60 s rest + 45 s transition = 555 s.
  const day = { day: '1', focus: 'Test', exercises: [{ name: 'Push-Up', sets: 3, reps: '10', rest: '60s' }] }
  assert.equal(estimateMinutes(day), Math.ceil(555 * 1.2 / 60))
  const workout = createWorkout(saved(), 0, day, [])
  workout.startedAt = new Date(0).toISOString()
  workout.exercises[0].sets[0].done = true
  assert.equal(finishWorkout(workout, 600000).durationSeconds, 600)
})

test('generated sessions fit the requested duration with the buffer included', () => {
  for (const sessionDuration of [20, 30, 45, 60, 90]) {
    for (const equipment of [['bodyweight'], ['dumbbell', 'bodyweight'], gymEquipment]) {
      for (const goal of ['strength', 'muscle_building']) {
        const program = generateProgram(form({ sessionDuration, equipment, goals: [goal] }))
        assert.ok(program.schedule.every(day => estimateMinutes(day) <= sessionDuration))
      }
    }
  }
})

test('programs are stable and respect every equipment, level and exclusion constraint', () => {
  for (const equipment of [['bodyweight'], ['dumbbell', 'bodyweight'], gymEquipment]) {
    for (const experience of ['beginner', 'intermediate', 'advanced']) {
      const preferences = form({ equipment, experience, excludeAreas: ['Arms'] })
      const a = generateProgram(preferences)
      assert.deepEqual(a, generateProgram(preferences))
      assert.equal(a.schedule.length, 3)
      for (const day of a.schedule) {
        assert.ok(day.exercises.length > 0)
        assert.equal(new Set(day.exercises.map(ex => ex.name)).size, day.exercises.length)
        assert.ok(day.exercises.every(ex => isExerciseAllowed(findExercise(ex.name), a.settings)))
      }
    }
  }
})

test('invalid requests, personal notes, excessive days and contradictory exclusions are rejected', () => {
  for (const change of [{ additionalNotes: 'injury details' }, { daysPerWeek: 14 }, { sessionDuration: NaN }, { goals: [] }, { equipment: ['not-a-real-machine'] }, { excludeAreas: ['Chest'], focusAreas: ['Chest'] }]) assert.equal(formSchema.safeParse(form(change)).success, false)
  assert.throws(() => generateProgram(form({ additionalNotes: 'notes' })))
  assert.throws(() => generateProgram(form({ excludeAreas: ['Chest', 'Back', 'Shoulders', 'Arms', 'Core', 'Legs', 'Full Body'] })))
})

test('unknown exercises, unavailable equipment and unreasonable series never enter a generated plan', () => {
  const preferences = form({ equipment: ['bodyweight'] })
  for (const change of [{ name: 'Invented Exercise' }, { name: 'Barbell Bench Press' }, { sets: 999 }]) {
    const program = generateProgram(preferences)
    Object.assign(program.schedule[0].exercises[0], change)
    assert.throws(() => validateGeneratedProgram(program, preferences))
  }
})

test('hidden supporting equipment is checked for benches and pull-up bars', () => {
  assert.ok(requiredEquipment(findExercise('Barbell Bench Press')).includes('bench'))
  assert.ok(requiredEquipment(findExercise('Chin-Up')).includes('pull-up-bar'))
  assert.equal(isExerciseAllowed(findExercise('Chin-Up'), { equipment: ['bodyweight'], experience: 'advanced', excludeAreas: [] }), false)
})

test('duration adaptation preserves order, rests and the original plan', () => {
  const original = saved().schedule[0]
  const before = structuredClone(original)
  const result = adaptDayToDuration(original, 20)
  assert.deepEqual(original, before)
  assert.ok(result.day.exercises.length >= 2)
  assert.equal(result.fits, estimateMinutes(result.day) <= 20)
  assert.equal(result.removedSets, original.exercises.reduce((sum, ex) => sum + ex.sets, 0) - result.day.exercises.reduce((sum, ex) => sum + ex.sets, 0))
  const positions = result.day.exercises.map(ex => original.exercises.findIndex(item => item.name === ex.name))
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b))
  for (const ex of result.day.exercises) assert.equal(ex.rest, original.exercises.find(item => item.name === ex.name).rest)
  assert.throws(() => adaptDayToDuration(original, -1))
})

test('replacements preserve the movement, equipment and do not duplicate a planned exercise', () => {
  const original = findExercise('Barbell Bench Press')
  const settings = { equipment: ['dumbbell', 'bench', 'bodyweight'], excludeAreas: [], experience: 'advanced', sessionDuration: 45, daysPerWeek: 3 }
  const alternatives = replacementsFor(original, settings, ['Dumbbell Bench Press'])
  assert.ok(alternatives.length > 0)
  assert.ok(alternatives.every(ex => ex.name !== 'Dumbbell Bench Press' && ex.name !== original.name && isExerciseAllowed(ex, settings)))
})

test('exercise search handles punctuation, accents and French muscle names', () => {
  const pushUp = findExercise('Push-Up')
  assert.equal(matchesExercise(pushUp, 'push up'), true)
  assert.equal(matchesExercise(pushUp, 'pompes'), true)
  assert.equal(matchesExercise(findExercise('Dumbbell Lateral Raise'), 'epaules'), true)
})

test('an empty session cannot be completed and unchecked sets do not count', () => {
  const program = saved()
  const workout = createWorkout(program, 0, program.schedule[0], [])
  assert.throws(() => finishWorkout(workout))
  workout.exercises[0].sets[0].done = true
  workout.exercises[0].sets[0].weight = 12.5
  const finished = finishWorkout(workout)
  assert.equal(completedSets(finished), 1)
  assert.ok(workoutSchema.safeParse(finished).success)
  assert.equal(workout.completedAt, null)
})

test('completed sessions survive serialization and cannot accept invalid logged numbers', () => {
  const program = saved()
  const workout = createWorkout(program, 0, program.schedule[0], [])
  workout.exercises[0].sets[0].done = true
  const data = emptyTrainingData()
  data.programs = [program]
  data.workouts = [finishWorkout(workout)]
  data.draft = createWorkout(program, 1, program.schedule[1], data.workouts)
  assert.deepEqual(parseTrainingData(JSON.stringify(data)), data)
  data.workouts[0].exercises[0].sets[0].weight = -1
  assert.throws(() => parseTrainingData(JSON.stringify(data)))
})

test('pauses and restored timers use timestamps rather than interval ticks', () => {
  const program = saved()
  const workout = createWorkout(program, 0, program.schedule[0], [])
  workout.startedAt = new Date(100000).toISOString()
  workout.pausedAt = 160000
  workout.pausedSeconds = 10
  assert.equal(elapsedSeconds(workout, 900000), 50)
  workout.pausedAt = null
  assert.equal(elapsedSeconds(workout, 200000), 90)
  assert.equal(restSeconds('1.5 min'), 90)
  assert.equal(restSeconds('60-90s'), 90)
})

test('next session follows completion order, ignores other programs and handles edited schedules', () => {
  const program = saved()
  const workout = createWorkout(program, 0, program.schedule[0], [])
  workout.exercises[0].sets[0].done = true
  const history = [finishWorkout(workout)]
  assert.equal(nextDayIndex(program, history), 1)
  assert.equal(nextDayIndex({ ...program, id: 'another' }, history), 0)
  assert.equal(nextDayIndex({ ...program, schedule: program.schedule.slice(1) }, history), 0)
})

test('history prefill uses this exercise only and keeps timed work in seconds', () => {
  const program = saved()
  const workout = createWorkout(program, 0, program.schedule[0], [])
  const ex = workout.exercises[0]
  ex.sets[0] = { ...ex.sets[0], weight: 30, reps: 11, done: true }
  const history = [finishWorkout(workout)]
  const next = createWorkoutExercise(program.schedule[0].exercises[0], history)
  assert.equal(next.sets[0].weight, 30)
  assert.equal(next.sets[0].done, false)
  const plank = createWorkoutExercise({ name: 'Plank', sets: 2, reps: '30 s', rest: '60s' }, history)
  assert.equal(plank.unit, 'seconds')
  assert.equal(plank.sets[0].weight, null)
  assert.equal(previousPerformance(history, 'Unknown'), null)
})

test('storage is isolated by account and pending deletes cannot be resurrected by sync', () => {
  assert.notEqual(storageKey(null), storageKey('account-a'))
  assert.notEqual(storageKey('account-a'), storageKey('account-b'))
  const program = saved(); const workout = createWorkout(program, 0, program.schedule[0], [])
  workout.exercises[0].sets[0].done = true
  const row = finishWorkout(workout)
  assert.equal(mergeWorkouts([row], [row], [], [row.id]).length, 0)
  assert.equal(mergeWorkouts([row], [], [], []).length, 0, 'a deletion on another device stays deleted')
  assert.equal(mergeWorkouts([row], [], [row.id], []).length, 1, 'an offline session stays queued')
  const pending = { ...row, notes: 'local note' }
  assert.equal(mergeWorkouts([pending], [row], [row.id], [])[0].notes, 'local note')
})

test('authentication returns only to local pages', () => {
  assert.equal(safeRedirect('/program?restore=1'), '/program?restore=1')
  for (const url of ['https://example.org', '//example.org', '/\\example.org', '/\nexample.org', ['//example.org']]) assert.equal(safeRedirect(url), '/')
})

test('a checked series cannot lose its recorded repetitions', () => {
  const program = saved(); const workout = createWorkout(program, 0, program.schedule[0], [])
  workout.exercises[0].sets[0].done = true
  workout.exercises[0].sets[0].reps = null
  assert.equal(workoutSchema.safeParse(workout).success, false)
  assert.throws(() => finishWorkout(workout))
})

test('priority groups influence exercise order, including grouped leg and arm muscles', () => {
  for (const [area, muscles] of [['Legs', ['Quadriceps', 'Hamstrings']], ['Arms', ['Biceps', 'Triceps']], ['Back', ['Back', 'Lats', 'Upper Back', 'Lower Back', 'Traps']]]) {
    const plan = generateProgram(form({ focusAreas: [area] }))
    assert.ok(muscles.includes(findExercise(plan.schedule[0].exercises[0].name).muscles[0]))
  }
})

test('manual doses reject impossible ranges and accept fractional rest minutes', () => {
  const base = { name: 'Push-Up', sets: 3, reps: '8-12', rest: '1.5 min' }
  assert.ok(exerciseSchema.safeParse(base).success)
  for (const change of [{ reps: '0' }, { reps: '12-8' }, { rest: '999 min' }, { rest: '90-30s' }]) assert.equal(exerciseSchema.safeParse({ ...base, ...change }).success, false)
})
