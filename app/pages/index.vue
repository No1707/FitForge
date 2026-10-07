<script setup lang="ts">
import { estimateMinutes, nextDayIndex, completedSets } from '~/utils/workout'
import { focusLabel, findExercise } from '~/utils/exercise-helpers'
import type { Exercise } from '~/utils/exercises'
const { data, ready } = useTrainingStore()
const { list } = usePrograms()
const { sync } = useWorkouts()
const loading = ref(true)
const loadError = ref(false)
const selected = ref<number | null>(null)
const detail = ref<Exercise | null>(null)
const detailOpen = ref(false)
const active = computed(() => data.value.programs.find(p => p.isActive) || data.value.programs.find(p => p.schedule.some(d => d.exercises.length)))
const nextIndex = computed(() => active.value ? nextDayIndex(active.value, data.value.workouts) : 0)
const dayIndex = computed(() => selected.value ?? nextIndex.value)
const day = computed(() => active.value?.schedule[dayIndex.value])
const recent = computed(() => data.value.workouts.slice(0, 3))
const week = computed(() => {
  const start = new Date(); start.setHours(0, 0, 0, 0); start.setDate(start.getDate() - (start.getDay() + 6) % 7)
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start); date.setDate(start.getDate() + index)
    return { name: ['L', 'M', 'M', 'J', 'V', 'S', 'D'][index], done: data.value.workouts.some(s => s.completedAt && new Date(s.completedAt).toDateString() === date.toDateString()) }
  })
})
const weekCount = computed(() => {
  const start = new Date(); start.setHours(0, 0, 0, 0); start.setDate(start.getDate() - (start.getDay() + 6) % 7)
  return data.value.workouts.filter(s => s.completedAt && new Date(s.completedAt) >= start).length
})
async function load() { loading.value = true; loadError.value = false; try { await list(); void sync() } catch { loadError.value = true } finally { loading.value = false } }
onMounted(load)
function openDetail(name: string) { detail.value = findExercise(name) || null; detailOpen.value = !!detail.value }
useHead({ title: 'Aujourd’hui · FitForge' })
</script>

