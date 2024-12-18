"use client"

import {HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute, useState} from "react";

import {User} from "@supabase/auth-js";
import {Profile} from "@/lib/supabase/type";
import NameForm from "@/app/(student)/profile/forms/NameForm";
import EmailForm from "@/app/(student)/profile/forms/EmailForm";
import PasswordForm from "@/app/(student)/profile/forms/PasswordForm";

export function Input(
  {label, id, type, placeholder, autoComplete, disabled = false}:
  {
    label: string,
    id: string,
    type: HTMLInputTypeAttribute,
    placeholder: string,
    autoComplete?: HTMLInputAutoCompleteAttribute,
    disabled?: boolean,
  }
) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center">
        <label htmlFor={id} className="w-48">{label}</label>

        <div className={"flex-1 max-w-96 flex gap-2 text-sm"}>
          <input
            id={id} name={id} type={type} placeholder={placeholder}
            autoComplete={autoComplete} required={true} disabled={disabled}
            className="flex-1 block rounded-lg h-8 px-2 ring-1 ring-inset ring-gray-300 shadow-sm focus:shadow-md transition
                       disabled:bg-white disabled:placeholder:text-neutral-900 disabled:ring-0 disabled:shadow-none"
          />

          {!disabled &&
              <button className="flex items-center h-8 px-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                  変更
              </button>
          }
        </div>
      </div>
    </div>
  )
}

export default function ProfileForm(
  {defaultUser, defaultProfile}: { defaultUser: User, defaultProfile: Profile }
) {
  const [user] = useState<User>(defaultUser)
  const [profile] = useState<Profile>(defaultProfile)

  return (
    <div className="flex flex-col gap-4 mx-2">
      <form>
        <Input label={"学籍番号"} id={"student_id"} type={"text"}
               placeholder={profile.student_id} disabled={true}/>
      </form>

      <NameForm defaultName={profile.name}/>
      <EmailForm defaultEmail={user.email ?? ""}/>
      <PasswordForm/>
    </div>
  )
}