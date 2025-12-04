import { create } from "zustand";
import { getRoomPosition } from "../utils/getRoomPosition";
import { getRoomColor } from "../utils/getRoomColor";

export interface UserDataType {
  myRoom: number;
  job: string;
  name: string;
  nickName: string;
  calledAs: "Name" | "Job";
  avatarNum: number;
  userType: "Host" | "Guest";
  guestId: string | null;
}
interface UserDataStoreType {
  userData: UserDataType;
  setUserData: (data: UserDataType) => void;
  registered: boolean;
  setRegistered: (state: boolean) => void;
  myRoomColor: string;
  setMyRoomColor: (myRoomNum: number) => void;
}

export const userDataStore = create<UserDataStoreType>((set, get) => ({
  userData: {
    myRoom: 0,
    job: "",
    name: "",
    nickName: "",
    avatarNum: 1,
    calledAs: "Name",
    userType: "Host",
    guestId: null,
  },
  setUserData: (data) => set({ userData: data }),
  registered: false,
  setRegistered: (state) => set({ registered: state }),
  myRoomColor: "#3d3b3b",
  setMyRoomColor: (myRoomNum) => {
    const { y, x } = getRoomPosition(myRoomNum);
    const roomColor = getRoomColor(y, x);
    return set({
      myRoomColor: roomColor,
    });
  },
}));
