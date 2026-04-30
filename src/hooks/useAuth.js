import { useAuthStore } from '../store/authStore'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const { user, loading } = useAuthStore()

  async function login(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  async function signup(email, password) {
    const { error } = await supabase.auth.signUp({ email, password })
    return { error }
  }

  async function logout() {
    await supabase.auth.signOut()
  }

  return { user, loading, login, signup, logout }
}
