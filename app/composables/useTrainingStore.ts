import { emptyTrainingData, storageKey, type TrainingData } from '~/utils/training-storage'

export function useTrainingStore() {
  const data = useState<TrainingData>('training-data', emptyTrainingData)
  const ready = useState('training-ready', () => false)
  const owner = useState<string | null>('training-owner', () => null)
  const storageError = useState<string | null>('training-storage-error', () => null)
  const syncMessage = useState<string | null>('training-sync-message', () => null)
  const cloudAvailable = useState('training-cloud-available', () => false)
  const user = useSupabaseUser()
  const userId = computed(() => {
    const identity = user.value as { sub?: string, id?: string } | null
    return identity?.sub || identity?.id || null
  })

  function persist() {
    if (!import.meta.client || !ready.value) return false
    try {
      localStorage.setItem(storageKey(owner.value), JSON.stringify(data.value))
      storageError.value = null
      return true
    } catch {
      storageError.value = 'La sauvegarde sur cet appareil est indisponible. Exporte tes séances avant de fermer cette page.'
      return false
    }
  }

  return { data, ready, owner, userId, storageError, syncMessage, cloudAvailable, persist }
}
