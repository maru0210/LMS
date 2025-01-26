"use server";

import { getUserStatus } from "@/lib/supabase/user";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Database } from "../../../database.types";

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut({ scope: "local" });
  if (error) redirect("/error");
}

export async function verifyUserStatus(
  requiredStatus: Database["public"]["Enums"]["status"],
) {
  const status = await getUserStatus();

  switch (requiredStatus) {
    case "student":
      break;
    case "teacher":
      if (status === "student") redirect("/home");
      break;
    default:
      redirect("/error");
  }
}

export async function redirectUserRoot() {
  const status = await getUserStatus();
  if (status === "student") redirect("/home");
  else if (status === "teacher") redirect("/manager/exam");
}
