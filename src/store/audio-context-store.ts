import { create } from "zustand";

interface State {
  audioContext: AudioContext | null;
  audioElement: HTMLAudioElement | null;
  isPaused: boolean;
  duration: number;
  currentTime: number;
  sourceNode: MediaElementAudioSourceNode | null;
  setAudioContext: (context: AudioContext | null) => void;
  setAudioElement: (element: HTMLAudioElement | null) => void;
  setIsPaused: (paused: boolean) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (currentTime: number) => void;
  setSourceNode: (sourceNode: MediaElementAudioSourceNode | null) => void;
  reset: () => void;
}

export const useAudioContextStore = create<State>((set) => ({
  audioContext: null,
  audioElement: null,
  isPaused: false,
  duration: 0,
  currentTime: 0,
  sourceNode: null,
  setAudioContext: (context) => set({ audioContext: context }),
  setAudioElement: (element) => set({ audioElement: element }),
  setIsPaused: (paused) => set({ isPaused: paused }),
  setDuration: (duration) => set({ duration: duration }),
  setCurrentTime: (currentTime) => set({ currentTime: currentTime }),
  setSourceNode: (sourceNode) => set({ sourceNode: sourceNode }),
  reset: () => set({
    currentTime: 0,
    duration: 0,
    isPaused: false,
  }),
}));
