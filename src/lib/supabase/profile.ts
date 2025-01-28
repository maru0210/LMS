"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function getProfile(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("profiles").select().eq("id", id);
  if (error || !data[0]) return redirect("/error");
  return data[0];
}
