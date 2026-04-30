import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBrief } from '../../hooks/useBrief'
import { LAYER_CONFIG } from './layerConfig'
import LayerPanel from '../../components/LayerPanel/LayerPanel'

function BriefBoard() {
  const { layers, currentLayer, isComplete, redraw, next } = useBrief()
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
      <header className="shrink-0 border-b border-neutral-200 px-8 py-4">
        <span className="text-sm font-semibold tracking-tight text-neutral-900">À la Carte</span>
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
