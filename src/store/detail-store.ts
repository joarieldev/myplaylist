import { IList } from '@/interfaces/List'
import { create } from 'zustand'

interface State {
  list: IList
  back: string
  setList: (list: IList) => void
  setBack: (back: string) => void
}

export const useDetailStore = create<State>()((set) => ({
  list: {} as IList,
  back: "",
  setList: (list: IList) => set({ list: list }),
  setBack: (back: string) => set({ back: back }),
}))
