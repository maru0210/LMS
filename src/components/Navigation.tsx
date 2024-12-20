"use client"

import {logout} from "@/app/(auth)/actions";
import {ExamIcon, GradeIcon, HomeIcon, LogoutIcon, UserIcon} from "@/components/icons/NavigationIcons";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {JSX, ReactNode, useEffect, useState} from "react";

const studentNavList = [
  {name: "ホーム", href: "/home", icon: <HomeIcon/>, current: false},
  {name: "試験", href: "/exam", icon: <ExamIcon/>, current: false},
  {name: "プロフィール", href: "/profile", icon: <UserIcon/>, current: false}
]

const teacherNavList = [
  {name: "試験管理", href: "/manager/exam", icon: <ExamIcon/>, current: false},
  {name: "成績", href: "/manager/grade", icon: <GradeIcon/>, current: false},
  {name: "プロフィール", href: "/profile", icon: <UserIcon/>, current: false}
]

export const NavListItem = (
  {name, href, icon, current}: { name: string, href: string, icon: JSX.Element, current: boolean }
) => (
  <li>
    <Link
      href={href}
      className={cn("flex items-center gap-2 rounded-lg px-2 py-1 transition", current ? "bg-gray-50" : "hover:bg-gray-100")}>
      {icon}
      <span className="mt-0.5">{name}</span>
    </Link>
  </li>
)

export function LogoutButton() {
  return (
    <form action={logout}>
      <button className="flex items-center w-full gap-2 rounded-lg px-2 py-1 transition hover:bg-gray-100">
        <LogoutIcon/>
        <span className="mt-0.5">ログアウト</span>
      </button>
    </form>
  )
}

export default function Navigation(
  {isAdmin = false, padding = true, children}: { isAdmin?: boolean, padding?: boolean, children?: ReactNode },
) {
  const [navList, setNavList] = useState(isAdmin ? teacherNavList : studentNavList);

  const pathname = usePathname()
  useEffect(() => {
    setNavList(prevState => (
      prevState.map(nav => ({
        ...nav,
        current: pathname.startsWith(nav.href),
      }))
    ));
  }, [pathname])

  return (
    <div className="flex h-screen">
      <div className="w-52 shadow">
        <div className="flex flex-col h-full p-3 pt-0 text-lg">
          <p className="mx-2 my-8">手軽にアルゴル</p>

          <ul className="flex flex-col gap-2 h-full text-gray-900 [&>*:last-child]:mt-auto">
            {navList.map((item, index) => (
              <NavListItem name={item.name} href={item.href} icon={item.icon} current={item.current} key={index}/>
            ))}
          </ul>

          <hr className="my-2"/>

          <LogoutButton/>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className={cn("min-h-full", padding && "p-8")}>
          {children}
        </div>
      </div>
    </div>
  )
}