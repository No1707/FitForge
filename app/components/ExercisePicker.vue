<script setup lang="ts">
import type { Exercise } from '~/utils/exercises'
const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ select: [exercise: Exercise] }>()
</script>
<template><UModal v-model:open="open" title="Ajouter un exercice" description="Choisis un mouvement pour cette séance."><template #body><ExerciseBrowser compact @add="emit('select', $event)" /></template></UModal></template>
