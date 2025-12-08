import { roomsStateStore } from "../../store/roomsStateStore";
import { userDataStore } from "../../store/userDataStore";
import ChatSpace from "../chat/chatSpace";
import UserRoom from "./userRoom";

export default function UserProfile() {
  const { userData, registered, myRoomColor } = userDataStore();
  const { calledAs, nickName, myRoom, name, job, userType } = userData;
  const { targetRoom } = roomsStateStore();

  if (!registered) return null;

  return (
    <>
      <div className="flex flex-col gap-2 w-72 bg-black/50 p-4  rounded-2xl">
        <div className="flex justify-between">
          <div className=" flex gap-2 items-center">
            <div
              className="size-5 rounded-full"
              style={{ backgroundColor: myRoomColor }}
            ></div>
            <p className="text-white">My Room</p>
          </div>
          <p className=" text-white font-semibold">
            {userType === "Host" ? myRoom : "Guest"}
          </p>
        </div>
        {!targetRoom && (
          <div className="flex flex-col gap-2">
            <UserRoom />
            <p className="text-white">name: {name}</p>
            <p className="text-white">job: {job}</p>
          </div>
        )}
        {!targetRoom && <ChatSpace roomNum={myRoom} />}
      </div>
    </>
  );
}
