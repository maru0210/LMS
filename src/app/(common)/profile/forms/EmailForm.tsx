import {changeEmail} from "@/app/(common)/profile/actions";
import {Input} from "@/app/(common)/profile/components/Input";

import {useNotice} from "@/components/notice/Notice";
import {useEffect, useState} from "react";

export default function EmailForm(
  {defaultEmail}: { defaultEmail: string }
) {
  const {notify} = useNotice()

  const [email, setEmail] = useState<string>(defaultEmail);
  const [newEmail, setNewEmail] = useState<string | null>(null);

  useEffect(() => {
    if (newEmail === null || newEmail === email) return;

    changeEmail(newEmail).then((res) => {
      if (res) {
        notify("danger", res);
      } else {
        setEmail(newEmail);
        notify("success", `メールアドレスを \'${newEmail}\' に変更しました。`);
      }
    }).catch(() => {
      notify("danger", "予期せぬエラーが発生しました。")
    });

    setNewEmail(null)
  }, [email, newEmail, notify])

  function handleChangeEmail(formData: FormData) {
    if (!formData.get("email")) return;

    const input = formData.get("email") as string;
    notify("info", "メールアドレスの変更を確認しています...");
    setNewEmail(input);
  }

  return (
    <form action={handleChangeEmail}>
      <Input label={"メールアドレス"} id={"email"} type={"email"} placeholder={email}
             autoComplete={"email"}/>
    </form>
  )
}