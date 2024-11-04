import Navigation from "@/app/components/Navigation";
import {checkStatus, logout} from "@/app/lib/supabase/auth";

import ContentsManager from "@/app/(admin)/admin/ContentsManager";
import SectionManager from "@/app/(admin)/admin/SectionManager";
import {getCmsContents, getDbContents} from "@/app/(admin)/admin/manageContents";

export default async function Admin() {
  await checkStatus("administer")

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