"use client"

import {useEffect, useState} from "react";
import {Chapter, getCmsChapter, getDbChapters, reflectionDbChapters} from "@/app/(admin)/admin/manageChapters";

export default function SectionManager() {
  const [dbChapters, setDbChapters] = useState<Chapter[]>([]);
  const [cmsChapters, setCmsChapters] = useState<Chapter[]>([]);

  const updateDbChapters = () => {
    getDbChapters().then((chapters) => {
      setDbChapters(chapters);
    })
  }

  useEffect(() => {
    updateDbChapters();

    getCmsChapter().then(chapters => {
      setCmsChapters(chapters);
    });
  }, [])

  function onClickHandler() {
    reflectionDbChapters(cmsChapters).then(() => {
      updateDbChapters();
    });
  }

  return (
    <div>
      <button onClick={onClickHandler}>データベースに反映</button>
      <button onClick={updateDbChapters}>データベース更新</button>
      <div className="flex gap-8 [&>*]:flex-1">
        <div>
          <p className="mb-4">DBのチャプター</p>
          <ul className="flex flex-col gap-1">
            {dbChapters.map(chapter => (
              <li key={chapter.id}>
                {`${chapter.number}. ${chapter.title} [${chapter.id}]`}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4">CMSのチャプター</p>
          <ul className="flex flex-col gap-1">
            {cmsChapters.map(chapter => (
              <li key={chapter.id}>
                {`${chapter.number}. ${chapter.title} [${chapter.id}]`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}