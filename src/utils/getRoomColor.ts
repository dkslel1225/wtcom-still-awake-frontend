import { ROOM_COLOR } from "../constants/room";

export const getRoomColor = (y: number, x: number) => {
  const roomColor = ROOM_COLOR[y - 1][x - 1];

  return roomColor;
};
