"use server"

import {redirect} from "next/navigation";
import {createClient} from "@/app/utils/supabase/server";

export async function getUser() {
  const supabase = await createClient()
  const user = (await supabase.auth.getUser()).data.user;

  if(!user) redirect("/error");

  return user;
}

export async function getProfile(id: string) {
  const supabase = await createClient()
  const {data: profiles} = await supabase.from("profiles").select().eq("id", id);

  if(profiles?.length === 1) {
    return profiles[0];
  } else {
    redirect("/error");
  }
}
