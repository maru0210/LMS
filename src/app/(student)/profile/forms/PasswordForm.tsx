import {useContext, useEffect, useState} from "react";

import {Input} from "@/app/(student)/profile/ProfileForm";
import {changePassword} from "@/app/(student)/profile/actions";
import {AddToastCtx} from "@/app/components/Toast";

export default function PasswordForm() {
  const addToast = useContext(AddToastCtx)

  const [newPassword, setNewPassword] = useState<string | null>(null)

  useEffect(() => {
    if (newPassword === null) return;

    changePassword(newPassword).then(res => {
      if (res) {
        addToast("danger", res);
      } else {
        addToast("success", `名前を \'${newPassword}\' に変更しました。`)
      }
    }).catch(() => {
      addToast("danger", "予期せぬエラーが発生しました。");
    })

    setNewPassword(null)
  }, [addToast, newPassword])

  function handleChangePassword(formData: FormData) {
    if (!formData.get("password")) return;
    const input = formData.get("password") as string

    if (input === "") {
      addToast("warning", "パスワードを入力してください。")
      return;
    }

    addToast("info", "パスワードを変更しています...");
    setNewPassword(input);
  }


  return (
    <form action={handleChangePassword}>
      <Input label={"パスワード"} id={"password"} type={"text"} placeholder="********"
             autoComplete="new-password"/>
    </form>
  )
}