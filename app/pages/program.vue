<script setup lang="ts">
import { muscleFilterGroups, type Exercise } from '~/utils/exercises'
import { equipmentChoices, gymEquipment, label, findExercise, focusLabel } from '~/utils/exercise-helpers'
import { formSchema, programSchema } from '~/utils/program-validation'
import { estimateMinutes } from '~/utils/workout'
import type { ProgramFormData, GeneratedProgram, GenerateProgramResponseBody } from '~/utils/program-types'
const route = useRoute()
const { userId } = useTrainingStore()
const { create, setActive } = usePrograms()
const state = reactive<ProgramFormData>({ name: '', goals: ['muscle_building'], experience: 'beginner', scheduleType: 'weekly', daysPerWeek: 3, sessionDuration: 45, splitPreference: 'auto', equipment: [...gymEquipment], focusAreas: [], excludeAreas: [], additionalNotes: '', useAi: false })
const step = ref(0)
const program = ref<GeneratedProgram | null>(null)
const source = ref<'ai' | 'fallback'>('fallback')
const generating = ref(false)
const saving = ref(false)
const error = ref('')
const savedId = ref<string | null>(null)
const previewDay = ref(0)
const hydrated = ref(false)
const detail = ref<Exercise | null>(null)
const detailOpen = ref(false)
const goals = [{ value: 'muscle_building', label: 'Construire du muscle', icon: 'i-lucide-dumbbell' }, { value: 'strength', label: 'Gagner en force', icon: 'i-lucide-trending-up' }, { value: 'general_fitness', label: 'Entretenir ma forme', icon: 'i-lucide-heart-pulse' }] as const
const levels = [{ value: 'beginner', title: 'Débutant', description: 'Je débute ou je reprends la musculation.' }, { value: 'intermediate', title: 'Intermédiaire', description: 'Je m’entraîne régulièrement.' }, { value: 'advanced', title: 'Avancé', description: 'Je maîtrise les mouvements et leur progression.' }] as const
const draftKey = () => `fitforge:builder:v1:${userId.value || 'guest'}`
function persistDraft() {
  if (!hydrated.value) return
  try { localStorage.setItem(draftKey(), JSON.stringify({ state, step: step.value, program: program.value, source: source.value, savedId: savedId.value })) }
  catch { error.value = 'Ton navigateur ne permet pas de conserver ce brouillon. Garde cette page ouverte.' }
}
onMounted(() => {
  try {
    const raw = localStorage.getItem(route.query.restore === '1' ? 'fitforge:builder:v1:guest' : draftKey())
    if (raw) {
      const draft = JSON.parse(raw)
      const parsed = formSchema.safeParse(draft.state)
      if (parsed.success) Object.assign(state, parsed.data)
      step.value = Math.max(0, Math.min(2, Number(draft.step) || 0))
      const result = programSchema.safeParse(draft.program)
      if (result.success) program.value = result.data
      source.value = draft.source === 'ai' ? 'ai' : 'fallback'
      if (route.query.restore !== '1' && typeof draft.savedId === 'string') savedId.value = draft.savedId
    }
  } catch { error.value = 'Le brouillon précédent n’a pas pu être restauré. Tu peux préparer un nouveau programme.' }
  hydrated.value = true
})
watch([state, step, program, source, savedId], persistDraft, { deep: true })
function toggle(list: string[], value: string) { const index = list.indexOf(value); if (index < 0) list.push(value); else list.splice(index, 1) }
function chooseEquipment(preset: 'gym' | 'home' | 'bodyweight') { state.equipment = preset === 'gym' ? [...gymEquipment] : preset === 'home' ? ['dumbbell', 'bodyweight'] : ['bodyweight'] }
function editPreferences() { program.value = null; savedId.value = null; error.value = ''; step.value = 0 }
async function generate() {
  error.value = ''
  const validation = formSchema.safeParse(state)
  if (!validation.success) { error.value = validation.error.issues[0]?.message || 'Vérifie tes choix.'; return }
  generating.value = true
  try {
    const response = await $fetch<GenerateProgramResponseBody>('/api/generate-program', { method: 'POST', body: { formData: validation.data }, timeout: 20000 })
    if (response.status === 'ready') { program.value = response.program; source.value = response.source; savedId.value = null; previewDay.value = 0 }
    else error.value = 'Le programme n’a pas pu être préparé. Réessaie dans un instant.'
  } catch (failure: any) { error.value = failure?.data?.data?.message || 'Le programme n’a pas pu être préparé. Vérifie ta connexion et réessaie.' }
  finally { generating.value = false }
}
async function useProgram(localOnly = false) {
  if (!program.value || saving.value) return
  saving.value = true; error.value = ''
  try {
    if (!savedId.value) { const saved = await create({ ...program.value, source: source.value }, localOnly); savedId.value = saved.id; persistDraft() }
    await setActive(savedId.value)
    if (route.query.restore === '1') localStorage.removeItem('fitforge:builder:v1:guest')
    await navigateTo(`/workout?program=${savedId.value}&day=0`)
  } catch { error.value = savedId.value ? 'Ton programme est enregistré. Son activation a échoué ; réessaie ou retrouve-le dans Programmes.' : 'L’enregistrement dans ton compte a échoué. Ton brouillon est conservé ; tu peux réessayer ou continuer sur cet appareil.' }
  finally { saving.value = false }
}
function loginToSave() { persistDraft(); navigateTo('/login?redirect=%2Fprogram%3Frestore%3D1') }
function openExercise(name: string) { detail.value = findExercise(name) || null; detailOpen.value = !!detail.value }
useHead({ title: 'Mon programme · FitForge' })
</script>

