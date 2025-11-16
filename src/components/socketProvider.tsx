import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";
import { roomsStateStore } from "../store/roomsStateStore";

interface SocketContextType {
  socket: Socket | null;
  socketId: string | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  socketId: null,
  isConnected: false,
});

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [socketId, setSocketId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { setActivatedRooms } = roomsStateStore();

  useEffect(() => {
    // 1. 소켓 인스턴스가 없으면 생성하고 useRef에 저장
    if (!socketRef.current) {
      const newSocket = io(process.env.REACT_APP_SERVER as string, {
        transports: ["websocket"],
      }); //  'websocket'설정: 리버스 프록시(Nginx, Cloudflare 등) 환경에서 polling이 막힐 수 있음(Vercel)
      socketRef.current = newSocket;
      setSocket(newSocket);

      // 2. 이벤트 리스너(연결,해제)
      newSocket.on("connect", () => {
        setIsConnected(true);
        setSocketId(newSocket.id ?? null);
      });

      newSocket.on("disconnect", () => {
        setIsConnected(false);
        setSocketId(null);
      });
      newSocket.on("users-update-after-disconnect", (userCount: number) => {
        console.log(`users-update-after-disconnect:${userCount}`);
      });

      // 이벤트 리스너(기타)
      // recent_activated_rooms: 최신 방 상태 수신 (post성공해서 새로운 호스트(유저) 등록 시 모두에게 발생)
      newSocket.on("recent_activated_rooms", (message: number[]) => {
        console.log("new data submitted ------ ");
        console.log(message);
        setActivatedRooms(message);
      });
    }

    // 3. 클린업
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, socketId, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

// 소켓 정보 접근 - 커스텀 훅
// ex. const { socket, socketId, isConnected } = useSocket();
export const useSocket = () => {
  return useContext(SocketContext);
};
