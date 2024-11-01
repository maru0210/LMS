import Navigation from "@/app/components/Navigation";
import {auth, logout} from "@/app/lib/supabase/auth";

export default async function Profile() {
  await auth()

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