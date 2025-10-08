import { create } from 'zustand'
import { ITrack } from '@/interfaces/Track'
import { IList } from '@/interfaces/List'

interface IListCustom {
  list: IList,
  path: string,
  tracks: ITrack[]
}

interface State {
  playlist: IListCustom[]
  setPlaylist: (newList: IListCustom) => void
}

export const usePlaylistStore = create<State>()((set) => ({
  playlist: [],
  setPlaylist: (newList: IListCustom) => set(( state ) =>  ({
    playlist: state.playlist.find((item) => item.list.id === newList.list.id) ? [...state.playlist] : [...state.playlist, newList]
  })),
}))
