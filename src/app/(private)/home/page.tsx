// import {logout} from "@/app/lib/supabase/auth";
import Navigation from "@/app/(private)/components/Navigation";
import getServerClient from "@/app/lib/supabase/getServerClient";

export default async function Home() {
  const {supabase, user} = await getServerClient()

  const profile = await supabase.from('profiles').select()
  const name = profile.data?.at(0).name as string;

  return (
    <Navigation>
      <div>
        <div className="w-full rounded-lg px-4 py-2.5 border-2 border-orange-100 bg-orange-50">
          <p className="text-lg">最後に学習したもの</p>
          <p className="mx-2.5 my-1">2-10 アルゴリズムとデータ構造</p>
        </div>
      </div>
      <p>{name}:{user.email}</p>
      {/*<button onClick={logout}>ログアウト</button>*/}
    </Navigation>
  )
}