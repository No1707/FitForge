import { safeRedirect } from '~/utils/program-validation'
import { writeRememberPreference } from '~/utils/auth-cookies'
export function useAuth() {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const error = ref<string | null>(null)
  const isLoading = ref(false)
  function message(code?: string) {
    if (code === 'invalid_credentials') return 'L’adresse e-mail ou le mot de passe est incorrect.'
    if (code === 'email_not_confirmed') return 'Confirme ton adresse e-mail avant de te connecter.'
    if (code === 'over_email_send_rate_limit' || code === 'over_request_rate_limit') return 'Patiente un instant avant de réessayer.'
    return 'La connexion au compte a échoué. Vérifie ta connexion et réessaie.'
  }
  async function signInWithPassword(email: string, password: string, remember = true) {
    error.value = null; isLoading.value = true
    try {
      writeRememberPreference(remember, value => { document.cookie = value }, window.location.protocol === 'https:')
      const result = await supabase.auth.signInWithPassword({ email, password })
      if (result.error) { error.value = message(result.error.code); return false }
      return true
    } catch { error.value = message(); return false }
    finally { isLoading.value = false }
  }
  async function signUp(email: string, password: string, redirect = '/') {
    error.value = null; isLoading.value = true
    try {
      writeRememberPreference(true, value => { document.cookie = value }, window.location.protocol === 'https:')
      const result = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/confirm?redirect=${encodeURIComponent(safeRedirect(redirect))}` } })
      if (result.error) { error.value = result.error.code === 'weak_password' ? 'Ce mot de passe est trop faible.' : message(result.error.code); return false }
      return true
    } catch { error.value = message(); return false }
    finally { isLoading.value = false }
  }
  async function signOut() { const result = await supabase.auth.signOut(); if (result.error) throw result.error }
  return { user, error, isLoading, signInWithPassword, signUp, signOut }
}
