"use client"

import Link from "next/link";

export default function LinkButton(
  {text, link, className} : {text: string; link: string; className?: string}
) {
  return (
    <Link
      href={link}
      className={"block w-full rounded-lg py-2.5 ring-0 bg-lime-300 text-center " + className}
    >{text}</Link>
  )
}