import { useNotice } from "@/components/notice/Notice";
import { useActionState, useEffect, useState } from "react";

export const useActionStateWithNotice = <State, Payload>(
  action: (state: Awaited<State>, payload: Payload) => State | Promise<State>,
  initialState: Awaited<State>,
  text: { processing: string },
): [state: Awaited<State>, (payload: Payload) => void, boolean] => {
  const [state, dispatch, isPending] = useActionState<State, Payload>(
    action,
    initialState,
  );
  const { notify, removeNotice } = useNotice();

  const [id, setId] = useState(0);

  useEffect(() => {
    if (isPending && id) return; // アイドル状態 or 実行中

    if (isPending) {
      const id = notify("processing", text.processing);
      setId(id);
    } else {
      if (id !== 0) removeNotice(id);
      setId(0);
    }
  }, [removeNotice, id, isPending, notify, text.processing]);

  return [state, dispatch, isPending];
};
