import { create } from 'zustand'

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface State {
  colors: Record<string, RGB>;
  setColor: (trackId: string, colors: RGB) => void;
}

export const useCellsColorsStore = create<State>((set) => ({
  colors: {},
  setColor: (trackId, colors) =>
    set((state) => ({
      colors: { ...state.colors, [trackId]: colors },
    })),
}));
