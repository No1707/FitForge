<script setup lang="ts">
const { userId, syncMessage, data } = useTrainingStore()
const pending = computed(() => !!userId.value && !!(data.value.pendingWorkouts.length || data.value.deletedWorkouts.length))
</script>
<template>
  <div v-if="syncMessage || pending" class="flex items-start gap-2 text-xs text-muted leading-relaxed" role="status">
    <UIcon name="i-lucide-cloud-upload" class="size-4 shrink-0 mt-0.5" />
    <p v-if="syncMessage">{{ syncMessage }}</p>
    <p v-else>Synchronisation en attente.</p>
  </div>
</template>
