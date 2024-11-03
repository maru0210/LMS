import {addChatData, TypeChatData} from "@/app/(private)/chat/action";
import {FormEventHandler, useRef} from "react";

function SendInput(
  {roomId, from, to}: { roomId: string, from: string, to: string }
) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string;

    console.log(message);

    addChatData(roomId, from, to, message).then();

    if (inputRef.current?.value) inputRef.current.value = "";
  }

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input ref={inputRef} type="text" name="message" className="flex-1"/>
      <button className="rounded-r-lg px-4 bg-blue-500 text-white">Send</button>
    </form>
  )
}

export default function ChatDetail(
  {myUserId, roomId, chatData}: { myUserId: string, roomId: string, chatData: TypeChatData[] }
) {
  if (!roomId) return <></>

  const toUserId = chatData[0].from === myUserId ? chatData[0].to : chatData[0].from;

  return (
    <div className="h-full flex flex-col">
      <p className="rounded p-2 mb-8 text-center shadow">Room ID : {roomId}</p>

      <div className="flex-1 flex flex-col gap-4">
        {chatData.map(data => (
          <div className={"flex " + (data.from === myUserId ? "justify-end" : "")} key={data.id}>
            <p className={
              "rounded-xl px-4 py-2.5 shadow " + (data.from === myUserId ? "bg-blue-500 text-white" : "")
            }>{data.message}</p>
          </div>
        ))}
      </div>

      <SendInput
        from={myUserId}
        to={toUserId}
        roomId={roomId}
      />
    </div>
  )
}