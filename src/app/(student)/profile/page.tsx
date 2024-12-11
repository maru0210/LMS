import Navigation from "@/app/components/Navigation";
import {checkStatus} from "@/app/lib/supabase/auth";
import {getProfile, getUser} from "@/app/lib/supabase/actions";
import ProfileForm from "@/app/(student)/profile/ProfileForm";
import {Profile} from "@/app/lib/supabase/type";

export default async function ProfilePage() {
  await checkStatus("student")

  const user = await getUser()
  const profile: Profile = await getProfile();

  return (
    <Navigation>
      <div className="flex flex-col">
        <h1 className="mb-4 text-lg">プロフィールの変更</h1>
        <ProfileForm defaultUser={user} defaultProfile={profile} />
      </div>
    </Navigation>
  )
}