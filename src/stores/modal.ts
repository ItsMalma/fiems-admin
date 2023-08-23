import React from "react";
import { create } from "zustand";

interface ModalState {
  current: React.ReactNode | null,
  setModal: (newModal: React.ReactNode | null) => void;
}

const useModal = create<ModalState>()(set => ({
  current: null,
  setModal: (newModal) => set({current: newModal})
}));

export default useModal;