"use server"

import {register} from "@/app/lib/supabase/auth";
import getAuthErrorMessage from "@/app/lib/supabase/getAuthErrorMessage";

export default async function registerHandler(
  prevState: string | null, formData: FormData
) {
  const error = await register(formData)

  return getAuthErrorMessage(error)
}
