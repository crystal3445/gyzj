import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://gyzjhcxa.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "国医仲景 | 健康体验中心整店输出 - 合作咨询",
  description:
    "国医华草健康集团旗下品牌，四代传承中医智慧，健康体验中心整店输出，诚邀全国合作伙伴合作。",
  keywords:
    "国医仲景, 中医养生, 健康体验中心, 艾灸, 合作咨询, 整店输出",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
