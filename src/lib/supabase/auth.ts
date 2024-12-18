"use server"

import {createClient} from '@/utils/supabase/server'
import {redirect} from 'next/navigation'
import {Database} from "../../../database.types";

export async function getUserStatus() {
  const supabase = await createClient()
  const user = (await supabase.auth.getUser()).data.user

  if (user) {
    const {data: profile} = await supabase.from("profiles").select().eq("id", user.id);

    if (profile?.length === 1) {
      return profile[0].status;
    }
  }

  return null
}

export async function checkSession() {
  const userStatus = await getUserStatus();

  switch (userStatus) {
    case null:
      return;
    case "student":
      return redirect("/home");
    case "teacher":
      return redirect("/manager/exam");
    // case "administer":
    //   return redirect("/admin");
    default:
      return redirect("/error");
  }
}

export async function checkStatus(requiredStatus: Database["public"]["Enums"]["status"]) {
  const status = await getUserStatus();

  switch (requiredStatus) {
    case "student": {
      if (status === null) redirect("/login");
      break;
    }
    case "teacher": {
      if (status === null) redirect("/login");
      else if (status === "student") redirect("/home");
      break;
    }
    // case "administer": {
    //   if(status === null) redirect("/login");
    //   else if(status === "student") redirect("/home");
    //   else if(status === "teacher") redirect("/management");
    //   break;
    // }
  }
}
