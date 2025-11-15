import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { roomsStateStore } from "../store/roomsStateStore";

// Socket 인스턴스를 외부에 선언하여 컴포넌트 리렌더링 시 재생성 방지
// 참고로 이 소켓 컨트롤러는 여기 한곳에만 둬야 한다.. 다른데서도 socket객체 만들면 그것도 하면에서 렌덜이 될때마다 소켓 2개씩 열리는거임.
// 근데 별도의 채팅방을 만들때는 소켓 객체 하나 더 마드는게 맞을듯.
let socket: Socket;

/** 
  여기서 소켓 이벤트를 관리한다.
*/
export const useSocketListener = () => {
  const { setActivatedRooms } = roomsStateStore();
  useEffect(() => {
    // 소켓 생성 및 소켓 중복 생성 방지
    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_SERVER);
    }

    // 이벤트. 접속자 수 업데이트 수신
    socket.on("update_user_list", (count: number) => {
      console.log(`Received user count: ${count}`);
    });

    // 이벤트. 최신 activatedRooms 데이터 수신 (첫 마운트 시, post성공해서 새로운 호스트(유저) 등록 시 발생)
    socket.on("recent_activated_rooms", (message: number[]) => {
      console.log("new data submitted ------ ");
      console.log(message);
      setActivatedRooms(message);
    });

    // 클린업
    return () => {
      socket.off("update_user_list");
      socket.off("new_data_submitted");
      socket.disconnect();
    };
  }, []);
};
