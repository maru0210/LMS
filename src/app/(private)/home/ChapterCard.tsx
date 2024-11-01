import {getChapters} from "@/app/lib/microCMS/microcms";
import Link from "next/link";
import {createClient} from "@/app/utils/supabase/server";

export default async function ChapterCard(
  {chapterNumber}: { chapterNumber: number }
) {
  const chapter = (await getChapters({
    filters: `number[equals]${chapterNumber}`,
  })).contents.at(0)

  if (!chapter) return <></>

  const supabase = await createClient()
  const {data: contents} = await supabase.from("contents").select().eq("chapter", chapterNumber).order("section");

  if (!contents || contents.length === 0) return <></>

  return (
    <div className="w-full md:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-2rem*2)/3)] rounded-lg p-4 shadow">
      <p className="mb-2">
        {`${chapter.number}章 ${chapter.title}`}
      </p>

      <div className="flex flex-col gap-1 text-sm">
        {contents.map(content => (
          <Link href={`/contents/${chapter.id}/${content.id}`} className="px-1" key={content.id}>
            {`${content.section}. ${content.title}`}
          </Link>
        ))}
      </div>
    </div>
  )
}