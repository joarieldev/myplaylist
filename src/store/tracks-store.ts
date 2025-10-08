import { create } from 'zustand'
import { ITrack } from '@/interfaces/Track'
import { IList } from '@/interfaces/List'

interface State {
  tracks: ITrack[]
  playlist: IList
  setTracks: (tracks: ITrack[]) => void
  setPlaylist: (playlist: IList) => void
}

export const useTracksStore = create<State>()((set) => ({
  tracks: [],
  playlist: {} as IList,
  setTracks: (tracks: ITrack[]) => set({ tracks }),
  setPlaylist: (playlist: IList) => set({ playlist: playlist }),
}))
