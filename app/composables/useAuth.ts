export function useAuth() {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const error = ref<string | null>(null)
  const isLoading = ref(false)

  async function signInWithPassword(email: string, password: string) {
    error.value = null
    isLoading.value = true
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) {
        error.value = signInError.message
        return false
      }
      return true
    } finally {
      isLoading.value = false
    }
  }

  async function signUp(email: string, password: string) {
    error.value = null
    isLoading.value = true
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/confirm` }
      })
      if (signUpError) {
        error.value = signUpError.message
        return false
      }
      return true
    } finally {
      isLoading.value = false
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  return { user, error, isLoading, signInWithPassword, signUp, signOut }
}
