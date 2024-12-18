import getErrorMessage from "@/lib/supabase/getErrorMessage";
import {getCurrentUser} from "@/lib/supabase/user";
import {createClient} from "@/utils/supabase/server";

export async function changeName(name: string) {
  const supabase = await createClient()
  const user = await getCurrentUser()
  const res = await supabase.from("profiles").update({name: name}).eq("id", user.id)

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
