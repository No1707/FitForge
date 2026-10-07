<script setup lang="ts">
import { fr } from '@nuxt/ui/locale'
const route = useRoute()
const colorMode = useColorMode()
const user = useSupabaseUser()
const { storageError } = useTrainingStore()
const links = [
  { label: 'Aujourd’hui', to: '/', icon: 'i-lucide-house' },
  { label: 'Programmes', to: '/programs', icon: 'i-lucide-notebook-tabs' },
  { label: 'Progression', to: '/progress', icon: 'i-lucide-chart-no-axes-combined' },
  { label: 'Exercices', to: '/exercises', icon: 'i-lucide-dumbbell' }
]
function isActive(path: string) {
  if (path === '/') return route.path === '/' || route.path === '/workout'
  if (path === '/programs') return route.path.startsWith('/program')
  return route.path.startsWith(path)
}
const pageLabel = computed(() => links.find(link => isActive(link.to))?.label || 'Mon compte')
function toggleTheme() { colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark' }
</script>

<template>
  <UApp :locale="fr" :scroll-body="false">
    <div class="ff-shell">
      <a href="#main-content" class="ff-skip">Aller au contenu</a>
      <aside class="ff-sidebar">
        <NuxtLink to="/" class="ff-brand"><span class="ff-brand-mark"><UIcon name="i-lucide-anvil" class="size-5" /></span>FitForge<span class="text-primary -ml-2">.</span></NuxtLink>
        <nav class="ff-nav mt-12" aria-label="Navigation principale">
          <NuxtLink v-for="link in links" :key="link.to" :to="link.to" :aria-current="isActive(link.to) ? 'page' : undefined"><UIcon :name="link.icon" class="size-5" />{{ link.label }}</NuxtLink>
        </nav>
        <div class="mt-auto pt-10">
          <NuxtLink to="/privacy" class="block px-2 text-xs text-muted hover:underline">Données et confidentialité</NuxtLink>
        </div>
      </aside>
      <div class="ff-workspace">
        <header class="ff-topbar">
          <p class="text-sm font-medium text-highlighted">{{ pageLabel }}</p>
          <div class="flex items-center gap-3"><ClientOnly><UButton :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'" color="neutral" variant="ghost" :aria-label="colorMode.value === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'" @click="toggleTheme" /><AccountMenu v-if="user" /><UButton v-else to="/login" label="Se connecter" color="neutral" variant="outline" /></ClientOnly></div>
        </header>
        <header class="ff-mobile-header"><NuxtLink to="/" class="ff-brand"><span class="ff-brand-mark"><UIcon name="i-lucide-anvil" class="size-5" /></span>FitForge<span class="text-primary -ml-2">.</span></NuxtLink><div class="flex items-center gap-1"><ClientOnly><UButton :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'" color="neutral" variant="ghost" aria-label="Changer le thème" @click="toggleTheme" /><AccountMenu v-if="user" /><UButton v-else to="/login" label="Connexion" color="neutral" variant="ghost" /></ClientOnly></div></header>
        <main id="main-content" tabindex="-1"><UAlert v-if="storageError" class="m-4" color="warning" icon="i-lucide-hard-drive" :description="storageError" /><NuxtPage :key="user?.sub || 'guest'" /></main>
      </div>
      <nav v-if="route.path !== '/workout'" class="ff-mobile-nav" aria-label="Navigation mobile"><NuxtLink v-for="link in links" :key="link.to" :to="link.to" :aria-current="isActive(link.to) ? 'page' : undefined"><UIcon :name="link.icon" class="size-5" />{{ link.label }}</NuxtLink></nav>
    </div>
  </UApp>
</template>
