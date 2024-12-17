"use client"

import {useActionState} from "react"
import Link from "next/link";
import loginHandler from "@/app/(public)/login/loginHandler";
import Input from "@/app/(public)/components/Input";
import Button from "@/app/(public)/components/Button";
import LinkButton from "@/app/(public)/components/LinkButton";

export default function LoginForm() {
  const [state, dispatch, isPending] = useActionState(loginHandler, null)

  return (
    <div className="flex flex-col max-w-md h-full mx-auto px-8 text-gray-900">
      <div className="flex-1 flex items-center justify-center">
        <p className="py-12 text-2xl font-bold">ログイン</p>
      </div>

      <form action={dispatch} className="flex-[3] flex flex-col gap-8 pb-8">
        {!isPending && state && (
          <div className="px-4 py-2.5 rounded-lg border-2 border-red-300 bg-red-50 shadow-sm">
            <p>{state}</p>
          </div>
        )}

        <Input label={"メールアドレス"} id={"email"} autoComplete={"email"}/>

        <Input label={"パスワード"} id={"password"} autoComplete={"current-password"} keepValue={false}/>

        <Button text={"ログイン"} disabled={isPending} className={"bg-lime-600 text-white"}/>

        <div className="h-0.5 bg-gray-200"/>

        <div className="space-y-2">
          <p className="ml-0.5">まだ登録がお済みでない方</p>
          <LinkButton text={"新規登録"} link={"/register"} className={"bg-lime-300"}/>
        </div>
      </form>
    </div>
  )
}