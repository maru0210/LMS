import {getProfile} from "@/lib/supabase/profile";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import React from "react";

export default async function AuthLayout(
  {children}: Readonly<{ children: React.ReactNode }>
) {
  const supabase = await createClient();
  const {data: {user}} = await supabase.auth.getUser()
  if (user) {
    const profile = await getProfile(user.id);
    if (profile.status === "student") redirect("/home");
    else if (profile.status === "teacher") redirect("/manager/exam");
  }

  return children;
}
