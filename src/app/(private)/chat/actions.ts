"use server"

import {createClient} from "@/app/utils/supabase/server";
import {Channel} from "@/app/lib/supabase/type";

export async function addMessage(
  channel: Channel, isStudent: boolean, message: string
) {
  const supabase = await createClient()

  await supabase.from("messages").insert({
    channel_id: channel.id,
    from: isStudent ? channel.student : channel.teacher,
    text: message
  })
}
