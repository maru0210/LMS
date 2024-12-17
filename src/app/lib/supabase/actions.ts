"use server"

import {redirect} from "next/navigation";
import {createClient} from "@/app/utils/supabase/server";
import {Profile} from "@/app/lib/supabase/type";

export async function getUser() {
  const supabase = await createClient()
  const user = (await supabase.auth.getUser()).data.user;

  if(!user) redirect("/error");

  return user;
}

export async function getUserProfile(): Promise<Profile> {
  const supabase = await createClient()
  const user = await getUser();
  const profile
    = (await supabase.from("profiles").select().eq("id", user.id)).data

  if(!profile || profile.length !== 1) redirect("/error");
  return profile[0];
}

export async function getProfile(id: string): Promise<Profile> {
  const supabase = await createClient();
  const profile
    = (await supabase.from("profiles").select().eq("id", id)).data

  if(!profile || profile.length !== 1) redirect("/error");
  return profile[0];
}
