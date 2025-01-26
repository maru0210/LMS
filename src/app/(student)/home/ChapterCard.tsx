import { Chapter, getContents } from "@/lib/microCMS/microcms";
import { toZenkaku } from "@/lib/utils";
import Link from "next/link";

export default async function ChapterCard({ chapter }: { chapter: Chapter }) {
  const { contents, totalCount } = await getContents({
    filters: "chapter[equals]" + chapter.id,
  });

  return (
    <div className="w-full rounded-lg p-4 shadow md:w-[calc((100%-2rem)/2)] xl:w-[calc((100%-2rem*2)/3)]">
      <p className="mb-2">
        {`${toZenkaku(chapter.number)}章 ${chapter.title}`}
      </p>

      <div className="flex flex-col gap-1 text-sm">
        {totalCount > 0 ? (
          contents.map((content, index) => (
            <Link
              href={`/contents/${content.chapter.slug}/${content.slug}`}
              className="px-1"
              key={content.id}
            >
              {`${toZenkaku(index + 1)}. ${content.title}`}
            </Link>
          ))
        ) : (
          <p className={"text-center"}>コンテンツがありません。</p>
        )}
      </div>
    </div>
  );
}
