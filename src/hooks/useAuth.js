import { useAuthStore } from '../store/authStore'
import { supabase } from '../lib/supabase'

function nomToEmail(nom) {
  return `${nom.toLowerCase().replace(/[^a-z0-9]/g, '')}@alacarte.app`
}

export function useAuth() {
  const { user, loading } = useAuthStore()

  async function login(nom, secret) {
    const { error } = await supabase.auth.signInWithPassword({
      email: nomToEmail(nom),
      password: secret,
    })
    return { error }
  }

  async function signup(nom, secret) {
    const { error } = await supabase.auth.signUp({
      email: nomToEmail(nom),
      password: secret,
      options: { data: { nom_artiste: nom } },
    })
    return { error }
  }

  async function logout() {
    await supabase.auth.signOut()
  }

  return { user, loading, login, signup, logout }
}
