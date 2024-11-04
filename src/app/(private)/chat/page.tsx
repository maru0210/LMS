import {getProfile, getUser} from "@/app/lib/supabase/actions";
import {checkStatus} from "@/app/lib/supabase/auth";

import Navigation from "@/app/components/Navigation";
import ChatLayout from "@/app/(private)/chat/ChatLayout";
import {createClient} from "@/app/utils/supabase/server";
import {ChannelWithLastMessage} from "@/app/lib/supabase/type";

export default async function Chat() {
  await checkStatus("student");

  const user = await getUser();

  const supabase = await createClient()

  const channels = (await supabase.from("channels").select()).data ?? []
  const channelsMap = new Map(channels.map(channel => [channel.id, channel]));

  const profiles = await Promise.all(
    channels.map(channel => [getProfile(channel.student), getProfile(channel.teacher)]).flat()
  )
  const profilesMap = new Map(profiles.map(profile => [profile.id, profile]));

  const messages = (await supabase.from("messages").select()).data ?? [];

  const channelsWithLastMessage: ChannelWithLastMessage[] = Array.from(new Map(messages.map(message => (
    [message.channel_id, {...channelsMap.get(message.channel_id), lastMessage: message} as ChannelWithLastMessage]
  ))).values())

  // console.log(channelsWithLastMessage);

  return (
    <Navigation autoPadding={false}>
      <ChatLayout
        defaultMessages={messages}
        defaultChannels={channelsWithLastMessage}
        defaultProfiles={profilesMap}
        user={user}
      />
    </Navigation>
  )
}