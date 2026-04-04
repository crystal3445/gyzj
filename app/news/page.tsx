import type { Metadata } from "next"
import Link from "next/link"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { getAllPosts } from "@/lib/posts"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "资讯动态 | 国医仲景",
  description: "国医仲景品牌资讯与动态",
}

export default async function NewsIndexPage() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16 max-w-3xl">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          资讯动态
        </h1>
        <p className="text-muted-foreground mb-10 text-sm">
          品牌资讯与活动动态
        </p>
        {posts.length === 0 ? (
          <p className="text-foreground/70">暂无文章，敬请期待。</p>
        ) : (
          <ul className="space-y-6">
            {posts.map(({ slug, frontmatter }) => (
              <li
                key={slug}
                className="border border-border rounded-lg p-5 bg-card hover:border-primary/40 transition-colors"
              >
                <Link href={`/news/${slug}`} className="block group">
                  <time
                    dateTime={frontmatter.date}
                    className="text-xs text-muted-foreground"
                  >
                    {format(new Date(frontmatter.date), "yyyy年M月d日", {
                      locale: zhCN,
                    })}
                  </time>
                  <h2 className="font-serif text-xl font-semibold text-foreground mt-1 group-hover:text-primary transition-colors">
                    {frontmatter.title}
                  </h2>
                  {frontmatter.description ? (
                    <p className="text-sm text-foreground/70 mt-2 line-clamp-2">
                      {frontmatter.description}
                    </p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </main>
  )
}
