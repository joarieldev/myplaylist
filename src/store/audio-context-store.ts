import { create } from "zustand";

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
  setVolume: (volume) => set({ volume: volume }),
  setBuffer: (buffer) => set({ buffer: buffer }),
  setDuration: (duration) => set({ duration: duration }),
  setCurrentTime: (currentTime) => set({ currentTime: currentTime }),
  setIsMuted: (muted: boolean, volume: number) => set({ isMuted: { muted: muted, volume: volume } }),
  setLoading: (value) => set({ loading: value}),
  setIsSeeking: (value) => set({ isSeeking: value}),

  setAudioContext: (context) => set({ audioContext: context }),
  setSourceNode: (sourceNode) => set({ sourceNode: sourceNode }),
  setGainNode: (gainNode) => set({ gainNode: gainNode }),
  setAnalyserNode: (analyserNode) => set({ analyserNode: analyserNode }),
  setAudioElement: (element) => set({ audioElement: element }),
}));
