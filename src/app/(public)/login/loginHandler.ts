"use server"

import {login} from "@/app/lib/supabase/auth";
import getErrorMessage from "@/app/lib/supabase/getErrorMessage";

export default async function loginHandler(
  _prevState: string | null, formData: FormData
) {
  const error = await login(formData)

  return getErrorMessage(error)
}
