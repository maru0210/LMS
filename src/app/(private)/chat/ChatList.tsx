import {TypeChatData} from "@/app/(private)/chat/action";

export default function ChatList(
  {chatData, updateChatId}: { chatData: TypeChatData[], updateChatId: (id: string) => void }
) {
  const roomIds = Array.from(new Set(chatData.map(data => data.room_id)))

  return (
    <div>
      {roomIds.map((roomId, index) => (
        <p key={index} onClick={() => updateChatId(roomId)}>{roomId}</p>
      ))}
    </div>
  )
}