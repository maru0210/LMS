import LoginForm from "@/app/(auth)/login/LoginForm";
import {checkSession} from "@/lib/supabase/auth";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "ログイン｜手軽にアルゴル"
}

export default async function LoginPage() {
  await checkSession()

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:flex-1 xl:flex-[2] pt-8 md:p-0">
        <div className="flex flex-col justify-center items-center size-full">
          <div className="space-y-2">
            <p className="text-lg">学習管理システム</p>
            <p className="text-4xl">手軽にアルゴる</p>
          </div>
        </div>
      </div>

      <div className="md:flex-1">
        <div className="size-full md:p-16 md:pl-0">
          <div className="size-full rounded-2xl md:shadow-2xl overflow-auto">
            <LoginForm/>
          </div>
        </div>
      </div>
    </div>
  )
}