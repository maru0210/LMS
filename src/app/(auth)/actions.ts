"use server"

import {checkSession} from "@/lib/supabase/auth";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export async function login(formData: FormData) {
  const supabase = await createClient()

  const {error} = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })
  if (error) return error

  await checkSession()
}

export async function register(formData: FormData) {
  const supabase = await createClient()

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