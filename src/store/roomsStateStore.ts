import { create } from "zustand";
import { calculateRoomNumber } from "../utils/calculateRoomNumber";

interface RoomsState {
  activatedRooms: number[];
  setActivatedRooms: (activatedRooms: number[]) => void;
  deletedRoom: number | null;
  setDeletedRoom: (roomNum: number | null) => void;
  targetRoom: number | null;
  setTargetRoom: (roomNum: number | null) => void;
}

export const roomsStateStore = create<RoomsState>((set, get) => ({
  activatedRooms: [],
  setActivatedRooms: (count) => set({ activatedRooms: count }),
  deletedRoom: null,
  setDeletedRoom: (roomNum) => set({ deletedRoom: roomNum }),
  targetRoom: null,
  setTargetRoom: (roomNum) => set({ targetRoom: roomNum }),
}));
