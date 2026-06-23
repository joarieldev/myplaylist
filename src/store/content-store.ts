import { create } from "zustand";
import { ITrack } from "@/interfaces/Track";

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface State {
  files: ITrack[];
  colors: Record<string, RGB>;

  addFiles: (files: ITrack[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  setColor: (trackId: string, colors: RGB) => void;
}

export const useContentStore = create<State>()((set) => ({
  files: [],
  colors: {},

  addFiles: (files) => set((state) => ({ files: [...state.files, ...files] })),
  removeFile: (id) => set((state) => ({ files: state.files.filter((f) => f.id !== id) })),
  clearFiles: () => set({ files: [] }),
  setColor: (trackId, colors) =>
    set((state) => ({
      colors: { ...state.colors, [trackId]: colors },
    })),
}));
