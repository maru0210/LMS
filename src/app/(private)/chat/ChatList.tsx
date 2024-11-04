import {Channel, ChannelWithLastMessage, Profile} from "@/app/lib/supabase/type";
import {User} from "@supabase/auth-js";

export default function ChatList(
  {channels, profiles, selectChannel, user}: {
    channels: ChannelWithLastMessage[],
    profiles: Map<string, Profile>
    selectChannel: (channel: Channel) => void,
    user: User
  }
) {
  const isStudent = channels[0].student === user.id

  const getDate = (date: Date) => {
    return `${date.getMonth()+1}月${date.getDate()}日`
  }

  return (
    <div className="flex flex-col gap-4">
      {channels.map((channel, index) => {
        return (
          <div
            className="rounded-sm p-4 shadow cursor-pointer"
            onClick={() => selectChannel(channel)} key={index}
          >
            <div className="flex justify-between">
              <p className="mb-1 text-lg">
                {profiles.get(isStudent ? channel.teacher : channel.student)?.name}
              </p>
              <p>
                {getDate(new Date(channel.lastMessage.created_at))}
              </p>
            </div>
            <p className="text-gray-600">
              {channel.lastMessage.text}
            </p>
          </div>
        )
      })}
    </div>
  )
}