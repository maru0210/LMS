import { changeName } from "@/app/(common)/profile/actions";
import { Input } from "@/app/(common)/profile/components/Input";

import { useNotice } from "@/components/notice/Notice";
import { useEffect, useState } from "react";

export default function NameForm({ defaultName }: { defaultName: string }) {
  const { notify } = useNotice();

  const [name, setName] = useState<string>(defaultName);
  const [newName, setNewName] = useState<string | null>(null);

  useEffect(() => {
    if (newName === null || newName === name) return;

    changeName(newName)
      .then((res) => {
        if (res) {
          notify("danger", res);
        } else {
          setName(newName);
          notify("success", `名前を \'${newName}\' に変更しました。`);
        }
      })
      .catch(() => {
        notify("danger", "予期せぬエラーが発生しました。");
      });

    setNewName(null);
  }, [notify, name, newName]);

  function handleChangeName(formData: FormData) {
    if (!formData.get("name")) return;

    // 前後の空白を消去, 連続した空白を1つの半角空白に置換
    const input = (formData.get("name") as string)
      .trim()
      .replace(/[ 　]+/g, " ");

    if (input === "") {
      notify("warning", "正しい名前を入力してください。");
      return;
    } else if (input === name) {
      notify("warning", "変更前の名前と同じです。");
      return;
    }

    notify("info", "名前を変更しています...");
    setNewName(input);
  }

  return (
    <form action={handleChangeName}>
      <Input
        label={"名前（ニックネーム）"}
        id={"name"}
        type={"text"}
        placeholder={name}
      />
    </form>
  );
}
