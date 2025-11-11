import { useEffect, useState } from "react";
import BuildingScene from "./three/BuildingScene";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }} className="text-white">
      <h1>{data ? data : "Loading..."}</h1>
      <BuildingScene />
    </div>
  );
}
