import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export function useDeleteAccount() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function deleteAccount() {
    setLoading(true)
    setError(null)

    const { error: fnError } = await supabase.functions.invoke('delete-account', {
      method: 'POST',
    })

    if (fnError) {
      setError('Une erreur est survenue. Réessaie ou contacte le support.')
      setLoading(false)
      return
    }

    await supabase.auth.signOut()
    navigate('/')
  }

  return { deleteAccount, loading, error }
}
