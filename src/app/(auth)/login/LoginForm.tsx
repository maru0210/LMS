"use client"

import {login} from "@/app/(auth)/actions";
import {FormInput} from "@/app/(auth)/components/FormInput";
import {Button} from "@/components/parts/Button";
import Link from "next/link";
import {useActionState, useEffect} from "react"

export default function LoginForm() {
  const [state, handleSubmit, isPending] = useActionState(login, null)

  useEffect(() => {
    if (!isPending && state) {
      console.log(state);
    }
  }, [state, isPending])

  return (
    <div className="flex flex-col justify-center w-full p-12 gap-12 text-gray-900">
      <p className="text-2xl font-bold">ログイン</p>

      <form action={handleSubmit} className="flex flex-col gap-8 mx-0.5">
        {/*<div className="px-4 py-2.5 rounded-lg border-2 border-red-300 bg-red-50 shadow-sm">*/}
        {/*  <p>{state}</p>*/}
        {/*</div>*/}

        <FormInput label={"メールアドレス"} id={"email"} type={"email"} autoComplete={"email"}/>
        <FormInput label={"パスワード"} id={"password"} type={"password"} autoComplete={"current-password"}/>

        <div className="mx-auto">
          <Button text={"ログイン"} className={"bg-blue-600 text-white"}/>
        </div>
      </form>

      <Link className="underline text-neutral-500 hover:text-neutral-700 transition"
            href={"/register"}>
        登録をしていない方
      </Link>
    </div>
  )
}