import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { roomsStateStore } from "../store/roomsStateStore";
import { socketStore } from "../store/socketStore";

export const useSocketInit = () => {
  const socketRef = useRef<Socket | null>(null);
  const { setSocketId, setIsConnected } = socketStore();
  const { setActivatedRooms, setDeletedRoom } = roomsStateStore();

  useEffect(() => {
    // 1. 소켓 인스턴스가 없으면 생성하고 useRef에 저장
    if (!socketRef.current) {
      const newSocket = io(process.env.REACT_APP_SERVER as string, {
        transports: ["polling", "websocket"],
      }); //  'websocket'설정: 리버스 프록시(Nginx, Cloudflare 등) 환경에서 polling이 막힐 수 있음(Vercel)
      socketRef.current = newSocket;

      // 2. 이벤트 리스너(연결,해제)
      newSocket.on("connect", () => {
        setIsConnected(true);
        setSocketId(newSocket.id ?? null);
      });

      newSocket.on("disconnect", () => {
        setIsConnected(false);
        setSocketId(null);
      });

      // 새로고침, 창 닫기 방지
      window.addEventListener("beforeunload", (e) => {
        e.preventDefault();
        e.returnValue = "";
      });

      // 2. 이벤트 리스너(기타)
      // recent_activated_rooms: 소켓 연결 직후, 유저 등록 직후, 수신 받음
      newSocket.on("recent_activated_rooms", (message: number[]) => {
        setActivatedRooms(message);
      });

      //io.emit("recent_deleted_room", user.roomNum); 유저 연결이 끊긴 경우, 삭제
      newSocket.on("recent_deleted_room", (deletedRoom: number) => {
        console.log("roomdeleted");
        console.log(deletedRoom);
        setDeletedRoom(deletedRoom);
      });
    }

    // 3. 클린업
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);
};
