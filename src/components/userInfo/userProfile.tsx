import { roomsStateStore } from "../../store/roomsStateStore";
import { userDataStore } from "../../store/userDataStore";
import UserRoom from "./userRoom";

export default function UserProfile() {
  const { userData, registered, myRoomColor } = userDataStore();
  const { targetRoom } = roomsStateStore();
  const { calledAs, nickName, myRoom, name, job, userType } = userData;

  if (!registered) return null;

  return (
    <>
      <div className="flex flex-col gap-2  bg-black/50 p-4  rounded-2xl">
        <div className="flex min-w-60 gap-20 justify-between">
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
      </div>
    </>
  );
}
