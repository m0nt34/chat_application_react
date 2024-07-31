import { create } from "zustand";
export const useChatSearch = create((set) => ({
  chatSearch: "",
  setChatSearch: (search) => set({ chatSearch: search }),
}));
