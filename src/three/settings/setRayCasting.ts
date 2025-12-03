import { RefObject } from "react";
import * as THREE from "three";
import { roomsStateStore } from "../../store/roomsStateStore";
import { calculateRoomNumber } from "../../utils/calculateRoomNumber";
import { userDataStore } from "../../store/userDataStore";

// 트러블슈팅: setRayCasting내의 이벤트 리스너가, useEffect((),[])에서 호출되어, 최초 마운트 시 한 번만 생성됨. -> 이 리스너가 리액트의 상태값 (registered)을 처음 값 그대로 영구히 기억하는 "클로저(Closure) 문제가 발생함.""
// 트러블슈팅: registered 값으로, 현재값을 고정으로 받는게 아닌, 가변적인 값을 담고 있는 Ref 객체를 받아야 함.
// 예를들어, 전역상태값인 registered를 그대로 받거나, registered.current 값을 넘겨준다면, 레지스터 여부의 최신값이 반영되지 못하여, (!registered) 조건을 통과할 수 없음.(Stale Closure 문제)
export const setRayCasting = (
  scene: THREE.Scene,
  camera: THREE.Camera,
  registered: RefObject<boolean>
) => {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const targetObjects = scene.children.filter((obj) =>
    obj.name.startsWith("w")
  );

  const checkIntersects = () => {
    if (!registered.current) return;
    // 트러블슈팅: 이거를 통과 못했던 기억이.. 아마도 registered.current값을 제대로 업데이트 못받아서..?
    // 이거를 재호출안되게 함수 바깥에 있어서 문제였다.(getState() 사용하는거로 바꾸고~)

    raycaster.setFromCamera(mouse, camera); // 카메라 시점에서 클릭했을때 처리
    const intersectWindow = raycaster.intersectObjects(targetObjects, false)[0];

    if (intersectWindow !== undefined) {
      // 클릭한 방이, 활성화 되어있는 방이라면, targetRoom값 업데이트하여, 방 주인에 대한 데이터 가져오는 코드 트리거
      const { setTargetRoom, targetRoom, activatedRooms } =
        roomsStateStore.getState(); // checkIntersects가 호출될 때마다 getState()가 실행되므로 항상 스토어의 최신 상태 스냅샷을 가져와 사용 Ok
      const { userData } = userDataStore.getState();

      // get Room Number
      const roomName = intersectWindow.object.name;
      const roomNum = calculateRoomNumber(roomName);

      // check is empty room or is my room
      const isNotEmptyRoom = activatedRooms.includes(roomNum);
      const isMyRoom = userData.myRoom !== roomNum;

      // set target room data -> trigger <TargetProgile/>
      if (isNotEmptyRoom && isMyRoom) {
        setTargetRoom(roomNum);
        console.log(`targetroom: ${targetRoom}`);
      }
    }
  };

  const handleClick = (e: MouseEvent) => {
    // 마우스 좌표를 WebGL기준으로 변환 (브라우저/HTML 좌표계: 0~1, NDC(WebGL): -1~1)
    // 브라우저 좌표: e.clientX / window.inerWidth
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    checkIntersects();
  };

  window.addEventListener("click", handleClick);

  return () => {
    window.removeEventListener("click", handleClick);
  };
};
