"use server"

import getErrorMessage from "@/lib/supabase/getErrorMessage";
import {getCurrentUser} from "@/lib/supabase/user";
import {createClient} from "@/utils/supabase/server";

export async function changeName(name: string) {
  const supabase = await createClient()
  const user = await getCurrentUser()
  const {error} = await supabase.from("profiles").update({name: name}).eq("id", user.id)
  if (error) return getErrorMessage(error);
  return null
}

export async function changeEmail(email: string) {
  const supabase = await createClient()
  const {error} = await supabase.auth.updateUser({email: email})
  if (error) return getErrorMessage(error);
  return null
}

export async function changePassword(password: string) {
  const supabase = await createClient()
  const {error} = await supabase.auth.updateUser({password: password})
  if (error) return getErrorMessage(error);
  return null
}
