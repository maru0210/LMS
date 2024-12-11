"use client"

import {HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute, useState} from "react";

import {User} from "@supabase/auth-js";
import {Profile} from "@/app/lib/supabase/type";
import {changeEmail, changeName, changePassword} from "@/app/(student)/profile/actions";

function Input(
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
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required={true}
            disabled={disabled}
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
  const [profile, setProfile] = useState<Profile>(defaultProfile)

  function handleChangeName(formData: FormData) {
    if (!formData.get("name")) return;

    const name =
      (formData.get("name") as string)
        .trim()
        .replace(/[ 　]+/g, ' ');

    if (name === "") {
      console.log("正しい名前を入力してください。");
      return;
    }

    changeName(name).then(res => {
      if (res) {
        console.log("変更に失敗しました。");
      } else {
        setProfile(prevState => (
          {...prevState, name: name}
        ))
        console.log(`名前を${name}に変更しました。`);
      }
    })
  }

  function handleChangeEmail(formData: FormData) {
    if (!formData.get("email")) return;
    const email = formData.get("email") as string;

    changeEmail(email).then(res => {
      if (res) {
        console.log("変更に失敗しました。");
      } else {
        console.log(`${email}に確認メールを送信しました。`);
      }
    })
  }

  function handleChangePassword(formData: FormData) {
    if (!formData.get("password")) return;
    const password = formData.get("password") as string;

    changePassword(password).then(res => {
      if (res) {
        console.log("変更に失敗しました。");
      } else {
        console.log(`パスワードを変更しました。`)
      }
    })
  }

  return (
    <div className="flex flex-col gap-4 mx-2">
      <form>
        <Input label={"学籍番号"} id={"student_id"} type={"text"} placeholder={profile.student_id} disabled={true}/>
      </form>
      <form action={handleChangeName}>
        <Input label={"名前（ニックネーム）"} id={"name"} type={"text"} placeholder={profile.name}/>
      </form>
      <form action={handleChangeEmail}>
        <Input label={"メールアドレス"} id={"email"} type={"email"} placeholder={user.email ?? ""}
               autoComplete={"email"}/>
      </form>
      <form action={handleChangePassword} className="space-y-2">
        <Input label={"パスワード"} id={"password"} type={"text"} placeholder={"********"}
               autoComplete={"new-password"}/>
      </form>
    </div>
  )
}