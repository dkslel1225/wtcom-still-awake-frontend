import { create } from "zustand";

interface RoomsState {
  activatedRooms: number[];
  setActivatedRooms: (activatedRooms: number[]) => void;
  deletedRoom: number | null;
  setDeletedRoom: (roomNum: number | null) => void;
}

export const roomsStateStore = create<RoomsState>((set, get) => ({
  activatedRooms: [],
  setActivatedRooms: (count) => set({ activatedRooms: count }),
  deletedRoom: null,
  setDeletedRoom: (roomNum) => set({ deletedRoom: roomNum }),
}));
