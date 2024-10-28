// import {logout} from "@/app/lib/supabase/auth";
import Navigation from "@/app/(private)/components/Navigation";
import getServerClient from "@/app/lib/supabase/getServerClient";
import {getList} from "@/app/lib/microCMS/microcms";

export default async function Home() {
  const {supabase, user} = await getServerClient()

  const profile = await supabase.from('profiles').select()
  const name = profile.data?.at(0).name as string;

  const list = await getList();

  return (
    <Navigation>
      <div>
        <div className="w-full rounded-lg px-4 py-2.5 space-y-2 border-2 border-orange-100 bg-orange-50">
          <p className="text-lg">最後に学習したコンテンツ</p>
          <p className="">2-10 アルゴリズムとデータ構造</p>
        </div>
      </div>

      <div>
        {list.contents.map((item, index) => (
          <div>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      {/*<button onClick={logout}>ログアウト</button>*/}
    </Navigation>
  )
}