<script setup lang="ts">
import { completedSets } from '~/utils/workout'
import { focusLabel } from '~/utils/exercise-helpers'
const route = useRoute()
const mounted = ref(false)
const { data, userId, ready } = useTrainingStore()
const { sync, syncing, remove, exportHistory } = useWorkouts()
const selectedId = ref(typeof route.query.session === 'string' ? route.query.session : null)
const selectedExercise = ref('all')
const deleteId = ref<string | null>(null)
const deleteOpen = ref(false)
const selected = computed(() => data.value.workouts.find(s => s.id === selectedId.value))
const exerciseNames = computed(() => [...new Set(data.value.workouts.flatMap(s => s.exercises.filter(ex => ex.sets.some(set => set.done)).map(ex => ex.name)))].sort())
const filtered = computed(() => data.value.workouts.filter(s => selectedExercise.value === 'all' || s.exercises.some(ex => ex.name === selectedExercise.value && ex.sets.some(set => set.done))))
const totalMinutes = computed(() => Math.round(data.value.workouts.reduce((sum, session) => sum + session.durationSeconds, 0) / 60))
const series = computed(() => data.value.workouts.reduce((sum, session) => sum + completedSets(session), 0))
const weeks = computed(() => {
  const monday = new Date(); monday.setHours(0, 0, 0, 0); monday.setDate(monday.getDate() - (monday.getDay() + 6) % 7 - 21)
  return Array.from({ length: 4 }, (_, index) => {
    const start = new Date(monday); start.setDate(monday.getDate() + index * 7)
    const end = new Date(start); end.setDate(start.getDate() + 7)
    return { label: start.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }), count: data.value.workouts.filter(s => s.completedAt && new Date(s.completedAt) >= start && new Date(s.completedAt) < end).length }
  })
})
const maxWeek = computed(() => Math.max(1, ...weeks.value.map(week => week.count)))
const date = (value: string) => new Date(value).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
onMounted(() => { mounted.value = true; void sync() })
function askDelete(id: string) { deleteId.value = id; deleteOpen.value = true }
function deleteSession() { if (deleteId.value) { remove(deleteId.value); if (selectedId.value === deleteId.value) selectedId.value = null }; deleteId.value = null }
useHead({ title: 'Ma progression · FitForge' })
</script>
<template>
  <div class="ff-page ff-fade"><div class="flex flex-wrap items-end justify-between gap-5"><div><h1 class="ff-title">Ma progression</h1></div><UButton v-if="mounted && data.workouts.length" label="Exporter mes séances" icon="i-lucide-download" color="neutral" variant="outline" @click="exportHistory" /></div><GuestImportBanner v-if="userId" class="mt-6" @imported="sync" />
    <UAlert v-if="mounted && route.query.finished === '1' && selected" title="Séance enregistrée." icon="i-lucide-circle-check" color="success" class="mt-6"><template #actions><UButton to="/" label="Accueil" color="neutral" variant="outline" /></template></UAlert>
    <div v-if="!mounted || !ready" class="py-20 text-center" role="status"><UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-primary" /></div><div v-else-if="!data.workouts.length" class="ff-panel ff-empty mt-8"><UIcon name="i-lucide-chart-no-axes-combined" class="size-10 text-primary mb-5" /><h2 class="text-xl font-semibold">Aucune séance enregistrée</h2><p class="text-sm text-muted mt-3 max-w-sm mx-auto">Termine une séance pour afficher tes performances ici.</p><UButton to="/" label="Préparer ma séance" trailing-icon="i-lucide-arrow-right" class="mt-6" /></div>
    <template v-else><div class="grid grid-cols-3 gap-3 sm:gap-5 mt-8"><div v-for="stat in [{ value: data.workouts.length, label: 'séances réalisées' }, { value: series, label: 'séries validées' }, { value: totalMinutes, label: 'minutes cumulées' }]" :key="stat.label" class="ff-panel p-4 sm:p-6"><p class="ff-stat text-3xl sm:text-4xl">{{ stat.value }}</p><p class="text-xs text-muted mt-2 leading-relaxed">{{ stat.label }}</p></div></div>
      <div class="ff-panel ff-panel-pad mt-5"><h2 class="font-semibold">Séances par semaine</h2><div class="grid grid-cols-4 items-end gap-5 h-36 mt-5" role="img" :aria-label="weeks.map(week => `Semaine du ${week.label} : ${week.count} séances`).join('. ')"><div v-for="week in weeks" :key="week.label" class="flex flex-col items-center justify-end h-full"><span class="text-sm font-semibold ff-number mb-2">{{ week.count }}</span><div class="w-full max-w-20 rounded-t-lg" :class="week.count ? 'bg-primary' : 'bg-muted'" :style="{ height: `${Math.max(4, week.count / maxWeek * 78)}px` }" /><p class="text-[11px] text-muted mt-3">{{ week.label }}</p></div></div></div>
      <section v-if="selected" class="ff-panel ff-panel-pad mt-7"><div class="flex items-start justify-between gap-3"><div><p class="ff-eyebrow">{{ date(selected.completedAt!) }}</p><h2 class="text-xl font-semibold mt-3">{{ focusLabel(selected.focus) }}</h2><p class="text-sm text-muted mt-2">{{ selected.programName }} · {{ completedSets(selected) }} séries réalisées</p></div><UButton icon="i-lucide-x" aria-label="Fermer le détail de la séance" color="neutral" variant="ghost" @click="() => { selectedId = null }" /></div><div class="mt-5 divide-y divide-default"><div v-for="exercise in selected.exercises.filter(ex => ex.sets.some(set => set.done))" :key="exercise.id" class="py-4"><p class="font-semibold text-sm">{{ exercise.name }}</p><p v-if="exercise.originalName" class="text-xs text-muted mt-1">À la place de {{ exercise.originalName }}</p><div class="flex flex-wrap gap-2 mt-3"><span v-for="set in exercise.sets.filter(set => set.done)" :key="set.id" class="ff-chip">{{ set.weight !== null ? `${set.weight} kg × ` : '' }}{{ set.reps }} {{ exercise.unit === 'seconds' ? 's' : 'rép.' }}</span></div></div></div><p v-if="selected.effort" class="text-sm mt-3"><span class="text-muted">Ressenti :</span> {{ { easy: 'Facile', right: 'Bien dosée', hard: 'Difficile' }[selected.effort] }}</p><p v-if="selected.adaptation" class="text-xs text-muted mt-3">{{ selected.adaptation }}</p><p v-if="selected.notes" class="text-sm text-muted mt-4 p-4 bg-muted rounded-xl whitespace-pre-wrap">{{ selected.notes }}</p></section>
      <div class="flex flex-wrap items-center justify-between gap-3 mt-8 mb-4"><h2 class="font-semibold text-xl tracking-tight">Historique</h2><label class="text-sm"><span class="sr-only">Filtrer par exercice</span><select v-model="selectedExercise" class="ff-field max-w-full"><option value="all">Tous les exercices</option><option v-for="name in exerciseNames" :key="name" :value="name">{{ name }}</option></select></label></div><div class="space-y-3"><article v-for="session in filtered" :key="session.id" class="ff-panel flex items-center gap-2 p-2"><button class="flex-1 flex items-center gap-4 text-left p-3 min-w-0" @click="() => { selectedId = session.id }"><span class="size-10 rounded-xl bg-muted hidden sm:grid place-items-center shrink-0"><UIcon name="i-lucide-check" class="size-5 text-primary" /></span><span class="min-w-0 flex-1"><span class="block font-semibold text-sm">{{ focusLabel(session.focus) }}</span><span class="block text-xs text-muted mt-1.5">{{ date(session.completedAt!) }} · {{ completedSets(session) }} séries</span><span v-if="selectedExercise !== 'all'" class="block text-xs text-primary mt-2">{{ session.exercises.find(ex => ex.name === selectedExercise)?.sets.filter(set => set.done).map(set => `${set.weight !== null ? `${set.weight} kg × ` : ''}${set.reps}`).join(' · ') }}</span></span><UIcon name="i-lucide-chevron-right" class="size-4 text-muted shrink-0" /></button><UButton icon="i-lucide-trash-2" color="neutral" variant="ghost" :aria-label="`Supprimer la séance du ${date(session.completedAt!)}`" @click="askDelete(session.id)" /></article></div>
    </template><div class="mt-7 flex items-start justify-between gap-3"><StorageStatus /><UButton v-if="userId" label="Synchroniser" icon="i-lucide-refresh-cw" color="neutral" variant="ghost" :loading="syncing" @click="sync" /></div><ConfirmDialog v-model:open="deleteOpen" title="Supprimer cette séance ?" description="Ses performances seront retirées de ton historique et de tes statistiques." confirm-label="Supprimer" @confirm="deleteSession" />
  </div>
</template>
