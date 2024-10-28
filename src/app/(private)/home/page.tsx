// import {logout} from "@/app/lib/supabase/auth";
import Navigation from "@/app/(private)/components/Navigation";
// import getServerClient from "@/app/lib/supabase/getServerClient";
import {getChapters, getList} from "@/app/lib/microCMS/microcms";

export default async function Home() {
  // const {supabase} = await getServerClient()

  // const profile = await supabase.from('profiles').select()
  // const name = profile.data?.at(0).name as string;

  const chapters = await getChapters({orders: "number"});
  const list = await getList({orders: "section"});

  return (
    <Navigation>
      <div>
        <div className="w-full rounded-lg px-4 py-2.5 space-y-2 border-2 border-orange-100 bg-orange-50">
          <p className="text-lg">最後に学習したコンテンツ</p>
          <p className="">2-10 アルゴリズムとデータ構造</p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {chapters.contents.map((chapter, index) => (
          <div key={index}>
            <p>{chapter.number + "章 " + chapter.title}</p>
            {list.contents.filter(
              item => item.chapter.number === chapter.number
            ).map((item, index) => (
              <div key={index}>
                {item.chapter.number + "-" + item.section + ": " + item.title}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/*<button onClick={logout}>ログアウト</button>*/}
    </Navigation>
  )
}