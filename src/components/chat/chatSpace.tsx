import Participants from "./participants";
import { userDataStore } from "../../store/userDataStore";
import { chatStateStore } from "../../store/chatStateStore";

export default function ChatSpace({ roomNum }: { roomNum: number }) {
  const { userData } = userDataStore();
  const { chatSocket, chatting, setChatting } = chatStateStore();

  const onClickHandler = () => {
    setChatting(true);

    if (chatSocket) chatSocket.emit("joinRoom", roomNum, userData.nickName);
    if (!chatSocket) console.log("no chatsocket");
    console.log(`[Socket] joinRoom!! ${roomNum} 입장을 요청합니다.`);
  };

  const onClickLeave = () => {
    setChatting(false);

    if (chatSocket) chatSocket.emit("leaveRoom", roomNum, userData.nickName);
    if (!chatSocket) console.log("no chatsocket");
    console.log("leaved room");
  };

  return (
    <>
      {!chatting && (
        <div className="relative flex justify-center items-center pb-3 bg-white/10 rounded-2xl h-96 ">
          <button
            className="border border-gray-500 h-fit p-2 rounded-lg hover:bg-white/15"
            onClick={onClickHandler}
          >
            Join chat in room {roomNum}
          </button>
        </div>
      )}
      {chatting && (
        <div className="flex flex-col justify-end pb-3 bg-black/50  p-2 rounded-2xl h-96 border-y-2 border-x-2 border-x-gray-700 border-y-gray-400">
          <button onClick={onClickLeave}>leave this chat</button>
          <Participants roomNum={roomNum} />
          <form className="w-full">
            <input
              type="text"
              placeholder="Type message..."
              className="bg-white/10  rounded-lg w-full outline-none px-3 py-1 focus:bg-white/15"
            ></input>
          </form>
        </div>
      )}
    </>
  );
}
