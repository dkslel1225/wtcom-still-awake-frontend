import { userDataStore } from "../../store/userDataStore";
import UserRoom from "./userRoom";

const CALL = {
  Job: "A ",
  Name: "",
};

export default function UserProfile() {
  const { userData, registered } = userDataStore();
  if (!registered) return null;

  const { calledAs, nickName, myRoom, name, job, userType } = userData;
  const roomName = `${CALL[calledAs]}${nickName}'s Room`;

  return (
    <>
      <div className="fixed top-5 right-5 flex flex-col gap-2  bg-black/50 p-4  rounded-2xl">
        <div className="flex gap-20 justify-between">
          <p className="text-white">{roomName}</p>
          <p className=" text-white font-semibold">
            {userType === "Host" ? myRoom : "Guest"}
          </p>
        </div>
        <UserRoom />
        <p className="text-white">name: {name}</p>
        <p className="text-white">job: {job}</p>
      </div>
    </>
  );
}
