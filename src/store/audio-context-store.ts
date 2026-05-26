import { create } from "zustand";

interface State {
  audioContext: AudioContext | null;
  sourceNode: MediaElementAudioSourceNode | null;
  gainNode: GainNode | null;
  analyserNode: AnalyserNode | null;
  audioElement: HTMLAudioElement | null;

  initializeAudio: (initialVolume: number) => void;
  stopCurrentAudio: () => void;

  setSourceNode: (node: MediaElementAudioSourceNode | null) => void;
  setGainNode: (node: GainNode | null) => void;
  setAnalyserNode: (node: AnalyserNode | null) => void;
  setAudioElement: (element: HTMLAudioElement | null) => void;
}

export const useAudioContextStore = create<State>()((set, get) => ({
  audioContext: null,
  sourceNode: null,
  gainNode: null,
  analyserNode: null,
  audioElement: null,

  initializeAudio: (initialVolume: number) => {
    const state = get();
    if (state.audioContext) return;

    const context = new AudioContext();
    const gain = context.createGain();
    gain.connect(context.destination);
    gain.gain.value = initialVolume;

    set({
      audioContext: context,
      gainNode: gain,
    });
  },

  stopCurrentAudio: () => {
    const state = get();

    if (state.analyserNode) {
      state.analyserNode.disconnect();
    }

    if (state.sourceNode) {
      state.sourceNode.disconnect();
    }

    if (state.audioElement) {
      state.audioElement.pause();
      state.audioElement.src = "";
    }

    set({ sourceNode: null, audioElement: null });
  },

  setSourceNode: (sourceNode) => set({ sourceNode }),
  setGainNode: (gainNode) => set({ gainNode }),
  setAnalyserNode: (analyserNode) => set({ analyserNode }),
  setAudioElement: (audioElement) => set({ audioElement }),
}));
