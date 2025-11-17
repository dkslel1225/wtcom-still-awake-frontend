import { userDataStore } from "../../store/userDataStore";
import { getRoomPosition } from "../../utils/getRoomPosition";
import { getRoomColor } from "../../utils/getRoomColor";

export default function UserRoom() {
  const { userData } = userDataStore();
  const { myRoom, avatarNum, userType } = userData;

  const avatarSrc = `/avatar/avatar${avatarNum}.png`;

  if (userType === "Host") {
    const { y, x } = getRoomPosition(myRoom);
    const roomColor = getRoomColor(y, x);

    return (
      <>
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
      </>
    );
  }
  if (userType === "Guest")
    return (
      <div className="h-40 w-full rounded-lg overflow-hidden relative flex justify-center bg-gray-400">
        <img
          src={avatarSrc}
          alt="user avatar"
          className="absolute left-2/1 top-4"
        />
      </div>
    );
  else return null;
}
