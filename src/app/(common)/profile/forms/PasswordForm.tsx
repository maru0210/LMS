import { changePassword } from "@/app/(common)/profile/actions";
import { Input } from "@/app/(common)/profile/components/Input";

import { useNotice } from "@/components/notice/Notice";
import { useEffect, useState } from "react";

export default function PasswordForm() {
  const { notify } = useNotice();

  const [newPassword, setNewPassword] = useState<string | null>(null);

  useEffect(() => {
    if (newPassword === null) return;

    changePassword(newPassword)
      .then((res) => {
        if (res) {
          notify("danger", res);
        } else {
          notify("success", `名前を \'${newPassword}\' に変更しました。`);
        }
      })
      .catch(() => {
        notify("danger", "予期せぬエラーが発生しました。");
      });

    setNewPassword(null);
  }, [notify, newPassword]);

  function handleChangePassword(formData: FormData) {
    if (!formData.get("password")) return;
    const input = formData.get("password") as string;

    if (input === "") {
      notify("warning", "パスワードを入力してください。");
      return;
    }

    notify("info", "パスワードを変更しています...");
    setNewPassword(input);
  }

  return (
    <form action={handleChangePassword}>
      <Input
        label={"パスワード"}
        id={"password"}
        type={"text"}
        placeholder="********"
        autoComplete="new-password"
      />
    </form>
  );
}
