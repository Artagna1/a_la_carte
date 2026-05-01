import { Link } from 'react-router-dom'
import { useBrief } from '../hooks/useBrief'
import { useAuth } from '../hooks/useAuth'
import BriefBoard from '../features/brief/BriefBoard'
import Button from '../components/Button/Button'

function Home() {
  const { currentLayer, start } = useBrief()
  const { user, logout } = useAuth()
  const hasStarted = currentLayer >= 0

  if (hasStarted) return <BriefBoard />

  return (
    <main className="min-h-screen flex flex-col px-8 py-6">
      <header className="flex items-center justify-between">
        <span className="text-sm font-semibold tracking-tight text-neutral-900">À la Carte</span>
        <div className="flex items-center gap-5">
          <Link
            to="/a-propos"
            className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            C'est quoi À la Carte ?
          </Link>
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

      <div className="flex-1 flex flex-col items-center justify-center gap-8 text-center">
        <div>
          <h1 className="text-5xl font-bold tracking-tight text-neutral-900 mb-3">
            À la Carte
          </h1>
          <p className="text-neutral-500 max-w-sm">
            Génère un brief graphique réaliste, couche par couche.
          </p>
        </div>
        <Button onClick={start} variant="primary">
          Commencer
        </Button>
      </div>
    </main>
  )
}

export default Home
