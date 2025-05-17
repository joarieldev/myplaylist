import { create } from "zustand";
import type { IFile } from "@/interfaces/File";

interface State {
  files: IFile[];
  addFiles: (files: IFile[]) => void;
}

export const useFilesStore = create<State>()((set) => ({
  files: [],
  addFiles: (files: IFile[]) => set((state) => ({ files: [...state.files, ...files] })),
}));
