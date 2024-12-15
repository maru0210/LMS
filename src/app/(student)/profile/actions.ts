"use server"

import {createClient} from "@/app/utils/supabase/server";
import {getUser} from "@/app/lib/supabase/actions";
import getErrorMessage from "@/app/lib/supabase/getErrorMessage";

export async function changeName(name: string) {
  const supabase = await createClient()
  const user = await getUser()

  const res
    = await supabase.from("profiles").update({name: name}).eq("id", user.id)

  return getErrorMessage(res.error);
}

export async function changeEmail(email: string) {
  const supabase = await createClient()
  const res = await supabase.auth.updateUser({email: email})

  return getErrorMessage(res.error);
}

export async function changePassword(password: string) {
  const supabase = await createClient()
  const res = await supabase.auth.updateUser({password: password})

  return getErrorMessage(res.error);
}
