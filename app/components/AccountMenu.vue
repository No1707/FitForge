<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { user, signOut } = useAuth()

async function handleSignOut() {
  await signOut()
  await navigateTo('/')
}

const items = computed<DropdownMenuItem[][]>(() => [
  [
    { label: user.value?.email || 'Account', type: 'label' }
  ],
  [
    { label: 'My Programs', icon: 'i-lucide-clipboard-list', to: '/programs' }
  ],
  [
    { label: 'Log out', icon: 'i-lucide-log-out', onSelect: handleSignOut }
  ]
])
</script>

<template>
  <UDropdownMenu :items="items" :content="{ align: 'end' }">
    <UButton color="neutral" variant="ghost" icon="i-lucide-user-round" aria-label="Account menu" />
  </UDropdownMenu>
</template>
