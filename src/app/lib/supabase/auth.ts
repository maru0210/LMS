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

  // TODO: check scope, global or local
  const {error} = await supabase.auth.signOut()

  if (error) {
    redirect('/error')
  }
}
