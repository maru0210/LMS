import Navigation from "@/app/components/Navigation";
import {checkStatus, logout} from "@/app/lib/supabase/auth";
import {getAuthUser} from "@/app/lib/supabase/actions";
import ProfileForm from "@/app/(student)/profile/ProfileForm";

export default async function Profile() {
  await checkStatus("student")

  const authUser = await getAuthUser()
  console.log(authUser)

  return (
    <Navigation>
      <div className="flex flex-col">
        <h1 className="mb-4 text-lg">プロフィールの変更</h1>
        <ProfileForm defaultAuthUser={authUser}/>
      </div>
    </Navigation>
  )
}