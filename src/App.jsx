import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { supabase } from './lib/supabase'
import { useAuthStore } from './store/authStore'
import Home from './pages/Home'
import Summary from './pages/Summary'
import Login from './pages/Login'
import Journal from './pages/Journal'
import GlobalJournal from './pages/GlobalJournal'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

function App() {
  const setUser = useAuthStore((s) => s.setUser)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [setUser])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="/login" element={<Login />} />
      <Route path="/journal" element={
        <ProtectedRoute><Journal /></ProtectedRoute>
      } />
      <Route path="/monde" element={<GlobalJournal />} />
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
    </Routes>
  )
}

export default App
