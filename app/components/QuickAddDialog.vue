<script setup lang="ts">
import type { Exercise } from '~/utils/exercises'
import { toEditableSchedule, type EditableDay, type SavedProgram } from '~/utils/program-editor-types'

const props = defineProps<{ exercise: Exercise | null }>()
const open = defineModel<boolean>('open', { default: false })

const { list, get, updateSchedule } = usePrograms()
const toast = useToast()

const step = ref<'program' | 'day'>('program')
const programs = ref<SavedProgram[]>([])
const isLoadingPrograms = ref(false)
const loadError = ref<string | null>(null)

const selectedProgram = ref<SavedProgram | null>(null)
const selectedSchedule = ref<EditableDay[]>([])
const editor = useProgramEditor(selectedSchedule)
const isSaving = ref(false)

async function loadPrograms() {
  isLoadingPrograms.value = true
  loadError.value = null
  try {
    programs.value = await list()
  } catch {
    loadError.value = 'Could not load your programs. Please try again in a moment.'
  } finally {
    isLoadingPrograms.value = false
  }
}

watch(open, (value) => {
  if (value) {
    step.value = 'program'
    selectedProgram.value = null
    loadPrograms()
  }
})

async function chooseProgram(program: SavedProgram) {
  loadError.value = null
  try {
    const full = await get(program.id)
    if (!full) return
    selectedProgram.value = full
    selectedSchedule.value = toEditableSchedule(full.schedule)
    step.value = 'day'
  } catch {
    loadError.value = 'Could not load this program. Please try again in a moment.'
  }
}

async function addToDay(dayIndex: number) {
  if (!props.exercise || !selectedProgram.value) return
  isSaving.value = true
  try {
    editor.addExercise(dayIndex, { name: props.exercise.name, sets: 3, reps: '8-12', rest: '60s' })
    await updateSchedule(selectedProgram.value.id, selectedSchedule.value)
    toast.add({ title: `Added to ${selectedProgram.value.name}`, color: 'success', icon: 'i-lucide-check' })
    open.value = false
  } catch {
    loadError.value = 'Could not add this exercise. Please try again in a moment.'
  } finally {
    isSaving.value = false
  }
}

async function addAsNewDay() {
  editor.addDay()
  await addToDay(selectedSchedule.value.length - 1)
}
</script>

<template>
  <UModal v-model:open="open" :title="`Add ${exercise?.name} to a program`">
    <template #body>
      <div v-if="loadError">
        <UAlert color="error" variant="subtle" icon="i-lucide-alert-circle" :description="loadError" />
      </div>

      <div v-else-if="step === 'program'">
        <div v-if="isLoadingPrograms" class="py-8 text-center">
          <UIcon name="i-lucide-loader-circle" class="size-8 text-primary mx-auto animate-spin" />
        </div>

        <div v-else-if="programs.length === 0" class="flex flex-col items-center text-center py-8">
          <p class="text-muted mb-4">You don't have any saved programs yet.</p>
          <div class="flex gap-2">
            <UButton to="/program" label="Build with AI" icon="i-lucide-sparkles" @click="open = false" />
            <UButton to="/programs/new" label="Start from Scratch" icon="i-lucide-pencil" color="neutral" variant="outline" @click="open = false" />
          </div>
        </div>

        <div v-else class="space-y-2">
          <button
            v-for="program in programs"
            :key="program.id"
            class="w-full flex items-center justify-between gap-3 p-3 rounded-lg border border-default hover:border-primary transition-colors text-left cursor-pointer"
            @click="chooseProgram(program)"
          >
            <div class="min-w-0">
              <p class="font-medium truncate">{{ program.name }}</p>
              <p class="text-muted text-xs">{{ program.schedule.length }}-Day Program</p>
            </div>
            <UBadge v-if="program.isActive" color="success" variant="subtle" size="sm">Active</UBadge>
          </button>
        </div>
      </div>

      <div v-else-if="step === 'day'" class="space-y-2">
        <UButton label="Back" icon="i-lucide-arrow-left" size="sm" color="neutral" variant="ghost" @click="step = 'program'" />
        <button
          v-for="(day, dayIndex) in selectedSchedule"
          :key="dayIndex"
          class="w-full flex items-center gap-2 p-3 rounded-lg border border-default hover:border-primary transition-colors text-left cursor-pointer"
          :disabled="isSaving"
          @click="addToDay(dayIndex)"
        >
          <span class="font-medium">{{ day.day }}</span>
          <span v-if="day.focus" class="text-muted">- {{ day.focus }}</span>
        </button>
        <UButton
          label="Add as new day"
          icon="i-lucide-plus"
          color="neutral"
          variant="outline"
          block
          :loading="isSaving"
          @click="addAsNewDay"
        />
      </div>
    </template>
  </UModal>
</template>
