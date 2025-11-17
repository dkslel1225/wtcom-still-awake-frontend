import { userDataStore } from "../store/userDataStore";
import { getRoomColor } from "../utils/getRoomColor";
import { getRoomPosition } from "../utils/getRoomPosition";

const CALL = {
  Job: "A ",
  Name: "",
};

export default function UserInfo() {
  const { userData, registered } = userDataStore();
  if (!registered) return;

  const { calledAs, nickName, myRoom, name, job, avatarNum } = userData;
  const roomName = `${CALL[calledAs]}${nickName}'s Room`;
  const avatarSrc = `/avatar/avatar${avatarNum}.png`;
  const { y, x } = getRoomPosition(myRoom);
  console.log(myRoom);
  console.log(y);
  const roomColor = getRoomColor(y, x);

  if (userData.userType === "Host")
    return (
      <>
        <div className="fixed top-5 right-5 flex flex-col gap-2  bg-black/50 p-4  rounded-2xl">
          <div className="flex gap-20 justify-between">
            <p className="text-white">{roomName}</p>
            <p className=" text-white font-semibold">{myRoom}</p>
          </div>
          <div
            className="h-52 w-full rounded-lg overflow-hidden relative flex justify-center"
            style={{ backgroundColor: `#${roomColor.toString(16)}` }}
          >
            <img
              src="/room.svg"
              alt="room background"
              className="absolute inset-0 w-full"
            />
            <img
              src={avatarSrc}
              alt="user avatar"
              className="absolute left-2/1 top-8"
            />
          </div>
          <p className="text-white">name: {name}</p>
          <p className="text-white">job: {job}</p>
        </div>
      </>
    );

  if (userData.userType === "Guest") return <div>Your Guest</div>;
}
