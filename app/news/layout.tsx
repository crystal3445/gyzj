import type { ReactNode } from "react"

/** 新文章发布后约 60 秒内前台可见（无需整站重新构建） */
export const revalidate = 60

export default function NewsLayout({ children }: { children: ReactNode }) {
  return children
}
