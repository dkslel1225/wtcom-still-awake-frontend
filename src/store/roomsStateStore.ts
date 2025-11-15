import { create } from "zustand";

interface RoomsState {
  activatedRooms: number[];
  setActivatedRooms: (activatedRooms: number[]) => void;
}

export const roomsStateStore = create<RoomsState>((set, get) => ({
  activatedRooms: [],
  setActivatedRooms: (count) => set({ activatedRooms: count }),
}));
