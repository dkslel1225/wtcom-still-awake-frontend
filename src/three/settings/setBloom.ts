// setupBloomEffect.js
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

export function setupBloomEffect(
  scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer
) {
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

  return composer;
}
