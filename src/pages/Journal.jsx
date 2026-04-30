import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { LAYER_CONFIG } from '../features/brief/layerConfig'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatDuration(seconds, mode) {
  if (!seconds) return null
  if (mode === 'express') {
    const m = Math.floor(seconds / 60)
    return `${m} min`
  }
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  return days > 0 ? `${days}j ${hours}h` : `${hours}h`
}

function Journal() {
  const { user, logout } = useAuth()
  const [briefs, setBriefs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('briefs')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setBriefs(data ?? [])
        setLoading(false)
      })
  }, [])

  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col px-8 py-6">
      <header className="flex items-center justify-between mb-10">
        <Link
          to="/"
          className="text-sm font-semibold tracking-tight text-neutral-900 hover:text-neutral-600 transition-colors"
        >
          À la Carte
        </Link>
        <div className="flex items-center gap-5">
          <span className="text-xs text-neutral-400">
            {user?.user_metadata?.nom_artiste ?? ''}
          </span>
          <button
            onClick={logout}
            className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <div className="max-w-2xl w-full mx-auto">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1">Journal de bord</p>
          <h1 className="text-2xl font-bold text-neutral-900">Mes briefs</h1>
        </div>

        {loading ? (
          <p className="text-sm text-neutral-400">Chargement…</p>
        ) : briefs.length === 0 ? (
          <div className="border border-neutral-200 bg-white p-10 text-center">
            <p className="text-sm text-neutral-500 mb-4">Aucun brief enregistré pour l'instant.</p>
            <Link
              to="/"
              className="text-xs text-neutral-900 underline underline-offset-2 hover:text-neutral-600"
            >
              Générer mon premier brief
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {briefs.map((brief) => (
              <div key={brief.id} className="border border-neutral-200 bg-white">

                {/* Méta : date + durée + mode */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-100">
                  <span className="text-xs text-neutral-400">
                    {formatDate(brief.created_at)}
                    {brief.duration_seconds && (
                      <span className="ml-2 text-neutral-300">·</span>
                    )}
                    {brief.duration_seconds && (
                      <span className="ml-2">
                        {formatDuration(brief.duration_seconds, brief.mode)}
                      </span>
                    )}
                  </span>
                  {brief.mode && (
                    <span className="text-xs border border-neutral-200 px-2 py-0.5 text-neutral-500">
                      {brief.mode === 'express' ? 'Carte express' : 'Carte courte'}
                    </span>
                  )}
                </div>

                {/* Les 4 couches */}
                {[
                  { config: LAYER_CONFIG[0], data: brief.client },
                  { config: LAYER_CONFIG[1], data: brief.commande },
                  { config: LAYER_CONFIG[2], data: brief.public_cible },
                  { config: LAYER_CONFIG[3], data: brief.contrainte },
                ].map(({ config, data }) => (
                  <div
                    key={config.number}
                    className="flex gap-6 px-6 py-4 border-b border-neutral-100 last:border-b-0"
                  >
                    <span className="shrink-0 w-28 text-xs uppercase tracking-widest text-neutral-400 pt-0.5">
                      {config.label}
                    </span>
                    <p className="text-sm font-medium text-neutral-900 leading-snug">
                      {config.renderContent(data)}
                    </p>
                  </div>
                ))}

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default Journal
