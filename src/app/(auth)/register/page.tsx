import RegisterForm from "@/app/(auth)/register/RegisterFrom";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "新規登録"
}

export default async function Page() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:flex-1 xl:flex-[2] pt-8 md:p-0">
        <div className="flex flex-col justify-center items-center size-full">
          <div className="flex flex-col gap-2">
            <p className="text-lg">学習管理システム</p>
            <p className="text-4xl">手軽にアルゴる</p>
          </div>
        </div>
      </div>

      <div className="md:flex-1">
        <div className="size-full md:p-16 md:pl-0">
          <div className="size-full rounded-2xl md:shadow-2xl overflow-auto">
            <RegisterForm/>
          </div>
        </div>
      </div>
    </div>
  )
}
