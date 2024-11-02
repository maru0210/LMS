"use server"

import {createClient} from "@/app/utils/supabase/server";
import {getContents} from "@/app/lib/microCMS/microcms";
import {TableContent} from "@/app/(admin)/admin/ContentsManager";

export async function getDbContents() {
  const supabase = await createClient()
  const {data: contents} = await supabase.from("contents").select().order("chapter").order("section")

  if (!contents) return [];

  return contents.map<TableContent>(content => ({
    id: content.id,
    chapter: content.chapter,
    chapterId: content.chapter_id,
    section: content.section,
    title: content.title
  }))
}

export async function insertDbContents(content: TableContent) {
  const supabase = await createClient()
  await supabase.from("contents").insert({
    id: content.id,
    chapter: content.chapter,
    chapter_id: content.chapterId,
    section: content.section,
    title: content.title
  })
}

export async function deleteDbContents(content: TableContent) {
  const supabase = await createClient()
  await supabase.from("contents").delete().eq("id", content.id)
}

export async function getCmsContents() {
  const {contents} = await getContents()
  contents.sort((a, b) => {
    if (a.chapter.id === b.chapter.id) return a.section - b.section;
    return a.chapter.number - b.chapter.number;
  })

  return contents.map<TableContent>(content => ({
    id: content.id,
    chapter: content.chapter.number,
    chapterId: content.chapter.id,
    section: content.section,
    title: content.title
  }))
}