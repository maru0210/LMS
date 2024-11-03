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
      <h2 className="mb-4 text-xl">チャプター管理</h2>
      {/*<button onClick={updateDbChapters}>データベース更新</button>*/}

      <div className="flex gap-4">
        <div className="flex-1">
          <p className="mb-2 text-center">DBのチャプター</p>
          <ul className="flex flex-col gap-1 rounded-lg p-4 shadow">
            {dbChapters.map(chapter => (
              <li key={chapter.id}>
                {`${chapter.number}. ${chapter.title} [${chapter.id}]`}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center">
          <button className="rounded-lg p-2 bg-gray-50 shadow" onClick={onClickHandler}>
            ⇐<br/>反映<br/>⇐
          </button>
        </div>

        <div className="flex-1">
          <p className="mb-2 text-center">CMSのチャプター</p>
          <ul className="flex flex-col gap-1 rounded-lg p-4 shadow">
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