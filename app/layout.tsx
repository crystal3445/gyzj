import type { Metadata } from "next"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://gyzjhcxa.com"

/** 百度统计 hm.js 站点 id；可在环境变量中覆盖 */
const baiduHmSiteId =
  process.env.NEXT_PUBLIC_BAIDU_HM_ID?.trim() ||
  "4a53d9dd549ea30ed10b67d01a88abe9"

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
        {baiduHmSiteId ? (
          <Script id="baidu-hm" strategy="afterInteractive">
            {`
              var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?${baiduHmSiteId}";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
              })();
            `}
          </Script>
        ) : null}
        {children}
        <Analytics />
      </body>
    </html>
  )
}
