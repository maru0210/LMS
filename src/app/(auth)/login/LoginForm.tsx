"use client";

import { login } from "@/app/(auth)/actions";
import { FormInput } from "@/app/(auth)/components/FormInput";
import { useActionStateWithNotice } from "@/components/notice/hooks";
import { useNotice } from "@/components/notice/Notice";
import { Button } from "@/components/parts/Button";
import Link from "next/link";
import { useEffect } from "react";

export default function LoginForm() {
  const { notify } = useNotice();

  const [state, handleSubmit, isPending] = useActionStateWithNotice(
    login,
    null,
    { processing: "認証中..." },
  );
  useEffect(() => {
    if (!isPending && state) notify("warning", state);
  }, [isPending, notify, state]);

  return (
    <div className="flex w-full flex-col justify-center gap-12 p-12 text-gray-900">
      <p className="text-2xl font-bold">ログイン</p>

      <form action={handleSubmit} className="mx-0.5 flex flex-col gap-8">
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
          <Button
            text={"ログイン"}
            className={"bg-blue-600 text-white"}
            disabled={isPending}
          />
        </div>
      </form>

      <Link
        className="text-neutral-500 underline transition hover:text-neutral-700"
        href={"/register"}
      >
        登録をしていない方
      </Link>
    </div>
  );
}
