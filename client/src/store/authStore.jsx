import { create } from "zustand";

export const useAuth = create((set) => ({
  auth: false,
  authToT: () => set({ auth: true }),
  authToF: () => set({ auth: false }),
}));
