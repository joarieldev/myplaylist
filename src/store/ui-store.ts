import { create } from "zustand";
import { IList } from "@/interfaces/List";

export type Windows = "main" | "library" | "local" | "trending" | "search" | "favorites" | "detail";

type VisualizerDisplay = "none" | "active" | "middle" | "full";

interface State {
  // window-store
  window: Windows;

  // window-back-store
  viewingPlaylist: IList;
  back: string;

  // visualizer-store
  visualizer: VisualizerDisplay;

  // Is-moving-store
  isMoving: boolean;
  movingTimer: NodeJS.Timeout | null;

  // modal-about-store
  showModalAbout: boolean;

  // search-store
  searchText: string;

  // Actions
  setWindow: (window: Windows) => void;
  setViewingPlaylist: (list: IList) => void;
  setBack: (back: string) => void;
  handleVisualizer: (value: VisualizerDisplay) => void;
  setIsMoving: (isMoving: boolean) => void;
  setMovingTimer: (timer: NodeJS.Timeout | null) => void;
  handleModalAbout: () => void;
  dismissModalAbout: () => void;
  checkFirstVisit: () => void;
  setSearchText: (search: string) => void;
}

export const useUiStore = create<State>()((set) => ({
  // window-store
  window: "main",

  // window-back-store
  viewingPlaylist: {} as IList,
  back: "",

  // visualizer-store
  visualizer: "none",

  // Is-moving-store
  isMoving: false,
  movingTimer: null,

  // modal-about-store
  showModalAbout: false,

  // search-store
  searchText: "",

  // Actions
  setWindow: (window) => set({ window }),
  setViewingPlaylist: (list) => set({ viewingPlaylist: list }),
  setBack: (back) => set({ back }),
  handleVisualizer: (value) => set({ visualizer: value }),
  setIsMoving: (isMoving) => set({ isMoving }),
  setMovingTimer: (timer) => set({ movingTimer: timer }),
  handleModalAbout: () => set((state) => ({ showModalAbout: !state.showModalAbout })),
  dismissModalAbout: () => {
    localStorage.setItem("ModalAboutMyPlaylist", "true");
    set({ showModalAbout: false });
  },
  checkFirstVisit: () => {
    const hasSeen = localStorage.getItem("ModalAboutMyPlaylist");
    if (!hasSeen) {
      set({ showModalAbout: true });
    }
  },
  setSearchText: (search) => set({ searchText: search }),
}));
