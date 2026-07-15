<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
</script>

<template>
  <div class="py-8">
    <UContainer class="max-w-3xl">
      <div class="border-b border-default pb-6">
        <h1 class="text-3xl font-bold">My Programs</h1>
        <p class="mt-2 text-muted">Programs you've saved to your account.</p>
      </div>

      <div class="mt-12 flex flex-col items-center text-center py-16">
        <div class="p-4 rounded-full bg-elevated mb-4">
          <UIcon name="i-lucide-clipboard-list" class="size-8 text-muted" />
        </div>
        <h3 class="font-semibold text-lg">No saved programs yet</h3>
        <p class="text-muted mt-1 mb-4">Build a personalized program and save it to your account.</p>
        <UButton to="/program" label="Build with AI" icon="i-lucide-sparkles" />
      </div>
    </UContainer>
  </div>
</template>
