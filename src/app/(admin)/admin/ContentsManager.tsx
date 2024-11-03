"use client"

import {useState} from "react";
import {deleteDbContents, getDbContents, insertDbContents} from "@/app/(admin)/admin/manageContents";

export type TableContent = {
  id: string
  chapter: number
  chapterId: string
  section: number
  title: string
}

function Table(
  {contents, action, actionLabel}: { contents: TableContent[], action: (content: TableContent) => void, actionLabel: string },
) {
  return (
    <div className="rounded-lg p-4 shadow">
      <table className="w-full">
        <thead>
        <tr className="border-b-2">
          {/*<th>ID</th>*/}
          <th>チャプター</th>
          <th>セクション</th>
          <th>タイトル</th>
          <th>操作</th>
        </tr>
        </thead>

        <tbody>
        {contents.map(content => (
          <tr key={content.id}>
            {/*<td>{content.id}</td>*/}
            <td>{content.chapter}</td>
            <td>{content.section}</td>
            <td>{content.title}</td>
            <td className="flex justify-center">
              <button onClick={() => action(content)}>
                {actionLabel}
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ContentsManager(
  {defaultDbContents, defaultCmsContents}: { defaultDbContents: TableContent[], defaultCmsContents: TableContent[] }
) {
  const [_dbContents, _setDbContents] = useState<TableContent[]>(defaultDbContents)
  const [_cmsContents, _setCmsContents] = useState<TableContent[]>(
    defaultCmsContents.filter(cmsContent => (
      !defaultDbContents.find(dbContent => dbContent.id === cmsContent.id)
    ))
  )

  const dbContents = {
    contents: _dbContents,
    update: () => {
      getDbContents().then((contents) => {
        _setDbContents(contents)
        // CMSコンテンツを同時に更新
        cmsContents.set(defaultCmsContents.filter(cmsContent => (
          !contents.find(dbContent => dbContent.id === cmsContent.id)
        )))
      })
    },
    add: (content: TableContent) => {
      insertDbContents(content).then()
      dbContents.update()
    },
    delete: (content: TableContent) => {
      deleteDbContents(content).then()
      dbContents.update()
    }
  }

  const cmsContents = {
    contents: _cmsContents,
    set: _setCmsContents,
  }

  return (
    <div>
      <h2 className="mb-4 text-xl">学習コンテンツの登録</h2>

      {/*<button className="mb-8" onClick={dbContents.update}>DB更新</button>*/}

      <div className="flex gap-8">
        <div className="flex-1">
          <h2 className="mb-2 text-center">登録済み</h2>
          <Table
            contents={dbContents.contents}
            action={dbContents.delete}
            actionLabel={"削除"}
          />
        </div>

        <div className="flex-1">
          <h2 className="mb-2 text-center">未登録</h2>
          <Table
            contents={cmsContents.contents}
            action={dbContents.add}
            actionLabel={"追加"}
          />
        </div>
      </div>

    </div>
  )
}