import { create } from "zustand";
import { IList } from "@/interfaces/List";
import { ITrack } from "@/interfaces/Track";

interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface IListCustom {
  list: IList;
  path: string;
  tracks: ITrack[];
}

interface State {
  // detail-store
  list: IList;
  back: string;

  // files-store
  files: ITrack[];

  // playlist-store
  playlist: IListCustom[];

  // cells-colors-store
  colors: Record<string, RGB>;

  // Actions
  setList: (list: IList) => void;
  setBack: (back: string) => void;
  addFiles: (files: ITrack[]) => void;
  setPlaylist: (newList: IListCustom) => void;
  setColor: (trackId: string, colors: RGB) => void;
}

export const useContentStore = create<State>()((set) => ({
  // detail-store
  list: {} as IList,
  back: "",

  // files-store
  files: [],

  // playlist-store
  playlist: [],

  // cells-colors-store
  colors: {},

  // Actions
  setList: (list) => set({ list }),
  setBack: (back) => set({ back }),
  addFiles: (files) => set((state) => ({ files: [...state.files, ...files] })),
  setPlaylist: (newList) =>
    set((state) => ({
      playlist: state.playlist.find((item) => item.list.id === newList.list.id)
        ? [...state.playlist]
        : [...state.playlist, newList],
    })),
  setColor: (trackId, colors) =>
    set((state) => ({
      colors: { ...state.colors, [trackId]: colors },
    })),
}));
