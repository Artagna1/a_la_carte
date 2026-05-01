import { useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useBriefStore } from '../store/briefStore'
import { useAuthStore } from '../store/authStore'

export function useSaveBrief(layers) {
  const user = useAuthStore((s) => s.user)
  const { isSaved, markAsSaved } = useBriefStore()
  const saveAttempted = useRef(false)

  useEffect(() => {
    if (!user || isSaved || saveAttempted.current || !layers[0]) return

    saveAttempted.current = true

    supabase
      .from('briefs')
      .insert({
        user_id: user.id,
        nom_artiste: user.user_metadata?.nom_artiste ?? '',
        client: layers[0],
        commande: layers[1],
        public_cible: layers[2],
        contrainte: layers[3],
      })
      .select('id')
      .single()
      .then(({ data, error }) => {
        if (!error && data) markAsSaved(data.id)
      })
  }, [user, isSaved, layers, markAsSaved])
}
