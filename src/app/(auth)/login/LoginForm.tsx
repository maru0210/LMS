"use client"

import {FormInput} from "@/app/(auth)/components/FormInput";
import loginHandler from "@/app/(auth)/login/loginHandler";
import {useActionState} from "react"

export default function LoginForm() {
  const [state, dispatch, isPending] = useActionState(loginHandler, null)

  return (
    <div className="flex flex-col justify-center w-full p-16 gap-12 text-gray-900">
      <p className="text-2xl font-bold">ログイン</p>

      <form action={dispatch} className="flex flex-col gap-8 mx-0.5">
        {!isPending && state && (
          <div className="px-4 py-2.5 rounded-lg border-2 border-red-300 bg-red-50 shadow-sm">
            <p>{state}</p>
          </div>
        )}

        <FormInput label={"メールアドレス"} id={"email"} type={"email"} autoComplete={"email"}/>
        <FormInput label={"パスワード"} id={"password"} type={"password"} autoComplete={"current-password"}/>

        <div className="mx-auto">
          <button className="px-4 py-2 rounded-full bg-blue-600 text-white">ログイン</button>
        </div>

        {/*<Button text={"ログイン"} disabled={isPending} className={""}/>*/}

        {/*<div className="h-0.5 bg-gray-200"/>*/}

        {/*<div className="space-y-2">*/}
        {/*  <p className="mt-8 text-end">まだ登録がお済みでない方</p>*/}
        {/*  /!*<LinkButton text={"新規登録"} link={"/register"} className={"bg-lime-300"}/>*!/*/}
        {/*</div>*/}
      </form>

      <p className="pt-4 text-neutral-600">まだ登録をしていない方</p>
    </div>
  )
}