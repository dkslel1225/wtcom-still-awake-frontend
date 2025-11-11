import * as THREE from "three";

export default function makeBackground(scene: THREE.Scene) {
  const floor = makeFloor();
  const basePart = makeBuildingBasePart();
  const buildingDoor1 = makeBuildingDoor();
  const buildingDoor2 = makeBuildingDoor();
  buildingDoor1.position.x = -0.12;
  buildingDoor2.position.x = 0.12;
  basePart.add(buildingDoor1);
  basePart.add(buildingDoor2);

  scene.add(floor);
  scene.add(basePart);
}

function makeFloor() {
  const floorGeometry = new THREE.PlaneGeometry(10, 10);
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x808080,
    side: THREE.DoubleSide,
  });
  const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
  floorMesh.rotation.x = -Math.PI / 2; // 바닥을 수평으로 회전
  floorMesh.position.y = -1.2; // 바닥 위치 설정
  return floorMesh;
}

function makeBuildingBasePart() {
  const buildingFloor = new THREE.Mesh(
    new THREE.BoxGeometry(7, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0x1b1418 })
  );
  buildingFloor.position.y = -1;

  return buildingFloor;
}

function makeBuildingDoor() {
  const buildingDoor = new THREE.Mesh(
    new THREE.PlaneGeometry(0.2, 0.45),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x908980,
      emissiveIntensity: 0.8,
    })
  );
  buildingDoor.position.z = 0.6;

  return buildingDoor;
}
