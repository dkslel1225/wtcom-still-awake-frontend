import { useEffect } from "react";
import { io } from "socket.io-client";
import { CHAT_NAMESPACE, SERVER_URL } from "../constants/api";
import { chatStateStore, messageDataType } from "../store/chatStateStore";

export const useChatSocket = () => {
  const { setChatSocket, chatSocket, setParticipants, setNewMessage } =
    chatStateStore();

  useEffect(() => {
    if (!chatSocket) {
      console.log("채팅 소켓 생성");
      const newSocket = io(`${SERVER_URL}${CHAT_NAMESPACE}`, {
        transports: ["polling", "websocket"],
      });
      setChatSocket(newSocket);

      // 이벤트 리스너 등록 (connect, disconnext, notifiaction)
      newSocket.on("disconnect", () => {});
      newSocket.on("connect", () => {
        console.log(`chat namespace connected(socket.io)`);
      });
      newSocket.on("notification", (participants: string[]) => {
        console.log(`참여자 목록 변경:`, participants);
        setParticipants(participants);
      });
      newSocket.on("receiveMessage", (messageData: messageDataType) => {
        setNewMessage(messageData);
      });
    }

    // 언마운트시 disconnect
    return () => {
      if (chatSocket) {
        chatSocket.disconnect();
      }
    };
  }, []);
};
