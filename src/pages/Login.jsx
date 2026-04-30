import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/Button/Button'

function Login() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
      const { error } = await login(email, password)
      if (error) {
        setError('Identifiants incorrects. Vérifie ton email et ton mot de passe.')
      } else {
        navigate('/')
      }
    } else {
      const { error } = await signup(email, password)
      if (error) {
        setError(error.message)
      } else {
        setInfo('Compte créé ! Vérifie tes emails pour confirmer, puis connecte-toi.')
        switchMode('login')
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

        {/* Toggle connexion / inscription */}
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
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-500 transition-colors"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
