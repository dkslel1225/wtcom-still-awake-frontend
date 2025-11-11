import { useState } from "react";
import { ROOMS } from "../constants/room";
import clsx from "clsx";

export default function SubmitUserData() {
  const [myRoom, setMyRoom] = useState("");
  const roomNumber = Object.keys(ROOMS);

  const onClickSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const useJob = data.get("useJob");
    const username = data.get("username");

    // 뭐 하나 값 비어있으면 버튼 비활성화 - 거절!
    if (!useJob || !username || myRoom === "") {
      alert("Room selection, job, and name are required.");
      return; // 제출 중단
    }
    const userData = {
      room: myRoom,
      useJob: data.get("useJob"),
      username: data.get("username"),
      calledAsName: data.get("call-by-name") ? true : false,
    };

    //   fetch("http://localhost:4000/submit", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(userData),

    // 응답 성공하면, 내 방, 이름, 직업 데이터 다시 받음 -> 세션스토리지에 저장
    // 내 방 불 켜야 함.-> 이건 백엔드에서 알아서 자동 업데이트하게 해줄까 - 굳이 여기서 하지 말고..
    console.log(userData);
  };

  const onClickRoom = (roomNumber: string) => {
    if (myRoom !== roomNumber) {
      setMyRoom(roomNumber);
      return;
    }
    setMyRoom("");
  };

  //메인페이지 언마운트 시에 접속 끊긴것도 반영해야겠군...(로그아웃으로 처리)
  return (
    <div className="fixed top-5 right-5">
      <form
        onSubmit={onClickSubmit}
        className="flex flex-col gap-2  bg-black/50 p-4 rounded-2xl"
      >
        <label htmlFor="room">My Room:</label>
        <div className="flex flex-wrap gap-2 w-[370px]">
          {roomNumber.map((room) => (
            <button
              key={room}
              value={room}
              className={clsx(
                "px-2 py-1 bg-gray-400 rounded-md font-semibold",
                myRoom === String(room) ? "bg-amber-700 text-yellow-50 " : ""
              )}
              type="button"
              onClick={() => onClickRoom(room)}
            >
              {room}
            </button>
          ))}
        </div>
        <label htmlFor="useJob">Your Job:</label>
        <input
          type="text"
          id="useJob"
          name="useJob"
          className={clsx(
            "bg-gray-400 rounded-md px-2",
            myRoom !== "" ? "bg-amber-700 text-yellow-50  font-semibold " : ""
          )}
        />
        <label htmlFor="username">Your Name:</label>
        <input
          type="text"
          id="username"
          name="username"
          className={clsx(
            "bg-gray-400 rounded-md px-2",
            myRoom !== "" ? "bg-amber-700 text-yellow-50 font-semibold " : ""
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
