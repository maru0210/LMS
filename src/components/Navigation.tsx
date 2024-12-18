"use client"

import {logout} from "@/app/(auth)/actions";
import {cn} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {ReactNode, useEffect, useState} from "react";

const studentNavList = [
  {name: "ホーム", href: "/home", svg: "/home.svg", current: false},
  {name: "試験", href: "/exam", svg: "/pencil.svg", current: false},
  {name: "プロフィール", href: "/profile", svg: "/user.svg", current: false}
]

const teacherNavList = [
  {name: "試験管理", href: "/manager/exam", svg: "/pencil.svg", current: false},
  {name: "成績", href: "/manager/grade", svg: "/grade.svg", current: false},
  {name: "プロフィール", href: "/profile", svg: "/user.svg", current: false}
]

export const NavListItem = (
  {name, href, svg, current}: { name: string, href: string, svg: string, current: boolean }
) => (
  <li>
    <Link
      href={href}
      className={cn("flex items-center gap-2 rounded-lg px-2 py-1 transition", current ? "bg-gray-50" : "hover:bg-gray-100")}>
      <Image src={svg} alt={name} width={24} height={24}/>
      <span className="mt-0.5">{name}</span>
    </Link>
  </li>
)

export function LogoutButton() {
  return (
    <form action={logout}>
      <button className="flex items-center w-full gap-2 rounded-lg px-2 py-1 transition hover:bg-gray-100">
        <Image src={"/logout.svg"} alt={"Logout"} width={24} height={24}/>
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
              <NavListItem name={item.name} href={item.href} svg={item.svg} current={item.current} key={index}/>
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