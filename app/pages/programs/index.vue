<script setup lang="ts">
import { focusLabel } from '~/utils/exercise-helpers'
const { data, ready, userId } = useTrainingStore()
const { list, remove, setActive } = usePrograms()
const loading = ref(true)
const busy = ref<string | null>(null)
const error = ref('')
const deleting = ref<string | null>(null)
const confirmOpen = ref(false)
async function load() { loading.value = true; error.value = ''; try { await list() } catch { error.value = 'Impossible de charger tes programmes. Vérifie ta connexion et réessaie.' } finally { loading.value = false } }
onMounted(load)
async function activate(id: string) { busy.value = id; try { await setActive(id) } catch (failure) { error.value = failure instanceof Error ? failure.message : 'L’activation a échoué. Réessaie.' } finally { busy.value = null } }
function askDelete(id: string) { deleting.value = id; confirmOpen.value = true }
async function deleteProgram() { if (!deleting.value) return; busy.value = deleting.value; try { await remove(deleting.value) } catch { error.value = 'La suppression a échoué. Ton programme est conservé.' } finally { busy.value = null; deleting.value = null } }
useHead({ title: 'Mes programmes · FitForge' })
</script>
<template>
  <div class="ff-page ff-fade"><div class="flex flex-wrap justify-between items-end gap-5"><div><h1 class="ff-title">Mes programmes</h1></div><UButton to="/program" label="Préparer un programme" icon="i-lucide-plus" /></div>
    <GuestImportBanner v-if="userId" class="mt-6" @imported="load" />
    <UAlert v-if="error" :description="error" color="error" class="mt-6"><template #actions><UButton label="Réessayer" color="neutral" @click="load" /></template></UAlert>
    <div v-if="loading || !ready" class="py-20 text-center" role="status"><UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-primary" /></div>
    <div v-else-if="!data.programs.length" class="ff-panel ff-empty mt-8"><UIcon name="i-lucide-notebook-tabs" class="size-10 text-primary mb-5" /><h2 class="text-xl font-semibold">Aucun programme</h2><p class="text-sm text-muted mt-3 max-w-sm mx-auto">Crée un programme guidé ou ajoute tes propres séances.</p><div class="flex flex-wrap justify-center gap-3 mt-6"><UButton to="/program" label="Créer un programme guidé" trailing-icon="i-lucide-arrow-right" /><UButton to="/programs/new" label="Créer manuellement" color="neutral" variant="outline" /></div></div>
    <div v-else class="grid lg:grid-cols-2 gap-5 mt-8"><article v-for="program in data.programs" :key="program.id" class="ff-panel p-6" :class="{ 'border-primary': program.isActive }"><div class="flex items-center justify-between gap-3"><span v-if="program.isActive" class="text-primary text-xs font-semibold flex items-center gap-1.5"><UIcon name="i-lucide-circle-check" class="size-4" />Programme actif</span><span v-else class="ff-eyebrow">{{ program.schedule.length }} séances</span><UButton icon="i-lucide-trash-2" color="neutral" variant="ghost" :aria-label="`Supprimer ${program.name}`" :disabled="busy === program.id" @click="askDelete(program.id)" /></div><NuxtLink :to="`/programs/${program.id}`" class="block"><h2 class="font-semibold text-xl tracking-tight mt-3 hover:text-primary">{{ program.name }}</h2><p class="text-sm text-muted mt-2">{{ program.goal || 'Mon programme personnalisé' }}</p></NuxtLink><div class="flex flex-wrap gap-2 mt-5"><span v-for="(day, index) in program.schedule.slice(0, 4)" :key="index" class="ff-chip">{{ focusLabel(day.focus) || `Séance ${index + 1}` }}</span><span v-if="program.schedule.length > 4" class="ff-chip">+ {{ program.schedule.length - 4 }}</span></div><div class="flex justify-between flex-wrap gap-3 border-t border-default pt-5 mt-6"><UButton :to="`/programs/${program.id}`" label="Voir le programme" trailing-icon="i-lucide-arrow-right" color="neutral" variant="outline" /><UButton v-if="!program.isActive" label="Utiliser" variant="soft" :loading="busy === program.id" @click="activate(program.id)" /><UButton v-else :to="`/workout?program=${program.id}`" label="Ma séance" icon="i-lucide-play" /></div></article><NuxtLink to="/programs/new" class="ff-panel min-h-36 border-dashed flex items-center justify-center gap-3 p-6 text-muted hover:border-primary hover:text-primary"><UIcon name="i-lucide-notebook-pen" class="size-5" /><span class="font-medium text-sm">Créer manuellement</span></NuxtLink></div>
    <ConfirmDialog v-model:open="confirmOpen" title="Supprimer ce programme ?" description="Le programme sera supprimé. L’historique des séances déjà réalisées sera conservé." confirm-label="Supprimer" @confirm="deleteProgram" />
  </div>
</template>
