import { BackGround } from "@/app/(auth)/components/BackGround";
import LoginForm from "@/app/(auth)/login/LoginForm";
import { redirectUserRoot } from "@/lib/supabase/auth";
import { existsCurrentUser } from "@/lib/supabase/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ログイン",
};

export default async function Page() {
  if (await existsCurrentUser()) await redirectUserRoot();

  return (
    <BackGround>
      <LoginForm />
    </BackGround>
  );
}
