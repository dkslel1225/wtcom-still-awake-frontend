"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import makeRoomRepeat from "./mesh/makeRoomRepeat";
import { setOrbitControl } from "./settings/setOrbitControl";
import { setupBloomEffect } from "./settings/setBloom";
import makeBackground from "./mesh/makeBackground";
import { setLight } from "./settings/setLight";

export default function BuildingScene() {
  const mountRef = useRef<HTMLDivElement>(null);

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
    camera.position.z = 8;
    camera.position.y = 1.5;

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
    setOrbitControl(camera, renderer, false); // 3D 이동 컨트롤 적용 - true,false
    const composer = setupBloomEffect(scene, camera, renderer); // 빛번짐

    // 애니메이션 루프
    const animate = () => {
      renderer.render(scene, camera);
      composer.render(); // bloom 효과 포함 렌더링
      requestAnimationFrame(animate); // <- 이 부분 살려야 창문 불빛 깜빡임 애니메이션 or OrbitControls 가능, 다음 프레임을 그릴수 있는거임
    };
    animate();
    // // 마우스 휠로 카메라 위아래 이동
    // window.addEventListener("wheel", (event) => {
    //   event.preventDefault();

    //   const delta = event.deltaY;
    //   // deltaY < 0 : 스크롤 업 (위로)
    //   // deltaY > 0 : 스크롤 다운 (아래로)

    //   // 카메라를 위로/아래로 이동시키기
    //   camera.position.y += delta * -0.005; // 이동 속도 조절
    // });

    //리무버
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      // window.removeEventListener("wheel", () => {});
    };
  }, []);

  return <div ref={mountRef} className="w-full h-screen " />;
}
