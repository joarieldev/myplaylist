import { create } from "zustand";

interface State {
  showInfo: boolean;
  handleModalInfo: () => void;
  dismissModal: () => void;
  checkFirstVisit: () => void;
}

export const useModalInfoStore = create<State>()((set) => ({
  showInfo: false,
  handleModalInfo: () =>
    set((state) => ({ showInfo: !state.showInfo })),
  dismissModal: () => {
    localStorage.setItem("ModalInfoMyPlaylist", "true");
    set({ showInfo: false });
  },
  checkFirstVisit: () => {
    const hasSeen = localStorage.getItem("ModalInfoMyPlaylist");
    if (!hasSeen) {
      set({ showInfo: true });
    }
  },
}));
