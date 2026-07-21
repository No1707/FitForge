<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  confirmColor?: 'error' | 'primary'
}>(), {
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  confirmColor: 'error'
})

const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ confirm: [] }>()

function handleConfirm() {
  emit('confirm')
  open.value = false
}
</script>

<template>
  <UModal v-model:open="open" :title="title" :description="description">
    <template #footer>
      <UButton :label="cancelLabel" color="neutral" variant="outline" @click="open = false" />
      <UButton :label="confirmLabel" :color="confirmColor" @click="handleConfirm" />
    </template>
  </UModal>
</template>
