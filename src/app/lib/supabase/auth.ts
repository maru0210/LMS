'use server'

import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'

import {createClient} from '@/app/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const {error} = await supabase.auth.signInWithPassword(data)

  if (error) {
    return error
  }

  if (await isAdminUser()) {
    revalidatePath('/admin', 'layout')
    redirect('/admin')
  }

  revalidatePath('/home', 'layout')
  redirect('/home')
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
        name: formData.get('name') as string,
      }
    }
  }

  const {error} = await supabase.auth.signUp(data)

  if (error) {
    return error
  }

  revalidatePath('/home', 'layout')
  redirect('/home')
}

export async function logout() {
  const supabase = await createClient()

  const {error} = await supabase.auth.signOut({scope: "local"})

  if (error) {
    redirect('/error')
  }
}

export async function isAdminUser() {
  const supabase = await createClient()

  const {data} = await supabase.from("profiles").select()
  if(data && data.length === 1) {
    return data[0].is_admin
  } else {
    return redirect('/error');
  }
}

export async function auth() {
  const supabase = await createClient()

  const {data, error} = await supabase.auth.getUser()
  if (data.user && error) redirect('/error')
  if (!data.user) redirect('/login')
}

export async function authAdmin() {
  await auth();

  if (!await isAdminUser()) {
    redirect('/home')
  }
}
