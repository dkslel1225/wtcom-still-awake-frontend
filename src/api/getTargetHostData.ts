import { SERVER_URL } from "../constants/api";

export const getTargetHostData = async (roomNumber: number) => {
  try {
    const response = await fetch(`${SERVER_URL}/targethost/${roomNumber}`, {
      method: "GET",
    });
    const resData = await response.json();
    return resData.data;
  } catch (err) {
    console.error("Faild to get target host data", err);
  }
};
