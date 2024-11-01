'use client'

import {ReactNode, useEffect, useState} from "react";
import Image from "next/image";
import {usePathname} from "next/navigation";
import Link from "next/link";

const defaultNavList = [
  {name: "ホーム", href: "/home", svg: "/home.svg", current: false},
  {name: "チャット", href: "/chat", svg: "/chat.svg", current: false},
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

export default function Navigation({children}: { children: ReactNode }) {
  const pathname = usePathname()

  const isAdmin = pathname.split("/").at(1) === "admin"
  const _navList = isAdmin ? defaultAdmNavList : defaultNavList

  const [navList, setNavList] = useState(_navList);

  useEffect(() => {
    const newNavList = _navList.map(nav => {
      nav.current = (nav.href == pathname);
      return nav;
    })
    setNavList(newNavList);
  }, [_navList, pathname])

  return (
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

          {/*<div className="mt-auto text-gray-900">*/}
          {/*  <NavItem*/}
          {/*    name={"プロフィール"}*/}
          {/*    href={"/profile"}*/}
          {/*    svg={"/user.svg"}*/}
          {/*    current={pathname === "/profile"}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>

      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  )
}