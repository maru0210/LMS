"use server"

import {register} from "@/app/lib/supabase/auth";
import getErrorMessage from "@/app/lib/supabase/getErrorMessage";

export default async function registerHandler(
  prevState: string | null, formData: FormData
) {
  const error = await register(formData)

  return getErrorMessage(error)
}
