import {Chapter, getList} from "@/app/lib/microCMS/microcms";
import Link from "next/link";

export default async function ChapterCard(
  {chapter}: { chapter: Chapter }
) {
  const {contents} = await getList({
    fields: "id,chapter,section,title",
    filters: `chapter[equals]${chapter.id}`,
    orders: "section"
  });

  if (contents.length === 0) return <></>

  return (
    <div className="w-full md:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-2rem*2)/3)] rounded-lg p-4 shadow">
      <p className="mb-2">
        {`${chapter.number}章 ${chapter.title}`}
      </p>

      <div className="flex flex-col gap-1 text-sm">
        {contents.map(content => (
          <Link href={"#"} className="px-1" key={content.id}>
            {`${content.section}. ${content.title}`}
          </Link>
        ))}
      </div>
    </div>
  )
}