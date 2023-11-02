import { Toast } from "@/components/Elements";
import React from "react";
import { create } from "zustand";

interface ToastState {
  toasts: React.ComponentPropsWithoutRef<typeof Toast>[];
  addToasts: (
    ...toasts: React.ComponentPropsWithoutRef<typeof Toast>[]
  ) => void;
  removeToast: (index: number) => void;
  clearToasts: () => void;
}

const useToast = create<ToastState>()((set) => ({
  toasts: [],
  addToasts(...toasts) {
    set({ toasts });
  },
  removeToast(index) {
    set((state) => ({
      toasts: state.toasts.filter((_, toastIndex) => toastIndex !== index),
    }));
  },
  clearToasts() {
    set({ toasts: [] });
  },
}));

export default useToast;
