import { create } from 'zustand'
import { ITrack } from '@/interfaces/Track'

interface State {
  window: string
  selectedTrack: ITrack | null
  setWindow: (window: string) => void
  setSelectedTrack: (track: ITrack) => void
}

export const useWindowStore = create<State>()((set) => ({
  window: "main",
  selectedTrack: null,
  setWindow: (window: string) => set({ window }),
  setSelectedTrack: (track: ITrack) => set({ selectedTrack: track }),
}))
