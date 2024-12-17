import Link from "next/link";
import {Content} from "@/app/lib/microCMS/microcms";

export default async function ChapterCard(
  {contents}: {contents: Content[]},
) {
  return (
    <div className="w-full md:w-[calc((100%-2rem)/2)] xl:w-[calc((100%-2rem*2)/3)] rounded-lg p-4 shadow">
      <p className="mb-2">
        {`${contents[0].chapter.number}章 ${contents[0].chapter.title}`}
      </p>

      <div className="flex flex-col gap-1 text-sm">
        {contents.map(content => (
          <Link href={`/contents/${content.chapter.id}/${content.id}`} className="px-1" key={content.id}>
            {`${content.section}. ${content.title}`}
          </Link>
        ))}
      </div>
    </div>
  )
}