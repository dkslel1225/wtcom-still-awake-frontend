import { useEffect } from "react";
import { roomsStateStore } from "../store/roomsStateStore";
import * as THREE from "three";

/** 
  activatedRooms 값이 업데이트 되면, 건물 창문의 빛을 리렌더링 한다.(on,off)
*/
export const useRoomsUpdate = (scene: THREE.Scene | null) => {
  const { activatedRooms } = roomsStateStore();

  useEffect(() => {
    activatedRooms.forEach(
      (roomNumber) => {
        if (scene === null) return;

        const y = Math.floor(roomNumber / 100);
        const x = roomNumber % 100;

        const room = scene.getObjectByName(`window-${y}-${x}`) as THREE.Mesh;

        const mat = room.material;
        if (mat instanceof THREE.MeshStandardMaterial) {
          mat.emissiveIntensity = 0.35;
        }
      },
      [activatedRooms]
    );
  });
};
