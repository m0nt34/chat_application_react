import { create } from "zustand";

export const useChatSettingsPopup = create((set) => ({
  isOpen: false,
  setPopupToFalse: () => set({ isOpen: false }),
  setPopupToTrue: () => set({ isOpen: true }),
}));
