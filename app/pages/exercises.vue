<script setup lang="ts">
import type { Exercise } from '~/utils/exercises'
const route = useRoute()
const selected = ref<Exercise | null>(null)
const detailOpen = ref(false)
const addOpen = ref(false)
function detail(exercise: Exercise) { selected.value = exercise; detailOpen.value = true }
function add(exercise: Exercise) { selected.value = exercise; addOpen.value = true }
useHead({ title: 'Exercices · FitForge' })
</script>
<template><div class="ff-page ff-fade"><h1 class="ff-title">Exercices</h1><ExerciseBrowser class="mt-8" :initial-category="typeof route.query.category === 'string' ? route.query.category : 'all'" @detail="detail" @add="add" /><ExerciseDetailModal v-model:open="detailOpen" :exercise="selected"><template #footer><UButton label="Fermer" color="neutral" variant="outline" @click="() => { detailOpen = false }" /><UButton label="Ajouter au programme" icon="i-lucide-plus" @click="() => { detailOpen = false; addOpen = true }" /></template></ExerciseDetailModal><QuickAddDialog v-model:open="addOpen" :exercise="selected" /></div></template>
