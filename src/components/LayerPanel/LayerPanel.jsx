import Button from '../Button/Button'
import { getIllustrationUrl } from '../../utils/illustrations'

function LayerPanel({ config, item, status, onRedraw, onNext, isLast }) {
  const isActive = status === 'active'
  const isPending = status === 'pending'
  const hasContent = item !== null

  const badge = config.badge && item ? config.badge(item) : null

  return (
    <div
      className={`relative flex-1 flex flex-col p-8 border-r border-neutral-200 last:border-r-0 overflow-hidden transition-colors duration-300 ${
        isPending ? 'bg-neutral-50' : 'bg-white'
      }`}
    >
      {/* Illustration de fond */}
      {hasContent && (
        <img
          src={getIllustrationUrl(config.type, item.id, 'bg')}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      )}

      {/* En-tête */}
      <div className="relative shrink-0 mb-6 z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-neutral-400">{config.number}</span>
          {badge && (
            <span className="text-xs border border-neutral-200 bg-white px-2 py-0.5 text-neutral-500 capitalize">
              {badge}
            </span>
          )}
        </div>
        <p
          className={`text-xs uppercase tracking-widest mb-1 transition-colors duration-300 ${
            isPending ? 'text-neutral-300' : 'text-neutral-700'
          }`}
        >
          {config.label}
        </p>
        <p className={`text-xs transition-colors duration-300 ${isPending ? 'text-neutral-300' : 'text-neutral-400'}`}>
          {config.subtitle}
        </p>
      </div>

      {/* Contenu centré avec cadre blanc */}
      <div className="relative flex-1 flex items-center z-10">
        <div
          className={`w-full transition-all duration-500 ${
            hasContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          {hasContent && (
            <div className="bg-white border border-neutral-100 px-5 py-4">
              <p className="text-lg font-medium text-neutral-900 leading-snug">
                {config.renderContent(item)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Boutons */}
      <div
        className={`relative shrink-0 flex flex-col gap-2 z-10 transition-all duration-300 ${
          isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Button onClick={onNext} variant="primary" className="w-full">
          {isLast ? 'Terminer le brief' : 'Couche suivante'}
        </Button>
        <Button onClick={onRedraw} variant="secondary" className="w-full">
          Rejouer
        </Button>
      </div>
    </div>
  )
}

export default LayerPanel
