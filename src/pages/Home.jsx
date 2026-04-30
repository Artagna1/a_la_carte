import { useBrief } from '../hooks/useBrief'
import BriefBoard from '../features/brief/BriefBoard'
import Button from '../components/Button/Button'

function Home() {
  const { currentLayer, start } = useBrief()
  const hasStarted = currentLayer >= 0

  if (hasStarted) return <BriefBoard />

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-8 text-center">
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
