import clsx from "clsx";

interface SelectRoomPropType {
  room: number;
  booked: boolean;
  selected: boolean;
  onClickRoom: (roomNumber: number) => void;
}

export default function SelectRoom({
  room,
  booked,
  selected,
  onClickRoom,
}: SelectRoomPropType) {
  return (
    <button
      key={room}
      value={room}
      className={clsx(
        "px-2 py-1 rounded-md font-semibold select-none", // 배경색 없는 기본 스타일만
        {
          "bg-gray-600 text-gray-400": booked,
          "bg-amber-700 text-yellow-50": !booked && selected,
          "bg-gray-400": !booked && !selected,
        }
      )}
      type="button"
      onClick={() => onClickRoom(room)}
      disabled={booked}
    >
      {room}
    </button>
  );
}
