import { create } from "zustand";

export const useRoom = create((set) => ({
  room: {},
  setRoom: (newRoom) => set({ room: newRoom }),
  setRoomName: (newName) => set((state) => ({
    room: {
      ...state.room, 
      name: newName 
    }
  }))
}));