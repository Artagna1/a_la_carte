import Button from '../Button/Button'

function LayerCard({ config, item, onRedraw, onNext, isLast }) {
  const content = config.renderContent(item)
  const badge = config.badge ? config.badge(item) : null

  return (
    <div className="border border-neutral-200 p-8 max-w-xl w-full">
      <div className="flex items-start justify-between mb-6">
        <span className="text-xs text-neutral-400 font-mono">{config.number}</span>
        {badge && (
          <span className="text-xs text-neutral-500 border border-neutral-200 px-2 py-0.5 capitalize">
            {badge}
          </span>
        )}
      </div>
      <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1">{config.label}</p>
      <p className="text-xs text-neutral-400 mb-6">{config.subtitle}</p>
      <p className="text-xl font-medium text-neutral-900 leading-snug mb-10">{content}</p>
      <div className="flex gap-3">
        <Button onClick={onRedraw} variant="secondary">
          Rejouer
        </Button>
        <Button onClick={onNext} variant="primary">
          {isLast ? 'Voir le brief complet' : 'Couche suivante'}
        </Button>
      </div>
    </div>
  )
}

export default LayerCard
