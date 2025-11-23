import { useEffect } from "react";
import { roomsStateStore } from "../store/roomsStateStore";
import * as THREE from "three";
import { getRoomPosition } from "../utils/getRoomPosition";

export const useRoomsUpdate = (scene: THREE.Scene | null, myRoom: number) => {
  const { activatedRooms, deletedRoom } = roomsStateStore();

  // activatedRooms UI 업데이트
  useEffect(() => {
    if (!scene) return;

    const updateRooms = async () => {
      for (const roomNumber of activatedRooms) {
        const roomMaterial = getRoomObjectMaterial(roomNumber, scene);
        const intensity = myRoom === roomNumber ? 0.8 : 0.35; // 내 방이면, 더 밝게

        updateWindowMaterial(roomMaterial, intensity);
      }
    };

    updateRooms();
  }, [activatedRooms, scene, myRoom]);

  // deletedRoom UI 업데이트
  useEffect(() => {
    if (!scene) return;

    const updateRooms = async () => {
      if (deletedRoom) {
        const roomMaterial = getRoomObjectMaterial(deletedRoom, scene);
        const intensity = 0;

        updateWindowMaterial(roomMaterial, intensity);
      }
    };

    updateRooms();
  }, [deletedRoom, scene]);
};

// 방 오브젝트의, Material 반환
const getRoomObjectMaterial = (roomNum: number, scene: THREE.Scene) => {
  const { y, x } = getRoomPosition(roomNum);
  const roomName = `window-${y}-${x}`;

  const room = scene.getObjectByName(roomName) as THREE.Mesh;
  const roomMaterial = room.material;
  return roomMaterial;
};

// 방 창문 밝기 업데이트 (emissiveIntensity)
const updateWindowMaterial = (
  roomMaterial: THREE.Material | THREE.Material[],
  intensity: number
) => {
  if (roomMaterial instanceof THREE.MeshStandardMaterial) {
    roomMaterial.emissiveIntensity = intensity;
  } else {
    console.warn("roomMaterial is not a MeshStandardMaterial");
  }
};
