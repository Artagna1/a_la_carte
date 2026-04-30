import { useBrief } from '../hooks/useBrief'
import { LAYER_CONFIG } from '../features/brief/layerConfig'
import Button from '../components/Button/Button'

function Summary() {
  const { layers, reset } = useBrief()

  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl">

        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">Brief complet</p>
          <h1 className="text-3xl font-bold text-neutral-900">Ton brief est prêt.</h1>
        </div>

        <div className="flex flex-col gap-0 border border-neutral-200 bg-white">
          {LAYER_CONFIG.map((config, i) => {
            const item = layers[i]
            if (!item) return null
            const badge = config.badge ? config.badge(item) : null
            return (
              <div
                key={config.number}
                className="flex gap-8 p-6 border-b border-neutral-100 last:border-b-0"
              >
                <div className="shrink-0 w-32">
                  <span className="text-xs font-mono text-neutral-300">{config.number}</span>
                  <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1">
                    {config.label}
                  </p>
                </div>
                <div className="flex-1 flex items-start justify-between gap-4">
                  <p className="text-base font-medium text-neutral-900 leading-snug">
                    {config.renderContent(item)}
                  </p>
                  {badge && (
                    <span className="shrink-0 text-xs border border-neutral-200 px-2 py-0.5 text-neutral-500 capitalize">
                      {badge}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Button onClick={reset} variant="secondary">
            Nouveau brief
          </Button>
        </div>

      </div>
    </main>
  )
}

export default Summary
