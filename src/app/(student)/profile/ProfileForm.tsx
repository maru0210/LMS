"use client"

import {User} from "@supabase/auth-js";

function Input(
  {label, id, placeholder, autoComplete}: { label: string, id: string, placeholder: string, autoComplete?: string }
) {
  return (
    <div className="flex items-center">
      <label htmlFor={id} className="w-48">{label}</label>

      <div className="flex gap-2 text-sm">
        <input
          id={id}
          name={id}
          placeholder={placeholder}
          required={true}
          className="block rounded-lg px-2 py-1 ring-1 ring-inset ring-gray-300 shadow-sm focus:shadow-md transition"
        />
        <button className="flex items-center h-8 px-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition">変更</button>
      </div>
    </div>
  )
}

export default function ProfileForm(
  {defaultAuthUser}: { defaultAuthUser: User }
) {
  return (
    <div>
      <form action={() => console.log("a")}>
        <Input label={"名前（ニックネーム）"} id={"name"} placeholder={defaultAuthUser.id}/>
      </form>
    </div>
  )
}