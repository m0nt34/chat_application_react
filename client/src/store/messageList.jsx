import { create } from "zustand";
import { getMessages } from "../services/chatServices";

export const useMessageList = create((set) => ({
  messageList: [],
  setMessageList: (newMessage) =>
    set((state) => ({
      messageList: [...state.messageList, newMessage],
    })),
  fetchMessages: async (id) => {
    const res = await getMessages(id);
    if (!res.error) {
      set({ messageList: res.data });
    } else {
      set({ messageList: [] });
    }
  },
}));