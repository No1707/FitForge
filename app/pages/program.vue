<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { fitnessGoals, experienceLevels, equipmentOptions, splitPreferences, type ProgramFormData, type GeneratedProgram } from '~/utils/program-types'
import { muscleFilterGroups } from '~/utils/exercises'
import { generateProgram } from '~/utils/program-generator'

const currentStep = ref(0)
const generatedProgram = ref<GeneratedProgram | null>(null)

const steps = [
  { title: 'Personal Info', description: 'Tell us about yourself', icon: 'i-lucide-user' },
  { title: 'Your Goals', description: 'What do you want to achieve?', icon: 'i-lucide-target' },
  { title: 'Experience', description: 'Your fitness background', icon: 'i-lucide-trending-up' },
  { title: 'Schedule', description: 'How often can you train?', icon: 'i-lucide-calendar' },
  { title: 'Equipment', description: 'What equipment do you have?', icon: 'i-lucide-dumbbell' }
]

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  goal: z.enum(['muscle_building', 'fat_loss', 'strength', 'endurance', 'general_fitness']),
  experience: z.enum(['beginner', 'intermediate', 'advanced']),
  daysPerWeek: z.number().min(2).max(6),
  sessionDuration: z.number().min(30).max(120),
  splitPreference: z.enum(['auto', 'full_body', 'upper_lower', 'push_pull_legs']),
  equipment: z.array(z.string()).min(1, 'Select at least one equipment type'),
  focusAreas: z.array(z.string()),
  excludeAreas: z.array(z.string())
})

type Schema = z.output<typeof schema>

const state = reactive<ProgramFormData>({
  name: '',
  goal: 'muscle_building',
  experience: 'beginner',
  daysPerWeek: 3,
  sessionDuration: 60,
  splitPreference: 'auto',
  equipment: ['bodyweight'],
  focusAreas: [],
  excludeAreas: []
})

function nextStep() {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  generatedProgram.value = generateProgram(event.data)
  currentStep.value = steps.length
}

function startOver() {
  generatedProgram.value = null
  currentStep.value = 0
  state.name = ''
  state.goal = 'muscle_building'
  state.experience = 'beginner'
  state.daysPerWeek = 3
  state.sessionDuration = 60
  state.splitPreference = 'auto'
  state.equipment = ['bodyweight']
  state.focusAreas = []
  state.excludeAreas = []
}

const daysOptions = [
  { value: 2, label: '2 days' },
  { value: 3, label: '3 days' },
  { value: 4, label: '4 days' },
  { value: 5, label: '5 days' },
  { value: 6, label: '6 days' }
]

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
      <div v-if="!generatedProgram" class="mt-8">
        <UStepper
          :items="steps.map((s, i) => ({ title: s.title, description: s.description, icon: s.icon }))"
          :model-value="currentStep"
          class="mb-8"
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
                <h2 class="text-xl font-semibold">What is your main goal?</h2>
                <p class="text-muted">This determines the structure of your workouts.</p>
              </div>
              <UFormField name="goal">
                <URadioGroup
                  v-model="state.goal"
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
              <UFormField name="daysPerWeek" label="Days per week">
                <USelect v-model="state.daysPerWeek" :items="daysOptions" size="lg" />
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
            </div>

            <template #footer>
              <div class="flex justify-between">
                <UButton
                  v-if="currentStep > 0"
                  label="Back"
                  color="neutral"
                  variant="ghost"
                  icon="i-lucide-arrow-left"
                  @click="prevStep"
                />
                <div v-else />
                <UButton
                  v-if="currentStep < steps.length - 1"
                  label="Continue"
                  trailing-icon="i-lucide-arrow-right"
                  @click="nextStep"
                />
                <UButton
                  v-else
                  type="submit"
                  label="Generate My Program"
                  icon="i-lucide-sparkles"
                />
              </div>
            </template>
          </UCard>
        </UForm>
      </div>

      <!-- Generated Program -->
      <div v-else class="mt-8 space-y-6">
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
              <UBadge color="primary" size="lg">{{ generatedProgram.schedule.length }} days/week</UBadge>
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

        <div class="flex gap-4">
          <UButton
            label="Start Over"
            color="neutral"
            variant="outline"
            icon="i-lucide-refresh-cw"
            @click="startOver"
          />
          <UButton
            label="Browse Exercises"
            to="/exercises"
            icon="i-lucide-dumbbell"
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>
