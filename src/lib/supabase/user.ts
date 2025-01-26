"use server";

import { getProfile } from "@/lib/supabase/profile";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) redirect("/login");
  return data.user;
}

export async function existsCurrentUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data.user !== null;
}

export async function getUserStatus() {
  const user = await getCurrentUser();
  const profile = await getProfile(user.id);
  return profile.status;
}
