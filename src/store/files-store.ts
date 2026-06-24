import { create } from "zustand";
import { ITrack } from "@/interfaces/Track";

interface State {
  files: ITrack[];

  addFiles: (files: ITrack[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
}

export const useFilesStore = create<State>()((set) => ({
  files: [],

  addFiles: (files) => set((state) => ({ files: [...state.files, ...files] })),
  removeFile: (id) => set((state) => ({ files: state.files.filter((f) => f.id !== id) })),
  clearFiles: () => set({ files: [] }),
}));
