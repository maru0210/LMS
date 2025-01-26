import NoticeProvider from "@/components/notice/Notice";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import React from "react";
import "./globals.css";

const BIZUDP = localFont({
  src: [
    {
      path: "../fonts/BIZUDPGothic-Regular.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "../fonts/BIZUDPGothic-Bold.woff2",
      weight: "700",
      style: "bold"
    }
  ]
});

export default function RootLayout(
  { children }: Readonly<{ children: React.ReactNode; }>
) {
  return (
    <html lang="ja">
    <body className={cn(BIZUDP.className, "leading-relaxed tracking-wider")}>
    <NoticeProvider>
      {children}
    </NoticeProvider>
    </body>
    </html>
  );
}
