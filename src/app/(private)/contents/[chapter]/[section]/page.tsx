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
  const {chapter, section} = await props.params;

  const post = await getDetail(section);

  return (
    <Navigation>
      <div>
        <h1>{chapter + "-" + section + ":"}</h1>
        <div dangerouslySetInnerHTML={{__html: post.content}}/>
        <p>あいうえお</p>
      </div>
    </Navigation>
  )
}