import Link from "next/link";
import {createClient} from "@/app/utils/supabase/server";

export default async function ChapterCard(
  {chapterId}: { chapterId: string }
) {
  const supabase = await createClient()
  const {data: contents} = await supabase.from("contents").select().eq("chapter_id", chapterId).order("section");

  if(!contents) return <></>

  return (
    <div className="w-full md:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-2rem*2)/3)] rounded-lg p-4 shadow">
      <p className="mb-2">
        {`${contents.at(0)?.chapter}章 ${contents.at(0)?.title}`}
      </p>

      <div className="flex flex-col gap-1 text-sm">
        {contents.map(content => (
          <Link href={`/contents/${content.chapter_id}/${content.id}`} className="px-1" key={content.id}>
            {`${content.section}. ${content.title}`}
          </Link>
        ))}
      </div>
    </div>
  )
}