<script setup lang="ts">
import {
  exercises, categories, difficultyLevels, muscleFilterGroups, equipmentFilterGroups,
  type Exercise
} from '~/utils/exercises'

const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ select: [exercise: Exercise] }>()

const searchQuery = ref('')
const selectedCategories = ref<string[]>([])
const selectedEquipments = ref<string[]>([])
const selectedDifficulties = ref<string[]>([])
const selectedMuscles = ref<string[]>([])

const categoryButtons = categories.filter(c => c !== 'all')
const difficultyButtons = difficultyLevels.filter(d => d !== 'all')
const equipmentButtons = equipmentFilterGroups.map(g => g.label)
const muscleButtons = muscleFilterGroups.map(g => g.label)

const filteredExercises = computed(() => {
  return exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      exercise.muscles.some(m => m.toLowerCase().includes(searchQuery.value.toLowerCase()))
    const matchesCategory = selectedCategories.value.length === 0 || selectedCategories.value.includes(exercise.category)
    const matchesEquipment = selectedEquipments.value.length === 0 || selectedEquipments.value.some((label) => {
      const group = equipmentFilterGroups.find(g => g.label === label)
      return group ? group.values.includes(exercise.equipment) : false
    })
    const matchesDifficulty = selectedDifficulties.value.length === 0 || selectedDifficulties.value.includes(exercise.difficulty)
    const matchesMuscle = selectedMuscles.value.length === 0 || selectedMuscles.value.some((label) => {
      const group = muscleFilterGroups.find(g => g.label === label)
      return group ? group.values.some(v => exercise.muscles.includes(v)) : false
    })
    return matchesSearch && matchesCategory && matchesEquipment && matchesDifficulty && matchesMuscle
  })
})

function toggleValue(list: string[], value: string) {
  const index = list.indexOf(value)
  if (index === -1) list.push(value)
  else list.splice(index, 1)
}

function formatLabel(value: string) {
  if (value === 'ez-bar') return 'EZ Bar'
  return value.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function formatDifficulty(value: string) {
  if (value === 'none') return 'Unrated'
  return formatLabel(value)
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'beginner': return 'success'
    case 'intermediate': return 'warning'
    case 'advanced': return 'error'
    default: return 'neutral'
  }
}

function selectExercise(exercise: Exercise) {
  emit('select', exercise)
}
</script>

<template>
  <UModal v-model:open="open" title="Add Exercise" description="Search the exercise library and add exercises to this day.">
    <template #body>
      <div class="space-y-3">
        <UInput v-model="searchQuery" placeholder="Search exercises or muscles..." icon="i-lucide-search" class="w-full" />

        <div class="space-y-2">
          <div class="flex flex-wrap gap-1.5">
            <UButton
              v-for="cat in categoryButtons"
              :key="cat"
              :label="formatLabel(cat)"
              size="xs"
              :color="selectedCategories.includes(cat) ? 'primary' : 'neutral'"
              :variant="selectedCategories.includes(cat) ? 'solid' : 'outline'"
              @click="toggleValue(selectedCategories, cat)"
            />
          </div>
          <div class="flex flex-wrap gap-1.5">
            <UButton
              v-for="eq in equipmentButtons"
              :key="eq"
              :label="eq"
              size="xs"
              :color="selectedEquipments.includes(eq) ? 'primary' : 'neutral'"
              :variant="selectedEquipments.includes(eq) ? 'solid' : 'outline'"
              @click="toggleValue(selectedEquipments, eq)"
            />
          </div>
          <div class="flex flex-wrap gap-1.5">
            <UButton
              v-for="diff in difficultyButtons"
              :key="diff"
              :label="formatDifficulty(diff)"
              size="xs"
              :color="selectedDifficulties.includes(diff) ? getDifficultyColor(diff) : 'neutral'"
              :variant="selectedDifficulties.includes(diff) ? 'solid' : 'outline'"
              @click="toggleValue(selectedDifficulties, diff)"
            />
          </div>
          <div class="flex flex-wrap gap-1.5">
            <UButton
              v-for="muscle in muscleButtons"
              :key="muscle"
              :label="muscle"
              size="xs"
              :color="selectedMuscles.includes(muscle) ? 'primary' : 'neutral'"
              :variant="selectedMuscles.includes(muscle) ? 'solid' : 'outline'"
              @click="toggleValue(selectedMuscles, muscle)"
            />
          </div>
        </div>

        <p class="text-muted text-xs">{{ filteredExercises.length }} exercise{{ filteredExercises.length === 1 ? '' : 's' }}</p>

        <div class="max-h-72 overflow-y-auto divide-y divide-default border border-default rounded-lg">
          <div
            v-for="exercise in filteredExercises"
            :key="exercise.id"
            class="flex items-center justify-between gap-3 p-3"
          >
            <div class="min-w-0">
              <p class="font-medium truncate">{{ exercise.name }}</p>
              <p class="text-muted text-xs truncate">{{ exercise.muscles.join(', ') }}</p>
            </div>
            <UButton icon="i-lucide-plus" size="xs" color="primary" variant="soft" @click="selectExercise(exercise)" />
          </div>
          <p v-if="filteredExercises.length === 0" class="p-4 text-center text-muted text-sm">
            No exercises match your filters.
          </p>
        </div>
      </div>
    </template>
  </UModal>
</template>
