import { create } from "zustand";

export const useLoading = create((set) => ({
  loading: true,
  loadingToT: () => set({ loading: true }),
  loadingToF: () => set({ loading: false }),
}));
