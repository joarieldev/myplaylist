import { create } from "zustand";

interface State {
  audioContext: AudioContext | null;
  audioElement: HTMLAudioElement | null;
  isPaused: boolean;
  duration: number;
  currentTime: number;
  sourceNode: MediaElementAudioSourceNode | null;
  analyserNode: AnalyserNode | null;
  gainNode: GainNode | null;
  volume: number;
  isMuted: { muted: boolean, volume: number };
  setAnalyserNode: (analyserNode: AnalyserNode | null) => void;
  setAudioContext: (context: AudioContext | null) => void;
  setAudioElement: (element: HTMLAudioElement | null) => void;
  setIsPaused: (paused: boolean) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (currentTime: number) => void;
  setSourceNode: (sourceNode: MediaElementAudioSourceNode | null) => void;
  setGainNode: (gainNode: GainNode | null) => void;
  setVolume: (volume: number) => void;
  setIsMuted: (muted: boolean, volume: number) => void;
  reset: () => void;
}

export const useAudioContextStore = create<State>((set) => ({
  audioContext: null,
  audioElement: null,
  isPaused: false,
  duration: 0,
  currentTime: 0,
  sourceNode: null,
  analyserNode: null,
  gainNode: null,
  volume: 0.25,
  isMuted: { muted: false, volume: 0 },
  setAudioContext: (context) => set({ audioContext: context }),
  setAudioElement: (element) => set({ audioElement: element }),
  setIsPaused: (paused) => set({ isPaused: paused }),
  setDuration: (duration) => set({ duration: duration }),
  setCurrentTime: (currentTime) => set({ currentTime: currentTime }),
  setSourceNode: (sourceNode) => set({ sourceNode: sourceNode }),
  setAnalyserNode: (analyserNode) => set({ analyserNode: analyserNode }),
  setGainNode: (gainNode) => set({ gainNode: gainNode }),
  setVolume: (volume) => set({ volume: volume }),
  setIsMuted: (muted: boolean, volume: number) => set({ isMuted: { muted: muted, volume: volume } }),
  reset: () => set({
    currentTime: 0,
    duration: 0,
    isPaused: false,
  }),
}));
