import React, { ReactNode } from "react";
import { create } from "zustand";

interface ModalState {
  current: ReactNode | null,
  setModal: (newModal: ReactNode | null) => void;
}

const useModal = create<ModalState>()(set => ({
  current: null,
  setModal: (newModal) => set({current: newModal})
}));

export default useModal;