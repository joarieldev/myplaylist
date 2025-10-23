import { create } from "zustand";
import { ITrack } from "@/interfaces/Track";

interface State {
  files: ITrack[];
  addFiles: (files: ITrack[]) => void;
}

export const useFilesStore = create<State>()((set) => ({
  files: [],
  addFiles: (files: ITrack[]) => set((state) => ({ files: [...state.files, ...files] })),
}));
