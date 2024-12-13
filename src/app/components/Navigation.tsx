'use client'

import {ReactNode, useEffect, useState} from "react";
import Image from "next/image";
import {usePathname} from "next/navigation";
import Link from "next/link";

import {logout} from "@/app/lib/supabase/auth";
import ToastProvider from "@/app/components/Toast";

const defaultNavList = [
  {name: "ホーム", href: "/home", svg: "/home.svg", current: false},
  {name: "プロフィール", href: "/profile", svg: "/user.svg", current: false}
]

const defaultAdmNavList = [
  {name: "コンテンツ", href: "/admin", svg: "/gear.svg", current: false},
]

export const NavItem = (
  props: { name: string, href: string, svg: string, current: boolean }
) => (
  <Link href={props.href}
        className={
          "flex items-center gap-2 rounded-lg px-2 py-1 transition "
          + (props.current ? "bg-gray-50" : "hover:bg-gray-100")
        }>
    <Image src={props.svg} alt={props.name} width={24} height={24}/>
    <span className="mt-0.5">{props.name}</span>
  </Link>
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
  {padding = true, children}: { padding?: boolean, children?: ReactNode },
) {
  const pathname = usePathname()

  const isAdmin = pathname.split("/").at(1) === "admin"

  const [navList, setNavList] = useState(isAdmin ? defaultAdmNavList : defaultNavList);

  useEffect(() => {
    setNavList(prevState => (
      prevState.map(nav => {
        nav.current = (nav.href === pathname);
        return nav;
      })
    ));
  }, [pathname])

  return (
    <ToastProvider>
      <div className="flex h-screen">
        <div className="w-52 shadow">
          <div className="flex flex-col h-full p-3 pt-0 text-lg">
            <p className="mx-2 my-8">学習管理システム</p>

            <ul className={
              "flex flex-col gap-2 h-full text-gray-900" + (!isAdmin ? " [&>*:last-child]:mt-auto" : "")
            }>
              {navList.map((item, index) => {
                return (
                  <li key={index}>
                    <NavItem name={item.name} href={item.href} svg={item.svg} current={item.current}/>
                  </li>
                )
              })}
            </ul>

            <hr className="my-2"/>

            <LogoutButton/>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className={"h-full " + (padding ? "p-8" : "")}>
            {children}
          </div>
        </div>
      </div>
    </ToastProvider>
  )
}