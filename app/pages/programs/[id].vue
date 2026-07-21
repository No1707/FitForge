<script setup lang="ts">
import type { Exercise } from '~/utils/exercises'
import { toEditableSchedule, type EditableDay, type SavedProgram } from '~/utils/program-editor-types'

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const { get, remove, setActive, updateSchedule } = usePrograms()

const program = ref<SavedProgram | null>(null)
const schedule = ref<EditableDay[]>([])
const isLoading = ref(true)
const isDeleting = ref(false)
const isActivating = ref(false)
const isSaving = ref(false)
const notFound = ref(false)
const loadError = ref<string | null>(null)
const saveError = ref<string | null>(null)

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
    schedule.value = toEditableSchedule(result.schedule)
  } catch {
    loadError.value = 'Could not load this program. Please try again in a moment.'
  } finally {
    isLoading.value = false
  }
}

await loadProgram()

const editor = useProgramEditor(schedule)

async function persistSchedule() {
  if (!program.value) return
  isSaving.value = true
  saveError.value = null
  try {
    await updateSchedule(program.value.id, schedule.value)
  } catch {
    saveError.value = 'Could not save your changes. Please try again in a moment.'
  } finally {
    isSaving.value = false
  }
}

let saveTimeout: ReturnType<typeof setTimeout> | undefined
function scheduleSave() {
  clearTimeout(saveTimeout)
  saveTimeout = setTimeout(persistSchedule, 700)
}

function handleAddDay() {
  editor.addDay()
  persistSchedule()
}

function handleRemoveDay(dayIndex: number) {
  editor.removeDay(dayIndex)
  persistSchedule()
}

function handleFocusInput(dayIndex: number, value: string) {
  editor.updateDayFocus(dayIndex, value)
  scheduleSave()
}

function handleNotesInput(dayIndex: number, value: string) {
  editor.updateDayNotes(dayIndex, value)
  scheduleSave()
}

function handleRemoveExercise(dayIndex: number, exerciseId: string) {
  editor.removeExercise(dayIndex, exerciseId)
  persistSchedule()
}

function handleMoveExercise(dayIndex: number, exerciseId: string, direction: 'up' | 'down') {
  editor.moveExercise(dayIndex, exerciseId, direction)
  persistSchedule()
}

function handleSetsInput(dayIndex: number, exerciseId: string, value: string) {
  editor.updateExercise(dayIndex, exerciseId, { sets: Number(value) || 0 })
  scheduleSave()
}

function handleRepsInput(dayIndex: number, exerciseId: string, value: string) {
  editor.updateExercise(dayIndex, exerciseId, { reps: value })
  scheduleSave()
}

function handleRestInput(dayIndex: number, exerciseId: string, value: string) {
  editor.updateExercise(dayIndex, exerciseId, { rest: value })
  scheduleSave()
}

const pickerOpenForDay = ref<number | null>(null)

function openPicker(dayIndex: number) {
  pickerOpenForDay.value = dayIndex
}

