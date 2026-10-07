<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()
const password = ref('')
const confirmation = ref('')
const busy = ref(false)
const error = ref('')
const success = ref(false)
async function save() {
  error.value = ''
  if (password.value !== confirmation.value) { error.value = 'Les deux mots de passe doivent être identiques.'; return }
  busy.value = true
  try { const result = await client.auth.updateUser({ password: password.value }); if (result.error) throw result.error; success.value = true }
  catch { error.value = 'Le mot de passe n’a pas pu être modifié. Demande un nouveau lien si celui-ci a expiré.' }
  finally { busy.value = false }
}
</script>
<template><div class="ff-page max-w-xl py-16"><h1 class="ff-title">Nouveau mot de passe</h1><form method="post" v-if="user && !success" class="ff-panel ff-panel-pad mt-7 space-y-5" @submit.prevent="save"><PasswordField v-model="password" label="Nouveau mot de passe" autocomplete="new-password" :minlength="8" /><PasswordField v-model="confirmation" label="Confirmer le mot de passe" autocomplete="new-password" :minlength="8" /><UAlert v-if="error" :description="error" color="error" /><UButton type="submit" label="Enregistrer" :loading="busy" block /></form><UAlert v-else-if="success" color="success" title="Mot de passe mis à jour." class="mt-7"><template #actions><UButton to="/" label="Accueil" /></template></UAlert><div v-else class="ff-panel p-6 mt-7"><p class="text-sm text-muted">Ouvre le lien reçu par e-mail pour modifier ton mot de passe.</p><UButton to="/login" label="Demander un lien" class="mt-4" /></div></div></template>
