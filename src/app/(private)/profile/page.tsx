import Navigation from "@/app/(private)/components/Navigation";
import {logout} from "@/app/lib/supabase/auth";
import getServerClient from "@/app/lib/supabase/getServerClient";

export default async function Profile() {
  const {supabase} = await getServerClient()

  return (
    <Navigation>
      <div className="flex flex-col">
        <div>
          <button onClick={logout}>ログアウト</button>
        </div>
      </div>
    </Navigation>
  )
}