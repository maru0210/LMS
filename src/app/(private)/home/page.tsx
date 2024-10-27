import {createClient} from "@/app/utils/supabase/server";
import {redirect} from "next/navigation";
import {logout} from "@/app/lib/supabase/auth";
import Navigation from "@/app/(private)/home/Navigation";

export default async function Dashboard() {
  const supabase = await createClient()

  const {data, error} = await supabase.auth.getUser()
  if(error || !data?.user) {
    redirect('/login')
  }

  const profile = await supabase.from('profile').select()
  console.log(profile.data?.at(0))

  const name = profile.data?.at(0).name as string;

  return (
    <Navigation>
      <h1>Dashboard</h1>
      <p>{name}:{data.user.email}</p>
      <button onClick={logout}>ログアウト</button>
    </Navigation>
  )
}