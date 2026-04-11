import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/posts"

const base =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://gyzjhcxa.com"

/** 新资讯约 60 秒内进入 sitemap（与资讯区 revalidate 一致） */
export const revalidate = 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/news`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  const newsPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/news/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }))

  return [...staticPages, ...newsPages]
}
