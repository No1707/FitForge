<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const route = useRoute()
const { signInWithPassword, user, error, isLoading } = useAuth()

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

type Schema = z.output<typeof schema>

const state = reactive({ email: '', password: '' })

// useSupabaseUser() updates via an async auth-state-change event, slightly
// after signInWithPassword resolves - navigating before it settles would
// make the destination page's auth middleware still see a logged-out user.
function waitForUser() {
  if (user.value) return Promise.resolve()
  return new Promise<void>((resolve) => {
    const stop = watch(user, (value) => {
      if (value) {
        stop()
        resolve()
      }
    })
  })
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const success = await signInWithPassword(event.data.email, event.data.password)
  if (success) {
    await waitForUser()
    const redirect = route.query.redirect
    await navigateTo(typeof redirect === 'string' ? redirect : '/programs')
  }
}
</script>

<template>
  <div class="py-16">
    <UContainer class="max-w-sm">
      <div class="text-center mb-8">
        <UIcon name="i-lucide-anvil" class="size-10 text-primary mx-auto mb-2" />
        <h1 class="text-2xl font-bold">Welcome back</h1>
        <p class="text-muted mt-1">Log in to access your saved programs.</p>
      </div>

      <UCard>
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

          <UButton type="submit" label="Log in" block :loading="isLoading" />
        </UForm>
      </UCard>

      <p class="text-center text-muted text-sm mt-4">
        Don't have an account?
        <NuxtLink to="/signup" class="text-primary font-medium">Sign up</NuxtLink>
      </p>
    </UContainer>
  </div>
</template>
