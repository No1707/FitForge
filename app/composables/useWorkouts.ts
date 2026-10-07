import { finishWorkout, workoutSchema, type WorkoutSession } from '~/utils/workout'
import { mergeWorkouts } from '~/utils/training-storage'

export function useWorkouts() {
  const { data, userId, owner, cloudAvailable, syncMessage, persist } = useTrainingStore()
  const client = useSupabaseClient()
  const syncing = useState('workouts-syncing', () => false)
  async function sync() {
    if (!userId.value || syncing.value) return
    const identity = userId.value
    syncing.value = true
    let succeeded = false
    try {
      for (const id of [...data.value.deletedWorkouts]) {
        const { error } = await client.from('workout_sessions').delete().eq('id', id)
        if (owner.value !== identity) return
        if (error) throw error
        data.value.deletedWorkouts = data.value.deletedWorkouts.filter(item => item !== id)
      }
      for (const id of [...data.value.pendingWorkouts]) {
        const workout = data.value.workouts.find(w => w.id === id)
        if (!workout?.completedAt) { data.value.pendingWorkouts = data.value.pendingWorkouts.filter(item => item !== id); continue }
        const { error } = await client.from('workout_sessions').upsert({ id, user_id: identity, program_id: workout.programId, completed_at: workout.completedAt, payload: workout }, { onConflict: 'id' })
        if (owner.value !== identity) return
        if (error) throw error
        data.value.pendingWorkouts = data.value.pendingWorkouts.filter(item => item !== id)
      }
      const remote: WorkoutSession[] = []
      // Supabase caps each response: fetch every page before reconciling deletions.
      const pageSize = 500
      for (let offset = 0; ; offset += pageSize) {
        const result = await client.from('workout_sessions').select('payload').order('completed_at', { ascending: false }).order('id').range(offset, offset + pageSize - 1)
        if (owner.value !== identity) return
        if (result.error) throw result.error
        for (const row of result.data || []) remote.push(workoutSchema.parse(row.payload))
        if ((result.data?.length || 0) < pageSize) break
      }
      data.value.workouts = mergeWorkouts(data.value.workouts, remote, data.value.pendingWorkouts, data.value.deletedWorkouts)
      cloudAvailable.value = true
      syncMessage.value = null
      persist()
      succeeded = true
    } catch {
      if (owner.value === identity) {
        cloudAvailable.value = false
        syncMessage.value = 'Tes séances sont conservées sur cet appareil. La synchronisation avec ton compte est indisponible pour le moment.'
      }
    } finally {
      syncing.value = false
      // Finish any action queued while an earlier request was in flight.
      if (succeeded && owner.value === identity && (data.value.pendingWorkouts.length || data.value.deletedWorkouts.length)) void sync()
    }
  }
  function finish() {
    if (!data.value.draft) return null
    const session = finishWorkout(data.value.draft)
    data.value.workouts = [session, ...data.value.workouts.filter(w => w.id !== session.id)]
    if (userId.value) data.value.pendingWorkouts = [...new Set([...data.value.pendingWorkouts, session.id])]
    data.value.draft = null
    persist()
    void sync()
    return session
  }
  function remove(id: string) {
    data.value.workouts = data.value.workouts.filter(w => w.id !== id)
    data.value.pendingWorkouts = data.value.pendingWorkouts.filter(item => item !== id)
    if (userId.value) data.value.deletedWorkouts = [...new Set([...data.value.deletedWorkouts, id])]
    persist()
    void sync()
  }
  function exportHistory() {
    const blob = new Blob([JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), workouts: data.value.workouts }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url; link.download = `fitforge-seances-${new Date().toISOString().slice(0, 10)}.json`; link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  return { syncing, sync, finish, remove, exportHistory }
}
