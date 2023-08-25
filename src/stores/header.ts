import { create } from "zustand";

interface HeaderState {
  title: String
  setTitle: (newTitle?: String) => void
}

const useHeader = create<HeaderState>()(set => ({
  title: "",
  setTitle: (newTitle) => set({title: newTitle})
}));

export default useHeader;