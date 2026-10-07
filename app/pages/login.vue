<script setup lang="ts">
import { safeRedirect } from '~/utils/program-validation'
const route = useRoute()
const { signInWithPassword, user, error, isLoading } = useAuth()
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const remember = ref(true)
const pending = ref(false)
const resetSent = ref(false)
const redirect = computed(() => safeRedirect(route.query.redirect))
let stop: (() => void) | undefined
let timer: ReturnType<typeof setTimeout> | undefined
function navigateWhenReady() {
  if (user.value) { navigateTo(redirect.value); return }
  stop = watch(user, identity => { if (identity) { clearTimeout(timer); stop?.(); navigateTo(redirect.value) } })
  timer = setTimeout(() => { stop?.(); pending.value = false; error.value = 'La session met du temps à s’ouvrir. Réessaie dans un instant.' }, 8000)
}
async function login() { if (pending.value) return; pending.value = true; resetSent.value = false; if (await signInWithPassword(email.value.trim(), password.value, remember.value)) navigateWhenReady(); else pending.value = false }
async function resetPassword() {
  if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { error.value = 'Indique ton adresse e-mail pour recevoir le lien de réinitialisation.'; return }
  pending.value = true; error.value = null
  try { const { error: failure } = await supabase.auth.resetPasswordForEmail(email.value.trim(), { redirectTo: `${window.location.origin}/reset-password` }); if (failure) throw failure; resetSent.value = true }
  catch { error.value = 'Le lien n’a pas pu être envoyé. Réessaie dans un instant.' }
  finally { pending.value = false }
}
onBeforeUnmount(() => { stop?.(); clearTimeout(timer) })
useHead({ title: 'Connexion · FitForge' })
</script>
<template><div class="ff-page max-w-xl py-12 sm:py-20"><h1 class="ff-title">Connexion</h1><form method="post" class="ff-panel ff-panel-pad space-y-5 mt-7" @submit.prevent="login"><label class="block text-sm font-semibold">Adresse e-mail<input v-model="email" type="email" autocomplete="email" required class="ff-field mt-2" placeholder="toi@exemple.fr" /></label><PasswordField v-model="password" label="Mot de passe" /><label class="flex items-center gap-3 text-sm cursor-pointer min-h-11"><input v-model="remember" type="checkbox" class="size-4 accent-[var(--ui-primary)]" />Rester connecté</label><UAlert v-if="error" :description="error" color="error" /><UAlert v-if="resetSent" description="Si un compte correspond à cette adresse, tu recevras un lien pour choisir un nouveau mot de passe." color="success" /><UButton type="submit" label="Se connecter" block :loading="pending || isLoading" /><button type="button" class="text-sm text-muted underline underline-offset-4 min-h-9" :disabled="pending" @click="resetPassword">Mot de passe oublié ?</button></form><p class="text-sm text-muted mt-6 text-center"><NuxtLink :to="{ path: '/signup', query: { redirect } }" class="ff-link">Créer un compte</NuxtLink></p><NuxtLink to="/" class="block text-center text-xs text-muted mt-5 underline underline-offset-4">Continuer sans compte</NuxtLink></div></template>