<template>
  <div class="ff-page ff-fade">
    <template v-if="!program">
      <h1 class="ff-title">Nouveau programme</h1>
      <div class="grid lg:grid-cols-[1fr_280px] gap-8 mt-9">
        <div>
          <nav aria-label="Étapes de préparation" class="flex gap-2 mb-7"><button v-for="(name, index) in ['Objectif', 'Fréquence', 'Matériel']" :key="name" class="flex-1 text-left border-b-2 pb-3 text-sm" :class="step === index ? 'border-primary text-primary font-semibold' : 'border-default text-muted'" :aria-current="step === index ? 'step' : undefined" @click="() => { step = index }"><span class="block text-xs mb-1">0{{ index + 1 }}</span>{{ name }}</button></nav>
          <div class="ff-panel ff-panel-pad">
            <template v-if="step === 0"><h2 class="text-xl font-semibold tracking-tight">Objectif</h2><div class="grid gap-3 mt-5"><button v-for="goal in goals" :key="goal.value" class="ff-option flex items-center gap-4 py-4" :aria-pressed="state.goals[0] === goal.value" @click="() => { state.goals = [goal.value] }"><UIcon :name="goal.icon" class="size-6 shrink-0" /><span class="flex-1"><span class="block font-semibold text-sm">{{ goal.label }}</span></span><UIcon v-if="state.goals[0] === goal.value" name="i-lucide-circle-check" class="size-5 shrink-0" /></button></div><h3 class="font-semibold mt-8 mb-3">Niveau</h3><div class="space-y-2"><button v-for="level in levels" :key="level.value" class="ff-option w-full" :aria-pressed="state.experience === level.value" @click="() => { state.experience = level.value }"><span class="block text-sm font-semibold">{{ level.title }}</span><span class="block text-xs text-muted mt-1">{{ level.description }}</span></button></div></template>
            <template v-else-if="step === 1"><h2 class="text-xl font-semibold tracking-tight">Fréquence et durée</h2><p class="text-sm text-muted mt-2">Les séances se suivent dans l’ordre, sans jours imposés.</p><fieldset class="mt-7"><legend class="text-sm font-semibold mb-3">Séances par semaine</legend><div class="flex flex-wrap gap-2"><button v-for="count in [2, 3, 4, 5, 6]" :key="count" class="ff-option min-w-12 text-center font-semibold" :aria-pressed="state.daysPerWeek === count" @click="() => { state.daysPerWeek = count }">{{ count }}</button></div></fieldset><fieldset class="mt-7"><legend class="text-sm font-semibold mb-3">Temps disponible par séance</legend><div class="flex flex-wrap gap-2"><button v-for="duration in [20, 30, 45, 60, 90]" :key="duration" class="ff-option text-sm" :aria-pressed="state.sessionDuration === duration" @click="() => { state.sessionDuration = duration }">{{ duration }} min</button></div><p class="text-xs text-muted mt-3">Durée estimée, échauffement compris.</p></fieldset></template>
            <template v-else><h2 class="text-xl font-semibold tracking-tight">Matériel disponible</h2><p class="text-sm text-muted mt-2">Seul le matériel sélectionné sera utilisé.</p><div class="flex flex-wrap gap-2 mt-5"><UButton label="Salle équipée" icon="i-lucide-building-2" color="neutral" variant="outline" @click="chooseEquipment('gym')" /><UButton label="Haltères à la maison" icon="i-lucide-house" color="neutral" variant="outline" @click="chooseEquipment('home')" /><UButton label="Sans matériel" color="neutral" variant="outline" @click="chooseEquipment('bodyweight')" /></div><div class="flex flex-wrap gap-2 mt-5"><button v-for="equipment in equipmentChoices" :key="equipment" class="ff-option text-xs" :aria-pressed="state.equipment.includes(equipment)" @click="toggle(state.equipment, equipment)">{{ label(equipment) }}<span v-if="state.equipment.includes(equipment)" class="ml-2" aria-hidden="true">✓</span></button></div>
              <details class="border-t border-default mt-7 pt-5"><summary class="text-sm font-semibold min-h-11">Options <span class="text-muted font-normal">· facultatif</span></summary><div class="space-y-6 mt-3"><label class="block text-sm font-medium">Nom du programme<input v-model="state.name" maxlength="80" placeholder="Un nom sera proposé automatiquement" class="ff-field mt-2" /></label><label class="block text-sm font-medium">Répartition<select v-model="state.splitPreference" class="ff-field mt-2"><option value="auto">Automatique</option><option value="full_body">Corps entier</option><option value="upper_lower">Haut / bas du corps</option><option value="push_pull_legs">Poussée / tirage / jambes</option></select></label><fieldset><legend class="text-sm font-semibold mb-2">Zones à exclure</legend><p class="text-xs text-muted mb-3">Les exercices sollicitant ces zones seront exclus.</p><div class="flex flex-wrap gap-2"><button v-for="group in muscleFilterGroups" :key="group.label" class="ff-option text-xs" :aria-pressed="state.excludeAreas.includes(group.label)" @click="toggle(state.excludeAreas, group.label)">{{ label(group.label) }}</button></div></fieldset><fieldset><legend class="text-sm font-semibold mb-3">Zones prioritaires</legend><div class="flex flex-wrap gap-2"><button v-for="group in muscleFilterGroups" :key="group.label" class="ff-option text-xs" :aria-pressed="state.focusAreas.includes(group.label)" @click="toggle(state.focusAreas, group.label)">{{ label(group.label) }}</button></div></fieldset><label class="flex items-start gap-3 text-sm"><input v-model="state.useAi" type="checkbox" class="mt-1 size-4 accent-[var(--ui-primary)]" /><span>Ajouter des explications avec l’IA<span class="block text-xs text-muted mt-2 leading-relaxed">Google Gemini recevra l’objectif et les exercices, sans ton nom ni la liste des zones exclues. Il ajoutera des explications sans modifier les exercices.</span></span></label></div></details>
            </template>
            <UAlert v-if="error" :description="error" color="error" class="mt-5" />
            <div class="flex justify-between gap-3 mt-8 border-t border-default pt-5"><UButton v-if="step > 0" label="Retour" icon="i-lucide-arrow-left" color="neutral" variant="ghost" :disabled="generating" @click="() => { step-- }" /><span v-else /><UButton v-if="step < 2" label="Continuer" trailing-icon="i-lucide-arrow-right" @click="() => { step++ }" /><UButton v-else :label="generating ? 'Préparation en cours…' : 'Préparer mon programme'" trailing-icon="i-lucide-arrow-right" :loading="generating" @click="generate" /></div>
          </div>
        </div>
        <aside class="hidden lg:block"><div class="ff-panel ff-panel-pad sticky top-8"><p class="ff-eyebrow">RÉCAPITULATIF</p><h2 class="text-2xl font-semibold tracking-tight mt-5">{{ state.daysPerWeek }} séances par semaine</h2><div class="space-y-4 mt-6 text-sm"><p class="flex gap-3"><UIcon name="i-lucide-target" class="size-5 text-primary shrink-0" />{{ goals.find(g => g.value === state.goals[0])?.label }}</p><p class="flex gap-3"><UIcon name="i-lucide-clock-3" class="size-5 text-primary shrink-0" />Environ {{ state.sessionDuration }} min</p><p class="flex gap-3"><UIcon name="i-lucide-dumbbell" class="size-5 text-primary shrink-0" />{{ state.equipment.length }} choix de matériel</p></div></div></aside>
      </div>
    </template>
    <template v-else>
      <div class="flex flex-wrap justify-between items-start gap-4"><div><h1 class="ff-title">Programme proposé</h1><p class="text-muted mt-3">{{ program.name }} · {{ program.goal }}</p></div><UButton label="Ajuster mes choix" icon="i-lucide-sliders-horizontal" color="neutral" variant="outline" :disabled="saving" @click="editPreferences" /></div>
      <div class="grid lg:grid-cols-[1fr_300px] gap-6 mt-8"><div><div class="flex gap-2 overflow-x-auto pb-4"><button v-for="(day, index) in program.schedule" :key="index" class="ff-option text-sm shrink-0" :aria-pressed="previewDay === index" @click="() => { previewDay = index }">Séance {{ index + 1 }}</button></div><div v-if="program.schedule[previewDay]" class="ff-panel overflow-hidden"><div class="p-6 flex justify-between gap-4 border-b border-default"><div><p class="ff-eyebrow">SÉANCE {{ previewDay + 1 }}</p><h2 class="text-xl font-semibold mt-2">{{ focusLabel(program.schedule[previewDay]!.focus) }}</h2></div><span class="ff-chip self-start"><UIcon name="i-lucide-clock-3" class="size-4" />≈ {{ estimateMinutes(program.schedule[previewDay]!) }} min</span></div><button v-for="(exercise, index) in program.schedule[previewDay]!.exercises" :key="exercise.name" class="w-full flex items-center gap-4 p-5 text-left border-b border-default last:border-0 hover:bg-muted" @click="openExercise(exercise.name)"><span class="text-xs text-muted">{{ String(index + 1).padStart(2, '0') }}</span><span class="flex-1"><span class="block text-sm font-semibold">{{ exercise.name }}</span><span class="block text-xs text-muted mt-1">{{ exercise.sets }} séries · {{ exercise.reps }} · {{ exercise.rest }} de repos</span></span><UIcon name="i-lucide-chevron-right" class="size-4 text-muted" /></button></div></div><aside><div class="ff-panel ff-panel-pad"><UIcon name="i-lucide-check-check" class="size-7 text-primary" /><h2 class="font-semibold text-lg mt-4">Enregistrer le programme</h2><p class="text-sm text-muted mt-2 leading-relaxed">Tu pourras modifier les séances après l’enregistrement.</p><UButton :label="saving ? 'Enregistrement…' : 'Passer à ma séance'" block trailing-icon="i-lucide-arrow-right" class="mt-6" :loading="saving" @click="useProgram()" /><UButton v-if="!userId" label="Enregistrer dans mon compte" block color="neutral" variant="ghost" class="mt-2" @click="loginToSave" /><UButton v-if="error && userId && !savedId" label="Continuer sur cet appareil" block color="neutral" variant="outline" class="mt-2" :disabled="saving" @click="useProgram(true)" /><UAlert v-if="error" :description="error" color="error" class="mt-4" /></div></aside></div>
      <details class="mt-7 ff-panel p-5"><summary class="font-semibold text-sm min-h-8">Conseils d’exécution</summary><ul class="mt-3 space-y-3 text-sm text-muted"><li v-for="tip in program.tips" :key="tip" class="flex gap-3"><UIcon name="i-lucide-check" class="size-4 shrink-0 mt-0.5 text-primary" />{{ tip }}</li></ul></details>
    </template>
    <ExerciseDetailModal v-model:open="detailOpen" :exercise="detail"><template #footer><UButton label="Fermer" color="neutral" variant="outline" @click="() => { detailOpen = false }" /></template></ExerciseDetailModal>
  </div>
</template>
