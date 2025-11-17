export const getRoomPosition = (room: number) => {
  const y = Math.floor(room / 100);
  const x = room % 100;
  return { y, x };
};
