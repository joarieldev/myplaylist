import { create } from "zustand";

interface State {
  showModalAbout: boolean;
  handleModalAbout: () => void;
  dismissModalAbout: () => void;
  checkFirstVisit: () => void;
}

export const useModalAboutStore = create<State>()((set) => ({
  showModalAbout: false,
  handleModalAbout: () =>
    set((state) => ({ showModalAbout: !state.showModalAbout })),
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
}));
