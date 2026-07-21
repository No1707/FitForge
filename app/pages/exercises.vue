<script setup lang="ts">
import { exercises, categories, difficultyLevels, muscleFilterGroups, equipmentFilterGroups, type Exercise } from '~/utils/exercises'

const route = useRoute()
const user = useSupabaseUser()

const isQuickAddOpen = ref(false)

const searchQuery = ref('')
const selectedCategories = ref<string[]>(route.query.category ? [route.query.category.toString()] : [])
const selectedEquipments = ref<string[]>([])
const selectedDifficulties = ref<string[]>([])
const selectedMuscles = ref<string[]>([])

const selectedExercise = ref<Exercise | null>(null)
const isModalOpen = ref(false)

const filteredExercises = computed(() => {
  return exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      exercise.muscles.some(m => m.toLowerCase().includes(searchQuery.value.toLowerCase()))
    const matchesCategory = selectedCategories.value.length === 0 || selectedCategories.value.includes(exercise.category)
    const matchesEquipment = selectedEquipments.value.length === 0 || selectedEquipments.value.some(label => {
      const group = equipmentFilterGroups.find(g => g.label === label)
      return group ? group.values.includes(exercise.equipment) : false
    })
    const matchesDifficulty = selectedDifficulties.value.length === 0 || selectedDifficulties.value.includes(exercise.difficulty)
    const matchesMuscle = selectedMuscles.value.length === 0 || selectedMuscles.value.some(label => {
      const group = muscleFilterGroups.find(g => g.label === label)
      return group ? group.values.some(v => exercise.muscles.includes(v)) : false
    })
    return matchesSearch && matchesCategory && matchesEquipment && matchesDifficulty && matchesMuscle
  })
})

const hasActiveFilters = computed(() =>
  !!searchQuery.value || selectedCategories.value.length > 0 || selectedEquipments.value.length > 0 ||
  selectedDifficulties.value.length > 0 || selectedMuscles.value.length > 0
)

function openExercise(exercise: Exercise) {
  selectedExercise.value = exercise
  isModalOpen.value = true
}

function openQuickAdd(exercise: Exercise) {
  selectedExercise.value = exercise
  isQuickAddOpen.value = true
}

function clearFilters() {
  searchQuery.value = ''
  selectedCategories.value = []
  selectedEquipments.value = []
  selectedDifficulties.value = []
  selectedMuscles.value = []
}

function toggleValue(list: string[], value: string) {
  const index = list.indexOf(value)
  if (index === -1) list.push(value)
  else list.splice(index, 1)
}

const categoryButtons = categories.filter(c => c !== 'all')
const difficultyButtons = difficultyLevels.filter(d => d !== 'all')

const muscleButtons = muscleFilterGroups.map(g => g.label)
const equipmentButtons = equipmentFilterGroups.map(g => g.label)

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

function getCategoryIcon(category: string) {
  switch (category) {
    case 'strength': return 'i-lucide-dumbbell'
    case 'cardio': return 'i-lucide-heart-pulse'
    case 'bodyweight': return 'i-lucide-person-standing'
    case 'flexibility': return 'i-lucide-stretch-horizontal'
    default: return 'i-lucide-activity'
  }
}
</script>

