// import { ISearch } from '@/interfaces/Search'
import { create } from 'zustand'

interface State {
  searchText: string,
  setSearchText: (search: string) => void,
}

export const useSearchStore = create<State>()((set) => ({
  searchText: "",
  setSearchText: (search: string) => set({ searchText: search }),
}))
