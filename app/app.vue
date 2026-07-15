<script setup lang="ts">
const links = [
  { label: 'Home', to: '/', icon: 'i-lucide-home' },
  { label: 'Exercises', to: '/exercises', icon: 'i-lucide-dumbbell' },
  { label: 'Build Program', to: '/program', icon: 'i-lucide-clipboard-list' },
  { label: 'My Programs', to: '/programs', icon: 'i-lucide-user-round' }
]

const isMenuOpen = ref(false)
const route = useRoute()
const colorMode = useColorMode()
const user = useSupabaseUser()

watch(() => route.path, () => {
  isMenuOpen.value = false
})

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <UApp>
    <div class="min-h-screen flex flex-col bg-default">
      <!-- Header -->
      <header class="sticky top-0 z-50 border-b border-default bg-default/80 backdrop-blur">
        <UContainer class="flex items-center justify-between h-16">
          <NuxtLink to="/" class="flex items-center gap-2">
            <UIcon name="i-lucide-flame" class="size-6 text-primary" />
            <span class="font-bold text-xl">FitForge</span>
          </NuxtLink>

          <nav class="hidden md:flex items-center gap-1">
            <UButton
              v-for="link in links"
              :key="link.to"
              :to="link.to"
              :label="link.label"
              :icon="link.icon"
              :color="route.path === link.to ? 'primary' : 'neutral'"
              :variant="route.path === link.to ? 'soft' : 'ghost'"
            />
          </nav>

          <div class="flex items-center gap-2">
            <ClientOnly>
              <UButton
                :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
                color="neutral"
                variant="ghost"
                :aria-label="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
                @click="toggleColorMode"
              />
              <template #fallback>
                <UButton icon="i-lucide-moon" color="neutral" variant="ghost" aria-label="Toggle color mode" />
              </template>
            </ClientOnly>
            <ClientOnly>
              <template v-if="user">
                <AccountMenu />
              </template>
              <template v-else>
                <UButton to="/login" label="Log in" color="neutral" variant="ghost" class="hidden sm:inline-flex" />
                <UButton to="/program" label="Get Started" color="primary" class="hidden sm:inline-flex" />
              </template>
              <template #fallback>
                <UButton to="/program" label="Get Started" color="primary" class="hidden sm:inline-flex" />
              </template>
            </ClientOnly>
            <UButton
              class="md:hidden"
              :icon="isMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
              color="neutral"
              variant="ghost"
              aria-label="Toggle menu"
              @click="isMenuOpen = !isMenuOpen"
            />
          </div>
        </UContainer>

        <!-- Mobile nav -->
        <div v-if="isMenuOpen" class="md:hidden border-t border-default">
          <UContainer class="py-3 flex flex-col gap-1">
            <UButton
              v-for="link in links"
              :key="link.to"
              :to="link.to"
              :label="link.label"
              :icon="link.icon"
              block
              class="justify-start"
              :color="route.path === link.to ? 'primary' : 'neutral'"
              :variant="route.path === link.to ? 'soft' : 'ghost'"
            />
          </UContainer>
        </div>
      </header>

      <!-- Main -->
      <main class="flex-1">
        <NuxtPage />
      </main>

      <!-- Footer -->
      <footer class="border-t border-default mt-16">
        <UContainer class="py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-flame" class="size-5 text-primary" />
            <span class="font-semibold">FitForge</span>
          </div>
          <p class="text-muted text-sm">
            © {{ new Date().getFullYear() }} FitForge. Built for fitness enthusiasts.
          </p>
          <div class="flex gap-2">
            <UButton
              icon="i-simple-icons-github"
              color="neutral"
              variant="ghost"
              to="https://github.com/No1707"
              target="_blank"
              aria-label="GitHub"
            />
          </div>
        </UContainer>
      </footer>
    </div>
  </UApp>
</template>
