import * as THREE from "three";

export default function makeBackground(scene: THREE.Scene) {
  const floor = makeFloor();
  const basePart = makeBuilding();

  scene.add(floor);
  scene.add(basePart);
}

function makeFloor() {
  const floorGeometry = new THREE.PlaneGeometry(12, 5);
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x808080,
    side: THREE.DoubleSide,
  });
  const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
  floorMesh.rotation.x = -Math.PI / 2; // 바닥을 수평으로 회전
  floorMesh.position.set(-1, -2.5, 0); // 바닥 위치 설정
  return floorMesh;
}

function makeBuilding() {
  const building = new THREE.Mesh(
    new THREE.BoxGeometry(7, 5, 1),
    new THREE.MeshStandardMaterial({ color: 0x1b1418 })
  );
  building.position.x = -1;

  const leftDoor = makeBuildingDoor();
  const rightDoor = makeBuildingDoor();

  leftDoor.position.set(-0.12, -2.25, 0.6);
  rightDoor.position.set(0.12, -2.25, 0.6);

  building.add(leftDoor);
  building.add(rightDoor);

  return building;
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

  return buildingDoor;
}
