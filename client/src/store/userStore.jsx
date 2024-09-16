import { create } from "zustand";
import { getUserData } from "../services/authServices";
export const useUser = create((set) => ({
  user: {
    _id: null,
    name: null,
    lastName: null,
    email: null,
    password: null,
    friends: [],
    friendRequests: [],
    chats: [],
    code: null,
    banned: null,
    avatar: null,
  },
  updateUserField: (field, value) =>
    set((state) => ({
      user: {
        ...state.user,
        [field]: value,
      },
    })),
  fetchAndSetUser: async () => {
    const userData = await getUserData();

    if (!userData.error) {
      set((state) => ({
        user: {
          ...state.user,
          ...userData.data,
        },
      }));
    }
  },
}));
