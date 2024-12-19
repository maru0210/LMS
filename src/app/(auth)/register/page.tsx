import {BackGround} from "@/app/(auth)/components/BackGround";
import RegisterForm from "@/app/(auth)/register/RegisterFrom";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "新規登録"
}

export default function Page() {
  return (
    <BackGround>
      <RegisterForm/>
    </BackGround>
  )
}
