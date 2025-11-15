import { useEffect, useState } from "react";
import BuildingScene from "./three/BuildingScene";
import SubmitUserData from "./components/submitUserData";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }} className="text-white">
      <BuildingScene />
      <SubmitUserData />
    </div>
  );
}
