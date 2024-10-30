'use client'

import {ReactNode, useEffect, useState} from "react";
import Image from "next/image";
import {usePathname} from "next/navigation";
import Link from "next/link";

const defaultNavList = [
  {name: "ホーム", href: "/home", svg: "/home.svg", current: false},
  {name: "チャット", href: "/chat", svg: "/chat.svg", current: false}
]

const NavItem = (
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
  const [navList, setNavList] = useState(defaultNavList);
  const pathname = usePathname()

  useEffect(() => {
    const _navList = defaultNavList.map(nav => {
      if (nav.href == pathname) nav.current = true;
      return nav;
    })
    setNavList(_navList);
  }, [pathname])


  return (
    <div className="flex h-screen">
      <div className="w-52 shadow">
        <div className="flex flex-col h-full p-3 pt-0 text-lg">
          <p className="mx-2 my-8">学習管理システム</p>

          <ul className="flex flex-col gap-2 text-gray-900">
            {navList.map((item, index) => {
              return (
                <li key={index}>
                  <NavItem name={item.name} href={item.href} svg={item.svg} current={item.current}/>
                </li>
              )
            })}
          </ul>

          <div className="mt-auto text-gray-900">
            <NavItem
              name={"プロフィール"}
              href={"/profile"}
              svg={"/user.svg"}
              current={pathname === "/profile"}
            />
          </div>
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