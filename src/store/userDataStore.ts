import { create } from "zustand";

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
}));
