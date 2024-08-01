import { create } from "zustand";

export const useCreateChatPopup = create((set) => ({
  isOpen: false,
  setPopupToFalse: () => set({ isOpen: false }),
  setPopupToTrue: () => set({ isOpen: true }),
}));
