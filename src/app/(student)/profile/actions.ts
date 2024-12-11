"use server"

import {createClient} from "@/app/utils/supabase/server";
import {getUser} from "@/app/lib/supabase/actions";

export async function changeName(name: string) {
  const supabase = await createClient()
  const user = await getUser()

  const res
    = await supabase.from("profiles").update({name: name}).eq("id", user.id)

  return res.error ? 1 : 0;
}

export async function changeEmail(email: string) {
  const supabase = await createClient()
  const res = await supabase.auth.updateUser({email: email})

  if(res.error) console.log(res.error)
  return res.error ? 1 : 0;
}

export async function changePassword(password: string) {
  const supabase = await createClient()
  const res = await supabase.auth.updateUser({password: password})

  if(res.error) console.log(res.error)
  return res.error ? 1 : 0;
}
