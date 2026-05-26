import { create } from "zustand";
import { myPlaylistConfigStorage } from '@/utils/localStorage';
import { ITrack } from '@/interfaces/Track';
import { IList } from '@/interfaces/List';

interface State {
  isPlaying: boolean;
  volume: number;
  buffer: number;
  duration: number;
  currentTime: number;
  isMuted: { muted: boolean, volume: number };
  loading: boolean;
  isSeeking: boolean;

  audioContext: AudioContext | null;
  sourceNode: MediaElementAudioSourceNode | null;
  gainNode: GainNode | null;
  analyserNode: AnalyserNode | null;
  audioElement: HTMLAudioElement | null;

  // tracks-playing-store merge
  tracks: ITrack[];
  playlist: IList;

  initializeAudio: () => void;
  stopCurrentAudio: () => void;

  setIsPlaying: (playing: boolean) => void,
  setVolume: (volume: number) => void;
  setBuffer: (buffer: number) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (current: number) => void;
  setIsMuted: (muted: boolean, volume: number) => void;
  setLoading: (loading: boolean) => void
  setIsSeeking: (seeking: boolean) => void;

  setAudioContext: (context: AudioContext | null) => void;
  setSourceNode: (sourceNode: MediaElementAudioSourceNode | null) => void;
  setGainNode: (gainNode: GainNode | null) => void;
  setAnalyserNode: (analyserNode: AnalyserNode | null) => void;
  setAudioElement: (element: HTMLAudioElement | null) => void;

  // tracks-playing-store actions
  setTracks: (tracks: ITrack[]) => void;
  setPlaylist: (playlist: IList) => void;
}

export const useAudioContextStore = create<State>((set, get) => ({
  isPlaying: false,
  volume: 0.25,
  buffer: 0,
  duration: 0,
  currentTime: 0,
  isMuted: { muted: false, volume: 0 },
  loading: false,
  isSeeking: false,

  audioContext: null,
  sourceNode: null,
  gainNode: null,
  analyserNode: null,
  audioElement: null,

  initializeAudio: () => {
    const state = get();
    if (state.audioContext) return;

    const context = new AudioContext();
    const gain = context.createGain();
    gain.connect(context.destination);
    gain.gain.value = state.volume;

    set({
      audioContext: context,
      gainNode: gain
    });
  },

  stopCurrentAudio: () => {
    const state = get();

    if(state.analyserNode){
      state.analyserNode.disconnect();
    }

    if (state.sourceNode) {
      state.sourceNode.disconnect();
    }

    if (state.audioElement) {
      state.audioElement.pause();
      state.audioElement.src = '';
    }

    set({ sourceNode: null, audioElement: null, currentTime: 0, duration:0, buffer: 0 });
  },

  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setVolume: (volume) => {
    set({ volume });
    myPlaylistConfigStorage.setConfig({ volume });
  },
  setBuffer: (buffer) => set({ buffer: buffer }),
  setDuration: (duration) => set({ duration: duration }),
  setCurrentTime: (currentTime) => set({ currentTime: currentTime }),
  setIsMuted: (muted: boolean, volume: number) => {
    set({ isMuted: { muted, volume } });
    myPlaylistConfigStorage.setConfig({ isMuted: { muted, volume } });
  },
  setLoading: (value) => set({ loading: value}),
  setIsSeeking: (value) => set({ isSeeking: value}),

  // tracks-playing-store merge
  tracks: [],
  playlist: {} as IList,

  setAudioContext: (context) => set({ audioContext: context }),
  setSourceNode: (sourceNode) => set({ sourceNode: sourceNode }),
  setGainNode: (gainNode) => set({ gainNode: gainNode }),
  setAnalyserNode: (analyserNode) => set({ analyserNode: analyserNode }),
  setAudioElement: (element) => set({ audioElement: element }),

  setTracks: (tracks) => set({ tracks }),
  setPlaylist: (playlist) => set({ playlist }),
}));
