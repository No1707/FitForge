<script setup lang="ts">
import { toEditableSchedule, type SavedProgram, type EditableDay } from '~/utils/program-editor-types'
import { findExercise, focusLabel } from '~/utils/exercise-helpers'
import type { Exercise } from '~/utils/exercises'
import { estimateMinutes, nextDayIndex } from '~/utils/workout'
const route = useRoute()
const { data } = useTrainingStore()
const { get, updateSchedule, setActive } = usePrograms()
const program = ref<SavedProgram | null>(null)
const schedule = ref<EditableDay[]>([])
const editor = useProgramEditor(schedule)
const loading = ref(true)
const saving = ref(false)
const activating = ref(false)
const error = ref('')
const editing = ref(false)
const selected = ref(0)
const snapshot = ref('')
const dirty = computed(() => editing.value && JSON.stringify(schedule.value) !== snapshot.value)
const selectedDay = computed(() => schedule.value[selected.value])
const pickerOpen = ref(false)
const detail = ref<Exercise | null>(null)
const detailOpen = ref(false)
const deleted = ref<string | null>(null)
const leaveOpen = ref(false)
let resolveLeave: ((value: boolean) => void) | null = null
const previousState = ref<EditableDay[] | null>(null)
onMounted(async () => {
  try {
    program.value = await get(String(route.params.id))
    if (program.value) {
      schedule.value = toEditableSchedule(program.value.schedule)
      snapshot.value = JSON.stringify(schedule.value)
      selected.value = nextDayIndex(program.value, data.value.workouts)
      editing.value = route.query.edit === '1' || !schedule.value.some(day => day.exercises.length)
    }
  } catch { error.value = 'Ce programme ne peut pas être chargé pour le moment.' }
  finally { loading.value = false }
  window.addEventListener('beforeunload', beforeUnload)
})
onBeforeUnmount(() => { window.removeEventListener('beforeunload', beforeUnload); resolveLeave?.(false) })
function beforeUnload(event: BeforeUnloadEvent) { if (dirty.value) { event.preventDefault(); event.returnValue = '' } }
onBeforeRouteLeave(() => { if (!dirty.value) return true; leaveOpen.value = true; return new Promise<boolean>(resolve => { resolveLeave = resolve }) })
watch(leaveOpen, value => { if (!value && resolveLeave) { resolveLeave(false); resolveLeave = null } })
function leave() { const resolve = resolveLeave; resolveLeave = null; resolve?.(true) }
function reset() { schedule.value = JSON.parse(snapshot.value); editing.value = false; deleted.value = null; selected.value = Math.min(selected.value, Math.max(0, schedule.value.length - 1)); error.value = '' }
async function save() {
  if (!program.value || saving.value) return
  saving.value = true; error.value = ''
  try { await updateSchedule(program.value.id, schedule.value); program.value = { ...program.value, schedule: JSON.parse(JSON.stringify(schedule.value)) }; snapshot.value = JSON.stringify(schedule.value); editing.value = false; deleted.value = null }
  catch (failure) { error.value = failure instanceof Error ? failure.message : 'L’enregistrement a échoué. Tes modifications sont encore présentes ; réessaie.' }
  finally { saving.value = false }
}
async function activate() { if (!program.value) return; activating.value = true; error.value = ''; try { await setActive(program.value.id); program.value.isActive = true } catch { error.value = 'Ajoute des exercices puis réessaie d’activer ce programme.' } finally { activating.value = false } }
function remember() { previousState.value = JSON.parse(JSON.stringify(schedule.value)) }
function removeDay() { remember(); editor.removeDay(selected.value); selected.value = Math.max(0, selected.value - 1); deleted.value = 'Séance retirée du programme.' }
function removeExercise(id: string) { remember(); editor.removeExercise(selected.value, id); deleted.value = 'Exercice retiré de la séance.' }
function undo() { if (previousState.value) { schedule.value = previousState.value; previousState.value = null; selected.value = Math.min(selected.value, schedule.value.length - 1) }; deleted.value = null }
function addDay() { editor.addDay(); selected.value = schedule.value.length - 1 }
function addExercise(exercise: Exercise) { const added = editor.addExercise(selected.value, { exerciseId: exercise.id, name: exercise.name, sets: 3, reps: /plank|hold/i.test(exercise.name) ? '30 s' : '8-12', rest: '90s' }); if (added) { pickerOpen.value = false; error.value = '' } else error.value = 'Cet exercice est déjà présent dans cette séance.' }
function openDetail(name: string) { detail.value = findExercise(name) || null; detailOpen.value = !!detail.value }
useHead({ title: computed(() => `${program.value?.name || 'Programme'} · FitForge`) })
</script>
<template>
  <div class="ff-page max-w-5xl ff-fade"><NuxtLink to="/programs" class="text-sm text-muted inline-flex items-center gap-2 mb-6"><UIcon name="i-lucide-arrow-left" class="size-4" />Mes programmes</NuxtLink><div v-if="loading" class="py-20 text-center" role="status"><UIcon name="i-lucide-loader-circle" class="size-8 text-primary animate-spin" /></div><div v-else-if="!program" class="ff-panel ff-empty"><h1 class="text-xl font-semibold">Programme indisponible</h1><p class="text-sm text-muted mt-3">{{ error || 'Il a été supprimé ou appartient à un autre compte.' }}</p><UButton to="/programs" label="Mes programmes" class="mt-5" /></div>
    <template v-else><div class="flex flex-wrap justify-between items-start gap-5"><div><p class="ff-eyebrow mb-3">{{ program.isActive ? 'MON PROGRAMME ACTIF' : 'MON PROGRAMME' }}</p><h1 class="ff-title">{{ program.name }}</h1><p class="text-muted mt-3">{{ program.goal }} · {{ schedule.length }} séances</p></div><div v-if="!editing" class="flex flex-wrap gap-2"><UButton v-if="!program.isActive" label="Utiliser ce programme" color="neutral" variant="outline" :loading="activating" @click="activate" /><UButton label="Modifier" icon="i-lucide-pencil" color="neutral" variant="outline" @click="() => { editing = true }" /></div></div>
      <div v-if="editing" class="ff-panel p-4 mt-6 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20 shadow-sm"><p class="text-sm font-medium">{{ dirty ? 'Modifications non enregistrées' : 'Édition du programme' }}</p><div class="flex gap-2"><UButton label="Annuler" color="neutral" variant="ghost" :disabled="saving" @click="reset" /><UButton label="Enregistrer" icon="i-lucide-check" :loading="saving" @click="save" /></div></div>
      <UAlert v-if="error" :description="error" color="error" class="mt-5" /><div v-if="deleted" class="ff-panel p-3 mt-5 flex justify-between gap-3 items-center text-sm"><p>{{ deleted }}</p><UButton label="Annuler le retrait" color="neutral" variant="outline" @click="undo" /></div>
      <div class="flex gap-2 overflow-x-auto mt-7 pb-3"><button v-for="(day, index) in schedule" :key="day.id || index" class="ff-option shrink-0 text-sm" :aria-pressed="selected === index" @click="() => { selected = index }">Séance {{ index + 1 }}</button><UButton v-if="editing" label="Ajouter une séance" icon="i-lucide-plus" color="neutral" variant="outline" class="shrink-0" :disabled="schedule.length >= 14" @click="addDay" /></div>
      <div v-if="selectedDay" class="ff-panel overflow-hidden"><div class="p-5 sm:p-6 border-b border-default"><div class="flex items-start justify-between gap-3"><div class="min-w-0 flex-1"><label v-if="editing" class="text-sm font-medium block">Titre de la séance<input v-model="selectedDay.focus" class="ff-field mt-2" maxlength="100" placeholder="Ex. : haut du corps" /></label><h2 v-else class="text-2xl font-semibold tracking-tight">{{ focusLabel(selectedDay.focus) }}</h2><p class="text-sm text-muted mt-3">{{ selectedDay.exercises.length }} exercices<span v-if="selectedDay.exercises.length"> · ≈ {{ estimateMinutes(selectedDay) }} min</span></p></div><UButton v-if="editing" icon="i-lucide-trash-2" color="error" variant="ghost" aria-label="Retirer cette séance" @click="removeDay" /></div><label v-if="editing" class="block text-sm font-medium mt-5">Notes <span class="text-muted font-normal">· facultatif</span><textarea v-model="selectedDay.notes" rows="2" maxlength="1000" class="ff-field mt-2" placeholder="Ex. : réglage du banc" /></label><p v-else-if="selectedDay.notes" class="text-sm text-muted mt-3">{{ selectedDay.notes }}</p></div>
        <div v-for="(exercise, index) in selectedDay.exercises" :key="exercise.id" class="p-5 sm:p-6 border-b border-default last:border-b-0"><div class="flex gap-3 items-start"><span class="text-xs text-muted mt-1">{{ String(index + 1).padStart(2, '0') }}</span><button class="font-semibold text-sm flex-1 min-w-0 text-left hover:text-primary" @click="openDetail(exercise.name)">{{ exercise.name }}</button><div v-if="editing" class="flex shrink-0"><UButton icon="i-lucide-chevron-up" color="neutral" variant="ghost" :disabled="index === 0" :aria-label="`Monter ${exercise.name}`" @click="editor.moveExercise(selected, exercise.id, 'up')" /><UButton icon="i-lucide-chevron-down" color="neutral" variant="ghost" :disabled="index === selectedDay.exercises.length - 1" :aria-label="`Descendre ${exercise.name}`" @click="editor.moveExercise(selected, exercise.id, 'down')" /><UButton icon="i-lucide-x" color="error" variant="ghost" :aria-label="`Retirer ${exercise.name}`" @click="removeExercise(exercise.id)" /></div><UIcon v-else name="i-lucide-chevron-right" class="size-4 text-muted" /></div><div v-if="editing" class="grid grid-cols-3 gap-3 mt-4"><label class="text-xs text-muted">Séries<input v-model.number="exercise.sets" type="number" min="1" max="10" class="ff-field mt-1" :aria-label="`Séries pour ${exercise.name}`" /></label><label class="text-xs text-muted">Répétitions<input v-model="exercise.reps" maxlength="20" class="ff-field mt-1" placeholder="8-12 ou 30 s" :aria-label="`Répétitions pour ${exercise.name}`" /></label><label class="text-xs text-muted">Repos<input v-model="exercise.rest" maxlength="20" class="ff-field mt-1" placeholder="90s" :aria-label="`Repos pour ${exercise.name}`" /></label></div><p v-else class="text-xs text-muted mt-2 ml-7">{{ exercise.sets }} séries · {{ exercise.reps }} · {{ exercise.rest }} repos</p></div><div v-if="editing" class="p-5"><UButton label="Ajouter un exercice" icon="i-lucide-plus" color="neutral" variant="outline" block @click="() => { pickerOpen = true }" /></div><p v-else-if="!selectedDay.exercises.length" class="text-sm text-muted p-6">Ajoute des exercices pour pouvoir commencer cette séance.</p></div>
      <div v-else class="ff-panel ff-empty"><p class="text-muted">Ajoute une première séance à ton programme.</p><UButton v-if="editing" label="Ajouter une séance" icon="i-lucide-plus" class="mt-4" @click="addDay" /></div>
      <UButton v-if="!editing && selectedDay?.exercises.length" :to="`/workout?program=${program.id}&day=${selected}`" label="Préparer cette séance" trailing-icon="i-lucide-arrow-right" block size="xl" class="mt-6" /><p v-if="editing" class="text-xs text-muted mt-4">Les modifications s’appliquent aux prochaines séances. L’historique reste inchangé.</p><StorageStatus class="mt-6" />
    </template>
    <ExercisePicker v-model:open="pickerOpen" @select="addExercise" /><ExerciseDetailModal v-model:open="detailOpen" :exercise="detail"><template #footer><UButton label="Fermer" color="neutral" variant="outline" @click="() => { detailOpen = false }" /></template></ExerciseDetailModal><ConfirmDialog v-model:open="leaveOpen" title="Quitter sans enregistrer ?" description="Les modifications de ce programme seront perdues." confirm-label="Quitter sans enregistrer" @confirm="leave" />
  </div>
</template>
