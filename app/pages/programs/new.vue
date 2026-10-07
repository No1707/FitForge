<script setup lang="ts">
const { create } = usePrograms()
const name = ref('Mon programme')
const goal = ref('')
const saving = ref(false)
const error = ref('')
async function save() {
  if (!name.value.trim() || saving.value) return
  saving.value = true; error.value = ''
  try { const program = await create({ name: name.value.trim(), goal: goal.value.trim(), source: 'manual', schedule: [{ day: 'Séance 1', focus: 'Ma séance', exercises: [] }], tips: [] }); await navigateTo(`/programs/${program.id}?edit=1`) }
  catch { error.value = 'Le programme n’a pas pu être enregistré. Réessaie dans un instant.' }
  finally { saving.value = false }
}
useHead({ title: 'Créer mon programme · FitForge' })
</script>
<template><div class="ff-page max-w-2xl"><NuxtLink to="/programs" class="text-sm text-muted inline-flex gap-2 items-center mb-7"><UIcon name="i-lucide-arrow-left" class="size-4" />Mes programmes</NuxtLink><h1 class="ff-title">Programme manuel</h1><form method="post" class="ff-panel ff-panel-pad mt-7 space-y-5" @submit.prevent="save"><label class="block text-sm font-semibold">Nom du programme<input v-model="name" class="ff-field mt-2" required maxlength="80" /></label><label class="block text-sm font-semibold">Objectif <span class="font-normal text-muted">· facultatif</span><input v-model="goal" class="ff-field mt-2" maxlength="150" placeholder="Ex. : musculation avec haltères" /></label><UAlert v-if="error" :description="error" color="error" /><UButton type="submit" label="Ajouter mes séances" trailing-icon="i-lucide-arrow-right" block :loading="saving" :disabled="!name.trim()" /></form></div></template>
