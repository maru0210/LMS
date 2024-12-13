"use client"

import {createContext, ReactNode, useCallback, useState} from "react";

type Toast = {
  id: number;
  text: string;
}

export const AddToastCtx
  = createContext<(toast: string) => void>(() => {
})

export function useToast(): [typeof toasts, { addToast: typeof addToast }] {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((text: string) => {
    setToasts(prevState => [...prevState, {id: Date.now(), text}]);

    setTimeout(() => {
      setToasts(prevState => prevState.slice(1));
    }, 5000)
  }, [])

  return [toasts, {addToast}];
}

function ToastComponent({toast}: { toast: Toast }) {
  return (
    <div className="w-80 rounded-lg px-3 py-2 border border-neutral-100 text-sm bg-white shadow
                    transition animate-pulse">
      <p>{toast.text}</p>
    </div>
  )
}

export default function ToastProvider({children}: { children: ReactNode }) {
  const [toasts, {addToast}] = useToast();

  return (
    <AddToastCtx.Provider value={addToast}>
      {children}

      <div className="fixed top-0 right-0">
        <div className="flex flex-col gap-4 m-4">
          {toasts.map((toast) => (
            <ToastComponent toast={toast} key={toast.id}/>
          ))}
        </div>
      </div>
    </AddToastCtx.Provider>
  )
}
