import { create } from "zustand";

interface MenuState {
  active: {
    0?: number;
    1?: number;
    2?: number;
  };
  setActive: (index0?: number, index1?: number, index2?: number) => void;
}

const useMenu = create<MenuState>()((set) => ({
  active: { 0: undefined, 1: undefined, 2: undefined },
  setActive: (index0?: number, index1?: number, index2?: number) =>
    set((state) => ({
      active: {
        0: index0 !== undefined ? index0 : state.active["0"],
        1: index1 !== undefined ? index1 : state.active["1"],
        2: index2 !== undefined ? index2 : state.active["2"],
      },
    })),
}));

export default useMenu;
