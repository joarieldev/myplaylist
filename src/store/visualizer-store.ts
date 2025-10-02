import { create } from "zustand";

type Values = "none" | "active" | "middle" | "full";

interface State {
  visualizer: Values;
  handleVisualizer: (value: Values) => void;
}

export const useVisualizerStore = create<State>()((set) => ({
  visualizer: "none",
  handleVisualizer: (value: Values) => set(() => ({ visualizer: value })),
}));