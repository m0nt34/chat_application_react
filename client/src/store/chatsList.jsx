import { create } from "zustand";
export const useChatList = create((set) => ({
  chatList: "",
  setChatList: (search) => set({ chatList: search }),
}));
