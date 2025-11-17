import { create } from "zustand";

interface SocketState {
  socketId: string | null;
  setSocketId: (id: string | null) => void;
  isConnected: boolean;
  setIsConnected: (state: boolean) => void;
}

export const socketStore = create<SocketState>((set, get) => ({
  socketId: null,
  setSocketId: (id) => set({ socketId: id }),
  isConnected: false,
  setIsConnected: (state) => set({ isConnected: state }),
}));
