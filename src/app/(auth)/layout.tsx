import {checkSession} from "@/lib/supabase/auth";
import React from "react";

export default async function AuthLayout(
  { children }: Readonly<{ children: React.ReactNode }>
) {
  await checkSession()

  return children;
}
