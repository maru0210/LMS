import Navigation from "@/app/components/Navigation";
import ChapterCard from "@/app/(student)/home/ChapterCard";
import {checkStatus} from "@/lib/supabase/auth";
import {Metadata} from "next";
import {getChapters, getContents} from "@/lib/microCMS/microcms";

export const metadata: Metadata = {
  title: "学習コンテンツ"
}

export default async function Home() {
  await checkStatus("student");

  const {contents: chapters} = await getChapters();
  const {contents: contents} = await getContents({orders: "section"});

  return (
    <Navigation>
      <div className="flex flex-col gap-8">
        {/*<div>*/}
        {/*  <div className="w-full rounded-lg p-4 space-y-2 border-0 border-lime-100 bg-lime-50 shadow">*/}
        {/*    <p className="">前回の続き</p>*/}
        {/*    <p className="text-sm">ここに最後に学習したコンテンツが入ります</p>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <h1 className="text-lg">学習コンテンツ</h1>

        <div className="flex flex-wrap gap-8">
          {chapters.map(chapter => (
            <ChapterCard
              contents={
                contents.filter(value => value.chapter.id === chapter.id)
              }
              key={chapter.id}/>
          ))}
        </div>
      </div>
    </Navigation>
  )
}