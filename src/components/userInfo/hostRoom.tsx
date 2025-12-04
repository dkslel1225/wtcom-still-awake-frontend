import { getRoomPosition } from "../../utils/getRoomPosition";
import { getRoomColor } from "../../utils/getRoomColor";

export default function HostRoom({
  roomNum,
  avatarNum,
}: {
  roomNum: number;
  avatarNum: number;
}) {
  const avatarSrc = `/avatar/avatar${avatarNum}.png`;

  const { y, x } = getRoomPosition(roomNum);
  const roomColor = getRoomColor(y, x);

  return (
    <>
      <div
        className="h-52 w-full rounded-lg overflow-hidden relative flex justify-center"
        style={{ backgroundColor: roomColor }}
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
