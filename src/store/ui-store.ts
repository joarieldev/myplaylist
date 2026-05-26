import { create } from "zustand";
import { ITrack } from "@/interfaces/Track";

export type Windows = "main" | "library" | "local" | "trending" | "search" | "favorites" | "detail";

type VisualizerDisplay = "none" | "active" | "middle" | "full";

interface State {
  // window-store
  window: Windows;
  selectedTrack: ITrack | null;

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
  setSelectedTrack: (track: ITrack | null) => void;
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
  selectedTrack: null,

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
  setSelectedTrack: (track) => set({ selectedTrack: track }),
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
