import { create } from 'zustand'
import { ITrack } from '@/interfaces/Track'
import { IFile } from '@/interfaces/File'

type Windows = "main" | "playlist";

interface State {
  window: Windows
  selectedTrack: ITrack | null
  selectedTrackLocal: IFile | null
  setWindow: (window: Windows) => void
  setSelectedTrack: (track: ITrack | null) => void
  setSelectedTrackLocal: (file: IFile | null) => void
}

export const useWindowStore = create<State>()((set) => ({
  window: "main",
  selectedTrack: null,
  selectedTrackLocal: null,
  setWindow: (window: Windows) => set({ window }),
  setSelectedTrack: (track: ITrack | null) => set({ selectedTrack: track }),
  setSelectedTrackLocal: (file: IFile | null) => set({ selectedTrackLocal: file }),
}))
