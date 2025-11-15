import { useState } from "react";
import { ROOM_LIST } from "../constants/room";
import clsx from "clsx";
import { roomsStateStore } from "../store/roomsStateStore";
import { postUserData } from "../api/postUserData";

export default function SubmitUserData() {
  const { activatedRooms } = roomsStateStore();
  const [myRoom, setMyRoom] = useState<number | null>(null);

  const onClickSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);

    // 뭐 하나 값 비어있으면 버튼 비활성화 - 거절!
    if (!myRoom) {
      alert("Room selection is required.");
      return; // 제출 중단
    }

    const userData = {
      room: myRoom,
      job: data.get("useJob") || "No Job", // || 연산자는 앞의 값이 falsy(빈 문자열 "", null, undefined, 0, false)이면뒤의 값을 반환
      name: data.get("username") || "Anonymous",
      calledAsName: data.get("call-by-name") ? true : false,
    };

    postUserData(userData);
    setMyRoom(null);

    // 응답 성공하면, 내 방, 이름, 직업 데이터 다시 받음 -> 세션스토리지에 저장
    // 내 방 불 켜야 함.-> 이건 백엔드에서 알아서 자동 업데이트하게 해줄까 - 굳이 여기서 하지 말고..
    console.log(userData);
  };

  const onClickRoom = (roomNumber: number) => {
    if (myRoom !== roomNumber) {
      setMyRoom(roomNumber);
      return;
    }
    setMyRoom(null);
  };

  //메인페이지 언마운트 시에 접속 끊긴것도 반영해야겠군...(로그아웃으로 처리)
  return (
    <div className="fixed top-5 right-5">
      <form
        onSubmit={onClickSubmit}
        className="flex flex-col gap-2  bg-black/50 p-4  rounded-2xl"
      >
        <label htmlFor="room">My Room:</label>
        <div className="flex flex-wrap gap-2 w-[370px]">
          {ROOM_LIST.map((room) => {
            const booked = activatedRooms.includes(Number(room));
            const selected = myRoom === room;

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
          })}
        </div>
        <label htmlFor="useJob">Your Job:</label>
        <input
          type="text"
          id="useJob"
          name="useJob"
          placeholder="e.g. Developer, Dragon Slayer..."
          className={clsx(
            "rounded-md px-2 placeholder-black/60 ",
            myRoom
              ? "bg-amber-700 text-yellow-50  font-semibold "
              : "bg-gray-400"
          )}
        />
        <label htmlFor="username">Your Name:</label>
        <input
          type="text"
          id="username"
          name="username"
          className={clsx(
            "rounded-md px-2",
            myRoom
              ? "bg-amber-700 text-yellow-50  font-semibold "
              : "bg-gray-400"
          )}
        />
        <div>
          <p>We are often defined by our jobs</p>
          <input
            type="checkbox"
            id="call-by-name"
            name="call-by-name"
            value={"true"}
          />
          <label htmlFor="call-by-name" className="ml-2">
            I want to be called by my name.
          </label>
        </div>
        <button
          type="submit"
          className={clsx(
            "px-2 py-1 border border-white rounded-md font-semibold hover:bg-white/30"
          )}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
