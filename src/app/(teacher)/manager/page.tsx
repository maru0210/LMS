import Navigation from "@/app/components/Navigation";
import {checkStatus, logout} from "@/app/lib/supabase/auth";

import ContentsManager from "@/app/(teacher)/manager/ContentsManager";
import SectionManager from "@/app/(teacher)/manager/SectionManager";
import {getCmsContents, getDbContents} from "@/app/(teacher)/manager/manageContents";

export default async function Admin() {
  await checkStatus("teacher")

  return (
    <Navigation>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl">コンテンツ管理</h1>

        <ContentsManager
          defaultDbContents={await getDbContents()}
          defaultCmsContents={await getCmsContents()}
        />

        <SectionManager/>

        <div>
          <button onClick={logout}>ログアウト</button>
        </div>
      </div>
    </Navigation>
  )
}