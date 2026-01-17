import { create } from "zustand";

export type VisualizerMode = "line-wave" | "line-wave-chill" | "spectrum-center" | "spectrum-plain" | "spectrum-wide" | "circle-spectrum" | "circle-spectrum-spring" | "vantajs-birds" | "vantajs-cells" | "snowflake";

interface State {
  mode: VisualizerMode;
  handleMode: (value: VisualizerMode) => void;
}

export const useBgVisualizerStore = create<State>()((set) => ({
  mode: "line-wave",
  handleMode: (value: VisualizerMode) => set(() => ({ mode: value })),
}));
