"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import makeRoomRepeat from "./mesh/makeRoomRepeat";
import { setOrbitControl } from "./settings/setOrbitControl";
import { setupBloomEffect } from "./settings/setBloom";
import makeBackground from "./mesh/makeBackground";
import { setLight } from "./settings/setLight";
import { useRoomsUpdate } from "../hooks/useRoomsUpdate";
import { setRayCasting } from "./settings/setRayCasting";
import { userDataStore } from "../store/userDataStore";

import { setWindowResize } from "./settings/setWindowResize";

export default function BuildingScene() {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const registeredRef = useRef(false);
  const { userData, registered } = userDataStore();
  registeredRef.current = registered;

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    const cameraAspect = mount.clientWidth / mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, cameraAspect, 0.1);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    // Scene, Camera, Renderer 설정
    scene.background = new THREE.Color(0x202020); // 어두운 회색

    camera.position.z = 10;
    camera.position.y = 0.4;

    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // 메쉬 생성 및 scene에 추가
    makeRoomRepeat(scene);
    makeBackground(scene);

    // 기타 환경설정
    setLight(scene);
    setOrbitControl(camera, renderer, true); // 3D 이동 컨트롤 적용 - true,false
    const composer = setupBloomEffect(scene, camera, renderer); // 빛번짐
    const cleanupRaycasting = setRayCasting(scene, camera, registeredRef);
    const cleanupWindowResize = setWindowResize(camera, renderer);

    // 애니메이션 루프
    const animate = () => {
      renderer.render(scene, camera);
      composer.render(); // bloom 효과 포함 렌더링
      requestAnimationFrame(animate); // <- 이 부분 살려야 창문 불빛 깜빡임 애니메이션 or OrbitControls 가능, 다음 프레임을 그릴수 있는거임
    };
    animate();

    // setScene
    sceneRef.current = scene;

    // 클린업
    return () => {
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      cleanupRaycasting();
      cleanupWindowResize();
    };
  }, []);

  useRoomsUpdate(sceneRef.current, userData.myRoom);

  return <div ref={mountRef} className="w-full h-screen " />;
}
