import { useBriefStore } from '../store/briefStore'
import { pickRandom } from '../utils/random'
import clients from '../data/clients.json'
import commandes from '../data/commandes.json'
import publics from '../data/publics.json'
import contraintes from '../data/contraintes.json'

const DATA = [clients, commandes, publics, contraintes]

export function useBrief() {
  const { layers, currentLayer, isComplete, startGame, redrawLayer, nextLayer, reset } =
    useBriefStore()

  function start() {
    startGame(pickRandom(DATA[0]))
  }

  function redraw() {
    redrawLayer(currentLayer, pickRandom(DATA[currentLayer]))
  }

  function next() {
    const nextIndex = currentLayer + 1
    if (nextIndex < 4) {
      nextLayer(pickRandom(DATA[nextIndex]))
    } else {
      nextLayer(null)
    }
  }

  return { layers, currentLayer, isComplete, start, redraw, next, reset }
}
