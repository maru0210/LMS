"use client"

import {createContext, ReactNode, useCallback, useState} from "react";
import {DangerSVG, InfoSVG, SuccessSVG, WarningSVG} from "@/components/Icons";

type ToastType = "success" | "warning" | "danger" | "info";

const ToastTypeSVG = new Map([
  ["success", SuccessSVG],
  ["warning", WarningSVG],
  ["danger", DangerSVG],
  ["info", InfoSVG],
])

type Toast = {
  id: number;
  type: ToastType;
  text: string;
  visible: boolean;
}

export const AddToastCtx
  = createContext<(type: ToastType, text: string) => void>(() => {
})

export function useToast(): [typeof toasts, { addToast: typeof addToast }] {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, text: string) => {
    const id = Date.now()

    setToasts(prevState => [...prevState, {id, type, text, visible: true}]);

    setTimeout(() => {
      setToasts(prevState =>
        prevState.map(value => value.id === id ? {...value, visible: false} : value));
    }, 4400)
  }, [])

  return [toasts, {addToast}];
}

function ToastComponent({toast}: { toast: Toast }) {
  return (
    <div className={["grid", !toast.visible && "animate-exit"].join(" ")}>
      <div className="overflow-hidden">
        <div className={[
          "flex w-72 md:w-96 rounded-lg px-3 py-2 mb-4 border border-neutral-100 text-sm bg-white shadow",
          toast.visible ? "animate-fadeIn" : "animate-fadeOut",
        ].join(" ")}>
          <div className={[
            "mr-1",
            toast.type === "success" ? "text-success" :
              toast.type === "warning" ? "text-warning" :
                toast.type === "danger" ? "text-danger" :
                  toast.type === "info" ? "text-info" : ""
          ].join(" ")}>
            {ToastTypeSVG.get(toast.type)}
          </div>
          <p>{toast.text}</p>
        </div>
      </div>
    </div>
  )
}

export default function ToastProvider({children}: { children: ReactNode }) {
  const [toasts, {addToast}] = useToast();

  return (
    <AddToastCtx.Provider value={addToast}>
      {children}

      <div className="fixed top-0 right-0">
        <div className="flex flex-col m-4">
          {toasts.map((toast) => (
            <ToastComponent toast={toast} key={toast.id}/>
          ))}
        </div>
      </div>
    </AddToastCtx.Provider>
  )
}
