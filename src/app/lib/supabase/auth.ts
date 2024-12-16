'use server'

import {redirect} from 'next/navigation'
import {createClient} from '@/app/utils/supabase/server'
import {Database} from "../../../../database.types";

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const {error} = await supabase.auth.signInWithPassword(data)
  if (error) return error

  await checkSession()
}

export async function register(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        student_id: formData.get('student_id') as string,
        name: formData.get('name') as string,
      }
    }
  }

  const {error} = await supabase.auth.signUp(data)
  if (error) return error

  await checkSession()
}

export async function logout() {
  const supabase = await createClient()

  const {error} = await supabase.auth.signOut({scope: "local"})

  if (error) {
    redirect('/error')
  }
}

// ----- //

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
      if(status === null) redirect("/login");
      break;
    }
    case "teacher": {
      if(status === null) redirect("/login");
      else if(status === "student") redirect("/home");
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
