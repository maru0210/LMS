"use server"

import {login} from "@/app/(auth)/actions";
import getErrorMessage from "@/lib/supabase/getErrorMessage";

export default async function loginHandler(
  _prevState: string | null, formData: FormData
) {
  const error = await login(formData)

  return getErrorMessage(error)
}
