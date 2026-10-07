import { emptyTrainingData, parseTrainingData, storageKey } from '~/utils/training-storage'

export default defineNuxtPlugin(() => {
  const store = useTrainingStore()
  const workouts = useWorkouts()
  watch(store.userId, (id) => {
    if (store.ready.value) store.persist()
    store.ready.value = false
    store.owner.value = id
    store.cloudAvailable.value = false
    store.syncMessage.value = null
    try {
      store.data.value = parseTrainingData(localStorage.getItem(storageKey(id)))
      store.storageError.value = null
    } catch {
      store.data.value = emptyTrainingData()
      store.storageError.value = 'Les données de cet appareil ne peuvent pas être lues. Leur copie précédente est conservée.'
      // Preserve a damaged copy before subsequent writes so recovery remains possible.
      try {
        const raw = localStorage.getItem(storageKey(id))
        if (raw) localStorage.setItem(`${storageKey(id)}:recovery:${Date.now()}`, raw)
      } catch { /* Storage may be unavailable, surface the warning above. */ }
    }
    store.ready.value = true
  }, { immediate: true, flush: 'sync' })
  watch(store.data, () => store.persist(), { deep: true, flush: 'sync' })
  window.addEventListener('pagehide', () => store.persist())
  window.addEventListener('online', () => { void workouts.sync() })
})
