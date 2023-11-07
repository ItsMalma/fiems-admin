import { create } from "zustand";

interface HeaderState {
  header: String
  setHeader: (newHeader?: String) => void
}

const useHeader = create<HeaderState>()(set => ({
  header: "",
  setHeader: (newHeader) => set({header: newHeader})
}));

export default useHeader;