import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/Button/Button'

function Login() {
  const [mode, setMode] = useState('login')
  const [nom, setNom] = useState('')
  const [secret, setSecret] = useState('')
  const [error, setError] = useState(null)
  const [info, setInfo] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const { login, signup } = useAuth()
  const navigate = useNavigate()

  function switchMode(next) {
    setMode(next)
    setError(null)
    setInfo(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setInfo(null)
    setSubmitting(true)

    if (mode === 'login') {
      const { error } = await login(nom, secret)
      if (error) {
        setError("Nom d'artiste ou secret incorrect.")
      } else {
        navigate('/')
      }
    } else {
      const { error } = await signup(nom, secret)
      if (error) {
        if (error.message.includes('already registered')) {
          setError("Ce nom d'artiste est déjà pris. Choisis-en un autre.")
        } else {
          setError('Une erreur est survenue. Réessaie.')
        }
      } else {
        navigate('/')
      }
    }

    setSubmitting(false)
  }

  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">

        <div className="text-center mb-10">
          <Link
            to="/"
            className="text-xs uppercase tracking-widest text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            ← À la Carte
          </Link>
        </div>

        <div className="flex border border-neutral-200 bg-white mb-6">
          <button
            type="button"
            onClick={() => switchMode('login')}
            className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer ${
              mode === 'login'
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Connexion
          </button>
          <button
            type="button"
            onClick={() => switchMode('signup')}
            className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer ${
              mode === 'signup'
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Créer un compte
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nom d'artiste"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            className="border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-500 transition-colors"
          />
          <input
            type="password"
            placeholder="Secret d'artiste"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            required
            className="border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-500 transition-colors"
          />

          {error && <p className="text-xs text-red-500">{error}</p>}
          {info && <p className="text-xs text-emerald-600">{info}</p>}

          <Button className="w-full" variant="primary" disabled={submitting}>
            {submitting
              ? 'Chargement…'
              : mode === 'login'
              ? 'Se connecter'
              : 'Créer le compte'}
          </Button>
        </form>

      </div>
    </main>
  )
}

export default Login
