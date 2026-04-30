import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBrief } from '../hooks/useBrief'
import { useTimer } from '../hooks/useTimer'
import { useBriefStore } from '../store/briefStore'
import { LAYER_CONFIG } from '../features/brief/layerConfig'
import Button from '../components/Button/Button'

const MODE_LABELS = {
  express: 'Carte express',
  courte: 'Carte courte',
}

function Summary() {
  const { layers, reset } = useBrief()
  const setChosenDuration = useBriefStore((s) => s.setChosenDuration)
  const navigate = useNavigate()
  const { mode, totalSeconds, display, isExpired, start } = useTimer()

  useEffect(() => {
    if (totalSeconds !== null) setChosenDuration(totalSeconds)
  }, [totalSeconds, setChosenDuration])

  function handleReset() {
    reset()
    navigate('/')
  }

  function handleModeSelect(selectedMode) {
    start(selectedMode)
  }

  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl">

        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">Brief complet</p>
          <h1 className="text-3xl font-bold text-neutral-900">Ton brief est prêt.</h1>
        </div>

        {/* Brief */}
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

        {/* Sélecteur de mode ou timer */}
        <div className="mt-8">
          {!mode ? (
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-400 mb-4 text-center">
                Choisis ton tempo de travail
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleModeSelect('express')}
                  className="border border-neutral-200 bg-white p-5 text-left hover:border-neutral-400 transition-colors duration-150 cursor-pointer"
                >
                  <p className="text-sm font-semibold text-neutral-900 mb-1">Carte express</p>
                  <p className="text-xs text-neutral-500">Durée aléatoire entre 15 et 45 minutes</p>
                </button>
                <button
                  onClick={() => handleModeSelect('courte')}
                  className="border border-neutral-200 bg-white p-5 text-left hover:border-neutral-400 transition-colors duration-150 cursor-pointer"
                >
                  <p className="text-sm font-semibold text-neutral-900 mb-1">Carte courte</p>
                  <p className="text-xs text-neutral-500">Durée aléatoire entre 24 heures et 1 semaine</p>
                </button>
              </div>
            </div>
          ) : (
            <div className="border border-neutral-200 bg-white p-6 text-center">
              <p className="text-xs uppercase tracking-widest text-neutral-400 mb-3">
                {MODE_LABELS[mode]}
              </p>
              {isExpired ? (
                <p className="text-2xl font-bold text-neutral-900">Temps écoulé !</p>
              ) : (
                <p className="text-4xl font-bold tracking-tight text-neutral-900 font-mono">
                  {display}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <Button onClick={handleReset} variant="secondary">
            Nouveau brief
          </Button>
        </div>

      </div>
    </main>
  )
}

export default Summary
