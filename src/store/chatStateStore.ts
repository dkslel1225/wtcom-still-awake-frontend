import { create } from "zustand";
import { Socket } from "socket.io-client";
export interface messageDataType {
  senderRoomNumber: number;
  sender: string;
  message: string;
  timestamp: string;
}
interface ChatState {
  participants: string[];
  setParticipants: (participants: string[]) => void;
  chatSocket: Socket | null;
  setChatSocket: (socket: Socket) => void;
  chatting: boolean;
  setChatting: (state: boolean) => void;

  newMessage: messageDataType | null;
  setNewMessage: (messageData: messageDataType | null) => void;
}

export const chatStateStore = create<ChatState>((set, get) => ({
  participants: [],
  setParticipants: (participants) => set({ participants }),
  chatSocket: null,
  setChatSocket: (socket) => set({ chatSocket: socket }),
  chatting: false,
  setChatting: (state) => set({ chatting: state }),

  newMessage: null,
  setNewMessage: (messageData) => set({ newMessage: messageData }),
}));
