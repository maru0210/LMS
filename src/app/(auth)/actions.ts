"use server";

import { redirectUserRoot } from "@/lib/supabase/auth";
import getErrorMessage from "@/lib/supabase/getErrorMessage";
import { createClient } from "@/utils/supabase/server";

export async function login(_: string | null, formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) return getErrorMessage(error);
  await redirectUserRoot();

  return null;
}

export async function register(_: string | null, formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        student_id: formData.get("student_id") as string,
        name: formData.get("name") as string,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);
  if (error) return getErrorMessage(error);
  await redirectUserRoot();

  return null;
}
