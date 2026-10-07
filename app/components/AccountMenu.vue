<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { user, signOut } = useAuth()
const toast = useToast()

async function handleSignOut() {
  try { await signOut(); await navigateTo('/') }
  catch { toast.add({ title: 'La déconnexion a échoué. Réessaie.', color: 'error' }) }
}

const items = computed<DropdownMenuItem[][]>(() => [
  [
    { label: user.value?.email || 'Mon compte', type: 'label' }
  ],
  [
    { label: 'Mes programmes', icon: 'i-lucide-notebook-tabs', to: '/programs' },
    { label: 'Ma progression', icon: 'i-lucide-chart-no-axes-combined', to: '/progress' },
    { label: 'Mes données', icon: 'i-lucide-shield-check', to: '/privacy' }
  ],
  [
    { label: 'Se déconnecter', icon: 'i-lucide-log-out', onSelect: handleSignOut }
  ]
])
</script>

<template>
  <UDropdownMenu :items="items" :content="{ align: 'end' }">
    <UButton color="neutral" variant="ghost" icon="i-lucide-user-round" aria-label="Menu du compte" />
  </UDropdownMenu>
</template>
