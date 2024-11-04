"use client"

import ChatList from "@/app/(private)/chat/ChatList";
import {useEffect, useState} from "react";
import ChatDetail from "@/app/(private)/chat/ChatDetail";
import {Channel, ChannelWithLastMessage, ChatMessage, Profile} from "@/app/lib/supabase/type";
import {User} from "@supabase/auth-js";
import {createClient} from "@/app/utils/supabase/client";

export default function ChatLayout(
  {
    defaultMessages,
    defaultChannels,
    defaultProfiles,
    user
  }: {
    defaultMessages: ChatMessage[],
    defaultChannels: ChannelWithLastMessage[]
    defaultProfiles: Map<string, Profile>
    user: User
  }
) {
  const [messages, setMessages] = useState<ChatMessage[]>(defaultMessages);
  const [channels, setChannels] = useState<ChannelWithLastMessage[]>(defaultChannels);
  const [selectedChannel, setSelectedChannel] = useState<Channel>();

  useEffect(() => {
    const supabase = createClient()
    const channel = supabase
      .channel("schema_db_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const newRecord = payload.new as ChatMessage;
          setMessages(prevState => [...prevState, newRecord])
          setChannels(prevState => prevState.map(value => {
            if (value.id === newRecord.channel_id) value.lastMessage = newRecord;
            return value
          }))
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel).then()
    };
  }, []);

  const selectChannel = (channel: Channel) => {
    setSelectedChannel(channel);
  }

  return (
    <div className="flex h-full [&>*]:flex-1 [&>*]:p-8">
      <div>
        <h1 className="mb-4 text-xl">チャット</h1>

        <ChatList
          channels={channels}
          profiles={defaultProfiles}
          selectChannel={selectChannel}
          user={user}
        />
      </div>

      <div className="h-full border-l border-l-gray-200">
        <ChatDetail
          channel={selectedChannel}
          profiles={defaultProfiles}
          messages={messages.filter(value => value.channel_id === selectedChannel?.id)}
          user={user}
        />
      </div>
    </div>
  )
}