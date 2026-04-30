import { useBrief } from '../../hooks/useBrief'
import { LAYER_CONFIG } from './layerConfig'
import LayerCard from '../../components/LayerCard/LayerCard'

function BriefGenerator() {
  const { layers, currentLayer, redraw, next } = useBrief()

  const currentItem = layers[currentLayer]
  const config = LAYER_CONFIG[currentLayer]

  if (!currentItem || !config) return null

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-1 mb-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-0.5 w-8 transition-colors duration-300 ${
              i <= currentLayer ? 'bg-neutral-900' : 'bg-neutral-200'
            }`}
          />
        ))}
      </div>
      <LayerCard
        config={config}
        item={currentItem}
        onRedraw={redraw}
        onNext={next}
        isLast={currentLayer === 3}
      />
    </div>
  )
}

export default BriefGenerator
