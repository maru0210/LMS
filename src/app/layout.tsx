import NoticeProvider from "@/components/Notice";
import localFont from "next/font/local";
import React from "react";
import "./globals.css";

const LINESeedJP = localFont({
  src: [
    {
      path: '../fonts/LINESeedJP_OTF_Th.woff2',
      weight: '100',
      style: 'thin',
    },
    {
      path: '../fonts/LINESeedJP_OTF_Rg.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/LINESeedJP_OTF_Bd.woff2',
      weight: '700',
      style: 'bold',
    }
  ]
})

export default function RootLayout(
  {children}: Readonly<{ children: React.ReactNode; }>
) {
  return (
    <html lang="ja">
    <body className={[LINESeedJP.className].join(" ")}>
    <NoticeProvider>
      {children}
    </NoticeProvider>
    </body>
    </html>
  );
}
