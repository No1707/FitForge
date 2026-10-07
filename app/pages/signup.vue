<script setup lang="ts">
import { safeRedirect } from '~/utils/program-validation'
const route = useRoute()
const { signUp, user, error, isLoading } = useAuth()
const email = ref('')
const password = ref('')
const submitted = ref(false)
const redirect = computed(() => safeRedirect(route.query.redirect))
async function submit() {
  if (await signUp(email.value.trim(), password.value, redirect.value)) {
    try { sessionStorage.setItem('fitforge:auth-return', redirect.value) } catch { /* The return URL is also in the confirmation link. */ }
    if (user.value) await navigateTo(redirect.value)
    else submitted.value = true
  }
}
useHead({ title: 'Créer mon compte · FitForge' })
</script>
<template><div class="ff-page max-w-xl py-12 sm:py-20"><h1 class="ff-title">Créer un compte</h1><form method="post" v-if="!submitted" class="ff-panel ff-panel-pad space-y-5 mt-7" @submit.prevent="submit"><label class="block text-sm font-semibold">Adresse e-mail<input v-model="email" type="email" autocomplete="email" required class="ff-field mt-2" placeholder="toi@exemple.fr" /></label><PasswordField v-model="password" label="Mot de passe" autocomplete="new-password" :minlength="8"><span class="block text-xs text-muted mt-2">Au moins 8 caractères.</span></PasswordField><UAlert v-if="error" :description="error" color="error" /><UButton type="submit" label="Créer mon compte" block :loading="isLoading" /><p class="text-xs text-muted leading-relaxed"><NuxtLink to="/privacy" class="underline underline-offset-2">Utilisation des données</NuxtLink></p></form><UAlert v-else title="Confirme ton adresse e-mail" description="Ouvre le lien reçu par e-mail." icon="i-lucide-mail-check" color="success" class="mt-7" /><p class="text-sm text-muted mt-6 text-center">Déjà un compte ? <NuxtLink :to="{ path: '/login', query: { redirect } }" class="ff-link">Se connecter</NuxtLink></p></div></template>
