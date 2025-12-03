import UserDataForm from "./components/userDataForm/userDataForm";
import TargetProfile from "./components/userInfo/targetProfile";
import UserProfile from "./components/userInfo/userProfile";

import { useSocketInit } from "./hooks/useSocketInit";
import BuildingScene from "./three/BuildingScene";

export default function App() {
  useSocketInit();
  return (
    <div style={{ width: "100vw", height: "100vh" }} className="text-white">
      <BuildingScene />
      <UserDataForm />
      <div className="fixed top-5 right-5 flex flex-col gap-2">
        <UserProfile />
        <TargetProfile />
      </div>
      <div>dd</div>
    </div>
  );
}
