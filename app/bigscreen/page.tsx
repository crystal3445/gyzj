import type { Metadata } from "next"

const DASHBOARD_URL =
  "https://huacaoxiangai.huacaoshuo.cn/dateshow/#/dataShow/index"

export const metadata: Metadata = {
  title: "数字大屏｜国医仲景华草香艾数据中心",
  description: "国医仲景可视化数据中台：合作门店、落地门店、核销数据实时大屏。",
}

export default function BigScreenPage() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-[#0b1026]">
      <iframe
        src={DASHBOARD_URL}
        title="国医仲景华草香艾数据中心"
        className="h-full w-full border-0"
      />
      <a
        href="/"
        className="fixed left-4 top-4 z-50 rounded-full bg-black/45 px-4 py-2 text-sm text-white/90 backdrop-blur-sm hover:bg-black/65 transition-colors"
      >
        ← 返回官网
      </a>
    </main>
  )
}
