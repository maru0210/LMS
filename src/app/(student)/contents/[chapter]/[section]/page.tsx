import {notFound} from "next/navigation";
import {createClient} from "@/app/utils/supabase/server";
import Navigation from "@/app/components/Navigation";
import {checkStatus} from "@/app/lib/supabase/auth";
import {getDetail} from "@/app/lib/microCMS/microcms";

export default async function DetailPage(
  props: { params: Promise<{ chapter: string, section: string }> }
) {
  await checkStatus("student");

  const {chapter, section} = await props.params;

  const supabase = await createClient()
  const {data} = await supabase.from("contents").select().eq("id", section);
  // 未登録のコンテンツはnotFound
  if(!data || !data?.length) notFound()

  const post = await getDetail(section);
  // チャプターのidが違ったらnotFound
  if(post.chapter.id !== chapter) notFound()

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

        <div className="border-b-4 border-lime-200 border-dashed" />

        <div className="p-4 shadow">
          <h1 className="mb-4 border-b-2 pb-1 border-gray-200 text-xl">確認テスト</h1>
          <div>
            {post.questions && post.questions.map((question, i) => (
              <div key={i}>
                <p><span className="pr-0.5">問</span>{i+1}</p>
                <p>{question.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Navigation>
  )
}