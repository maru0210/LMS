import Navigation from "@/components/Navigation";
import {getContents} from "@/lib/microCMS/microcms";
import {verifyUserStatus} from "@/lib/supabase/auth";
import {toZenkaku} from "@/lib/utils";
import {notFound} from "next/navigation";

export default async function Page(
  {params}: { params: Promise<{ chapterSlug: string, contentSlug: string }> }
) {
  await verifyUserStatus("student");

  const {contentSlug} = await params;
  const {contents, totalCount} = await getContents({filters: "slug[equals]" + contentSlug});

  if (totalCount === 0) notFound();

  const post = contents[0];

  return (
    <Navigation>
      <div className="max-w-3xl mx-auto">
        <p className={"mb-2 text-sm text-neutral-700"}>{`${toZenkaku(post.chapter.number)}章 ${post.chapter.title} /`}</p>
        <h2 className="mb-8 text-xl px-2 py-1.5 border-b-8 border-b-blue-300">{`${toZenkaku(post.number)}. ${post.title}`}</h2>
        <div
          dangerouslySetInnerHTML={{__html: post.content}}
          className="flex flex-col gap-4 [&>*:first-child]:m-0 [&>:is(h1,h2,h3)]:mt-4 [&>h1]:text-xl [&>h1]:font-bold"
        />
      </div>
    </Navigation>
  );
}