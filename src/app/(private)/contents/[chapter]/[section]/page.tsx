import {getDetail, getList} from "@/app/lib/microCMS/microcms";
import {notFound} from "next/navigation";

export async function generateStaticParams() {
  const {contents} = await getList()

  return contents.map((content) => ({
    chapter: content.chapter.id,
    id: content.id,
  }))
}

export default async function DetailPage(
  {params: {postId}}: {params: {postId: string}}
) {
  const post = await getDetail(postId)

  if(!post) {
    notFound()
  }

  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  )
}