"use client";
import * as THREE from "three";
import { ROOM_COLOR } from "../../constants/room";

// const COLOR = [
//   0xd76b7f, 0xaeb9cd, 0xabb962, 0x95ac7e, 0xe4945e, 0xddb5b5, 0xd8ba51,
//   0xe88781, 0x6d9cd0, 0xd5cec6, 0xa48799, 0x5783ca, 0x72bca8, 0xe7e48c,
// ];

export default function makeRoom(x: number, y: number) {
  // 큰 Cube
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

  // 전체 메쉬용 머티리얼
  const roomMaterial = new THREE.MeshStandardMaterial({
    color: 0x1b1418,
  });

  // 원형 창문
  const windowGeometry = new THREE.CircleGeometry(0.3, 32);
  //windowGeometry.translate(0, 0, 0.1);

  // 빛나는 창문 Material
  // const randomColor = COLOR[Math.floor(Math.random() * COLOR.length)];
  const windowMaterial = new THREE.MeshStandardMaterial({
    color: 0x998590, // 단면 색
    emissive: ROOM_COLOR[y][x], // 발광 색
    //emissiveIntensity: 0.35, // 발광 강도
    emissiveIntensity: 0.0, // 발광 강도
  });

  const roomMesh = new THREE.Mesh(cubeGeometry, roomMaterial);
  const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
  windowMesh.name = `window-${y + 1}-${x + 1}`;
  windowMesh.position.set(0, 0, 0.6); // 약간 앞쪽에 위치
  roomMesh.add(windowMesh); // 방 메쉬에 창문 메쉬 추가

  roomMesh.position.set(-3 + x, y, 0);
  //  windowMesh.position.set(x, y, 0);

  return roomMesh;
  //return windowMesh;
}
