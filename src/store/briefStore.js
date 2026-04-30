import { create } from 'zustand'

export const useBriefStore = create((set) => ({
  layers: [null, null, null, null],
  currentLayer: -1,
  isComplete: false,
  chosenDuration: null,
  chosenMode: null,
  isSaved: false,
  savedBriefId: null,

  startGame: (firstDraw) =>
    set({
      layers: [firstDraw, null, null, null],
      currentLayer: 0,
      isComplete: false,
    }),

  redrawLayer: (index, newDraw) =>
    set((state) => {
      const layers = [...state.layers]
      layers[index] = newDraw
      return { layers }
    }),

  nextLayer: (nextDraw) =>
    set((state) => {
      const nextIndex = state.currentLayer + 1
      const layers = [...state.layers]
      if (nextDraw !== null) layers[nextIndex] = nextDraw
      return {
        layers,
        currentLayer: nextIndex,
        isComplete: nextIndex >= 4,
      }
    }),

  setChosenDuration: (duration) => set({ chosenDuration: duration }),
  setChosenMode: (mode) => set({ chosenMode: mode }),
  markAsSaved: (id) => set({ isSaved: true, savedBriefId: id }),

  reset: () =>
    set({
      layers: [null, null, null, null],
      currentLayer: -1,
      isComplete: false,
      chosenDuration: null,
      chosenMode: null,
      isSaved: false,
      savedBriefId: null,
    }),
}))
