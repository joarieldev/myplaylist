import { create } from "zustand";
import { myPlaylistConfigStorage } from '@/utils/localStorage';

export type VisualizerMode = "line-wave" | "line-wave-chill" | "spectrum-center" | "spectrum-plain" | "spectrum-wide" | "circle-spectrum" | "circle-spectrum-spring" | "vantajs-birds" | "vantajs-cells" | "snowflake";

export interface RGB {
  r: number;
  g: number;
  b: number;
}

interface State {
  mode: VisualizerMode;
  colors: Record<string, RGB>;

  handleMode: (value: VisualizerMode) => void;
  setColor: (trackId: string, colors: RGB) => void;
}

export const useBgVisualizerStore = create<State>()((set) => ({
  mode: "line-wave",
  colors: {},

  handleMode: (value: VisualizerMode) => {
    set(() => ({ mode: value }));
    myPlaylistConfigStorage.setConfig({ visualizer: value });
  },
  setColor: (trackId, colors) =>
    set((state) => ({
      colors: { ...state.colors, [trackId]: colors },
    })),
}));
