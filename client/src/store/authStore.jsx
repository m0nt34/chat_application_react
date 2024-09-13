import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useAuth = create(
  persist(
    (set) => ({
      auth: false,
      authToT: () => set({ auth: true }),
      authToF: () => {
        set({ auth: false });
        localStorage.clear();
      },
    }),
    {
      name: "userLoginStatus",
    }
  )
);
