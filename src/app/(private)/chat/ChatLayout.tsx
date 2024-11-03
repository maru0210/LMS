"use client"

import ChatList from "@/app/(private)/chat/ChatList";
import {useEffect, useState} from "react";
import {TypeChatData} from "@/app/(private)/chat/action";
import ChatDetail from "@/app/(private)/chat/ChatDetail";
import {createClient} from "@/app/utils/supabase/client";

export default function ChatLayout(
  {defaultChatData, myUserId}: { defaultChatData: TypeChatData[], myUserId: string }
) {
  const [chatData, setChatData] = useState<TypeChatData[]>(defaultChatData);
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");

  useEffect(() => {
    const supabase = createClient()
    const channel = supabase
      .channel("schema_db_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat",
        },
        (payload) => {
          setChatData([...chatData, payload.new as TypeChatData])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel).then();
    }
  }, [chatData]);

  const updateChatId = (id: string) => setSelectedRoomId(id);

  return (
    <div className="flex h-full [&>*]:flex-1 [&>*]:p-8">
      <div>
        <h1 className="text-xl">チャット</h1>

        <ChatList chatData={chatData} updateChatId={updateChatId}/>
      </div>

      <div className="h-full border-l border-l-gray-200">
        <ChatDetail
          myUserId={myUserId}
          roomId={selectedRoomId}
          chatData={chatData.filter(value => value.room_id === selectedRoomId)}
        />
      </div>
    </div>
  )
}