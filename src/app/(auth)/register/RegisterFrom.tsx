"use client";

import { register } from "@/app/(auth)/actions";
import { FormInput } from "@/app/(auth)/components/FormInput";
import { Button } from "@/components/parts/Button";
import { useNotice } from "@/components/notice/Notice";
import Link from "next/link";
import { useActionState, useEffect } from "react";

export default function RegisterForm() {
  const { notify } = useNotice();
  const [state, handleSubmit, isPending] = useActionState(register, null);

  useEffect(() => {
    if (!isPending && state) {
      notify("warning", state);
    }
  }, [state, isPending, notify]);

  return (
    <div className="flex w-full flex-col justify-center gap-12 p-12 text-gray-900">
      <p className="text-2xl font-bold">新規登録</p>

      <form action={handleSubmit} className="mx-0.5 flex flex-col gap-8">
        <FormInput label={"学籍番号"} id={"student_id"}/>
        <FormInput label={"氏名"} id={"name"}/>
        <FormInput
          label={"メールアドレス"}
          id={"email"}
          type={"email"}
          autoComplete={"email"}
        />
        <FormInput
          label={"パスワード"}
          id={"password"}
          type={"password"}
          autoComplete={"current-password"}
        />

        <div className="mx-auto">
          <Button text={"新規登録"} className={"bg-blue-600 text-white"} />
        </div>
      </form>

      <Link
        className="text-neutral-500 underline transition hover:text-neutral-700"
        href={"/login"}
      >
        すでに登録済みの方
      </Link>
    </div>
  );
}
