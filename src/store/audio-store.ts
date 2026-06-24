import { create } from "zustand";
import { persist } from "zustand/middleware";
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

  // cola-store
  tracks: ITrack[];
  
  // playback-track-store
  selectedTrack: ITrack | null;
  
  // window-back-store
  playlist: IList;
  playbackOrigin: string;

  // actions
  setIsPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  setBuffer: (buffer: number) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (current: number) => void;
  setIsMuted: (muted: boolean, volume: number) => void;
  setLoading: (loading: boolean) => void;
  setIsSeeking: (seeking: boolean) => void;
  setTracks: (tracks: ITrack[]) => void;
  setSelectedTrack: (track: ITrack | null) => void;
  setPlaylist: (playlist: IList) => void;
  setPlaybackOrigin: (origin: string) => void;
  resetPlayback: () => void;
}

export const useAudioStore = create<State>()(
  persist(
    (set) => ({
      isPlaying: false,
      volume: 0.25,
      buffer: 0,
      duration: 0,
      currentTime: 0,
      isMuted: { muted: false, volume: 0 },
      loading: false,
      isSeeking: false,

      // cola-store
      tracks: [],
      playlist: {} as IList,

      // playback-track-store
      selectedTrack: null,

      // window-back-store
      playbackOrigin: "",

      // actions
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
      setSelectedTrack: (track) => set({ selectedTrack: track }),
      setPlaylist: (playlist) => set({ playlist }),
      setPlaybackOrigin: (origin) => set({ playbackOrigin: origin }),
      resetPlayback: () => set({ currentTime: 0, duration: 0, buffer: 0 }),
    }),
    {
      name: "myPlaylistQueue",
      partialize: (state) => ({
        tracks: state.tracks.filter((t) => t.tags !== "local"),
        selectedTrack: state.selectedTrack?.tags === "local" ? null : state.selectedTrack,
        playlist: state.playlist,
        playbackOrigin: state.playbackOrigin,
      }),
    }
  )
);
