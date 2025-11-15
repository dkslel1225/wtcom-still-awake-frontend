import { useEffect } from "react";
import * as THREE from "three";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export const useWindowResizeHandler = (
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
) => {
  const handleWindowResize = () => {
    // 1. 사이즈 업데이트
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // 2. 카메라 업데이트
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // 3. 렌더러 업데이트 및 픽셀 비율 제한 (물리 픽셀과 CSS 픽셀의 비율을 2이하로 제한하여 성능 유지)
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [camera, renderer]);
};
