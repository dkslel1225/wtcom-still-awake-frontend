import { useEffect, useRef, useState } from "react";
import { chatStateStore, messageDataType } from "../../store/chatStateStore";
import { userDataStore } from "../../store/userDataStore";

export default function ChatMessageHistory() {
  const { newMessage } = chatStateStore();
  const [messageHistory, setMessageHistory] = useState<messageDataType[]>([]);
  const { userData } = userDataStore();
  const chatContainerRef = useRef<HTMLDivElement>(null); // 스크롤 고정 제어 ref

  // 새로운 매시지 추가
  useEffect(() => {
    if (newMessage) {
      const newHistory = [...messageHistory, newMessage];
      setMessageHistory(newHistory);
    }
  }, [newMessage]);

  // 최신 메시지 위치로, 스크롤 고정
  useEffect(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      container.scrollTop = container.scrollHeight; // 자동스크롤 * scrollHeight: 요소의 전체 내용 높이
    }
  }, [messageHistory]);

  return (
    <>
      <div
        className="chat-container h-full overflow-y-auto"
        ref={chatContainerRef}
      >
        {/* 3. messages 목록을 순회하며 각 메시지 요소를 렌더링 */}
        {messageHistory.map((msg: messageDataType, idx) => {
          const isMine = msg.senderRoomNumber === userData.myRoom;
          const sender = `${msg.sender} (${msg.senderRoomNumber})`;
          return (
            <div
              key={`msg-${idx}`} // 리스트 렌더링 시 반드시 고유 key 사용
              className={`flex mb-2 ${
                isMine ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-xl text-white ${
                  isMine
                    ? "bg-blue-500 rounded-br-none" // 내 메시지 스타일
                    : "bg-gray-700 rounded-tl-none" // 상대방 메시지 스타일
                }`}
              >
                {/* 메시지 내용 */}
                <p className="font-bold">{sender}</p>
                <p>{msg.message}</p>
                <span className="text-xs opacity-50">{msg.timestamp}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
