import { useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useBriefStore } from '../store/briefStore'
import { useAuthStore } from '../store/authStore'

export function useSaveBrief(layers) {
  const user = useAuthStore((s) => s.user)
  const { isSaved, chosenDuration, chosenMode, markAsSaved } = useBriefStore()
  const saveAttempted = useRef(false)

  useEffect(() => {
    if (!user || isSaved || saveAttempted.current || !layers[0]) return

    saveAttempted.current = true

    supabase
      .from('briefs')
      .insert({
        user_id: user.id,
        client: layers[0],
        commande: layers[1],
        public_cible: layers[2],
        contrainte: layers[3],
        mode: chosenMode,
        duration_seconds: chosenDuration,
      })
      .then(({ error }) => {
        if (!error) markAsSaved()
      })
  }, [user, isSaved, layers, chosenDuration, chosenMode, markAsSaved])
}
