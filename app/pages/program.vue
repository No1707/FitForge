<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import {
  fitnessGoals, experienceLevels, equipmentOptions, splitPreferences, scheduleTypeOptions,
  type ProgramFormData, type GeneratedProgram, type ClarificationQA, type GenerateProgramResponseBody
} from '~/utils/program-types'
import { exercises, muscleFilterGroups, type Exercise } from '~/utils/exercises'

const user = useSupabaseUser()
const { create: createProgram } = usePrograms()

const detailExercise = ref<Exercise | null>(null)
const isDetailOpen = ref(false)

function openDetail(exerciseName: string) {
  const found = exercises.find(e => e.name === exerciseName)
  if (!found) return
  detailExercise.value = found
  isDetailOpen.value = true
}

const currentStep = ref(0)
const generatedProgram = ref<GeneratedProgram | null>(null)
const programSource = ref<'ai' | 'fallback' | null>(null)
const isGenerating = ref(false)
const isSaving = ref(false)
const saveError = ref<string | null>(null)
const clarificationQuestions = ref<string[]>([])
const clarificationAnswers = ref<string[]>([])
const pendingFormData = ref<ProgramFormData | null>(null)

const steps = [
  { title: 'Personal Info', description: 'Tell us about yourself', icon: 'i-lucide-user' },
  { title: 'Your Goals', description: 'What do you want to achieve?', icon: 'i-lucide-target' },
  { title: 'Experience', description: 'Your fitness background', icon: 'i-lucide-trending-up' },
  { title: 'Schedule', description: 'How often can you train?', icon: 'i-lucide-calendar' },
  { title: 'Equipment', description: 'What equipment do you have?', icon: 'i-lucide-dumbbell' }
]

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  goals: z.array(z.enum(['muscle_building', 'fat_loss', 'strength', 'endurance', 'general_fitness'])).min(1, 'Select at least one goal'),
  experience: z.enum(['beginner', 'intermediate', 'advanced']),
  scheduleType: z.enum(['weekly', 'fixed']),
  daysPerWeek: z.number().min(2).max(14),
  sessionDuration: z.number().min(30).max(120),
  splitPreference: z.enum(['auto', 'full_body', 'upper_lower', 'push_pull_legs']),
  equipment: z.array(z.string()).min(1, 'Select at least one equipment type'),
  focusAreas: z.array(z.string()),
  excludeAreas: z.array(z.string()),
  additionalNotes: z.string().max(500).optional().default('')
})

type Schema = z.output<typeof schema>

const state = reactive<ProgramFormData>({
  name: '',
  goals: ['muscle_building'],
  experience: 'beginner',
  scheduleType: 'weekly',
  daysPerWeek: 3,
  sessionDuration: 60,
  splitPreference: 'auto',
  equipment: ['bodyweight'],
  focusAreas: [],
  excludeAreas: [],
  additionalNotes: ''
})

const weeklyDaysOptions = [2, 3, 4, 5, 6].map(n => ({ value: n, label: `${n} days` }))
const fixedDaysOptions = [7, 8, 9, 10, 11, 12, 13, 14].map(n => ({ value: n, label: `${n} days` }))
const dayCountOptions = computed(() => state.scheduleType === 'weekly' ? weeklyDaysOptions : fixedDaysOptions)
const dayCountLabel = computed(() => state.scheduleType === 'weekly' ? 'Days per week' : 'Total days in the program')

watch(() => state.scheduleType, (mode) => {
  state.daysPerWeek = mode === 'weekly' ? 3 : 7
})

const isStepValid = computed(() => {
  switch (currentStep.value) {
    case 0: return state.name.trim().length >= 2
    case 1: return state.goals.length > 0
    case 4: return state.equipment.length > 0
    default: return true
  }
})

