interface UserData {
  room: number;
  job: FormDataEntryValue;
  name: FormDataEntryValue;
  calledAsName: boolean;
}

export const postUserData = async (userData: UserData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER as string}/submit/userdata`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const resData = await response.json();
    return resData.data;
  } catch (err) {
    console.error("Error submitting user data:", err);
  }
};
