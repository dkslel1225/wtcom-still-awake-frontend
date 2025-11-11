// setupBloomEffect.js
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

/**
 * 씬에 존재하는 emissive 재질의 메쉬들이
 * 부드럽게 빛이 번지는 효과를 표현하도록 bloom을 설정합니다.
 *
 * @param {THREE.Scene} scene - three.js scene 객체
 * @param {THREE.Camera} camera - 카메라 객체
 * @param {THREE.WebGLRenderer} renderer - 렌더러 객체
 * @param {Object} options - bloom 옵션 (선택)
 * @returns {EffectComposer} composer - bloom 렌더러 (렌더 루프에 composer.render() 사용)
 */
export function setupBloomEffect(scene: any, camera: any, renderer: any) {
  const options = { strength: 1, radius: 0.15, threshold: 0.0 };

  // Bloom용 composer 생성
  const composer = new EffectComposer(renderer);

  // 기본 render pass
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  // Bloom pass 추가
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    options.strength,
    options.radius,
    options.threshold
  );
  composer.addPass(bloomPass);

  // 리사이즈 대응
  window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    composer.setSize(width, height);
  });

  return composer;
}
