"use server"

import {register} from "@/app/(auth)/actions";
import getErrorMessage from "@/lib/supabase/getErrorMessage";

export default async function registerHandler(
  prevState: string | null, formData: FormData
) {
  const error = await register(formData)

  return getErrorMessage(error)
}
