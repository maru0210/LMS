import {createClient} from "@/app/utils/supabase/server";
import {redirect} from "next/navigation";
import RegisterForm from "@/app/(auth)/register/RegisterFrom";

export default async function RegisterPage() {
  const supabase = await createClient()

  const {data} = await supabase.auth.getUser()
  if (data?.user) {
    redirect('/home');
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:flex-1 xl:flex-[2] pt-8 md:p-0">
        <div className="flex justify-center items-center size-full text-2xl">
          <p>学習管理システム</p>
        </div>
      </div>

      <div className="md:flex-1">
        <div className="size-full md:p-16 md:pl-0">
          <div className="size-full rounded-2xl md:shadow-2xl overflow-auto">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
}