<template>
  <div class="ff-page ff-fade">
    <div v-if="!ready || loading" class="py-24 text-center" role="status"><UIcon name="i-lucide-loader-circle" class="size-7 animate-spin text-primary" /><p class="text-sm text-muted mt-3">Chargement…</p></div>
    <template v-else>
      <UAlert v-if="loadError" class="mb-6" color="warning" title="Compte inaccessible" description="Tes données présentes sur cet appareil restent disponibles."><template #actions><UButton label="Réessayer" color="neutral" @click="load" /></template></UAlert>
      <template v-if="!active && !data.draft">
        <h1 class="ff-title">Créer un programme</h1>
        <div class="grid md:grid-cols-2 gap-5 mt-8">
          <section class="ff-panel ff-panel-pad flex flex-col items-start">
            <UIcon name="i-lucide-sliders-horizontal" class="size-7 text-primary" />
            <h2 class="text-xl font-semibold mt-5">Programme guidé</h2>
            <p class="text-sm text-muted mt-3 mb-7">Choisis ton objectif, ton niveau et ton matériel.</p>
            <UButton to="/program" label="Créer un programme guidé" trailing-icon="i-lucide-arrow-right" class="mt-auto" />
          </section>
          <section class="ff-panel ff-panel-pad flex flex-col items-start">
            <UIcon name="i-lucide-notebook-pen" class="size-7 text-muted" />
            <h2 class="text-xl font-semibold mt-5">Programme manuel</h2>
            <p class="text-sm text-muted mt-3 mb-7">Ajoute tes séances et tes exercices.</p>
            <UButton to="/programs/new" label="Créer manuellement" trailing-icon="i-lucide-arrow-right" color="neutral" variant="outline" class="mt-auto" />
          </section>
        </div>
      </template>
      <template v-else>
        <div class="flex items-start justify-between gap-4 mb-8"><h1 class="ff-title">Aujourd’hui</h1><NuxtLink to="/programs" class="ff-chip hidden sm:inline-flex"><UIcon name="i-lucide-notebook-tabs" class="size-4" />Mes programmes</NuxtLink></div>
        <div class="grid xl:grid-cols-[1.7fr_1fr] gap-5">
          <div class="ff-hero flex flex-col justify-between min-h-[290px]">
            <div><div class="flex items-center justify-between gap-3"><p class="ff-eyebrow">{{ data.draft ? 'SÉANCE EN COURS' : 'PROCHAINE SÉANCE' }}</p><UIcon name="i-lucide-arrow-up-right" class="size-6 text-[#c9c9d0]" /></div><h2 class="text-3xl sm:text-4xl font-semibold tracking-tight mt-7">{{ focusLabel(data.draft?.focus || day?.focus || 'Ta séance') }}</h2><p class="text-sm text-[#c9c9d0] mt-3">{{ data.draft?.programName || active?.name }}</p><div class="flex flex-wrap gap-5 text-sm mt-5 text-[#e4e4e7]"><span class="flex items-center gap-2"><UIcon name="i-lucide-dumbbell" class="size-4" />{{ data.draft?.exercises.length || day?.exercises.length }} exercices</span><span v-if="data.draft">{{ completedSets(data.draft) }} séries validées</span><span v-else-if="day" class="flex items-center gap-2"><UIcon name="i-lucide-clock-3" class="size-4" />≈ {{ estimateMinutes(day) }} min</span></div></div>
            <NuxtLink :to="data.draft ? '/workout' : `/workout?program=${active?.id}&day=${dayIndex}`" class="ff-hero-action mt-7 self-start">{{ data.draft ? 'Reprendre ma séance' : 'Préparer ma séance' }}<UIcon name="i-lucide-arrow-right" class="size-5" /></NuxtLink>
          </div>
          <div class="ff-panel ff-panel-pad flex flex-col"><div class="flex items-center justify-between"><h2 class="font-semibold">Cette semaine</h2><UIcon name="i-lucide-calendar-days" class="size-5 text-muted" /></div><div class="flex items-baseline gap-2 mt-5"><span class="ff-stat">{{ weekCount }}</span><span class="text-muted text-sm">{{ weekCount > 1 ? 'séances réalisées' : 'séance réalisée' }}</span></div><div class="grid grid-cols-7 gap-2 mt-6"><div v-for="(item, index) in week" :key="index" class="text-center"><p class="text-xs text-muted mb-2">{{ item.name }}</p><div class="aspect-square rounded-full flex items-center justify-center border" :class="item.done ? 'bg-primary border-primary text-inverted' : 'border-default bg-muted'"><UIcon v-if="item.done" name="i-lucide-check" class="size-4" /><span v-else class="size-1 rounded-full bg-muted ring-1 ring-current opacity-30" /></div></div></div></div>
        </div>
        <div v-if="active && day" class="mt-9"><div class="flex flex-wrap items-center justify-between gap-3 mb-5"><h2 class="font-semibold text-xl tracking-tight">Programme actif</h2><NuxtLink :to="`/programs/${active.id}`" class="text-sm text-primary font-semibold">Voir et modifier <span aria-hidden="true">↗</span></NuxtLink></div><div class="flex gap-2 overflow-x-auto pb-3" aria-label="Choisir une séance"><button v-for="(item, index) in active.schedule" :key="item.id || index" class="ff-option shrink-0 text-sm" :aria-pressed="index === dayIndex" @click="() => { selected = index }"><span class="text-xs mr-2 opacity-70">{{ String(index + 1).padStart(2, '0') }}</span>{{ focusLabel(item.focus) }}<span v-if="index === nextIndex" class="sr-only">, prochaine séance</span></button></div><div class="ff-panel divide-y divide-default mt-1"><button v-for="(exercise, index) in day.exercises" :key="exercise.name" class="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-muted first:rounded-t-[20px] last:rounded-b-[20px]" @click="openDetail(exercise.name)"><span class="text-xs text-muted ff-number">{{ String(index + 1).padStart(2, '0') }}</span><div class="flex-1 min-w-0"><p class="font-semibold text-sm">{{ exercise.name }}</p><p class="text-xs text-muted mt-1">{{ exercise.sets }} séries · {{ exercise.reps }}{{ /s/.test(exercise.reps) ? '' : ' rép.' }} · {{ exercise.rest }} de repos</p></div><UIcon name="i-lucide-chevron-right" class="size-4 text-muted shrink-0" /></button></div></div>
        <div class="mt-8"><div class="flex items-center justify-between mb-4"><h2 class="font-semibold text-xl tracking-tight">Dernières séances</h2><NuxtLink to="/progress" class="text-sm text-primary font-semibold">Tout voir ↗</NuxtLink></div><div v-if="!recent.length" class="ff-panel p-6 flex items-center gap-4"><UIcon name="i-lucide-trending-up" class="size-7 text-muted shrink-0" /><p class="text-sm text-muted">Aucune séance enregistrée.</p></div><div v-else class="grid sm:grid-cols-3 gap-3"><NuxtLink v-for="session in recent" :key="session.id" :to="`/progress?session=${session.id}`" class="ff-panel p-5 hover:border-primary"><p class="text-xs text-muted">{{ new Date(session.completedAt!).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) }}</p><p class="font-semibold mt-2">{{ focusLabel(session.focus) }}</p><p class="text-xs text-muted mt-2">{{ completedSets(session) }} séries · {{ Math.max(1, Math.round(session.durationSeconds / 60)) }} min</p></NuxtLink></div></div>
        <StorageStatus class="mt-7" />
      </template>
    </template>
    <ExerciseDetailModal v-model:open="detailOpen" :exercise="detail"><template #footer><UButton label="Fermer" color="neutral" variant="outline" @click="() => { detailOpen = false }" /></template></ExerciseDetailModal>
  </div>
</template>
