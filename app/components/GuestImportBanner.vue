<script setup lang="ts">
import { parseTrainingData, storageKey, type TrainingData } from '~/utils/training-storage'
const emit = defineEmits<{ imported: [] }>()
const { data, userId, owner, persist } = useTrainingStore()
const { create } = usePrograms()
const { sync } = useWorkouts()
const guest = ref<TrainingData | null>(null)
const busy = ref(false)
const error = ref('')
onMounted(() => { try { guest.value = parseTrainingData(localStorage.getItem(storageKey(null))) } catch { /* A damaged guest record must not block the account. */ } })
const remainingPrograms = computed(() => guest.value?.programs.filter(p => !data.value.importedPrograms[p.id]) || [])
const remainingWorkouts = computed(() => guest.value?.workouts.filter(s => !data.value.importedWorkouts[s.id]) || [])
const available = computed(() => userId.value && (remainingPrograms.value.length || remainingWorkouts.value.length))
async function importGuest() {
  if (!guest.value || !userId.value || busy.value) return
  const identity = userId.value
  busy.value = true; error.value = ''
  try {
    for (const program of [...remainingPrograms.value]) {
      const saved = await create({ name: program.name, goal: program.goal, source: program.source, schedule: program.schedule, tips: program.tips, settings: program.settings })
      if (owner.value !== identity) return
      data.value.importedPrograms[program.id] = saved.id
      persist()
    }
    if (owner.value !== identity) return
    for (const session of [...remainingWorkouts.value]) {
      if (!session.completedAt) continue
      const copy = { ...JSON.parse(JSON.stringify(session)), id: crypto.randomUUID(), programId: data.value.importedPrograms[session.programId] || session.programId }
      data.value.workouts = [copy, ...data.value.workouts]
      data.value.pendingWorkouts = [...new Set([...data.value.pendingWorkouts, copy.id])]
      data.value.importedWorkouts[session.id] = copy.id
      persist()
    }
    await sync()
    if (owner.value === identity) emit('imported')
  } catch { error.value = 'L’import a été interrompu. Réessaie pour récupérer les données restantes.' }
  finally { busy.value = false }
}
</script>
<template><div v-if="available" class="ff-panel p-5"><div class="flex flex-wrap items-center justify-between gap-4"><div><p class="text-sm font-semibold">Données enregistrées sans compte</p><p class="text-xs text-muted mt-2">{{ remainingPrograms.length }} programme(s) et {{ remainingWorkouts.length }} séance(s) à importer depuis ce navigateur.</p></div><UButton label="Importer dans mon compte" icon="i-lucide-import" :loading="busy" @click="importGuest" /></div><p v-if="error" class="text-sm text-error mt-3" role="alert">{{ error }}</p></div></template>
