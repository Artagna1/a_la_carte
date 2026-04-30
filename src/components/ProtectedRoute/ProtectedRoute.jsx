import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore()

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-400 text-sm">Chargement…</p>
      </main>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  return children
}

export default ProtectedRoute
