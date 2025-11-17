import * as THREE from "three";

export const setWindowResize = (
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
) => {
  const handleResize = () => {
    // 1. 사이즈 업데이트
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 2. 카메라 업데이트
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // 3. 렌더러 업데이트 및 픽셀 비율 제한 (물리 픽셀과 CSS 픽셀의 비율을 2이하로 제한하여 성능 유지)
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
};
