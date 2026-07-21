<script setup lang="ts">
import { formatLabel, formatDifficulty, getDifficultyColor, getCategoryIcon, type Exercise } from '~/utils/exercises'

defineProps<{ exercise: Exercise | null }>()
const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <UModal
    v-model:open="open"
    :title="exercise?.name"
    description="Instructions, targeted muscles, and tips for this exercise."
  >
    <template #body>
      <div v-if="exercise" class="space-y-6">
        <!-- Info Badges -->
        <div class="flex flex-wrap gap-2">
          <UBadge :color="getDifficultyColor(exercise.difficulty)" size="lg">
            {{ formatDifficulty(exercise.difficulty) }}
          </UBadge>
          <UBadge color="primary" variant="subtle" size="lg">
            <UIcon :name="getCategoryIcon(exercise.category)" class="size-4 mr-1" />
            {{ formatLabel(exercise.category) }}
          </UBadge>
          <UBadge color="neutral" variant="subtle" size="lg">
            {{ formatLabel(exercise.equipment) }}
          </UBadge>
        </div>

        <!-- Description -->
        <div>
          <h3 class="font-semibold text-lg mb-2">About This Exercise</h3>
          <p class="text-muted">{{ exercise.description }}</p>
        </div>

        <!-- Muscles -->
        <div>
          <h3 class="font-semibold text-lg mb-2">Muscles Worked</h3>
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="muscle in exercise.muscles"
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
              v-for="(instruction, index) in exercise.instructions"
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
            :to="exercise.videoUrl"
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
              <li v-for="tip in exercise.tips" :key="tip">{{ tip }}</li>
            </ul>
          </template>
        </UAlert>
      </div>
    </template>

    <template #footer>
      <slot name="footer" />
    </template>
  </UModal>
</template>
