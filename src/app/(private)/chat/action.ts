"use server"

import {createClient} from "@/app/utils/supabase/server";
import {Database} from "../../../../database.types";

export type TypeChatData = Database["public"]["Tables"]["chat"]["Row"]

export async function getChatData() {
  const supabase = await createClient()

  const {data} = await supabase.from("chat").select().order("created_at")
  // console.log(data)

  return  data ? data : []
}

export async function addChatData(
  room_id: string, from: string, to: string, message: string
) {
  const supabase = await createClient()

  await supabase.from("chat").insert({
    room_id: room_id,
    from: from,
    to: to,
    message: message
  })
}
