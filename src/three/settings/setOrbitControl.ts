import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

export function setOrbitControl(
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer,
  acitvate: boolean
) {
  if (acitvate) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 부드러운 움직임
    controls.enablePan = true; // 마우스로 이동 허용
  }
}
