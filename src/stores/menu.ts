import { create } from "zustand";

interface MenuState {
  itemIndex?: number
  subItemIndex?: number
  subSubItemIndex?: number
  setIndex: (newItemIndex?: number, newSubItemIndex?: number, newSubSubItemIndex?: number) => void
}

const useMenu = create<MenuState>()(set => ({
  itemIndex: undefined,
  subItemIndex: undefined,
  subSubItemIndex: undefined,
  setIndex: (newItemIndex?: number, newSubItemIndex?: number, newSubSubItemIndex?: number) => set(state => ({
    itemIndex: newItemIndex !== undefined ? newItemIndex : state.itemIndex,
    subItemIndex: newSubItemIndex !== undefined ? newSubItemIndex : state.subItemIndex,
    subSubItemIndex: newSubSubItemIndex !== undefined ? newSubSubItemIndex : state.subSubItemIndex
  }))
}));

export default useMenu;