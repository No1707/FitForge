<script setup lang="ts">
import type { Exercise } from '~/utils/exercises'
import { toEditableSchedule, type EditableDay, type SavedProgram } from '~/utils/program-editor-types'
import { focusLabel } from '~/utils/exercise-helpers'
const props = defineProps<{ exercise: Exercise | null }>()
const open = defineModel<boolean>('open', { default: false })
const { list, get, updateSchedule } = usePrograms()
const toast = useToast()
const programs = ref<SavedProgram[]>([])
const selected = ref<SavedProgram | null>(null)
const schedule = ref<EditableDay[]>([])
const editor = useProgramEditor(schedule)
const loading = ref(false)
const saving = ref(false)
const error = ref('')
async function load() { loading.value = true; error.value = ''; selected.value = null; try { programs.value = await list() } catch { error.value = 'Impossible de charger tes programmes. Réessaie.' } finally { loading.value = false } }
watch(open, value => { if (value) void load() })
async function choose(program: SavedProgram) {
  loading.value = true; error.value = ''
  try { const full = await get(program.id); if (!full) throw new Error(); selected.value = full; schedule.value = toEditableSchedule(full.schedule) }
  catch { error.value = 'Ce programme ne peut pas être chargé.' }
  finally { loading.value = false }
}
async function add(dayIndex: number, newDay = false) {
  if (!props.exercise || !selected.value || saving.value) return
  const snapshot = JSON.parse(JSON.stringify(schedule.value))
  if (newDay) editor.addDay()
  const exercise = props.exercise
  if (!editor.addExercise(dayIndex, { exerciseId: exercise.id, name: exercise.name, sets: 3, reps: /plank|hold/i.test(exercise.name) ? '30 s' : '8-12', rest: '90s' })) { error.value = 'Cet exercice est déjà dans cette séance.'; return }
  saving.value = true; error.value = ''
  try { await updateSchedule(selected.value.id, schedule.value); toast.add({ title: 'Exercice ajouté au programme', color: 'success', icon: 'i-lucide-check' }); open.value = false }
  catch { schedule.value = snapshot; error.value = 'L’enregistrement a échoué. Tu peux réessayer.' }
  finally { saving.value = false }
}
function back() { selected.value = null; error.value = '' }
function close() { open.value = false }
</script>
<template><UModal v-model:open="open" :title="exercise ? `Ajouter ${exercise.name}` : 'Ajouter au programme'" description="Choisis le programme, puis la séance à compléter."><template #body><UAlert v-if="error" :description="error" color="error" class="mb-4" /><div v-if="loading" class="py-8 text-center" role="status"><UIcon name="i-lucide-loader-circle" class="size-7 animate-spin text-primary" /></div><div v-else-if="!selected"><div v-if="!programs.length" class="text-center py-6"><p class="text-sm text-muted">Prépare d’abord un programme pour y ajouter des exercices.</p><div class="flex flex-wrap justify-center gap-2 mt-5"><UButton to="/program" label="Créer un programme guidé" @click="close" /><UButton to="/programs/new" label="Créer manuellement" color="neutral" variant="outline" @click="close" /></div></div><div v-else class="space-y-2"><button v-for="program in programs" :key="program.id" class="ff-option w-full" @click="choose(program)"><span class="block font-semibold text-sm">{{ program.name }}</span><span class="block text-xs text-muted mt-1">{{ program.schedule.length }} séances{{ program.isActive ? ' · Programme actif' : '' }}</span></button></div></div><div v-else class="space-y-3"><UButton label="Autre programme" icon="i-lucide-arrow-left" color="neutral" variant="ghost" :disabled="saving" @click="back" /><button v-for="(day, index) in schedule" :key="day.id || index" class="ff-option w-full text-sm" :disabled="saving" @click="add(index)">Séance {{ index + 1 }} · {{ focusLabel(day.focus) || 'Ma séance' }}</button><UButton label="Ajouter dans une nouvelle séance" icon="i-lucide-plus" color="neutral" variant="outline" block :loading="saving" :disabled="schedule.length >= 14" @click="add(schedule.length, true)" /></div></template></UModal></template>
