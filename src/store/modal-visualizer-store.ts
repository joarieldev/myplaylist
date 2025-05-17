import { create } from "zustand";

type Values = "none" | "middle" | "full";

interface State {
  visualizer: Values;
  isModal: boolean;
  handleVisualizer: (value: Values) => void;
  handleModal: () => void;
}

export const useModalVisualizerStore = create<State>()((set) => ({
  visualizer: "none",
  isModal: false,
  handleVisualizer: (value: Values) => set(() => ({ visualizer: value })),
  handleModal: () => set((state) => ({ isModal: !state.isModal })),
}));