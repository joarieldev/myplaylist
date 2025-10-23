import { create } from 'zustand'
import { ITrack } from '@/interfaces/Track'

export type Windows = "main" | "library" | "local" | "trending" | "search" | "favorites" | "detail";

interface State {
  window: Windows
  selectedTrack: ITrack | null
  setWindow: (window: Windows) => void
  setSelectedTrack: (track: ITrack | null) => void
}

export const useWindowStore = create<State>()((set) => ({
  window: "main",
  selectedTrack: null,
  setWindow: (window: Windows) => set({ window }),
  setSelectedTrack: (track: ITrack | null) => set({ selectedTrack: track }),
}))