<template>
  <div class="py-8">
    <UContainer>
      <div class="border-b border-default pb-6">
        <h1 class="text-3xl font-bold">Exercise Library</h1>
        <p class="mt-2 text-muted">
          Browse our collection of exercises with detailed instructions and video demonstrations.
        </p>
      </div>

      <!-- Filters -->
      <div class="mt-8 space-y-4">
        <div class="flex flex-col sm:flex-row gap-4 sm:items-center">
          <UInput
            v-model="searchQuery"
            placeholder="Search exercises or muscles..."
            icon="i-lucide-search"
            size="lg"
            class="flex-1"
          />
          <UButton
            v-if="hasActiveFilters"
            label="Clear Filters"
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            @click="clearFilters"
          />
        </div>

        <div class="space-y-3">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-sm font-medium text-muted w-24 shrink-0">Category</span>
            <UButton
              v-for="cat in categoryButtons"
              :key="cat"
              :label="formatLabel(cat)"
              size="sm"
              :color="selectedCategories.includes(cat) ? 'primary' : 'neutral'"
              :variant="selectedCategories.includes(cat) ? 'solid' : 'outline'"
              class="cursor-pointer"
              @click="toggleValue(selectedCategories, cat)"
            />
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-sm font-medium text-muted w-24 shrink-0">Equipment</span>
            <UButton
              v-for="eq in equipmentButtons"
              :key="eq"
              :label="eq"
              size="sm"
              :color="selectedEquipments.includes(eq) ? 'primary' : 'neutral'"
              :variant="selectedEquipments.includes(eq) ? 'solid' : 'outline'"
              class="cursor-pointer"
              @click="toggleValue(selectedEquipments, eq)"
            />
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-sm font-medium text-muted w-24 shrink-0">Difficulty</span>
            <UButton
              v-for="diff in difficultyButtons"
              :key="diff"
              :label="formatDifficulty(diff)"
              size="sm"
              :color="selectedDifficulties.includes(diff) ? getDifficultyColor(diff) : 'neutral'"
              :variant="selectedDifficulties.includes(diff) ? 'solid' : 'outline'"
              class="cursor-pointer"
              @click="toggleValue(selectedDifficulties, diff)"
            />
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-sm font-medium text-muted w-24 shrink-0">Muscles</span>
            <UButton
              v-for="muscle in muscleButtons"
              :key="muscle"
              :label="muscle"
              size="sm"
              :color="selectedMuscles.includes(muscle) ? 'primary' : 'neutral'"
              :variant="selectedMuscles.includes(muscle) ? 'solid' : 'outline'"
              class="cursor-pointer"
              @click="toggleValue(selectedMuscles, muscle)"
            />
          </div>
        </div>

        <p class="text-muted text-sm">
          Showing {{ filteredExercises.length }} of {{ exercises.length }} exercises
        </p>
      </div>

      <!-- Exercise Grid -->
      <div v-if="filteredExercises.length > 0" class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <UCard
          v-for="exercise in filteredExercises"
          :key="exercise.id"
          class="relative group cursor-pointer hover:ring-2 hover:ring-primary transition-all"
          @click="openExercise(exercise)"
        >
          <UButton
            v-if="user"
            icon="i-lucide-plus"
            size="sm"
            color="primary"
            class="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Add to program"
            @click.stop="openQuickAdd(exercise)"
          />

          <template #header>
            <div class="flex flex-wrap gap-1.5">
              <UBadge :color="getDifficultyColor(exercise.difficulty)" variant="subtle" size="md">
                {{ formatDifficulty(exercise.difficulty) }}
              </UBadge>
              <UBadge color="primary" variant="subtle" size="md">
                <UIcon :name="getCategoryIcon(exercise.category)" class="size-4" />
                {{ formatLabel(exercise.category) }}
              </UBadge>
              <UBadge color="neutral" variant="subtle" size="md">
                {{ formatLabel(exercise.equipment) }}
              </UBadge>
            </div>
          </template>

          <div>
            <h3 class="font-semibold text-lg mb-2">{{ exercise.name }}</h3>
            <p class="text-muted text-sm line-clamp-2">{{ exercise.description }}</p>
          </div>

          <template #footer>
            <div class="flex flex-wrap gap-1">
              <UBadge
                v-for="muscle in exercise.muscles.slice(0, 3)"
                :key="muscle"
                color="neutral"
                variant="subtle"
                size="md"
              >
                {{ muscle }}
              </UBadge>
              <UBadge v-if="exercise.muscles.length > 3" color="neutral" variant="subtle" size="md">
                +{{ exercise.muscles.length - 3 }}
              </UBadge>
            </div>
          </template>
        </UCard>
      </div>

      <!-- Empty State -->
      <div v-else class="mt-12 flex flex-col items-center text-center py-16">
        <div class="p-4 rounded-full bg-elevated mb-4">
          <UIcon name="i-lucide-search-x" class="size-8 text-muted" />
        </div>
        <h3 class="font-semibold text-lg">No exercises found</h3>
        <p class="text-muted mt-1 mb-4">Try adjusting your filters or search query.</p>
        <UButton label="Clear Filters" @click="clearFilters" />
      </div>
    </UContainer>

    <!-- Exercise Detail Modal -->
    <UModal
      v-model:open="isModalOpen"
      :title="selectedExercise?.name"
      description="Instructions, targeted muscles, and tips for this exercise."
    >
      <template #body>
        <div v-if="selectedExercise" class="space-y-6">
          <!-- Info Badges -->
          <div class="flex flex-wrap gap-2">
            <UBadge :color="getDifficultyColor(selectedExercise.difficulty)" size="lg">
              {{ formatDifficulty(selectedExercise.difficulty) }}
            </UBadge>
            <UBadge color="primary" variant="subtle" size="lg">
              <UIcon :name="getCategoryIcon(selectedExercise.category)" class="size-4 mr-1" />
              {{ formatLabel(selectedExercise.category) }}
            </UBadge>
            <UBadge color="neutral" variant="subtle" size="lg">
              {{ formatLabel(selectedExercise.equipment) }}
            </UBadge>
          </div>

          <!-- Description -->
          <div>
            <h3 class="font-semibold text-lg mb-2">About This Exercise</h3>
            <p class="text-muted">{{ selectedExercise.description }}</p>
          </div>

          <!-- Muscles -->
          <div>
            <h3 class="font-semibold text-lg mb-2">Muscles Worked</h3>
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="muscle in selectedExercise.muscles"
                :key="muscle"
                color="primary"
                variant="subtle"
                size="lg"
              >
                {{ muscle }}
              </UBadge>
            </div>
          </div>

          <!-- Instructions -->
          <div>
            <h3 class="font-semibold text-lg mb-2">Instructions</h3>
            <ol class="space-y-3">
              <li
                v-for="(instruction, index) in selectedExercise.instructions"
                :key="index"
                class="flex gap-3"
              >
                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-inverted flex items-center justify-center text-sm font-medium">
                  {{ index + 1 }}
                </span>
                <span class="text-muted">{{ instruction }}</span>
              </li>
            </ol>
            <UButton
              :to="selectedExercise.videoUrl"
              target="_blank"
              label="Watch video tutorial"
              icon="i-lucide-youtube"
              trailing-icon="i-lucide-external-link"
              color="neutral"
              variant="outline"
              size="sm"
              class="mt-4"
            />
          </div>

          <!-- Tips -->
          <UAlert
            title="Pro Tips"
            icon="i-lucide-lightbulb"
            color="warning"
            variant="subtle"
          >
            <template #description>
              <ul class="list-disc list-inside space-y-1 mt-2">
                <li v-for="tip in selectedExercise.tips" :key="tip">{{ tip }}</li>
              </ul>
            </template>
          </UAlert>
        </div>
      </template>

      <template #footer>
        <UButton label="Close" color="neutral" variant="outline" @click="isModalOpen = false" />
        <UButton v-if="user" label="Add to Program" icon="i-lucide-plus" @click="isQuickAddOpen = true" />
        <UButton v-else label="Log in to add" icon="i-lucide-log-in" to="/login" />
      </template>
    </UModal>

    <QuickAddDialog v-model:open="isQuickAddOpen" :exercise="selectedExercise" />
  </div>
</template>
