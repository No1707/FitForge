<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { create } = usePrograms()

const name = ref('My Program')
const goal = ref('')
const isCreating = ref(false)
const createError = ref<string | null>(null)

async function createProgram() {
  isCreating.value = true
  createError.value = null
  try {
    const saved = await create({
      name: name.value || 'My Program',
      goal: goal.value,
      source: 'manual',
      schedule: [{ day: 'Day 1', focus: '', exercises: [] }],
      tips: []
    })
    await navigateTo(`/programs/${saved.id}`)
  } catch {
    createError.value = 'Could not create your program. Please try again in a moment.'
  } finally {
    isCreating.value = false
  }
}
</script>

<template>
  <div class="py-16">
    <UContainer class="max-w-sm">
      <div class="text-center mb-8">
        <UIcon name="i-lucide-pencil" class="size-10 text-primary mx-auto mb-2" />
        <h1 class="text-2xl font-bold">Start from Scratch</h1>
        <p class="text-muted mt-1">Give your program a name to get started - you can add days and exercises next.</p>
      </div>

      <UCard>
        <div class="space-y-4">
          <UFormField label="Program Name" required>
            <UInput v-model="name" placeholder="e.g. My Push Pull Legs" class="w-full" />
          </UFormField>
          <UFormField label="Goal (optional)">
            <UInput v-model="goal" placeholder="e.g. Build muscle" class="w-full" />
          </UFormField>

          <UAlert
            v-if="createError"
            color="error"
            variant="subtle"
            icon="i-lucide-alert-circle"
            :description="createError"
          />

          <UButton label="Create Program" icon="i-lucide-plus" block :loading="isCreating" @click="createProgram" />
        </div>
      </UCard>
    </UContainer>
  </div>
</template>
