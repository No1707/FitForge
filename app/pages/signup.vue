<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const { signUp, error, isLoading } = useAuth()

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

type Schema = z.output<typeof schema>

const state = reactive({ email: '', password: '' })
const isSubmitted = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const success = await signUp(event.data.email, event.data.password)
  if (success) {
    isSubmitted.value = true
  }
}
</script>

<template>
  <div class="py-16">
    <UContainer class="max-w-sm">
      <div class="text-center mb-8">
        <UIcon name="i-lucide-flame" class="size-10 text-primary mx-auto mb-2" />
        <h1 class="text-2xl font-bold">Create your account</h1>
        <p class="text-muted mt-1">Save your workout programs and pick up where you left off.</p>
      </div>

      <UCard v-if="!isSubmitted">
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormField name="email" label="Email" required>
            <UInput v-model="state.email" type="email" placeholder="you@example.com" class="w-full" />
          </UFormField>
          <UFormField name="password" label="Password" required>
            <UInput v-model="state.password" type="password" placeholder="••••••••" class="w-full" />
          </UFormField>

          <UAlert
            v-if="error"
            color="error"
            variant="subtle"
            icon="i-lucide-alert-circle"
            :description="error"
          />

          <UButton type="submit" label="Sign up" block :loading="isLoading" />
        </UForm>
      </UCard>

      <UAlert
        v-else
        color="success"
        variant="subtle"
        icon="i-lucide-mail-check"
        title="Check your email"
        description="We sent you a confirmation link. Click it to activate your account, then log in."
      />

      <p class="text-center text-muted text-sm mt-4">
        Already have an account?
        <NuxtLink to="/login" class="text-primary font-medium">Log in</NuxtLink>
      </p>
    </UContainer>
  </div>
</template>