function handleExerciseSelected(exercise: Exercise) {
  if (pickerOpenForDay.value === null) return
  editor.addExercise(pickerOpenForDay.value, {
    name: exercise.name,
    sets: 3,
    reps: '8-12',
    rest: '60s'
  })
  persistSchedule()
}

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
    <UContainer class="max-w-6xl">
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
        <div class="flex items-center justify-between border-b border-default pb-6 flex-wrap gap-3">
          <UButton to="/programs" label="My Programs" icon="i-lucide-arrow-left" color="neutral" variant="ghost" />
          <div class="flex items-center gap-2">
            <span v-if="isSaving" class="flex items-center gap-1 text-muted text-sm">
              <UIcon name="i-lucide-loader-circle" class="size-4 animate-spin" />
              Saving…
            </span>
            <UBadge v-if="program.isActive" color="success" variant="subtle" icon="i-lucide-check">Active</UBadge>
            <UButton v-else label="Set as Active" size="sm" color="neutral" variant="outline" :loading="isActivating" @click="activateProgram" />
            <UButton icon="i-lucide-trash-2" size="sm" color="error" variant="outline" :loading="isDeleting" @click="deleteProgram" />
          </div>
        </div>

        <div class="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 class="text-xl font-bold">{{ program.name }}</h2>
            <p class="text-muted">Goal: {{ program.goal }}</p>
          </div>
          <div class="flex items-center gap-2">
            <UBadge v-if="program.source === 'ai'" color="primary" variant="subtle" icon="i-lucide-sparkles">AI-generated</UBadge>
            <UBadge color="primary" size="lg">{{ schedule.length }}-Day Program</UBadge>
          </div>
        </div>

        <UAlert
          v-if="saveError"
          color="error"
          variant="subtle"
          icon="i-lucide-alert-circle"
          :description="saveError"
        />

        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <UCard v-for="(day, dayIndex) in schedule" :key="dayIndex">
            <template #header>
              <div class="flex items-center justify-between gap-2">
                <span class="font-semibold text-sm text-muted shrink-0">{{ day.day }}</span>
                <UButton
                  icon="i-lucide-trash-2"
                  size="xs"
                  color="error"
                  variant="ghost"
                  @click="handleRemoveDay(dayIndex)"
                />
              </div>
              <UInput
                :model-value="day.focus"
                placeholder="e.g. Push Day"
                class="w-full mt-2"
                @update:model-value="handleFocusInput(dayIndex, String($event))"
              />
            </template>

            <div class="space-y-3">
              <UTextarea
                :model-value="day.notes"
                placeholder="Notes for this day (optional)"
                :rows="2"
                class="w-full"
                @update:model-value="handleNotesInput(dayIndex, String($event))"
              />

              <div class="space-y-1">
                <div
                  v-for="(exercise, exIndex) in day.exercises"
                  :key="exercise.id"
                  class="p-2 rounded-lg bg-muted space-y-1.5"
                >
                  <div class="flex items-center justify-between gap-2">
                    <p class="font-medium text-sm truncate min-w-0">{{ exercise.name }}</p>
                    <div class="flex items-center shrink-0">
                      <UButton
                        icon="i-lucide-chevron-up"
                        size="xs"
                        color="neutral"
                        variant="ghost"
                        :disabled="exIndex === 0"
                        @click="handleMoveExercise(dayIndex, exercise.id, 'up')"
                      />
                      <UButton
                        icon="i-lucide-chevron-down"
                        size="xs"
                        color="neutral"
                        variant="ghost"
                        :disabled="exIndex === day.exercises.length - 1"
                        @click="handleMoveExercise(dayIndex, exercise.id, 'down')"
                      />
                      <UButton
                        icon="i-lucide-x"
                        size="xs"
                        color="error"
                        variant="ghost"
                        @click="handleRemoveExercise(dayIndex, exercise.id)"
                      />
                    </div>
                  </div>
                  <div class="flex items-center gap-1 text-xs text-muted">
                    <UInput
                      :model-value="exercise.sets"
                      type="number"
                      size="xs"
                      class="w-12"
                      @update:model-value="handleSetsInput(dayIndex, exercise.id, String($event))"
                    />
                    <span>sets</span>
                    <UInput
                      :model-value="exercise.reps"
                      size="xs"
                      class="w-16"
                      @update:model-value="handleRepsInput(dayIndex, exercise.id, String($event))"
                    />
                    <span>reps</span>
                    <UInput
                      :model-value="exercise.rest"
                      size="xs"
                      class="w-16"
                      @update:model-value="handleRestInput(dayIndex, exercise.id, String($event))"
                    />
                    <span>rest</span>
                  </div>
                </div>
              </div>

              <UButton
                label="Add Exercise"
                icon="i-lucide-plus"
                size="sm"
                color="neutral"
                variant="outline"
                block
                @click="openPicker(dayIndex)"
              />
            </div>
          </UCard>

          <UButton
            label="Add Day"
            icon="i-lucide-plus"
            color="neutral"
            variant="outline"
            block
            class="h-full min-h-24"
            @click="handleAddDay"
          />
        </div>

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

    <ExercisePicker
      :open="pickerOpenForDay !== null"
      @update:open="(value) => { if (!value) pickerOpenForDay = null }"
      @select="handleExerciseSelected"
    />
  </div>
</template>
