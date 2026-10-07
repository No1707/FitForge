import { fromDbRow, toEditableSchedule, type EditableDay, type SavedProgram, type SavedProgramInput } from '~/utils/program-editor-types'
import { exerciseSchema } from '~/utils/program-validation'

export function usePrograms() {
  const supabase = useSupabaseClient()
  const { data: store, owner, userId, syncMessage, persist } = useTrainingStore()
  const checkOwner = (id: string | null) => { if (owner.value !== id) throw new Error('Le compte a changé. Recharge cette page.') }
  function cache(program: SavedProgram) {
    store.value.programs = [program, ...store.value.programs.filter(p => p.id !== program.id)]
    persist()
    return program
  }
  async function list(): Promise<SavedProgram[]> {
    if (!userId.value) return store.value.programs
    const id = userId.value
    const { data, error } = await supabase.from('programs').select('*').order('created_at', { ascending: false })
    checkOwner(id)
    if (error) {
      syncMessage.value = 'Connexion au compte indisponible. Les programmes déjà présents sur cet appareil restent accessibles.'
      if (!store.value.programs.length) throw error
      return store.value.programs
    }
    const local = store.value.programs.filter(p => p.localOnly)
    const remote = (data || []).map(row => {
      const program = fromDbRow(row)
      const cached = store.value.programs.find(p => p.id === program.id)
      return { ...program, settings: program.settings || cached?.settings }
    })
    const active = local.find(p => p.isActive) || remote.find(p => p.isActive)
    store.value.programs = [...local, ...remote].map(p => ({ ...p, isActive: p.id === active?.id }))
    persist()
    return store.value.programs
  }
  async function get(id: string): Promise<SavedProgram | null> {
    const cached = store.value.programs.find(p => p.id === id)
    if (cached?.localOnly || !userId.value) return cached || null
    const identity = userId.value
    const { data, error } = await supabase.from('programs').select('*').eq('id', id).maybeSingle()
    checkOwner(identity)
    if (error) { if (cached) { syncMessage.value = 'Programme chargé depuis cet appareil. Reconnecte-toi pour synchroniser les modifications.'; return cached }; throw error }
    if (!data) return null
    const program = fromDbRow(data)
    return cache({ ...program, settings: program.settings || cached?.settings })
  }
  async function create(input: SavedProgramInput, localOnly = false): Promise<SavedProgram> {
    const schedule = toEditableSchedule(input.schedule)
    if (!userId.value || localOnly) {
      const now = new Date().toISOString()
      const program = { ...input, schedule, id: `local-${crypto.randomUUID()}`, isActive: !store.value.programs.some(p => p.isActive), createdAt: now, updatedAt: now, localOnly: true }
      return cache(program)
    }
    const identity = userId.value
    const payload = { user_id: identity, name: input.name, goal: input.goal, source: input.source === 'ai' ? 'ai' as const : 'manual' as const, schedule, tips: input.tips }
    let result = await supabase.from('programs').insert({ ...payload, settings: input.settings }).select('*').single()
    checkOwner(identity)
    if (result.error?.code === 'PGRST204' || result.error?.code === '42703') {
      result = await supabase.from('programs').insert(payload).select('*').single()
      syncMessage.value = 'Le programme est enregistré. Ses préférences de matériel restent sur cet appareil pour le moment.'
    }
    checkOwner(identity)
    if (result.error) throw result.error
    return cache({ ...fromDbRow(result.data), settings: input.settings })
  }
  async function remove(id: string): Promise<void> {
    const program = store.value.programs.find(p => p.id === id)
    const identity = userId.value
    if (!program?.localOnly && identity) {
      const { error } = await supabase.from('programs').delete().eq('id', id)
      checkOwner(identity)
      if (error) throw error
    }
    store.value.programs = store.value.programs.filter(p => p.id !== id)
    persist()
  }
  async function setActive(id: string): Promise<void> {
    const program = store.value.programs.find(p => p.id === id)
    if (!program) throw new Error('Programme introuvable.')
    if (!program.schedule.some(day => day.exercises.length)) throw new Error('Ajoute au moins un exercice avant d’activer ce programme.')
    const identity = userId.value
    if (!program.localOnly && identity) {
      const { error } = await supabase.rpc('set_active_program', { target_id: id })
      checkOwner(identity)
      if (error) throw error
    }
    store.value.programs = store.value.programs.map(p => ({ ...p, isActive: p.id === id }))
    persist()
  }
  async function updateSchedule(id: string, schedule: EditableDay[]): Promise<void> {
    const program = store.value.programs.find(p => p.id === id)
    if (!program) throw new Error('Programme introuvable.')
    if (schedule.length > 14 || schedule.some(day => !day.focus.trim() || day.exercises.length > 30 || day.exercises.some(ex => !exerciseSchema.safeParse(ex).success))) throw new Error('Vérifie les titres, les séries (1 à 10), les répétitions (ex. 8–12) et le repos (ex. 90s). Maximum : 14 séances de 30 exercices.')
    const identity = userId.value
    if (!program.localOnly && identity) {
      const { error } = await supabase.from('programs').update({ schedule }).eq('id', id)
      checkOwner(identity)
      if (error) throw error
    }
    cache({ ...program, schedule: JSON.parse(JSON.stringify(schedule)), updatedAt: new Date().toISOString() })
  }
  return { list, get, create, remove, setActive, updateSchedule }
}
