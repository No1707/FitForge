<script setup lang="ts">
import { safeRedirect } from '~/utils/program-validation'
const user = useSupabaseUser()
const route = useRoute()
const timedOut = ref(false)
const redirect = ref('/')
let timer: ReturnType<typeof setTimeout> | undefined
let stop: (() => void) | undefined
onMounted(() => {
  let saved = '/'
  try { saved = sessionStorage.getItem('fitforge:auth-return') || '/' } catch { /* Use the return URL from the link. */ }
  redirect.value = safeRedirect(route.query.redirect, safeRedirect(saved))
  function complete() { clearTimeout(timer); stop?.(); navigateTo(redirect.value) }
  if (user.value) complete()
  else { timer = setTimeout(() => { timedOut.value = true }, 8000); stop = watch(user, value => { if (value) complete() }) }
})
onBeforeUnmount(() => { clearTimeout(timer); stop?.() })
</script>
<template><div class="ff-page max-w-xl py-20 text-center"><template v-if="!timedOut"><UIcon name="i-lucide-loader-circle" class="size-9 animate-spin text-primary mb-5" /><h1 class="text-xl font-semibold">Confirmation du compte…</h1></template><template v-else><UAlert color="warning" title="Confirmation en attente" description="Essaie de te connecter." /><UButton :to="{ path: '/login', query: { redirect } }" label="Aller à la connexion" class="mt-5" /></template></div></template>
