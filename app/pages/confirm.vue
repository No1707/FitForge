<script setup lang="ts">
const user = useSupabaseUser()
const hasTimedOut = ref(false)

onMounted(() => {
  // The Supabase client auto-detects the confirmation token in the URL and
  // establishes the session - we just wait for `user` to become truthy.
  if (user.value) {
    navigateTo('/programs')
    return
  }

  const timeout = setTimeout(() => {
    if (!user.value) hasTimedOut.value = true
  }, 5000)

  const stop = watch(user, (value) => {
    if (value) {
      clearTimeout(timeout)
      stop()
      navigateTo('/programs')
    }
  })
})
</script>

<template>
  <div class="py-24">
    <UContainer class="max-w-sm text-center">
      <template v-if="!hasTimedOut">
        <UIcon name="i-lucide-loader-circle" class="size-10 text-primary mx-auto mb-4 animate-spin" />
        <h1 class="text-xl font-semibold">Confirming your account…</h1>
        <p class="text-muted mt-1">This will only take a moment.</p>
      </template>
      <UAlert
        v-else
        color="error"
        variant="subtle"
        icon="i-lucide-alert-circle"
        title="Confirmation link expired or invalid"
        description="Please try logging in, or sign up again to get a new confirmation email."
      />
      <UButton v-if="hasTimedOut" to="/login" label="Go to login" class="mt-4" />
    </UContainer>
  </div>
</template>
