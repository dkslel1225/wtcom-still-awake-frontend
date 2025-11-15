interface UserData {
  room: number;
  job: FormDataEntryValue;
  name: FormDataEntryValue;
  calledAsName: boolean;
}

export const postUserData = async (userData: UserData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/submit/userdata`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const resData = await response.json();
    console.log(resData); // 여기서 서버에서 반환한 JSON 확인 가능
  } catch (err) {
    console.error("Error submitting user data:", err);
  }
};
