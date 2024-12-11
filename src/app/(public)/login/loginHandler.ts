"use server"

import {login} from "@/app/lib/supabase/auth";
import getAuthErrorMessage from "@/app/lib/supabase/getAuthErrorMessage";

export default async function loginHandler(
  _prevState: string | null, formData: FormData
) {
  const error = await login(formData)

  return getAuthErrorMessage(error)
}
