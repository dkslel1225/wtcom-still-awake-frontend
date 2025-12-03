import { create } from "zustand";

export interface TargetHostDataType {
  roomNum: number;
  avatarNum: number;
  job: string;
  name: string;
  nickName: string;
  socketId: string;
}
interface TargetHostDataStoreType {
  targetHostData: TargetHostDataType;
  setTargetHostData: (data: TargetHostDataType) => void;
  registered: boolean;
  setRegistered: (state: boolean) => void;
}

export const targetHostDataStore = create<TargetHostDataStoreType>(
  (set, get) => ({
    targetHostData: {
      roomNum: 0,
      avatarNum: 0,
      job: "",
      name: "",
      nickName: "",
      socketId: "",
    },
    setTargetHostData: (data) => set({ targetHostData: data }),
    registered: false,
    setRegistered: (state) => set({ registered: state }),
  })
);
