import Participants from "./participants";
import { userDataStore } from "../../store/userDataStore";
import { chatStateStore } from "../../store/chatStateStore";
import { FormEvent, useState } from "react";
import ChatMessageHistory from "./chatMessageHistory";

export default function ChatSpace({ roomNum }: { roomNum: number }) {
  const { userData } = userDataStore();
  const { chatSocket, chatting, setChatting, setNewMessage } = chatStateStore();
  const [message, setMessage] = useState("");

  const onClickJoin = () => {
    setChatting(true);

    if (chatSocket) chatSocket.emit("joinRoom", roomNum, userData.nickName);
    if (!chatSocket) console.log("no chatsocket");
    console.log(`[Socket] joinRoom!! ${roomNum} 입장을 요청합니다.`);
  };

  const onClickLeave = () => {
    setChatting(false);
    setNewMessage(null);

    if (chatSocket) chatSocket.emit("leaveRoom", roomNum, userData.nickName);
    if (!chatSocket) console.log("no chatsocket");
    console.log("leaved room");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    // 메시지 내용이 비어있거나 공백만 있는 경우 전송 X
    if (!message.trim()) {
      return;
    }

    const messageData = {
      senderRoomNumber: userData.myRoom,
      roomNumber: roomNum,
      sender: userData.nickName,
      message: message.trim(),
    };

    if (chatSocket) chatSocket.emit("sendMessage", messageData);

    // 전송 후 입력 필드 비우기
    setMessage("");
  };

  return (
    <>
      {!chatting && (
        <div className="relative flex justify-center items-center pb-3 bg-white/10 rounded-2xl h-96 ">
          <button
            className="border border-gray-500 h-fit p-2 rounded-lg hover:bg-white/15"
            onClick={onClickJoin}
          >
            Join chat in room {roomNum}
          </button>
        </div>
      )}
      {chatting && (
        <div className="relative flex flex-col justify-end pb-3 bg-black/50  p-2 rounded-2xl h-96 border-y-2 border-x-2 border-x-gray-700 border-y-gray-400">
          <button
            onClick={onClickLeave}
            className="absolute top-2 right-2 rounded-lg px-1 border hover:bg-white/25"
          >
            Leave
          </button>
          <Participants />
          <ChatMessageHistory />
          <form
            className="w-full flex justify-between items-center gap-1"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Type message..."
              className="bg-white/10  rounded-lg w-full outline-none px-3 py-1 focus:bg-white/15"
              value={message} // 상태와 input 값 연결
              onChange={(e) => setMessage(e.target.value)} // 입력 내용 변경 감지
            ></input>
            <button type="submit" aria-label="메시지 전송">
              <img
                src="/send-message.svg"
                alt="send button"
                className="size-7"
              />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
