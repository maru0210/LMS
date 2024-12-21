"use client"

import {DangerIcon, InfoIcon, SuccessIcon, WarningIcon} from "@/components/icons/NoticeIcons";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";

type NoticeType = "success" | "warning" | "danger" | "info";

type Notice = {
  id: number;
  type: NoticeType;
  message: string;
  visible: boolean;
}

const NoticeContext
  = createContext<{ notify: (type: NoticeType, message: string) => void }>({notify: () => 0})

export const useNotice = () => useContext(NoticeContext);

const NoticeIcon = (
  {type}: { type: NoticeType },
) => {
  switch (type) {
    case "success":
      return <div className="[&>svg]:stroke-success"><SuccessIcon/></div>
    case "warning":
      return <div className="[&>svg]:stroke-warning"><WarningIcon/></div>
    case "danger":
      return <div className="[&>svg]:stroke-danger"><DangerIcon/></div>
    case "info":
      return <div className="[&>svg]:stroke-info"><InfoIcon/></div>
  }
}

const Notice = (
  {notice}: { notice: Notice }
) => (
  <div className={cn("grid", !notice.visible && "animate-exit")}>
    <div className="overflow-hidden">
      <div className={cn(
        "flex w-80 rounded-lg p-3 m-2 gap-1 bg-white shadow shadow-neutral-200 text-sm",
        notice.visible ? "animate-fadeIn" : "animate-fadeOut"
      )}>
        <NoticeIcon type={notice.type}/>
        <p>{notice.message}</p>
      </div>
    </div>
  </div>
)

export default function NoticeProvider({children}: { children: ReactNode }) {
  const pathname = usePathname()
  const [notices, setNotices] = useState<Notice[]>([]);

  const addNotice = useCallback((type: NoticeType, message: string) => {
    const id = Date.now()
    setNotices(prevState => [...prevState, {id, type, message, visible: true}]);

    setTimeout(() => {
      setNotices(prevState => (
        prevState.map(value => value.id === id ? {...value, visible: false} : value)
      ));
    }, 4700)

    setTimeout(() => {
      setNotices(prevState => prevState.filter(value => value.id !== id))
    }, 5300)
  }, [])

  useEffect(() => {
    setNotices([]);
  }, [pathname])

  return (
    <NoticeContext.Provider value={{notify: addNotice}}>
      <div className="fixed top-0 right-0">
        <div className="flex flex-col m-4">
          {notices.map((notice) => (
            <Notice notice={notice} key={notice.id}/>
          ))}
        </div>
      </div>
      {children}
    </NoticeContext.Provider>
  )
}
