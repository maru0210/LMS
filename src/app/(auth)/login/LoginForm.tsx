"use client"

import {useActionState} from "react"
import loginHandler from "@/app/(auth)/login/loginHandler";
import AuthFormInput from "@/app/(auth)/components/AuthFormInput";

export default function LoginForm() {
  const [state, formAction] = useActionState(loginHandler, null)

  return (
    <div className="flex flex-col max-w-md h-full mx-auto px-8 text-gray-900">
      <div className="flex-1 flex items-center justify-center">
        <p className="py-12 text-2xl font-bold">ログイン</p>
      </div>

      <form action={formAction} className="flex-[3] flex flex-col gap-8 pb-8">
        {state && (
          <div className="px-4 py-2.5 rounded-lg border-2 border-red-300 bg-red-50 shadow-sm">
            <p>{state}</p>
          </div>
        )}

        <AuthFormInput label={"メールアドレス"} id={"email"} autoComplete={"email"} />

        <AuthFormInput label={"パスワード"} id={"password"} autoComplete={"current-password"} />

        <div>
          <button type="submit" className="block w-full rounded-lg py-2.5 bg-lime-600 text-white">ログイン</button>
        </div>

        <div className="h-0.5 bg-gray-200"/>

        <div className="space-y-2">
          <p className="ml-0.5">まだ登録がお済みでない方</p>
          <a
            href="/register"
            className="block w-full rounded-lg py-2.5 ring-0 bg-lime-300 text-center"
          >新規登録</a>
        </div>
      </form>
    </div>
  )
}