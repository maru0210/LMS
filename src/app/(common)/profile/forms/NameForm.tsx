import {useContext, useEffect, useState} from "react";

import {Input} from "@/app/(common)/profile/ProfileForm";
import {changeName} from "@/app/(common)/profile/actions";
import {AddToastCtx} from "@/components/Toast";

export default function NameForm(
  {defaultName}: {defaultName: string}
) {
  const addToast = useContext(AddToastCtx)

  const [name, setName] = useState<string>(defaultName);
  const [newName, setNewName] = useState<string | null>(null)

  useEffect(() => {
    if (newName === null || newName === name) return;

    changeName(newName).then(res => {
      if (res) {
        addToast("danger", res);
      } else {
        setName(newName)
        addToast("success", `名前を \'${newName}\' に変更しました。`)
      }
    }).catch(() => {
      addToast("danger", "予期せぬエラーが発生しました。");
    })

    setNewName(null)
  }, [addToast, name, newName])

  function handleChangeName(formData: FormData) {
    if (!formData.get("name")) return;

    // 前後の空白を消去, 連続した空白を1つの半角空白に置換
    const input = (formData.get("name") as string).trim().replace(/[ 　]+/g, ' ');

    if (input === "") {
      addToast("warning", "正しい名前を入力してください。")
      return;
    } else if (input === name) {
      addToast("warning", "変更前の名前と同じです。")
      return;
    }

    addToast("info", "名前を変更しています...");
    setNewName(input);
  }


  return (
    <form action={handleChangeName}>
      <Input label={"名前（ニックネーム）"} id={"name"} type={"text"} placeholder={name}/>
    </form>
  )
}