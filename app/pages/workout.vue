<script setup lang="ts">
import type { SavedProgram } from '~/utils/program-editor-types'
import type { ProgramExercise } from '~/utils/program-types'
import type { Exercise } from '~/utils/exercises'
import { findExercise, focusLabel, label, replacementsFor } from '~/utils/exercise-helpers'
import { adaptDayToDuration, estimateMinutes, createWorkout, createWorkoutExercise, completedSets, totalSets, elapsedSeconds, formatDuration, previousPerformance, progressionHint, nextDayIndex, settingsForProgram, type LoggedSet } from '~/utils/workout'
const route = useRoute()
const store = useTrainingStore()
const { data } = store
const { get, list } = usePrograms()
const workouts = useWorkouts()
const program = ref<SavedProgram | null>(null)
const dayIndex = ref(0)
const loading = ref(true)
const error = ref('')
const minutes = ref<number | null>(null)
const overrides = ref<Record<string, Exercise>>({})
const session = computed(() => data.value.draft)
const original = computed(() => program.value?.schedule[dayIndex.value])
const originalWithReplacements = computed(() => original.value ? { ...original.value, exercises: original.value.exercises.map(ex => overrides.value[ex.name] ? { ...ex, name: overrides.value[ex.name]!.name, exerciseId: overrides.value[ex.name]!.id } : { ...ex }) } : null)
const adapted = computed(() => originalWithReplacements.value && minutes.value ? adaptDayToDuration(originalWithReplacements.value, minutes.value) : null)
const preview = computed(() => adapted.value?.day || originalWithReplacements.value)
const now = ref(Date.now())
const restLeft = computed(() => session.value?.restEndsAt ? Math.max(0, Math.ceil((session.value.restEndsAt - now.value) / 1000)) : 0)
const done = computed(() => session.value ? completedSets(session.value) : 0)
const total = computed(() => session.value ? totalSets(session.value) : 0)
const elapsed = computed(() => session.value ? elapsedSeconds(session.value, now.value) : 0)
const finishing = ref(false)
const finishOpen = ref(false)
const discardOpen = ref(false)
const detail = ref<Exercise | null>(null)
const detailOpen = ref(false)
const replacing = ref<{ name: string, index: number } | null>(null)
const replacementOpen = ref(false)
const replacementEquipment = ref('all')
const replacementSettings = computed(() => session.value?.settings || (program.value ? settingsForProgram(program.value) : null))
const alternatives = computed(() => {
  if (!replacing.value || !replacementSettings.value) return []
  const originalExercise = findExercise(replacing.value.name)
  if (!originalExercise) return []
  const names = session.value?.exercises.map(ex => ex.name) || preview.value?.exercises.map(ex => ex.name) || []
  return replacementsFor(originalExercise, replacementSettings.value, names).filter(ex => replacementEquipment.value === 'all' || ex.equipment === replacementEquipment.value).slice(0, 8)
})
let timer: ReturnType<typeof setInterval> | undefined
onMounted(async () => {
  timer = setInterval(() => { now.value = Date.now() }, 1000)
  try {
    if (!session.value) {
      if (typeof route.query.program === 'string') program.value = await get(route.query.program)
      else { const programs = await list(); program.value = programs.find(p => p.isActive) || programs[0] || null }
      if (program.value) {
        const queryIndex = Number(route.query.day)
        dayIndex.value = route.query.day !== undefined && Number.isInteger(queryIndex) && queryIndex >= 0 && queryIndex < program.value.schedule.length ? queryIndex : nextDayIndex(program.value, data.value.workouts)
      }
    }
  } catch { error.value = 'La séance n’a pas pu être chargée. Réessaie depuis tes programmes.' }
  finally { loading.value = false }
})
onBeforeUnmount(() => clearInterval(timer))
function start() {
  if (!program.value || !preview.value?.exercises.length || session.value) return
  const adaptation = adapted.value && (adapted.value.removedSets || adapted.value.removedExercises.length) ? `Format ${minutes.value} min : ${adapted.value.removedSets} série(s) retirée(s) au total, dont ${adapted.value.removedExercises.length} exercice(s) complet(s). Temps de repos conservés.` : null
  data.value.draft = createWorkout(program.value, dayIndex.value, preview.value, data.value.workouts, adaptation)
  for (const exercise of data.value.draft.exercises) {
    const replaced = Object.entries(overrides.value).find(([, replacement]) => replacement.name === exercise.name)
    if (replaced) exercise.originalName = replaced[0]
  }
  store.persist()
  now.value = Date.now()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
function openDetail(name: string) { detail.value = findExercise(name) || null; detailOpen.value = !!detail.value }
function openReplacement(name: string, index: number) { replacing.value = { name, index }; replacementEquipment.value = 'all'; replacementOpen.value = true }
function replace(exercise: Exercise) {
  if (!replacing.value) return
  const { index, name } = replacing.value
  if (session.value) {
    const old = session.value.exercises[index]
    if (!old || old.sets.some(set => set.done)) return
    const plan: ProgramExercise = { name: exercise.name, exerciseId: exercise.id, sets: old.sets.length, reps: old.targetReps, rest: `${old.restSeconds}s` }
    session.value.exercises[index] = { ...createWorkoutExercise(plan, data.value.workouts), originalName: old.originalName || name }
  } else {
    const previousKey = Object.entries(overrides.value).find(([, value]) => value.name === name)?.[0]
    overrides.value[previousKey || name] = exercise
  }
  replacementOpen.value = false
  store.persist()
}
function setNumber(set: LoggedSet, key: 'weight' | 'reps', event: Event) {
  const value = (event.target as HTMLInputElement).value
  const number = value === '' ? null : Number(value)
  const valid = number === null || (Number.isFinite(number) && number >= (key === 'reps' ? 1 : 0) && number <= (key === 'reps' ? 3600 : 2000) && (key === 'weight' || Number.isInteger(number)))
  set[key] = valid ? number : null
  error.value = valid ? '' : 'Vérifie la valeur saisie avant de valider cette série.'
}
function toggleSet(set: LoggedSet, rest: number) {
  if (!session.value || session.value.pausedAt) return
  if (set.done) { set.done = false; session.value.restEndsAt = null; return }
  if (set.reps === null || set.reps < 1) { error.value = 'Indique les répétitions ou la durée réellement effectuées.'; return }
  error.value = ''; set.done = true
  now.value = Date.now()
  session.value.restEndsAt = now.value + rest * 1000
  store.persist()
}
function pause() {
  if (!session.value) return
  if (session.value.pausedAt) { session.value.pausedSeconds += Math.floor((Date.now() - session.value.pausedAt) / 1000); session.value.pausedAt = null }
  else { session.value.pausedAt = Date.now(); session.value.restEndsAt = null }
  now.value = Date.now(); store.persist()
}
function extendRest() { if (session.value) session.value.restEndsAt = Math.max(Date.now(), session.value.restEndsAt || 0) + 30000 }
function skipRest() { if (session.value) session.value.restEndsAt = null }
function setEffort(value: 'easy' | 'right' | 'hard') { if (session.value) session.value.effort = value }
async function finish() {
  if (finishing.value) return
  finishing.value = true
  try { const result = workouts.finish(); if (result) { finishOpen.value = false; await navigateTo(`/progress?session=${result.id}&finished=1`) } }
  catch (failure) { error.value = failure instanceof Error ? failure.message : 'Vérifie les valeurs de ta séance.'; finishOpen.value = false }
  finally { finishing.value = false }
}
function discard() { data.value.draft = null; store.persist(); navigateTo('/') }
useHead({ title: 'Ma séance · FitForge' })
</script>

<template>
  <div class="ff-page ff-fade max-w-5xl ff-workout-page">
    <div v-if="loading" class="py-24 text-center" role="status"><UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-primary" /><p class="text-sm text-muted mt-3">Chargement de ta séance…</p></div>
    <template v-else-if="session">
      <div class="flex justify-between gap-3 items-start"><div><p class="ff-eyebrow mb-3">{{ session.pausedAt ? 'SÉANCE EN PAUSE' : 'SÉANCE EN COURS' }}</p><h1 class="ff-title">{{ focusLabel(session.focus) }}</h1><p class="text-sm text-muted mt-2">{{ session.programName }}</p></div><UButton :icon="session.pausedAt ? 'i-lucide-play' : 'i-lucide-pause'" :label="session.pausedAt ? 'Reprendre' : 'Pause'" color="neutral" variant="outline" @click="pause" /></div>
      <div class="ff-panel p-4 sm:p-5 mt-6 sticky top-0 z-20 shadow-sm"><div class="flex justify-between gap-4 text-sm mb-3"><p><strong>{{ done }}</strong><span class="text-muted"> / {{ total }} séries</span></p><p class="ff-number flex items-center gap-2"><UIcon name="i-lucide-clock-3" class="size-4 text-muted" />{{ formatDuration(elapsed) }}</p></div><div class="ff-progress" role="progressbar" :aria-valuenow="done" :aria-valuemax="total" aria-label="Séries réalisées"><span :style="{ width: `${total ? done / total * 100 : 0}%` }" /></div><div v-if="session.restEndsAt" class="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-default"><div class="flex items-center gap-2"><UIcon name="i-lucide-timer" class="size-5 text-primary" /><span class="text-sm">{{ restLeft > 0 ? 'Repos' : 'Repos terminé' }}</span><strong v-if="restLeft > 0" class="text-xl ff-number ml-1">{{ formatDuration(restLeft) }}</strong></div><div class="flex gap-1"><UButton label="+ 30 s" color="neutral" variant="ghost" @click="extendRest" /><UButton :label="restLeft > 0 ? 'Passer' : 'Continuer'" color="neutral" variant="outline" @click="skipRest" /></div></div></div>
      <UAlert v-if="session.pausedAt" title="Séance en pause" description="Le chronomètre est arrêté. Les séries sont sauvegardées." color="neutral" class="mt-4" />
      <p v-if="session.adaptation" class="text-xs text-muted mt-4 flex gap-2"><UIcon name="i-lucide-sliders-horizontal" class="size-4 shrink-0" />{{ session.adaptation }}</p>
      <UAlert v-if="error" :description="error" color="error" class="mt-4" role="alert" />
      <div class="space-y-5 mt-6">
        <section v-for="(exercise, index) in session.exercises" :key="exercise.id" class="ff-panel overflow-hidden">
          <div class="p-5 sm:p-6 border-b border-default"><div class="flex items-start gap-3"><span class="text-xs text-muted ff-number mt-1">{{ String(index + 1).padStart(2, '0') }}</span><div class="min-w-0 flex-1"><button class="text-left font-semibold text-base sm:text-lg hover:text-primary" @click="openDetail(exercise.name)">{{ exercise.name }}<UIcon name="i-lucide-info" class="size-4 ml-2 text-muted" /></button><p class="text-xs text-muted mt-2">Cible : {{ exercise.targetReps }}{{ exercise.unit === 'reps' ? ' rép.' : '' }} · Repos {{ exercise.restSeconds }} s</p><p v-if="exercise.originalName" class="text-xs text-primary mt-2">Remplace {{ exercise.originalName }} pour cette séance.</p></div><UButton icon="i-lucide-repeat-2" color="neutral" variant="ghost" :disabled="exercise.sets.some(set => set.done) || !!session.pausedAt" :aria-label="`Remplacer ${exercise.name}`" @click="openReplacement(exercise.name, index)" /></div><p v-if="progressionHint(exercise, data.workouts)" class="text-xs text-muted mt-4 leading-relaxed">{{ progressionHint(exercise, data.workouts) }}</p></div>
          <div class="p-4 sm:px-6"><div class="grid grid-cols-[28px_1fr_1fr_46px] sm:grid-cols-[42px_1fr_1fr_52px] gap-2 text-[11px] uppercase tracking-wider text-muted pb-3"><span>Série</span><span class="text-center">Charge · kg</span><span class="text-center">{{ exercise.unit === 'seconds' ? 'Durée · s' : 'Répétitions' }}</span><span class="sr-only">Valider</span></div><div v-for="(set, setIndex) in exercise.sets" :key="set.id" class="grid grid-cols-[28px_1fr_1fr_46px] sm:grid-cols-[42px_1fr_1fr_52px] gap-2 items-center py-1.5" :class="{ 'opacity-65': set.done }"><span class="text-sm text-muted text-center ff-number">{{ setIndex + 1 }}</span><input :value="set.weight" type="number" inputmode="decimal" min="0" max="2000" step="any" placeholder="—" class="ff-field text-center ff-number min-w-0" :aria-label="`Charge en kg, ${exercise.name}, série ${setIndex + 1}`" :disabled="set.done || !!session.pausedAt" @input="setNumber(set, 'weight', $event)" /><input :value="set.reps" type="number" inputmode="numeric" min="1" max="3600" step="1" class="ff-field text-center ff-number min-w-0" :aria-label="`${exercise.unit === 'seconds' ? 'Durée en secondes' : 'Répétitions'}, ${exercise.name}, série ${setIndex + 1}`" :disabled="set.done || !!session.pausedAt" @input="setNumber(set, 'reps', $event)" /><button class="min-h-11 rounded-xl border flex items-center justify-center" :class="set.done ? 'bg-primary border-primary text-inverted' : 'border-default bg-muted hover:border-primary'" :aria-label="`${set.done ? 'Annuler' : 'Valider'} la série ${setIndex + 1} de ${exercise.name}`" :aria-pressed="set.done" :disabled="!!session.pausedAt" @click="toggleSet(set, exercise.restSeconds)"><UIcon name="i-lucide-check" class="size-5" /></button></div><p v-if="previousPerformance(data.workouts, exercise.name)" class="text-xs text-muted mt-3">Valeurs de la dernière séance. Modifie-les selon les séries réalisées.</p><p v-else class="text-xs text-muted mt-3">La charge est facultative. Valide chaque série après l’avoir réalisée.</p></div>
        </section>
      </div>
      <div class="mt-7"><div class="ff-workout-action"><UButton label="Terminer ma séance" icon="i-lucide-check-check" block size="xl" :disabled="done === 0 || finishing" @click="() => { finishOpen = true }" /></div><p v-if="done === 0" class="text-xs text-muted text-center mt-3">Valide une première série pour enregistrer ta séance.</p><div class="flex justify-between items-center flex-wrap gap-4 mt-5"><StorageStatus /><UButton label="Abandonner la séance" color="neutral" variant="ghost" @click="() => { discardOpen = true }" /></div></div>
    </template>
    <template v-else-if="program && preview?.exercises.length">
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm text-muted mb-6"><UIcon name="i-lucide-arrow-left" class="size-4" />Aujourd’hui</NuxtLink><p class="ff-eyebrow mb-3">SÉANCE {{ dayIndex + 1 }} · {{ program.name }}</p><h1 class="ff-title">{{ focusLabel(preview.focus) }}</h1>
      <div class="ff-panel ff-panel-pad mt-7"><div class="flex items-center gap-3"><UIcon name="i-lucide-clock-3" class="size-5 text-primary" /><h2 class="font-semibold">Temps disponible</h2></div><div class="flex flex-wrap gap-2 mt-4"><button class="ff-option text-sm" :aria-pressed="minutes === null" @click="() => { minutes = null }">Séance complète</button><button v-for="duration in [20, 30, 45]" :key="duration" class="ff-option text-sm" :aria-pressed="minutes === duration" @click="() => { minutes = duration }">{{ duration }} min</button></div><p class="text-sm text-muted mt-4">{{ preview.exercises.length }} exercices · environ {{ estimateMinutes(preview) }} min, échauffement compris.</p><p v-if="adapted && (adapted.removedSets || adapted.removedExercises.length)" class="text-sm text-primary mt-3">{{ adapted.removedSets }} série(s) retirée(s) au total, dont {{ adapted.removedExercises.length }} exercice(s) complet(s). Les temps de repos sont conservés et le programme d’origine reste intact.</p><p v-else-if="minutes" class="text-xs text-muted mt-3">La séance tient dans ce créneau.</p><UAlert v-if="adapted && !adapted.fits" color="warning" class="mt-3" description="Ce format reste plus long que le temps demandé. Choisis un créneau plus grand ou une autre séance." /></div>
      <div class="ff-panel mt-5 divide-y divide-default"><div v-for="(exercise, index) in preview.exercises" :key="exercise.name" class="p-5 flex gap-3 items-center"><span class="text-xs text-muted ff-number">{{ String(index + 1).padStart(2, '0') }}</span><button class="flex-1 text-left min-w-0" @click="openDetail(exercise.name)"><span class="block font-semibold text-sm">{{ exercise.name }}</span><span class="block text-xs text-muted mt-1">{{ exercise.sets }} séries · {{ exercise.reps }} · {{ exercise.rest }} repos</span></button><UButton icon="i-lucide-repeat-2" color="neutral" variant="ghost" :aria-label="`Remplacer ${exercise.name}`" @click="openReplacement(exercise.name, index)" /></div></div>
      <p class="text-xs text-muted mt-4 flex gap-2"><UIcon name="i-lucide-info" class="size-4 shrink-0" />Les remplacements s’appliquent à cette séance uniquement.</p>
      <div class="ff-workout-action mt-7"><UButton label="Commencer ma séance" trailing-icon="i-lucide-play" size="xl" block :disabled="adapted?.fits === false" @click="start" /></div>
    </template>
    <div v-else class="ff-panel ff-empty"><UIcon name="i-lucide-notebook-tabs" class="size-9 text-muted mb-4" /><h1 class="text-xl font-semibold">Aucune séance disponible</h1><p class="text-sm text-muted mt-3">{{ error || 'Choisis un programme avec au moins un exercice pour commencer.' }}</p><UButton to="/programs" label="Mes programmes" class="mt-5" /></div>
    <UModal v-model:open="replacementOpen" title="Remplacer l’exercice" description="Même type de mouvement, selon le matériel et les exclusions de ton programme."><template #body><label class="block text-sm font-semibold">Matériel à utiliser<select v-model="replacementEquipment" class="ff-field mt-2"><option value="all">Tout mon matériel disponible</option><option v-for="equipment in replacementSettings?.equipment" :key="equipment" :value="equipment">{{ label(equipment) }}</option></select></label><div class="space-y-2 mt-5"><button v-for="alternative in alternatives" :key="alternative.id" class="ff-option w-full flex justify-between items-center gap-3" @click="replace(alternative)"><span><span class="block font-semibold text-sm">{{ alternative.name }}</span><span class="block text-xs text-muted mt-1">{{ label(alternative.equipment) }} · {{ label(alternative.difficulty) }}</span></span><UIcon name="i-lucide-arrow-right" class="size-4 shrink-0" /></button><p v-if="!alternatives.length" class="text-sm text-muted py-6">Aucun remplacement compatible. Laisse les séries non réalisées décochées.</p></div><p class="text-xs text-muted mt-5">La charge précédente n’est pas transférée. Seules tes performances sur cet exercice seront proposées.</p></template></UModal>
    <UModal v-model:open="finishOpen" title="Terminer la séance" description="Vérifie les séries réalisées avant d’enregistrer."><template #body><div v-if="session"><div class="flex gap-6 mb-6"><div><p class="ff-stat">{{ done }}</p><p class="text-xs text-muted">séries réalisées</p></div><div><p class="ff-stat">{{ elapsed < 60 ? '< 1' : Math.round(elapsed / 60) }}</p><p class="text-xs text-muted">minutes</p></div></div><UAlert v-if="done < total" color="neutral" class="mb-5" :description="`${done} séries sur ${total} ont été validées. Seules ces séries seront comptabilisées ; la prochaine séance du programme sera ensuite proposée.`" /><fieldset><legend class="text-sm font-semibold mb-3">Difficulté ressentie</legend><div class="flex gap-2"><button v-for="choice in [{ value: 'easy', label: 'Facile' }, { value: 'right', label: 'Bien dosée' }, { value: 'hard', label: 'Difficile' }] as const" :key="choice.value" class="ff-option flex-1 text-sm text-center" :aria-pressed="session.effort === choice.value" @click="setEffort(choice.value)">{{ choice.label }}</button></div></fieldset><label class="block text-sm font-semibold mt-5">Notes <span class="text-muted font-normal">· facultatif</span><textarea v-model="session.notes" class="ff-field mt-2" rows="3" maxlength="1000" placeholder="Ex. : hauteur du siège" /></label></div></template><template #footer><UButton label="Revenir à ma séance" color="neutral" variant="outline" :disabled="finishing" @click="() => { finishOpen = false }" /><UButton label="Enregistrer la séance" :loading="finishing" @click="finish" /></template></UModal>
    <ConfirmDialog v-model:open="discardOpen" title="Abandonner cette séance ?" description="Les séries de cette séance en cours seront supprimées. Tes séances déjà terminées sont conservées." confirm-label="Abandonner" @confirm="discard" />
    <ExerciseDetailModal v-model:open="detailOpen" :exercise="detail"><template #footer><UButton label="Fermer" color="neutral" variant="outline" @click="() => { detailOpen = false }" /></template></ExerciseDetailModal>
  </div>
</template>
