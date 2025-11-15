"use client";
import * as THREE from "three";
import { ROOM_COLOR } from "../../constants/room";

export default function makeRoom(x: number, y: number) {
  // 원형 창문 Geometry
  const windowGeometry = new THREE.CircleGeometry(0.3, 32);

  // 빛나는 창문 Material
  const windowMaterial = new THREE.MeshStandardMaterial({
    color: 0x998590, // 단면 색
    emissive: ROOM_COLOR[y][x], // 발광 색
    emissiveIntensity: 0.0, // 발광 강도
  });

  // Mesh 생성, 위치 조정
  const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
  windowMesh.name = `window-${y + 1}-${x + 1}`;
  windowMesh.position.set(-4 + x, y - 1, 0.6);

  return windowMesh;
}
