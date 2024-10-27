"use client"

import {useActionState} from "react"
import registerHandler from "@/app/(auth)/register/registerHandler";
import AuthFormInput from "@/app/(auth)/AuthFormInput";

export default function RegisterForm() {
  const [state, formAction] = useActionState(registerHandler, null)

  return (
    <div className="flex flex-col max-w-md h-full mx-auto px-8 text-gray-900">
      <div className="flex-1 flex items-center justify-center">
        <p className="py-12 text-2xl font-bold">新規登録</p>
      </div>

      <form action={formAction} className="flex-[3] space-y-8 space-y-reverse">
        {state && (
          <div className="px-4 py-2.5 rounded-lg border-2 border-red-300 bg-red-50 shadow-sm">
            <p>{state}</p>
          </div>
        )}

        <AuthFormInput label={"お名前（ニックネーム）"} id={"name"} autoComplete={"name"} />

        <AuthFormInput label={"メールアドレス"} id={"email"} autoComplete={"email"} />

        <AuthFormInput label={"パスワード"} id={"password"} autoComplete={"current-password"} />

        <div>
          <button type="submit" className="block w-full rounded-lg py-2.5 bg-lime-300">登録</button>
        </div>

        <div className="h-0.5 bg-gray-200"/>

        <div className="space-y-2">
          <p className="ml-0.5">すでに登録済みの方</p>
          <a
            href="/login"
            className="block w-full rounded-lg py-2.5 ring-0 bg-lime-600 text-white text-center"
          >ログインページ</a>
        </div>
      </form>
    </div>
  )
}