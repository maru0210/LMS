import {useContext, useEffect, useState} from "react";

import {Input} from "@/app/(common)/profile/ProfileForm";
import {changeEmail} from "@/app/(common)/profile/actions";
import {AddToastCtx} from "@/components/Toast";

export default function EmailForm(
  {defaultEmail}: {defaultEmail: string}
) {
  const addToast = useContext(AddToastCtx)
  
  const [email, setEmail] = useState<string>(defaultEmail);
  const [newEmail, setNewEmail] = useState<string | null>(null);
  
  useEffect(() => {
    if(newEmail === null || newEmail === email) return;
    
    changeEmail(newEmail).then((res) => {
      if(res) {
        addToast("danger", res);
      } else {
        setEmail(newEmail);
        addToast("success", `メールアドレスを \'${newEmail}\' に変更しました。`);
      }
    }).catch(() => {
      addToast("danger", "予期せぬエラーが発生しました。")
    });
    
    setNewEmail(null)
  }, [addToast, email, newEmail])
  
  function handleChangeEmail(formData: FormData) {
    if (!formData.get("email")) return;
    
    const input = formData.get("email") as string;
    addToast("info", "メールアドレスの変更を確認しています...");
    setNewEmail(input);
  }
  
  return (
    <form action={handleChangeEmail}>
      <Input label={"メールアドレス"} id={"email"} type={"email"} placeholder={email}
             autoComplete={"email"}/>
    </form>
  )
}