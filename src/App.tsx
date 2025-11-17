import UserDataForm from "./components/userDataForm/userDataForm";
import UserProfile from "./components/userInfo/userProfile";

import { useSocketInit } from "./hooks/useSocketInit";
import BuildingScene from "./three/BuildingScene";

export default function App() {
  useSocketInit();
  return (
    <div style={{ width: "100vw", height: "100vh" }} className="text-white">
      <BuildingScene />
      <UserDataForm />
      <UserProfile />
      <div>dd</div>
    </div>
  );
}
