import { useEffect, useRef, useState } from "react";
import { roomsStateStore } from "../../store/roomsStateStore";
import { getTargetHostData } from "../../api/getTargetHostData";
import { TargetHostDataType } from "../../store/targetHostDataStore";
import HostRoom from "./hostRoom";
import { JoinChatButton } from "./joinChatButton";

export default function TargetProfile() {
  const { targetRoom, setTargetRoom } = roomsStateStore();
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

  if (!targetRoom) return null;
  if (!targetData) return null;

  const { roomNum, avatarNum, job, name, nickName } = targetData;
  return (
    <>
      <div className="flex flex-col gap-2  bg-black/50 p-4  rounded-2xl">
        <div className="flex min-w-60 gap-20 justify-between">
          <p className="text-white">{nickName}'s Room</p>
          <p className=" text-white font-semibold">{roomNum}</p>
        </div>
        <HostRoom roomNum={roomNum} avatarNum={avatarNum} />
        <p className="text-white">name: {name}</p>
        <p className="text-white">job: {job}</p>
        {/* 버튼 - 채팅 시작 */}
        <JoinChatButton roomNum={roomNum} />
        {/* 버튼 - 창 닫기 */}
        <button
          className="border rounded-lg"
          onClick={() => {
            setTargetRoom(null);
          }}
        >
          Close
        </button>
      </div>
    </>
  );
}
