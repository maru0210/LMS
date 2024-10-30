import {getDetail, getContents} from "@/app/lib/microCMS/microcms";
import Navigation from "@/app/(private)/components/Navigation";

export async function generateStaticParams() {
  const {contents} = await getContents()

  return contents.map(content => ({
    chapter: content.chapter.id,
    section: content.id,
  }))
}

export default async function DetailPage(
  props: { params: Promise<{ chapter: string, section: string }> }
) {
  const {section} = await props.params;

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

        <div className="border-b-4 border-lime-200 border-dashed" />

        <div>
          <h1>確認テスト</h1>
          <div>
            {post.questions.map((question, i) => (
              <div key={i}>
                <p>{question.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Navigation>
  )
}