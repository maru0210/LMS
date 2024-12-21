import ChapterCard from "@/app/(student)/home/ChapterCard";
import Navigation from "@/components/Navigation";
import {getChapters, getContents} from "@/lib/microCMS/microcms";
import {verifyUserStatus} from "@/lib/supabase/auth";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "学習コンテンツ"
}

export default async function Page() {
  await verifyUserStatus("student")

  const {contents: chapters} = await getChapters();
  const {contents: contents} = await getContents({orders: "section"});

  return (
    <Navigation>
      <div className="flex flex-col gap-8">
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
