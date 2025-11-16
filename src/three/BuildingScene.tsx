"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import makeRoomRepeat from "./mesh/makeRoomRepeat";
import { setOrbitControl } from "./settings/setOrbitControl";
import { setupBloomEffect } from "./settings/setBloom";
import makeBackground from "./mesh/makeBackground";
import { setLight } from "./settings/setLight";
import { useRoomsUpdate } from "../hooks/useRoomsUpdate";

export default function BuildingScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x202020); // 어두운 회색

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1
    );
    camera.position.z = 10;
    camera.position.y = 0.4;

    // 렌더링
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    makeRoomRepeat(scene);
    makeBackground(scene);

    // 기타 환경설정
    setLight(scene);
    setOrbitControl(camera, renderer, true); // 3D 이동 컨트롤 적용 - true,false
    const composer = setupBloomEffect(scene, camera, renderer); // 빛번짐

    // 애니메이션 루프
    const animate = () => {
      renderer.render(scene, camera);
      composer.render(); // bloom 효과 포함 렌더링
      requestAnimationFrame(animate); // <- 이 부분 살려야 창문 불빛 깜빡임 애니메이션 or OrbitControls 가능, 다음 프레임을 그릴수 있는거임
    };
    animate();

    setScene(scene);
    //리무버
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  useRoomsUpdate(scene);

  return <div ref={mountRef} className="w-full h-screen " />;
}
