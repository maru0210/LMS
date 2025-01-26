"use client";

import {
  DangerIcon,
  InfoIcon,
  ProcessingIcon,
  SuccessIcon,
  WarningIcon,
} from "@/components/icons/NoticeIcons";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type NoticeType = "success" | "warning" | "danger" | "info" | "processing";

type Notice = {
  id: number;
  type: NoticeType;
  message: string;
  visible: boolean;
};

type NoticeContextType = {
  notify: (type: NoticeType, message: string) => number;
  removeNotice: (id: number) => void;
};

const NoticeContext = createContext<NoticeContextType>({
  notify: () => 0,
  removeNotice: () => 0,
});

export const useNotice = () => useContext(NoticeContext);

const NoticeIcon = ({ type }: { type: NoticeType }) => {
  switch (type) {
    case "success":
      return (
        <div className="[&>svg]:stroke-success">
          <SuccessIcon />
        </div>
      );
    case "warning":
      return (
        <div className="[&>svg]:stroke-warning">
          <WarningIcon />
        </div>
      );
    case "danger":
      return (
        <div className="[&>svg]:stroke-danger">
          <DangerIcon />
        </div>
      );
    case "info":
      return (
        <div className="[&>svg]:stroke-info">
          <InfoIcon />
        </div>
      );
    case "processing":
      return (
        <div className="[&_circle]:fill-processing">
          <ProcessingIcon />
        </div>
      );
  }
};

const Notice = ({ notice }: { notice: Notice }) => (
  <div className={cn("grid", !notice.visible && "animate-exit")}>
    <div className="overflow-hidden">
      <div
        className={cn(
          "relative m-2 flex w-80 flex-col overflow-hidden rounded-lg bg-white text-sm shadow shadow-neutral-200",
          notice.visible ? "animate-fadeIn" : "animate-fadeOut",
        )}
      >
        <div className="flex gap-1 p-3 pb-3">
          <NoticeIcon type={notice.type} />
          <p>{notice.message}</p>
        </div>
        {notice.type !== "processing" && (
          <div className="absolute bottom-0 h-0.5 w-full bg-neutral-100">
            <div className="h-full animate-shrink bg-neutral-300" />
          </div>
        )}
      </div>
    </div>
  </div>
);

export default function NoticeProvider({ children }: { children: ReactNode }) {
  const [notices, setNotices] = useState<Notice[]>([]);

  const removeNotice = useCallback((id: number) => {
    setNotices((prevState) =>
      prevState.map((value) =>
        value.id === id ? { ...value, visible: false } : value,
      ),
    );
    setTimeout(() => {
      setNotices((prevState) => prevState.filter((value) => value.id !== id));
    }, 600);
  }, []);

  const addNotice = useCallback(
    (type: NoticeType, message: string) => {
      const id = Date.now();
      setNotices((prevState) => [
        ...prevState,
        { id, type, message, visible: true },
      ]);

      if (type !== "processing") {
        setTimeout(() => removeNotice(id), 5300);
      }

      return id;
    },
    [removeNotice],
  );

  const pathname = usePathname();
  useEffect(() => setNotices([]), [pathname]);

  return (
    <NoticeContext.Provider
      value={{ notify: addNotice, removeNotice: removeNotice }}
    >
      <div className="fixed right-0 top-0">
        <div className="m-4 flex flex-col">
          {notices.map((notice) => (
            <Notice notice={notice} key={notice.id} />
          ))}
        </div>
      </div>
      {children}
    </NoticeContext.Provider>
  );
}
