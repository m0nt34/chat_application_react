import { create } from "zustand";

export const useEmojis = create((set) => ({
  isOpen: false,
  setEmojisToFalse: () => set({ isOpen: false }),
  setEmojisToTrue: () => set({ isOpen: true }),
  setEmojisToOp: () => set((state)=>({ isOpen: !state.isOpen })),
  
}));
