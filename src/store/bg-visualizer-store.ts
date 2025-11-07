import { create } from "zustand";

type Values = "line-wave" | "line-wave-chill" | "spectrum-center" | "spectrum-plain" | "spectrum-wide" | "circle-spectrum" | "circle-spectrum-spring" | "vantajs-birds" | "vantajs-cells" | "snowflake";

interface State {
  mode: Values;
  handleMode: (value: Values) => void;
}

export const useBgVisualizerStore = create<State>()((set) => ({
  mode: "line-wave",
  handleMode: (value: Values) => set(() => ({ mode: value })),
}));
