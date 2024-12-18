import Navigation from "@/app/components/Navigation";
import {checkStatus} from "@/app/lib/supabase/auth";
import {getDetail} from "@/app/lib/microCMS/microcms";
import {Metadata} from "next";

export async function generateMetadata(
  {params}: {params: Promise<{chapter: string, section: string}> }
): Promise<Metadata> {
  const {section} = await params
  const post = await getDetail(section, {fields: "title"})
  console.log(post)

  return {
    title: post.title,
  }
}

export default async function DetailPage(
  {params}: { params: Promise<{ chapter: string, section: string }> }
) {
  await checkStatus("student");

  const {section} = await params;
  const post = await getDetail(section);

  return (
    <Navigation>
      <div className="flex flex-col gap-8 max-w-3xl mx-auto">
        <h1 className="rounded-lg p-4 text-2xl bg-lime-50">
          {`${post.chapter.number}章 ${post.chapter.title}`}
        </h1>
        <h2 className="text-xl p-2 border-b-8 border-lime-200">{`${post.section}. ${post.title}`}</h2>
        <div
          dangerouslySetInnerHTML={{__html: post.content}}
          className="flex flex-col gap-4 [&>*:first-child]:m-0 [&>:is(h1,h2,h3)]:mt-4 [&>h1]:text-xl [&>h1]:font-bold"
        />
      </div>
    </Navigation>
  )
}