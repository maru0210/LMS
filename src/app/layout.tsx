import NoticeProvider from "@/components/notice/Notice";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import React from "react";
import "./globals.css";

const MPlus2 = localFont({
  src: [
    {
      path: "../fonts/MPLUS2-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/MPLUS2-Bold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className={cn(MPlus2.className, "leading-relaxed tracking-wider")}>
        <NoticeProvider>{children}</NoticeProvider>
      </body>
    </html>
  );
}
