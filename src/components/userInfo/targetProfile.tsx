import { useEffect, useState } from "react";
import { roomsStateStore } from "../../store/roomsStateStore";
import { getTargetHostData } from "../../api/getTargetHostData";
import { TargetHostDataType } from "../../store/targetHostDataStore";
import { getRoomPosition } from "../../utils/getRoomPosition";
import { getRoomColor } from "../../utils/getRoomColor";
import TargetRoom from "./targetRoom";
import ChatSpace from "../chat/chatSpace";

export default function TargetProfile() {
  const { targetRoom } = roomsStateStore();
  const [targetData, setTargetData] = useState<TargetHostDataType | null>(null);

  useEffect(() => {
    const fetchTargetData = async () => {
      if (targetRoom) {
        const data = await getTargetHostData(targetRoom);
        console.log("get target host data");
        console.log(data);
        setTargetData(data);
      }
    };

    fetchTargetData();
  }, [targetRoom]);

  if (!targetRoom || !targetData) return null;
  const { roomNum, avatarNum, job, name, nickName } = targetData;

  const { y, x } = getRoomPosition(roomNum);
  const roomColor = getRoomColor(y, x);

  return (
    <>
      <div className="flex flex-col gap-2  w-72 bg-black/50 p-4  rounded-2xl">
        <div className="flex justify-between">
          <div className=" flex gap-2 items-center">
            <div
              className="size-5 rounded-full"
              style={{ backgroundColor: roomColor }}
            ></div>
            <p className="text-white">{nickName}'s Room</p>
          </div>
          <p className=" text-white font-semibold">{roomNum}</p>
        </div>
        <TargetRoom roomColor={roomColor} avatarNum={avatarNum} />
        <p className="text-white">name: {name}</p>
        <p className="text-white">job: {job}</p>
        <ChatSpace roomNum={roomNum} />
      </div>
    </>
  );
}