function nextStep() {
  if (currentStep.value < steps.length - 1 && isStepValid.value) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

function goToStep(step: number) {
  // Only allow jumping back to an already-completed step, never skipping ahead.
  if (step < currentStep.value) {
    currentStep.value = step
  }
}

async function requestProgram(formData: ProgramFormData, clarifications?: ClarificationQA[]) {
  isGenerating.value = true
  try {
    const response = await $fetch<GenerateProgramResponseBody>('/api/generate-program', {
      method: 'POST',
      body: { formData, clarifications }
    })

    if (response.status === 'needs_clarification') {
      pendingFormData.value = formData
      clarificationQuestions.value = response.questions
      clarificationAnswers.value = response.questions.map(() => '')
      currentStep.value = steps.length
      return
    }

    generatedProgram.value = response.program
    programSource.value = response.source
    clarificationQuestions.value = []
    currentStep.value = steps.length
  } finally {
    isGenerating.value = false
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await requestProgram(event.data)
}

async function submitClarifications() {
  if (!pendingFormData.value) return
  const clarifications: ClarificationQA[] = clarificationQuestions.value.map((question, i) => ({
    question,
    answer: clarificationAnswers.value[i] || ''
  }))
  await requestProgram(pendingFormData.value, clarifications)
}

async function saveProgram() {
  if (!generatedProgram.value) return
  isSaving.value = true
  saveError.value = null
  try {
    const saved = await createProgram({
      name: generatedProgram.value.name,
      goal: generatedProgram.value.goal,
      source: 'ai',
      schedule: generatedProgram.value.schedule,
      tips: generatedProgram.value.tips
    })
    await navigateTo(`/programs/${saved.id}`)
  } catch (err) {
    console.error('[program] save failed:', err)
    saveError.value = 'Could not save your program. Please try again in a moment.'
  } finally {
    isSaving.value = false
  }
}

function startOver() {
  generatedProgram.value = null
  programSource.value = null
  clarificationQuestions.value = []
  clarificationAnswers.value = []
  pendingFormData.value = null
  currentStep.value = 0
  state.name = ''
  state.goals = ['muscle_building']
  state.experience = 'beginner'
  state.scheduleType = 'weekly'
  state.daysPerWeek = 3
  state.sessionDuration = 60
  state.splitPreference = 'auto'
  state.equipment = ['bodyweight']
  state.focusAreas = []
  state.excludeAreas = []
  state.additionalNotes = ''
}

const durationOptions = [
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '60 minutes' },
  { value: 90, label: '90 minutes' },
  { value: 120, label: '120 minutes' }
]
</script>

<template>
  <div class="py-8">
    <UContainer class="max-w-3xl">
      <div class="border-b border-default pb-6">
        <h1 class="text-3xl font-bold">Build Your Custom Program</h1>
        <p class="mt-2 text-muted">
          Answer a few questions and we will create a personalized workout program just for you.
        </p>
      </div>

      <!-- Stepper -->
      <div v-if="!generatedProgram && clarificationQuestions.length === 0" class="mt-8">
        <UStepper
          :items="steps.map((s, i) => ({ title: s.title, description: s.description, icon: s.icon }))"
          :model-value="currentStep"
          class="mb-8"
          @update:model-value="goToStep"
        />

        <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
          <UCard>
            <!-- Step 1: Personal Info -->
            <div v-show="currentStep === 0" class="space-y-6">
              <div class="text-center mb-6">
                <UIcon name="i-lucide-user" class="size-12 text-primary mx-auto mb-2" />
                <h2 class="text-xl font-semibold">What should we call you?</h2>
                <p class="text-muted">This will personalize your program.</p>
              </div>
              <UFormField name="name" label="Your Name" required>
                <UInput v-model="state.name" placeholder="Enter your name" size="lg" />
              </UFormField>
            </div>

            <!-- Step 2: Goals -->
            <div v-show="currentStep === 1" class="space-y-6">
              <div class="text-center mb-6">
                <UIcon name="i-lucide-target" class="size-12 text-primary mx-auto mb-2" />
                <h2 class="text-xl font-semibold">What are your goals?</h2>
                <p class="text-muted">Select one or more - this determines the structure of your workouts.</p>
              </div>
              <UFormField name="goals">
                <UCheckboxGroup
                  v-model="state.goals"
                  :items="fitnessGoals.map(g => ({ value: g.value, label: g.label, description: g.description }))"
                  class="space-y-3"
                />
              </UFormField>
            </div>

            <!-- Step 3: Experience -->
            <div v-show="currentStep === 2" class="space-y-6">
              <div class="text-center mb-6">
                <UIcon name="i-lucide-trending-up" class="size-12 text-primary mx-auto mb-2" />
                <h2 class="text-xl font-semibold">What is your experience level?</h2>
                <p class="text-muted">This helps us adjust the intensity appropriately.</p>
              </div>
              <UFormField name="experience">
                <URadioGroup
                  v-model="state.experience"
                  :items="experienceLevels.map(e => ({ value: e.value, label: e.label, description: e.description }))"
                  class="space-y-3"
                />
              </UFormField>
            </div>

            <!-- Step 4: Schedule -->
            <div v-show="currentStep === 3" class="space-y-6">
              <div class="text-center mb-6">
                <UIcon name="i-lucide-calendar" class="size-12 text-primary mx-auto mb-2" />
                <h2 class="text-xl font-semibold">How often can you train?</h2>
                <p class="text-muted">We will design your split based on your availability.</p>
              </div>
              <UFormField name="scheduleType" label="How do you want to count days?">
                <URadioGroup
                  v-model="state.scheduleType"
                  :items="scheduleTypeOptions.map(s => ({ value: s.value, label: s.label, description: s.description }))"
                  class="space-y-3"
                />
              </UFormField>
              <UFormField name="daysPerWeek" :label="dayCountLabel">
                <USelect v-model="state.daysPerWeek" :items="dayCountOptions" size="lg" />
              </UFormField>
              <UFormField name="sessionDuration" label="Session duration">
                <USelect v-model="state.sessionDuration" :items="durationOptions" size="lg" />
              </UFormField>
              <UFormField name="splitPreference" label="Preferred split">
                <URadioGroup
                  v-model="state.splitPreference"
                  :items="splitPreferences.map(s => ({ value: s.value, label: s.label, description: s.description }))"
                  class="space-y-3"
                />
              </UFormField>
            </div>

            <!-- Step 5: Equipment -->
            <div v-show="currentStep === 4" class="space-y-6">
              <div class="text-center mb-6">
                <UIcon name="i-lucide-dumbbell" class="size-12 text-primary mx-auto mb-2" />
                <h2 class="text-xl font-semibold">What equipment do you have?</h2>
                <p class="text-muted">Select all that apply.</p>
              </div>
              <UFormField name="equipment">
                <UCheckboxGroup
                  v-model="state.equipment"
                  :items="equipmentOptions.map(e => ({ value: e.value, label: e.label }))"
                  class="grid grid-cols-2 sm:grid-cols-3 gap-3"
                />
              </UFormField>
              <UFormField name="focusAreas" label="Focus areas (optional)" hint="Select muscle groups you want to prioritize">
                <UCheckboxGroup
                  v-model="state.focusAreas"
                  :items="muscleFilterGroups.map(m => ({ value: m.label, label: m.label }))"
                  class="grid grid-cols-3 gap-3"
                />
              </UFormField>
              <UFormField name="excludeAreas" label="Areas to avoid (optional)" hint="Select muscle groups to skip, e.g. for an injury">
                <UCheckboxGroup
                  v-model="state.excludeAreas"
                  :items="muscleFilterGroups.map(m => ({ value: m.label, label: m.label }))"
                  class="grid grid-cols-3 gap-3"
                />
              </UFormField>
              <UFormField name="additionalNotes" label="Anything else we should know? (optional)">
                <UTextarea
                  v-model="state.additionalNotes"
                  placeholder="Old shoulder injury, prefer supersets, no exercises on a bench, etc."
                  :rows="3"
                  class="w-full"
                />
              </UFormField>
            </div>

            <template #footer>
              <div class="flex justify-between">
                <UButton
                  v-if="currentStep > 0"
                  label="Back"
                  color="neutral"
                  variant="ghost"
                  icon="i-lucide-arrow-left"
                  :disabled="isGenerating"
                  @click="prevStep"
                />
                <div v-else />
                <UButton
                  v-if="currentStep < steps.length - 1"
                  label="Continue"
                  trailing-icon="i-lucide-arrow-right"
                  :disabled="!isStepValid"
                  @click="nextStep"
                />
                <UButton
                  v-else
                  type="submit"
                  label="Generate My Program"
                  icon="i-lucide-sparkles"
                  :loading="isGenerating"
                  :disabled="!isStepValid"
                />
              </div>
            </template>
          </UCard>
        </UForm>
      </div>

      <!-- Clarification Questions -->
      <div v-else-if="clarificationQuestions.length > 0 && !generatedProgram" class="mt-8">
        <UCard>
          <div class="text-center mb-6">
            <UIcon name="i-lucide-message-circle-question" class="size-12 text-primary mx-auto mb-2" />
            <h2 class="text-xl font-semibold">Just a few more details</h2>
            <p class="text-muted">Your answers help us fine-tune the program before generating it.</p>
          </div>
          <div class="space-y-5">
            <UFormField
              v-for="(question, i) in clarificationQuestions"
              :key="i"
              :label="question"
            >
              <UTextarea v-model="clarificationAnswers[i]" :rows="2" class="w-full" />
            </UFormField>
          </div>
          <template #footer>
            <div class="flex justify-between">
              <UButton
                label="Back"
                color="neutral"
                variant="ghost"
                icon="i-lucide-arrow-left"
                @click="clarificationQuestions = []; currentStep = steps.length - 1"
              />
              <UButton
                label="Continue"
                icon="i-lucide-sparkles"
                :loading="isGenerating"
                @click="submitClarifications"
              />
            </div>
          </template>
        </UCard>
      </div>

      <!-- Generated Program -->
      <div v-else-if="generatedProgram" class="mt-8 space-y-6">
        <UAlert
          title="Your program is ready!"
          :description="`${generatedProgram.name} has been created based on your preferences.`"
          icon="i-lucide-check-circle"
          color="success"
        />

        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-xl font-bold">{{ generatedProgram.name }}</h2>
                <p class="text-muted">Goal: {{ generatedProgram.goal }}</p>
              </div>
              <div class="flex flex-col items-end gap-2">
                <UBadge v-if="programSource === 'ai'" color="primary" variant="subtle" icon="i-lucide-sparkles">AI-generated</UBadge>
                <UBadge color="primary" size="lg">{{ generatedProgram.schedule.length }}-Day Program</UBadge>
              </div>
            </div>
          </template>

          <div class="space-y-6">
            <div v-for="day in generatedProgram.schedule" :key="day.day">
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
                  <div class="flex items-center gap-1 min-w-0">
                    <UButton
                      icon="i-lucide-info"
                      size="xs"
                      color="neutral"
                      variant="ghost"
                      aria-label="View exercise details"
                      @click="openDetail(exercise.name)"
                    />
                    <span class="font-medium truncate">{{ exercise.name }}</span>
                  </div>
                  <div class="flex gap-4 text-sm text-muted shrink-0">
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
          title="Tips for Success"
          icon="i-lucide-lightbulb"
          color="warning"
          variant="subtle"
        >
          <template #description>
            <ul class="list-disc list-inside space-y-1 mt-2">
              <li v-for="tip in generatedProgram.tips" :key="tip">{{ tip }}</li>
            </ul>
          </template>
        </UAlert>

        <UAlert
          v-if="saveError"
          color="error"
          variant="subtle"
          icon="i-lucide-alert-circle"
          :description="saveError"
        />

        <div class="flex flex-wrap gap-4">
          <UButton
            v-if="user"
            label="Save Program"
            icon="i-lucide-save"
            :loading="isSaving"
            @click="saveProgram"
          />
          <UButton
            v-else
            label="Log in to save"
            icon="i-lucide-log-in"
            to="/login"
          />
          <UButton
            label="Start Over"
            color="neutral"
            variant="outline"
            icon="i-lucide-refresh-cw"
            @click="startOver"
          />
          <UButton
            label="Browse Exercises"
            color="neutral"
            variant="outline"
            to="/exercises"
            icon="i-lucide-dumbbell"
          />
        </div>
      </div>
    </UContainer>

    <ExerciseDetailModal v-model:open="isDetailOpen" :exercise="detailExercise">
      <template #footer>
        <UButton label="Close" color="neutral" variant="outline" @click="isDetailOpen = false" />
      </template>
    </ExerciseDetailModal>
  </div>
</template>
