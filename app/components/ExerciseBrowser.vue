<script setup lang="ts">
import { exercises, muscleFilterGroups, type Exercise } from '~/utils/exercises'
import { label, matchesExercise } from '~/utils/exercise-helpers'
const props = withDefaults(defineProps<{ compact?: boolean, initialCategory?: string }>(), { compact: false, initialCategory: 'all' })
const emit = defineEmits<{ detail: [exercise: Exercise], add: [exercise: Exercise] }>()
const search = ref('')
const category = ref(['strength', 'bodyweight', 'cardio', 'flexibility'].includes(props.initialCategory) ? props.initialCategory : 'all')
const equipment = ref('all')
const muscle = ref('all')
const difficulty = ref('all')
const limit = ref(props.compact ? 20 : 24)
const filterCount = computed(() => [equipment.value, muscle.value, difficulty.value].filter(v => v !== 'all').length)
const filtered = computed(() => exercises.filter(exercise => {
  const group = muscleFilterGroups.find(g => g.label === muscle.value)
  return matchesExercise(exercise, search.value)
    && (category.value === 'all' || exercise.category === category.value)
    && (equipment.value === 'all' || exercise.equipment === equipment.value)
    && (difficulty.value === 'all' || exercise.difficulty === difficulty.value)
    && (muscle.value === 'all' || group?.values.some(m => exercise.muscles.includes(m)))
}))
watch([search, category, equipment, muscle, difficulty], () => { limit.value = props.compact ? 20 : 24 })
function clear() { search.value = ''; category.value = 'all'; equipment.value = 'all'; muscle.value = 'all'; difficulty.value = 'all' }
const equipmentList = [...new Set(exercises.map(exercise => exercise.equipment))]
function choose(exercise: Exercise) { if (props.compact) emit('add', exercise); else emit('detail', exercise) }
</script>
<template>
  <div><label class="relative block"><span class="sr-only">Rechercher un exercice ou un muscle</span><UIcon name="i-lucide-search" class="absolute left-4 top-4 size-5 text-muted" /><input v-model="search" type="search" class="ff-field pl-12 min-h-13" placeholder="Un exercice, un muscle…" /></label><div class="flex gap-2 overflow-x-auto mt-4 pb-1"><button v-for="item in ['all', 'strength', 'bodyweight', 'cardio', 'flexibility']" :key="item" class="ff-option text-xs shrink-0" :aria-pressed="category === item" @click="() => { category = item }">{{ item === 'all' ? 'Tous' : label(item) }}</button></div>
    <details class="mt-4 ff-panel px-4"><summary class="flex min-h-12 items-center gap-2 text-sm font-medium"><UIcon name="i-lucide-sliders-horizontal" class="size-4" />Affiner la recherche<span v-if="filterCount" class="text-primary">({{ filterCount }})</span><UIcon name="i-lucide-chevron-down" class="size-4 ml-auto" /></summary><div class="grid sm:grid-cols-3 gap-3 pb-4"><label class="text-xs text-muted">Matériel<select v-model="equipment" class="ff-field mt-1"><option value="all">Tout le matériel</option><option v-for="item in equipmentList" :key="item" :value="item">{{ label(item) }}</option></select></label><label class="text-xs text-muted">Muscles<select v-model="muscle" class="ff-field mt-1"><option value="all">Tous les muscles</option><option v-for="item in muscleFilterGroups" :key="item.label" :value="item.label">{{ label(item.label) }}</option></select></label><label class="text-xs text-muted">Niveau<select v-model="difficulty" class="ff-field mt-1"><option value="all">Tous les niveaux</option><option v-for="item in ['beginner', 'intermediate', 'advanced', 'none']" :key="item" :value="item">{{ item === 'none' ? 'Non renseigné' : label(item) }}</option></select></label></div></details>
    <div class="flex items-center justify-between gap-3 my-4"><p class="text-xs text-muted" role="status">{{ filtered.length }} exercice{{ filtered.length > 1 ? 's' : '' }}</p><button v-if="filterCount || search || category !== 'all'" class="text-xs text-primary font-semibold min-h-9" @click="clear">Réinitialiser</button></div>
    <div v-if="filtered.length" :class="compact ? 'space-y-2 max-h-[48vh] overflow-y-auto pr-1' : 'grid sm:grid-cols-2 xl:grid-cols-3 gap-4'"><article v-for="exercise in filtered.slice(0, limit)" :key="exercise.id" :class="compact ? 'flex gap-2 items-center p-3 border border-default rounded-xl bg-elevated' : 'ff-panel overflow-hidden flex flex-col'"><button :class="compact ? 'text-left flex-1 min-w-0 py-2' : 'text-left p-5 w-full flex-1 hover:bg-muted transition-colors'" @click="choose(exercise)"><div v-if="!compact" class="flex items-center justify-between mb-5"><span class="size-10 rounded-xl bg-muted grid place-items-center"><UIcon name="i-lucide-dumbbell" class="size-5 text-primary" /></span><span class="text-[11px] text-muted">{{ exercise.difficulty === 'none' ? 'Niveau libre' : label(exercise.difficulty) }}</span></div><h3 class="font-semibold text-sm leading-relaxed">{{ exercise.name }}</h3><p class="text-xs text-muted mt-2 leading-relaxed">{{ exercise.muscles.slice(0, 3).map(label).join(' · ') }}</p></button><div :class="compact ? 'shrink-0' : 'border-t border-default px-4 py-2 flex items-center justify-between gap-3'"><span v-if="!compact" class="text-xs text-muted">{{ label(exercise.equipment) }}</span><UButton :label="compact ? undefined : 'Ajouter'" icon="i-lucide-plus" color="neutral" variant="ghost" :aria-label="`Ajouter ${exercise.name}`" @click="emit('add', exercise)" /></div></article></div>
    <div v-else class="ff-panel ff-empty"><UIcon name="i-lucide-search-x" class="size-9 text-muted mb-4" /><h3 class="font-semibold">Aucun exercice trouvé</h3><p class="text-sm text-muted mt-2">Essaie un autre nom ou retire un filtre.</p><UButton label="Réinitialiser la recherche" color="neutral" variant="outline" class="mt-5" @click="clear" /></div><UButton v-if="filtered.length > limit" label="Afficher plus d’exercices" color="neutral" variant="outline" block class="mt-5" @click="() => { limit += 24 }" />
  </div>
</template>
