import { BackGround } from "@/app/(auth)/components/BackGround";
import RegisterForm from "@/app/(auth)/register/RegisterFrom";
import { redirectUserRoot } from "@/lib/supabase/auth";
import { existsCurrentUser } from "@/lib/supabase/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "新規登録",
};

export default async function Page() {
  if (await existsCurrentUser()) await redirectUserRoot();

  return (
    <BackGround>
      <RegisterForm />
    </BackGround>
  );
}
