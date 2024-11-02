import Navigation from "@/app/components/Navigation";
import {authAdmin, logout} from "@/app/lib/supabase/auth";
import ContentsManager from "@/app/(admin)/admin/ContentsManager";
import {getCmsContents, getDbContents} from "@/app/(admin)/admin/manageContents";
import SectionManager from "@/app/(admin)/admin/SectionManager";

export default async function Admin() {
  await authAdmin()

  return (
    <Navigation>
      <div className="flex flex-col gap-16">
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