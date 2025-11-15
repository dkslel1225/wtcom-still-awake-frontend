import { create } from "zustand";

interface RoomsState {
  activatedRooms: number[];
  setActivatedRooms: (activatedRooms: number[]) => void;
  myInfo: number;
  setMyRoom: (room: number) => void;
}

export const roomsStateStore = create<RoomsState>((set, get) => ({
  activatedRooms: [],
  setActivatedRooms: (count) => set({ activatedRooms: count }),
  // myInfo가 있으면, form 창은 닫고, 내 방 화면을 우측 상단에 띄움.
  // 내 정보는, 채팅에 필요한 정보 등 위주로 저장한다. - 방 번호, (직업, 이름,) 소켓 id? 근데 새로고침하면 소켓id계속 바뀌는디
  myInfo: 0,
  setMyRoom: (room) => set({ myInfo: room }),
}));
