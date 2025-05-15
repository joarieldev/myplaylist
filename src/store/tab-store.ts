import { create } from 'zustand'

type Tabs = "tracks" | "local" | "top" | "favorites";

interface State {
  tab: Tabs
  setTab: (tab: Tabs) => void
}

export const useTabStore = create<State>()((set) => ({
  tab: "tracks",
  setTab: (tab: Tabs) => set({ tab: tab }),
}))
