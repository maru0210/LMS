import ProfileForm from "@/app/(common)/profile/ProfileForm";
import Navigation from "@/components/Navigation";
import {checkStatus} from "@/lib/supabase/auth";
import {getProfile} from "@/lib/supabase/profile";
import {getCurrentUser} from "@/lib/supabase/user";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "プロフィールの変更"
}

export default async function ProfilePage() {
  await checkStatus("student")

  const user = await getCurrentUser()
  const profile = await getProfile(user.id)

  return (
    <Navigation isAdmin={profile.status === "teacher"}>
      <div className="flex flex-col">
        <h1 className="mb-4 text-lg">プロフィールの変更</h1>
        <ProfileForm defaultUser={user} defaultProfile={profile}/>
      </div>
    </Navigation>
  )
}