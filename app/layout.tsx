import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://gyzjhcxa.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "国医仲景加盟｜国医仲景艾灸馆加盟官方网站加盟咨询",
  description:
    "国医仲景加盟：国医华草健康集团旗下品牌，四代传承中医智慧，健康体验中心整店输出，面向全国招募加盟商，艾灸养生门店加盟与运营支持。",
  keywords:
    "国医仲景加盟, 国医仲景, 艾灸加盟, 健康体验中心加盟, 中医养生加盟, 整店输出, 加盟咨询",
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
