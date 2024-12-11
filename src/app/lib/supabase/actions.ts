"use server"

import {redirect} from "next/navigation";
import {createClient} from "@/app/utils/supabase/server";

export async function getAuthUser() {
  const supabase = await createClient()
  const user = (await supabase.auth.getUser()).data.user;

  if(!user) redirect("/error");

  return user;
}
