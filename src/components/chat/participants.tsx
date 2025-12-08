import { chatStateStore } from "../../store/chatStateStore";

export default function Participants() {
  const { participants } = chatStateStore();

  return (
    <>
      {/* <div className="absolute top-3 left-3 w-11/12"> */}
      <div className="w-11/12">
        <p>Participants: {participants.length}</p>
        {participants.map((name, idx) => {
          return (
            <p className="break-all" key={`${idx}${name}`}>
              - {name}
            </p>
          );
        })}
      </div>
    </>
  );
}
