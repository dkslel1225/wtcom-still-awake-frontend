// 조명
import * as THREE from "three";
export const setLight = (scene: THREE.Scene<THREE.Object3DEventMap>) => {
  // 장면 전체에 균일하게 적용되는 기본 조명(no 그림자)
  // 파라미터: 빛 색상, 강도(0~1)
  const light2 = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(light2);

  //   const light = new THREE.DirectionalLight(0xffffff, 1);// 태양광 같은 느낌
  //   light.position.set(3, 5, 5);
  //   scene.add(light);

  //   // 직사각형 광원: 이거 추가하면 빛이 더 부드럽고 자연스러워지는 느낌..?
  //   // 파라미터: 빛 색상, 강도(0~1),너비, 높이(기본값 10)
  //   const rectLight = new THREE.RectAreaLight(0xffffff, 1, 10, 10);
  //   scene.add(rectLight);
};
