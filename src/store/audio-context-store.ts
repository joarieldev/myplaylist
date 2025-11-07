import { create } from "zustand";

interface State {
  audioContext: AudioContext | null;
  audioElement: HTMLAudioElement | null;
  isPaused: boolean;
  duration: number;
  currentTime: number;
  bufferTime: number;
  sourceNode: MediaElementAudioSourceNode | null;
  analyserNode: AnalyserNode | null;
  gainNode: GainNode | null;
  volume: number;
  isMuted: { muted: boolean, volume: number };
  loading: boolean;
  setAnalyserNode: (analyserNode: AnalyserNode | null) => void;
  setAudioContext: (context: AudioContext | null) => void;
  setAudioElement: (element: HTMLAudioElement | null) => void;
  setIsPaused: (paused: boolean) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (currentTime: number) => void;
  setBufferTime: (value: number) => void;
  setSourceNode: (sourceNode: MediaElementAudioSourceNode | null) => void;
  setGainNode: (gainNode: GainNode | null) => void;
  setVolume: (volume: number) => void;
  setIsMuted: (muted: boolean, volume: number) => void;
  setLoading: (value: boolean) => void
  reset: () => void;
}

export const useAudioContextStore = create<State>((set) => ({
  audioContext: null,
  audioElement: null,
  isPaused: false,
  duration: 0,
  currentTime: 0,
  bufferTime: 0,
  sourceNode: null,
  analyserNode: null,
  gainNode: null,
  volume: 0.25,
  isMuted: { muted: false, volume: 0 },
  loading: false,
  setAudioContext: (context) => set({ audioContext: context }),
  setAudioElement: (element) => set({ audioElement: element }),
  setIsPaused: (paused) => set({ isPaused: paused }),
  setDuration: (duration) => set({ duration: duration }),
  setCurrentTime: (currentTime) => set({ currentTime: currentTime }),
  setBufferTime: (value) => set({ bufferTime: value}),
  setSourceNode: (sourceNode) => set({ sourceNode: sourceNode }),
  setAnalyserNode: (analyserNode) => set({ analyserNode: analyserNode }),
  setGainNode: (gainNode) => set({ gainNode: gainNode }),
  setVolume: (volume) => set({ volume: volume }),
  setIsMuted: (muted: boolean, volume: number) => set({ isMuted: { muted: muted, volume: volume } }),
  setLoading: (value) => set({ loading: value}),
  reset: () => set({
    currentTime: 0,
    bufferTime: 0,
    duration: 0,
  }),
}));
