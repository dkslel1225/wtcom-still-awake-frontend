import * as THREE from "three";
import makeRoom from "./makeRoom";

// y = floor
// x = 00x호
// 방 메쉬 이름: room-x-y
export default function makeRoomRepeat(scene: THREE.Scene) {
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 7; x++) {
      const room = makeRoom(x, y);
      scene.add(room);
    }
  }
}
