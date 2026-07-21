<script setup lang="ts">
import type { SavedProgram } from '~/utils/program-editor-types'

definePageMeta({ middleware: 'auth' })

const { list, remove } = usePrograms()

const programs = ref<SavedProgram[]>([])
const isLoading = ref(true)
const loadError = ref<string | null>(null)

async function loadPrograms() {
  isLoading.value = true
  loadError.value = null
  try {
    programs.value = await list()
  } catch (err) {
    console.error('[programs/index] load failed:', err)
    loadError.value = 'Could not load your programs. Please try again in a moment.'
  } finally {
    isLoading.value = false
  }
}

await loadPrograms()

const pendingDeleteId = ref<string | null>(null)
const isDeleteConfirmOpen = computed({
  get: () => pendingDeleteId.value !== null,
  set: (value: boolean) => { if (!value) pendingDeleteId.value = null }
})

function confirmDelete(id: string) {
  pendingDeleteId.value = id
}

async function performDelete() {
  if (!pendingDeleteId.value) return
  await remove(pendingDeleteId.value)
  programs.value = programs.value.filter(p => p.id !== pendingDeleteId.value)
  pendingDeleteId.value = null
}
</script>

<template>
  <div class="py-8">
    <UContainer class="max-w-3xl">
      <div class="border-b border-default pb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 class="text-3xl font-bold">My Programs</h1>
          <p class="mt-2 text-muted">Programs you've saved to your account.</p>
        </div>
        <div v-if="!isLoading && programs.length > 0" class="flex gap-2">
          <UButton to="/program" label="Build with AI" icon="i-lucide-sparkles" color="neutral" variant="outline" />
          <UButton to="/programs/new" label="Start from Scratch" icon="i-lucide-pencil" color="neutral" variant="outline" />
        </div>
      </div>

      <div v-if="isLoading" class="py-24 text-center">
        <UIcon name="i-lucide-loader-circle" class="size-10 text-primary mx-auto animate-spin" />
      </div>

      <UAlert
        v-else-if="loadError"
        class="mt-8"
        color="error"
        variant="subtle"
        icon="i-lucide-alert-circle"
        :description="loadError"
      />

      <div v-else-if="programs.length === 0" class="mt-12 flex flex-col items-center text-center py-16">
        <div class="p-4 rounded-full bg-elevated mb-4">
          <UIcon name="i-lucide-clipboard-list" class="size-8 text-muted" />
        </div>
        <h3 class="font-semibold text-lg">No saved programs yet</h3>
        <p class="text-muted mt-1 mb-4">Build a personalized program and save it to your account.</p>
        <div class="flex gap-2">
          <UButton to="/program" label="Build with AI" icon="i-lucide-sparkles" />
          <UButton to="/programs/new" label="Start from Scratch" icon="i-lucide-pencil" color="neutral" variant="outline" />
        </div>
      </div>

      <div v-else class="mt-8 grid gap-4 sm:grid-cols-2">
        <UCard
          v-for="prog in programs"
          :key="prog.id"
          class="cursor-pointer hover:ring-2 hover:ring-primary transition-all"
          @click="navigateTo(`/programs/${prog.id}`)"
        >
          <template #header>
            <div class="flex items-center gap-1.5">
              <UBadge v-if="prog.isActive" color="success" variant="subtle" size="sm">Active</UBadge>
              <UBadge v-if="prog.source === 'ai'" color="primary" variant="subtle" size="sm" icon="i-lucide-sparkles">AI</UBadge>
              <UBadge color="neutral" variant="subtle" size="sm">{{ prog.schedule.length }}-Day Program</UBadge>
            </div>
          </template>

          <h3 class="font-semibold text-lg mb-1">{{ prog.name }}</h3>
          <p class="text-muted text-sm line-clamp-2">{{ prog.goal }}</p>

          <template #footer>
            <UButton
              icon="i-lucide-trash-2"
              size="sm"
              color="error"
              variant="ghost"
              @click.stop="confirmDelete(prog.id)"
            />
          </template>
        </UCard>
      </div>
    </UContainer>

    <ConfirmDialog
      v-model:open="isDeleteConfirmOpen"
      title="Delete this program?"
      description="This can't be undone."
      confirm-label="Delete"
      @confirm="performDelete"
    />
  </div>
</template>
