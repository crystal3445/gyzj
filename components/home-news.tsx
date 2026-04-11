import Link from "next/link"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import type { PostListItem } from "@/lib/posts"

type Props = {
  posts: PostListItem[]
}

export function HomeNews({ posts }: Props) {
  if (posts.length === 0) return null

  return (
    <section id="latest-news" className="py-16 md:py-24 bg-muted/30 border-y border-border/60">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              最新资讯
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mt-3" />
            <p className="text-muted-foreground text-sm mt-3">
              品牌动态与加盟资讯
            </p>
          </div>
          <Link
            href="/news"
            className="text-sm font-medium text-primary hover:underline shrink-0"
          >
            查看全部 →
          </Link>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map(({ slug, frontmatter }) => (
            <li key={slug}>
              <Link
                href={`/news/${slug}`}
                className="relative block h-full border border-border rounded-xl p-5 bg-card hover:border-primary/45 hover:shadow-sm transition-all group"
              >
                <div className="flex items-start justify-between gap-2">
                  <time
                    dateTime={frontmatter.date}
                    className="text-xs text-muted-foreground"
                  >
                    {format(new Date(frontmatter.date), "yyyy年M月d日", {
                      locale: zhCN,
                    })}
                  </time>
                  {frontmatter.pinned ? (
                    <span className="shrink-0 text-[11px] font-medium text-primary bg-primary/12 px-2 py-0.5 rounded-md">
                      置顶
                    </span>
                  ) : null}
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mt-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {frontmatter.title}
                </h3>
                {frontmatter.description ? (
                  <p className="text-sm text-foreground/65 mt-2 line-clamp-2">
                    {frontmatter.description}
                  </p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
