import {addMessage} from "@/app/(private)/chat/actions";
import React, {useRef} from "react";
import {Channel, ChatMessage, Profile} from "@/app/lib/supabase/type";
import {User} from "@supabase/auth-js";

function SendInput(
  {channel, isStudent}: { channel: Channel, isStudent: boolean }
) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const message = inputRef.current?.value.trim();

    if (!message || message === "") return

    addMessage(channel, isStudent, message).then();

    if (inputRef.current?.value) inputRef.current.value = "";
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      handleSend()
    }
  }

  return (
    <div className="flex rounded shadow">
      <textarea
        className="flex-1 rounded-l p-2 resize-none [field-sizing:content]"
        ref={inputRef} onKeyDown={handleKeyDown}
      />
      <button className="rounded-r px-4 bg-blue-500 text-white" onClick={handleSend}>送信</button>
    </div>
  )
}

export default function ChatDetail(
  {channel, profiles, messages, user}: {
    channel?: Channel,
    profiles: Map<string, Profile>,
    messages: ChatMessage[],
    user: User
  }
) {
  if (!channel) return <></>

  return (
    <div className="h-full flex flex-col">
      <p className="rounded p-2 mb-8 text-center shadow">
        {profiles.get(channel.student === user.id ? channel.teacher : channel.student)?.name}
      </p>

      <div className="flex-1 flex flex-col gap-4">
        {messages.map(message => (
          <div className={"flex " + (message.from === user.id ? "justify-end" : "")} key={message.id}>
            <pre className={
              "rounded-xl px-4 py-2.5 shadow " + (message.from === user.id ? "bg-blue-500 text-white" : "")
            }>
              {message.text}
            </pre>
          </div>
        ))}
      </div>

      <SendInput
        channel={channel}
        isStudent={channel.student === user.id}
      />
    </div>
  )
}