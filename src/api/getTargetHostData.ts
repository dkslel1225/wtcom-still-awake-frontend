export const getTargetHostData = async (roomNumber: number) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER as string}/targethost/${roomNumber}`,
      {
        method: "GET",
      }
    );
    const resData = await response.json();
    return resData.data;
  } catch (err) {
    console.error("Faild to get target host data", err);
  }
};
