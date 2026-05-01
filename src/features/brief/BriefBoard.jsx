import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useBrief } from '../../hooks/useBrief'
import { useAuth } from '../../hooks/useAuth'
import { LAYER_CONFIG } from './layerConfig'
import LayerPanel from '../../components/LayerPanel/LayerPanel'

function BriefBoard() {
  const { layers, currentLayer, isComplete, redraw, next } = useBrief()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isComplete) navigate('/summary')
  }, [isComplete, navigate])

  function getStatus(i) {
    if (i < currentLayer) return 'revealed'
    if (i === currentLayer) return 'active'
    return 'pending'
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="shrink-0 border-b border-neutral-200 px-8 py-4 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-tight text-neutral-900">À la Carte</span>
        <div className="flex items-center gap-5">
          <Link
            to="/monde"
            className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            Journal mondial
          </Link>
          {user ? (
            <>
              <Link
                to="/journal"
                className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors"
              >
                Mon journal
              </Link>
              <button
                onClick={logout}
                className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors"
            >
              Se connecter
            </Link>
          )}
        </div>
      </header>
      <div className="flex-1 flex overflow-hidden">
        {LAYER_CONFIG.map((config, i) => (
          <LayerPanel
            key={config.number}
            config={config}
            item={layers[i]}
            status={getStatus(i)}
            onRedraw={redraw}
            onNext={next}
            isLast={i === 3}
          />
        ))}
      </div>
    </div>
  )
}

export default BriefBoard
