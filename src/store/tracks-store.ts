import { create } from 'zustand'
import { ITrack } from '@/interfaces/Track'

interface State {
  tracks: ITrack[]
  setTracks: (tracks: ITrack[]) => void
}

export const useTracksStore = create<State>()((set) => ({
  tracks: [],
  setTracks: (tracks: ITrack[]) => set({ tracks }),
}))
