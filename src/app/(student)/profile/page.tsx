import Navigation from "@/app/components/Navigation";
import {checkStatus} from "@/app/lib/supabase/auth";
import {getUserProfile, getUser} from "@/app/lib/supabase/actions";
import ProfileForm from "@/app/(student)/profile/ProfileForm";
import {Profile} from "@/app/lib/supabase/type";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "プロフィールの変更"
}

export default async function ProfilePage() {
  await checkStatus("student")

  const user = await getUser()
  const profile: Profile = await getUserProfile();

  return (
    <Navigation isAdmin={profile.status === "teacher"}>
      <div className="flex flex-col">
        <h1 className="mb-4 text-lg">プロフィールの変更</h1>
        <ProfileForm defaultUser={user} defaultProfile={profile} />
      </div>
    </Navigation>
  )
}