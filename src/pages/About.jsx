import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function About() {
  const { user, logout } = useAuth()

  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col px-8 py-6">
      <header className="flex items-center justify-between mb-10">
        <Link
          to="/"
          className="text-sm font-semibold tracking-tight text-neutral-900 hover:text-neutral-600 transition-colors"
        >
          À la Carte
        </Link>
        <div className="flex items-center gap-5">
          <span className="text-xs font-medium text-neutral-900">C'est quoi ?</span>
          <Link
            to="/monde"
            className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            Journal mondial
          </Link>
          {user ? (
            <>
              <Link
                to="/journal"
                className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors"
              >
                Mon journal
              </Link>
              <button
                onClick={logout}
                className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors"
            >
              Se connecter
            </Link>
          )}
        </div>
      </header>

      <div className="max-w-2xl w-full mx-auto">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1">Le jeu</p>
          <h1 className="text-2xl font-bold text-neutral-900">C'est quoi À la Carte ?</h1>
        </div>

        <div className="flex flex-col gap-6 text-sm text-neutral-700 leading-relaxed">

          <p>
            <strong className="font-semibold text-neutral-900">À la Carte</strong> est un générateur de briefs graphiques aléatoires.
            Il te soumet une commande de design tirée au sort, que tu dois réaliser dans un temps imparti.
          </p>

          <div className="border border-neutral-200 bg-white">
            <div className="px-6 py-4 border-b border-neutral-100">
              <p className="text-xs uppercase tracking-widest text-neutral-400 mb-3">Comment ça marche</p>
              <ol className="flex flex-col gap-3 text-sm text-neutral-700">
                <li className="flex gap-3">
                  <span className="shrink-0 font-mono text-xs text-neutral-300 pt-0.5">01</span>
                  <span>Le jeu tire au sort quatre éléments : un <strong className="font-medium text-neutral-900">client</strong>, une <strong className="font-medium text-neutral-900">commande</strong>, un <strong className="font-medium text-neutral-900">public cible</strong> et une <strong className="font-medium text-neutral-900">contrainte</strong>. C'est ton brief.</span>
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 font-mono text-xs text-neutral-300 pt-0.5">02</span>
                  <span>Tu choisis ton tempo : <strong className="font-medium text-neutral-900">Carte express</strong> (15 à 45 min) ou <strong className="font-medium text-neutral-900">Carte courte</strong> (24 h à 1 semaine).</span>
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 font-mono text-xs text-neutral-300 pt-0.5">03</span>
                  <span>Tu réalises le brief, tu déposes le lien vers ton résultat dans ton journal et tu le partages avec la communauté.</span>
                </li>
              </ol>
            </div>

            <div className="px-6 py-4">
              <p className="text-xs uppercase tracking-widest text-neutral-400 mb-3">À qui ça s'adresse</p>
              <p className="text-sm text-neutral-700">
                À tous les graphistes, illustrateurs et étudiants en design qui veulent s'entraîner, sortir de leur zone de confort ou simplement créer sans prétexte.
              </p>
            </div>
          </div>

          <div className="flex justify-start mt-2">
            <Link
              to="/"
              className="text-xs font-medium text-neutral-900 border border-neutral-900 px-5 py-2.5 hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Tirer un brief →
            </Link>
          </div>

        </div>
      </div>
    </main>
  )
}

export default About
