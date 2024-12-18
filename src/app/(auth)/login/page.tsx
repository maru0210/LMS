import {BackGround} from "@/app/(auth)/components/BackGround";
import LoginForm from "@/app/(auth)/login/LoginForm";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "ログイン"
}

export default function Page() {
  return (
    <BackGround>
      <LoginForm/>
    </BackGround>
  )
}