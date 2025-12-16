import { useState } from "react";
import { chatStateStore } from "../../store/chatStateStore";

export default function Participants() {
  const { participants } = chatStateStore();
  const [listOpen, setListOpen] = useState(false);
  return (
    <>
      <div className="px-1 border rounded-lg">
        <button
          onClick={() => {
            setListOpen(!listOpen);
          }}
        >
          Participants: {participants.length}
        </button>
        {listOpen && <ParticipantsList participants={participants} />}
      </div>
    </>
  );
}

export function ParticipantsList({ participants }: { participants: string[] }) {
  return (
    <div>
      {participants.map((name, idx) => {
        return (
          <p className="break-all" key={`${idx}${name}`}>
            - {name}
          </p>
        );
      })}
    </div>
  );
}
