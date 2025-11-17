import SubmitUserData from "./components/submitUserData";

import UserInfo from "./components/userInfo";
import { useSocketInit } from "./hooks/useSocketInit";
import BuildingScene from "./three/BuildingScene";

export default function App() {
  useSocketInit();
  return (
    <div style={{ width: "100vw", height: "100vh" }} className="text-white">
      <BuildingScene />
      <SubmitUserData />
      <UserInfo />
    </div>
  );
}
