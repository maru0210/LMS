import {auth} from "@/app/lib/supabase/auth";
import Navigation from "@/app/components/Navigation";
import ChapterCard from "@/app/(private)/home/ChapterCard";
import {createClient} from "@/app/utils/supabase/server";

export default async function Home() {
  await auth()

  const supabase = await createClient()

  // const profile = await supabase.from('profiles').select()
  // const name = profile.data?.at(0).name as string;

  const {data: contents} = await supabase.from("contents").select().order("chapter")

  const chapters = Array.from(
    new Map(contents?.map((content) => [content.chapter, content.chapter_id])).values()
  );

  return (
    <Navigation>
      <div className="flex flex-col gap-8">
        <div>
          <div className="w-full rounded-lg p-4 space-y-2 border-0 border-lime-100 bg-lime-50 shadow">
            <p className="">前回の続き</p>
            <p className="text-sm">ここに最後に学習したコンテンツが入ります</p>
          </div>
        </div>

        <h1 className="text-lg">学習コンテンツ</h1>

        <div className="flex flex-wrap gap-8">
          {chapters.map(chapter => (
            <ChapterCard chapterId={chapter} key={chapter}/>
          ))}

          {chapters.map(chapter => (
            <ChapterCard chapterId={chapter} key={chapter}/>
          ))}
        </div>
      </div>
    </Navigation>
  )
}