import Link from "next/link"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import type { CompanyVideoItem } from "@/lib/videos"
import type { PostListItem } from "@/lib/posts"
import { parseVideoUrl } from "@/lib/video-embed"

type Props = {
  videos: CompanyVideoItem[]
  posts: PostListItem[]
}

/** 企业视频 + 最新资讯：左右并排，合并进同一个板块 */
export function VideosNews({ videos, posts }: Props) {
  const shownVideos = videos.slice(0, 4)
  const shownPosts = posts.slice(0, 6)

  if (shownVideos.length === 0 && shownPosts.length === 0) return null

  return (
    <section
      id="videos-news"
      className="py-12 md:py-16 bg-background border-y border-border/60"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
          {/* 左：企业视频 */}
          <div className="flex flex-col">
            <div className="mb-8">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                企业视频
              </h2>
              <div className="w-16 h-1 bg-primary rounded-full mt-3" />
              <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                以更直观的方式了解品牌故事、门店场景与国医仲景的动态。
              </p>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:auto-rows-fr lg:flex-1">
              {shownVideos.map((item) => {
                const parsed = parseVideoUrl(item.videoUrl)

                return (
                  <li
                    key={item.id}
                    className="flex h-full flex-col rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:border-primary/30 transition-colors"
                  >
                    <div className="aspect-video w-full bg-muted lg:aspect-auto lg:min-h-[200px] lg:flex-1">
                      {!parsed ? (
                        <div className="flex h-full min-h-[180px] items-center justify-center px-4 text-center text-sm text-muted-foreground">
                          无效的视频地址，请在后台检查链接。
                        </div>
                      ) : parsed.kind === "mp4" ? (
                        <video
                          className="h-full w-full object-contain"
                          controls
                          playsInline
                          preload="metadata"
                          aria-label={item.title}
                        >
                          <source src={parsed.src} />
                          您的浏览器不支持视频播放。
                        </video>
                      ) : parsed.kind === "youtube" || parsed.kind === "bilibili" ? (
                        <iframe
                          title={item.title}
                          src={parsed.src}
                          className="h-full w-full border-0"
                          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin"
                        />
                      ) : (
                        <div className="flex h-full min-h-[180px] flex-col items-center justify-center gap-3 px-4 text-center">
                          <p className="text-sm text-muted-foreground">
                            当前链接暂不支持内嵌预览
                          </p>
                          <a
                            href={parsed.src}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                          >
                            新窗口打开视频
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-serif text-base font-semibold text-foreground line-clamp-1">
                        {item.title}
                      </h3>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* 右：最新资讯 */}
          <div className="flex flex-col">
            <div className="mb-8 flex items-end justify-between gap-4">
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

            <ul className="grid gap-4">
              {shownPosts.map(({ slug, frontmatter }) => (
                <li key={slug}>
                  <Link
                    href={`/news/${slug}`}
                    className="relative block h-full border border-border rounded-xl p-4 bg-card hover:border-primary/45 hover:shadow-sm transition-all group"
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
                    <h3 className="font-serif text-base font-semibold text-foreground mt-1.5 line-clamp-2 group-hover:text-primary transition-colors">
                      {frontmatter.title}
                    </h3>
                    {frontmatter.description ? (
                      <p className="text-sm text-foreground/65 mt-1.5 line-clamp-2">
                        {frontmatter.description}
                      </p>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
