import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function setOrbitControl(camera: any, renderer: any, acitvate: boolean) {
  if (acitvate) {
    // 📌 OrbitControls 추가
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 부드러운 움직임
    // controls.dampingFactor = 0.05;
    controls.enablePan = true; // 마우스로 이동 허용
    //  controls.enableZoom = true; // 스크롤 확대/축소 허용
    //controls.enableRotate = true; // 회전 허용
  }
}
