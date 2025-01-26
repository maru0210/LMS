"use client";

import { Input } from "@/app/(common)/profile/components/Input";
import EmailForm from "@/app/(common)/profile/forms/EmailForm";
import NameForm from "@/app/(common)/profile/forms/NameForm";
import PasswordForm from "@/app/(common)/profile/forms/PasswordForm";
import { Profile } from "@/lib/supabase/type";
import { User } from "@supabase/auth-js";
import { useState } from "react";

export default function ProfileForm({
  defaultUser,
  defaultProfile,
}: {
  defaultUser: User;
  defaultProfile: Profile;
}) {
  const [user] = useState<User>(defaultUser);
  const [profile] = useState<Profile>(defaultProfile);

  return (
    <div className="mx-2 flex flex-col gap-4">
      <form>
        <Input
          label={"学籍番号"}
          id={"student_id"}
          type={"text"}
          placeholder={profile.student_id}
          disabled={true}
        />
      </form>

      <NameForm defaultName={profile.name} />
      <EmailForm defaultEmail={user.email ?? ""} />
      <PasswordForm />
    </div>
  );
}
