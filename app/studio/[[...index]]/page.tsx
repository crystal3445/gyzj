"use client"

import { NextStudio } from "next-sanity/studio"
import config from "../../../sanity.config"

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-[#F5EDD8] text-[#4A2E1A]">
        <div className="max-w-md text-center space-y-3">
          <h1 className="font-serif text-xl font-bold">管理后台未配置</h1>
          <p className="text-sm opacity-80">
            请在部署环境变量中设置{" "}
            <code className="rounded bg-black/5 px-1">NEXT_PUBLIC_SANITY_PROJECT_ID</code>
            ，并参考项目里的部署说明完成 Sanity 项目创建与 CORS 配置。
          </p>
        </div>
      </div>
    )
  }

  return <NextStudio config={config} />
}
