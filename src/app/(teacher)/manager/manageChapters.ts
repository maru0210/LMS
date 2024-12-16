"use server"

import {createClient} from "@/app/utils/supabase/server";
import {getChapters} from "@/app/lib/microCMS/microcms";

export type Chapter = {
  id: string;
  number: number;
  title: string;
}

export async function getDbChapters() {
  const supabase = await createClient()
  const {data: _dbChapters} = await supabase.from("chapters").select().order("number")

  if (!_dbChapters) return []
  return _dbChapters.map(chapter => {
    return {
      id: chapter.id,
      number: chapter.number,
      title: chapter.title,
    } as Chapter;
  })
}

export async function reflectionDbChapters(chapters: Chapter[]) {
  const supabase = await createClient()
  // const {data: _dbChapters} = await supabase.from("chapters").select().order("number")

  chapters.map(async (chapter) => {
    const {data: _dbChapter} = await supabase.from("chapters").select().eq("number", chapter.number)
    if(_dbChapter && _dbChapter.length > 0){
      if(_dbChapter[0].id !== chapter.id || _dbChapter[0].title !== chapter.title) {
        await supabase.from("chapters").update({
          id: chapter.id,
          title: chapter.title
        }).eq("number", chapter.number)
      }
    } else {
      await supabase.from("chapters").insert({
        id: chapter.id,
        number: chapter.number,
        title: chapter.title
      })
    }
  })
}

export async function getCmsChapter() {
  const {contents: _cmsChapters} = await getChapters()
  return _cmsChapters.map(chapter => {
    return {
      id: chapter.id,
      number: chapter.number,
      title: chapter.title,
    } as Chapter;
  })
}
