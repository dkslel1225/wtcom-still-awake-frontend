import { useState } from "react";

import clsx from "clsx";

import SelectRoom from "./selectRoom";
import { ROOM_LIST } from "../../constants/room";
import { roomsStateStore } from "../../store/roomsStateStore";
import { postUserData } from "../../api/postUserData";
import { userDataStore } from "../../store/userDataStore";
import { socketStore } from "../../store/socketStore";

const JOIN_AS_GUEST =
  "Sorry, Room 303 is currently taken. You can join as a Guest. If you want a room, please refresh the page and try again when a free room becomes available.";
const AVATAR_VALUE = [1, 2, 3, 4];

export default function UserDataForm() {
  const { activatedRooms } = roomsStateStore(); // 누가 사용중인 방은, 버튼 비활성화
  const [myRoom, setMyRoom] = useState<number | null>(null); // selectedRoom

  const { setUserData, setMyRoomColor, registered, setRegistered } =
    userDataStore();
  const { socketId } = socketStore();

  const onClickSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);

    // 뭐 하나 값 비어있으면 버튼 비활성화 - 거절!
    if (!myRoom) {
      alert("Room selection is required.");
      return;
    }

    const userData = {
      room: myRoom,
      job: data.get("useJob") || "No Job", // || 연산자는 앞의 값이 falsy(빈 문자열 "", null, undefined, 0, false)이면뒤의 값을 반환
      name: data.get("username") || "Anonymous",
      calledAsName: data.get("call-by-name") ? true : false,
      avatarNum: data.get("avatar") || 1,
      socketId: socketId,
    };

    const resData = await postUserData(userData);
    setUserData(resData);
    setMyRoomColor(resData.myRoom);
    setRegistered(true);
    setMyRoom(null);

    console.log(userData);
  };

  const onClickRoom = (roomNumber: number) => {
    if (myRoom !== roomNumber) {
      setMyRoom(roomNumber);
      return;
    }
    setMyRoom(null);
  };

  if (registered) return null;

  return (
    <div className="fixed top-5 right-5">
      <form
        onSubmit={onClickSubmit}
        className="flex flex-col gap-2  bg-black/50 p-4  rounded-2xl"
      >
        <label htmlFor="room">My Room:</label>
        <div className="flex flex-wrap gap-2 w-[370px]">
          {ROOM_LIST.map((room: number) => {
            const booked = activatedRooms?.includes(Number(room)) || false;
            const selected = myRoom === room;

            return (
              <SelectRoom
                key={room}
                room={room}
                booked={booked}
                selected={selected}
                onClickRoom={onClickRoom}
              />
            );
          })}
        </div>
        <label htmlFor="avatar">My Avatar:</label>
        <div id="avatar" className="flex gap-4 size-full">
          {AVATAR_VALUE.map((value) => {
            return (
              <label
                key={value}
                className={clsx(
                  "hover:bg-gray-600 p-2 rounded-lg has-[input:checked]:bg-amber-700 "
                )}
              >
                <input
                  type="radio"
                  name="avatar"
                  value={value}
                  className="hidden"
                />
                <img
                  src={`/avatar/avatar${value}.png`}
                  className="size-full cursor-pointer "
                  alt="avatar"
                />
              </label>
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
