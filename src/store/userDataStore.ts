import { create } from "zustand";

interface userData {
  myRoom: number;
  job: string;
  name: string;
  nickName: string;
  calledAs: "Name" | "Job";
  avatarNum: number;
  userType: "Host" | "Guest";
}
interface UserDataStoreType {
  userData: userData;
  setUserData: (data: userData) => void;
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
  },
  setUserData: (data) => set({ userData: data }),
  registered: false,
  setRegistered: (state) => set({ registered: state }),
}));
