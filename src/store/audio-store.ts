import { create } from "zustand";
import { myPlaylistConfigStorage } from "@/utils/localStorage";
import { ITrack } from "@/interfaces/Track";
import { IList } from "@/interfaces/List";

interface State {
  isPlaying: boolean;
  volume: number;
  buffer: number;
  duration: number;
  currentTime: number;
  isMuted: { muted: boolean; volume: number };
  loading: boolean;
  isSeeking: boolean;
  tracks: ITrack[];
  playlist: IList;

  setIsPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  setBuffer: (buffer: number) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (current: number) => void;
  setIsMuted: (muted: boolean, volume: number) => void;
  setLoading: (loading: boolean) => void;
  setIsSeeking: (seeking: boolean) => void;
  setTracks: (tracks: ITrack[]) => void;
  setPlaylist: (playlist: IList) => void;
}

export const useAudioStore = create<State>()((set) => ({
  isPlaying: false,
  volume: 0.25,
  buffer: 0,
  duration: 0,
  currentTime: 0,
  isMuted: { muted: false, volume: 0 },
  loading: false,
  isSeeking: false,
  tracks: [],
  playlist: {} as IList,

  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setVolume: (volume) => {
    set({ volume });
    myPlaylistConfigStorage.setConfig({ volume });
  },
  setBuffer: (buffer) => set({ buffer }),
  setDuration: (duration) => set({ duration }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setIsMuted: (muted: boolean, volume: number) => {
    set({ isMuted: { muted, volume } });
    myPlaylistConfigStorage.setConfig({ isMuted: { muted, volume } });
  },
  setLoading: (value) => set({ loading: value }),
  setIsSeeking: (value) => set({ isSeeking: value }),
  setTracks: (tracks) => set({ tracks }),
  setPlaylist: (playlist) => set({ playlist }),
}));
