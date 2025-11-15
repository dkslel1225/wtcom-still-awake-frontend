import { useEffect } from "react";
import { roomsStateStore } from "../store/roomsStateStore";
import * as THREE from "three";

export const useRoomsUpdate = (scene: THREE.Scene | null) => {
  const { activatedRooms } = roomsStateStore();

  useEffect(() => {
    if (!scene) return;

    const updateRooms = async () => {
      for (const roomNumber of activatedRooms) {
        const y = Math.floor(roomNumber / 100);
        const x = roomNumber % 100;
        const name = `window-${y}-${x}`;

        try {
          const room = await waitForRoom(scene, name);
          const mat = room.material;
          if (mat instanceof THREE.MeshStandardMaterial) {
            mat.emissiveIntensity = 0.35;
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    updateRooms();
  }, [activatedRooms, scene]);
};

const waitForRoom = (scene: THREE.Scene, name: string) => {
  return new Promise<THREE.Mesh>((resolve, reject) => {
    const timeout = 3000;
    const interval = 50;
    let lastTime = 0;

    const timer = setInterval(() => {
      const room = scene.getObjectByName(name) as THREE.Mesh;
      if (room) {
        clearInterval(timer);
        resolve(room);
      }
      if (!room && lastTime >= timeout) {
        clearInterval(timer);
        reject(new Error(`Timeout: failed room light update. ${name} missing`));
      }
      lastTime += interval;
    }, interval);
  });
};
