import * as THREE from "three";
import makeRoom from "./makeRoom";

// y = 0층~
// x = 00x호
// 방 메쉬 이름: room-x-y
// 유저입력-> floor, 호실
// 컬러는 상수로 그냥 싹 지정해두자.[][]형태로
//
export default function makeRoomRepeat(scene: THREE.Scene) {
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 7; x++) {
      const room = makeRoom(x, y);
      scene.add(room);
    }
  }
}
