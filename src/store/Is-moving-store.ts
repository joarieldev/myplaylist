import { create } from "zustand";

interface State {
  isMoving: boolean;
  timer: NodeJS.Timeout | null;
  setIsMoving: (isMoving: boolean) => void;
  setTimer: (timer: NodeJS.Timeout | null) => void;
}

export const useIsMovingStore = create<State>()((set) => ({
  isMoving: false,
  timer: null,
  setIsMoving: (isMoving: boolean) => set({ isMoving }),
  setTimer: (timer: NodeJS.Timeout | null) => set({ timer }),
}));
