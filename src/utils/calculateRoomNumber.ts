export const calculateRoomNumber = (roomName: string) => {
  const roomNameElement = roomName?.split("-");
  const y = Number(roomNameElement[1]);
  const x = Number(roomNameElement[2]);
  const roomNum = y * 100 + x;

  return roomNum;
};
