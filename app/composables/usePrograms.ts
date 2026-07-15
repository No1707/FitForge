import { fromDbRow, type SavedProgram, type SavedProgramInput } from '~/utils/program-editor-types'

export function usePrograms() {
  const supabase = useSupabaseClient()

  async function list(): Promise<SavedProgram[]> {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return (data || []).map(fromDbRow)
  }

  async function get(id: string): Promise<SavedProgram | null> {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('id', id)
      .maybeSingle()
    if (error) throw error
    return data ? fromDbRow(data) : null
  }

  async function create(input: SavedProgramInput): Promise<SavedProgram> {
    // useSupabaseUser() holds JWT claims here (not the full User object),
    // so the user id is under "sub" (the standard JWT subject claim), not "id".
    const user = useSupabaseUser()
    const { data, error } = await supabase
      .from('programs')
      .insert({
        user_id: (user.value as { sub?: string } | null)?.sub,
        name: input.name,
        goal: input.goal,
        source: input.source,
        schedule: input.schedule,
        tips: input.tips
      })
      .select('*')
      .single()
    if (error) throw error
    return fromDbRow(data)
  }

  async function remove(id: string): Promise<void> {
    const { error } = await supabase.from('programs').delete().eq('id', id)
    if (error) throw error
  }

  async function setActive(id: string): Promise<void> {
    const { error } = await supabase.rpc('set_active_program', { target_id: id })
    if (error) throw error
  }

  return { list, get, create, remove, setActive }
}
