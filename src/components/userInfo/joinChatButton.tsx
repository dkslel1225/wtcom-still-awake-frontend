import { useState } from "react";

export function JoinChatButton({ roomNum }: { roomNum: number }) {
  const [hovered, setHovered] = useState(false);
  const handleMouseOver = () => {
    setHovered(true);
  };
  const handleMouseOut = () => {
    setHovered(false);
  };
  return (
    <>
      <div className="relative">
        <button
          className="border rounded-lg w-full"
          onMouseEnter={handleMouseOver} // ✨ 2. onMouseOver 대신 onMouseEnter 사용 권장
          onMouseLeave={handleMouseOut}
        >
          Join chat at {roomNum}
        </button>
        {hovered && (
          <div className="absolute bottom-10 bg-black border p-3 rounded-lg w-full ">
            <p>Participants in Room 402</p>
            <p className="break-all">: a, b,</p>
          </div>
        )}
      </div>
    </>
  );
}
