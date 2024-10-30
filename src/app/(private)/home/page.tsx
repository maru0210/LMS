import {logout} from "@/app/lib/supabase/auth";
import Navigation from "@/app/(private)/components/Navigation";
import getServerClient from "@/app/lib/supabase/getServerClient";
import {getChapters, getList} from "@/app/lib/microCMS/microcms";
import Profile from "@/app/(private)/profile/page";
import ChapterCard from "@/app/(private)/home/ChapterCard";

export default async function Home() {
  const {supabase} = await getServerClient()

  const profile = await supabase.from('profiles').select()
  const name = profile.data?.at(0).name as string;

  const {contents: chapters} = await getChapters({orders: "number"});

  return (
    <Navigation>
      <div className="size-full">
        <div className="flex flex-col gap-8">
          <div>
            <div className="w-full rounded-lg p-4 space-y-2 border-0 border-lime-100 bg-lime-50 shadow">
              <p className="">最後に学習したコンテンツ</p>
              <p className="text-sm">ここに最後に学習したコンテンツが入ります</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-8">
            {chapters.map(chapter => (
              <ChapterCard chapter={chapter} key={chapter.id}/>
            ))}

            {chapters.map(chapter => (
              <ChapterCard chapter={chapter} key={chapter.id}/>
            ))}
          </div>
        </div>
      </div>
      <button onClick={logout}>ログアウト</button>
    </Navigation>
  )
}