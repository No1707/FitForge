<script setup lang="ts">
import type { SavedProgram } from '~/utils/program-editor-types'

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const { get, remove, setActive } = usePrograms()

const program = ref<SavedProgram | null>(null)
const isLoading = ref(true)
const isDeleting = ref(false)
const isActivating = ref(false)
const notFound = ref(false)

const loadError = ref<string | null>(null)

async function loadProgram() {
  isLoading.value = true
  loadError.value = null
  try {
    const result = await get(route.params.id as string)
    if (!result) {
      notFound.value = true
      return
    }
    program.value = result
  } catch {
    loadError.value = 'Could not load this program. Please try again in a moment.'
  } finally {
    isLoading.value = false
  }
}

await loadProgram()

async function activateProgram() {
  if (!program.value) return
  isActivating.value = true
  try {
    await setActive(program.value.id)
    program.value.isActive = true
  } finally {
    isActivating.value = false
  }
}

async function deleteProgram() {
  if (!program.value) return
  isDeleting.value = true
  try {
    await remove(program.value.id)
    await navigateTo('/programs')
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <div class="py-8">
    <UContainer class="max-w-3xl">
      <div v-if="isLoading" class="py-24 text-center">
        <UIcon name="i-lucide-loader-circle" class="size-10 text-primary mx-auto animate-spin" />
      </div>

      <div v-else-if="notFound" class="mt-12 flex flex-col items-center text-center py-16">
        <UIcon name="i-lucide-search-x" class="size-8 text-muted mb-4" />
        <h3 class="font-semibold text-lg">Program not found</h3>
        <p class="text-muted mt-1 mb-4">It may have been deleted, or it doesn't belong to your account.</p>
        <UButton to="/programs" label="Back to My Programs" />
      </div>

      <UAlert
        v-else-if="loadError"
        class="mt-8"
        color="error"
        variant="subtle"
        icon="i-lucide-alert-circle"
        :description="loadError"
      />

      <div v-else-if="program" class="space-y-6">
        <div class="flex items-center justify-between border-b border-default pb-6">
          <UButton to="/programs" label="My Programs" icon="i-lucide-arrow-left" color="neutral" variant="ghost" />
          <div class="flex items-center gap-2">
            <UBadge v-if="program.isActive" color="success" variant="subtle" icon="i-lucide-check">Active</UBadge>
            <UButton v-else label="Set as Active" size="sm" color="neutral" variant="outline" :loading="isActivating" @click="activateProgram" />
            <UButton icon="i-lucide-trash-2" size="sm" color="error" variant="outline" :loading="isDeleting" @click="deleteProgram" />
          </div>
        </div>

        <UCard>
          <template #header>
            <div class="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 class="text-xl font-bold">{{ program.name }}</h2>
                <p class="text-muted">Goal: {{ program.goal }}</p>
              </div>
              <div class="flex items-center gap-2">
                <UBadge v-if="program.source === 'ai'" color="primary" variant="subtle" icon="i-lucide-sparkles">AI-generated</UBadge>
                <UBadge color="primary" size="lg">{{ program.schedule.length }} days/week</UBadge>
              </div>
            </div>
          </template>

          <div class="space-y-6">
            <div v-for="(day, index) in program.schedule" :key="index">
              <div class="flex items-center gap-2 mb-3">
                <UIcon name="i-lucide-calendar-days" class="size-5 text-primary" />
                <h3 class="font-semibold">{{ day.day }} - {{ day.focus }}</h3>
              </div>
              <div class="bg-muted rounded-lg overflow-hidden">
                <div
                  v-for="(exercise, idx) in day.exercises"
                  :key="idx"
                  class="flex items-center justify-between p-3 border-b border-default last:border-0"
                >
                  <span class="font-medium">{{ exercise.name }}</span>
                  <div class="flex gap-4 text-sm text-muted">
                    <span>{{ exercise.sets }} sets</span>
                    <span>{{ exercise.reps }} reps</span>
                    <span>{{ exercise.rest }} rest</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UCard>

        <UAlert
          v-if="program.tips.length > 0"
          title="Tips for Success"
          icon="i-lucide-lightbulb"
          color="warning"
          variant="subtle"
        >
          <template #description>
            <ul class="list-disc list-inside space-y-1 mt-2">
              <li v-for="tip in program.tips" :key="tip">{{ tip }}</li>
            </ul>
          </template>
        </UAlert>
      </div>
    </UContainer>
  </div>
</template>
