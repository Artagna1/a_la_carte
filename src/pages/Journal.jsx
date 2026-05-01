import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { useDeleteAccount } from '../hooks/useDeleteAccount'
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
  const { deleteAccount, loading: deleting, error: deleteError } = useDeleteAccount()
  const [briefs, setBriefs] = useState([])
  const [loading, setLoading] = useState(true)
  const [linkInputs, setLinkInputs] = useState({})
  const [editingLink, setEditingLink] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const menuRef = useRef(null)

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

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function deleteBrief(id) {
    await supabase.from('briefs').delete().eq('id', id)
    setBriefs((prev) => prev.filter((b) => b.id !== id))
  }

  async function saveLink(briefId) {
    const url = (linkInputs[briefId] ?? '').trim()
    if (!url) return
    await supabase.from('briefs').update({ render_url: url }).eq('id', briefId)
    setBriefs((prev) =>
      prev.map((b) => (b.id === briefId ? { ...b, render_url: url } : b))
    )
    setEditingLink(null)
  }

  function startEditing(briefId, currentUrl) {
    setLinkInputs((prev) => ({ ...prev, [briefId]: currentUrl ?? '' }))
    setEditingLink(briefId)
  }

  function handleDeleteClick() {
    setMenuOpen(false)
    setConfirmDelete(true)
  }

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
          <span className="text-xs text-neutral-400">{user?.user_metadata?.nom_artiste ?? ''}</span>
          <Link
            to="/monde"
            className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            Journal mondial
          </Link>
          <button
            onClick={logout}
            className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
          >
            Déconnexion
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex flex-col gap-1.5 p-1 cursor-pointer group"
              aria-label="Menu"
            >
              <span className="block w-5 h-px bg-neutral-500 group-hover:bg-neutral-900 transition-colors" />
              <span className="block w-5 h-px bg-neutral-500 group-hover:bg-neutral-900 transition-colors" />
              <span className="block w-5 h-px bg-neutral-500 group-hover:bg-neutral-900 transition-colors" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-neutral-200 shadow-sm z-10">
                <div className="py-1">
                  <button
                    onClick={handleDeleteClick}
                    className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    Supprimer mon compte
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {confirmDelete && (
        <div className="max-w-2xl w-full mx-auto mb-6 border border-red-200 bg-red-50 px-5 py-4 flex items-center justify-between gap-4">
          <p className="text-xs text-red-700">Cette action est irréversible. Tous tes briefs seront supprimés.</p>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={deleteAccount}
              disabled={deleting}
              className="text-xs text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              {deleting ? 'Suppression…' : 'Confirmer'}
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="text-xs text-red-400 hover:text-red-700 transition-colors cursor-pointer"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {deleteError && (
        <div className="max-w-2xl w-full mx-auto mb-4">
          <p className="text-xs text-red-500">{deleteError}</p>
        </div>
      )}

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

                {/* Méta */}
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
                  <div className="flex items-center gap-3">
                    {brief.mode && (
                      <span className="text-xs border border-neutral-200 px-2 py-0.5 text-neutral-500">
                        {brief.mode === 'express' ? 'Carte express' : 'Carte courte'}
                      </span>
                    )}
                    <button
                      onClick={() => deleteBrief(brief.id)}
                      className="text-neutral-300 hover:text-red-400 transition-colors cursor-pointer text-base leading-none"
                      title="Supprimer ce brief"
                    >
                      ×
                    </button>
                  </div>
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
                    className="flex gap-6 px-6 py-4 border-b border-neutral-100"
                  >
                    <span className="shrink-0 w-28 text-xs uppercase tracking-widest text-neutral-400 pt-0.5">
                      {config.label}
                    </span>
                    <p className="text-sm font-medium text-neutral-900 leading-snug">
                      {config.renderContent(data)}
                    </p>
                  </div>
                ))}

                {/* Lien vers le rendu */}
                <div className="px-6 py-4 border-t border-neutral-100">
                  {brief.render_url && editingLink !== brief.id ? (
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="shrink-0 text-xs uppercase tracking-widest text-neutral-400">
                          Mon rendu
                        </span>
                        <a
                          href={brief.render_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-neutral-900 hover:underline underline-offset-2 truncate transition-colors"
                        >
                          Voir le résultat →
                        </a>
                      </div>
                      <button
                        onClick={() => startEditing(brief.id, brief.render_url)}
                        className="shrink-0 text-xs text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                      >
                        Modifier
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <span className="text-xs uppercase tracking-widest text-neutral-400">
                        Mon rendu
                      </span>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="Colle le lien vers ton résultat (Behance, portfolio…)"
                          value={linkInputs[brief.id] ?? ''}
                          onChange={(e) =>
                            setLinkInputs((prev) => ({ ...prev, [brief.id]: e.target.value }))
                          }
                          onKeyDown={(e) => e.key === 'Enter' && saveLink(brief.id)}
                          className="flex-1 border border-neutral-200 px-3 py-2 text-xs text-neutral-900 placeholder:text-neutral-300 outline-none focus:border-neutral-500 transition-colors"
                        />
                        <button
                          onClick={() => saveLink(brief.id)}
                          className="px-4 py-2 bg-neutral-900 text-white text-xs hover:bg-neutral-700 transition-colors cursor-pointer"
                        >
                          Enregistrer
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default Journal
