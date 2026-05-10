import type { CompanyVideoItem } from "@/lib/videos"
import { parseVideoUrl } from "@/lib/video-embed"

type Props = {
  videos: CompanyVideoItem[]
}

export function CompanyVideos({ videos }: Props) {
  if (videos.length === 0) return null

  return (
    <section
      id="company-videos"
      className="py-16 md:py-24 bg-background border-y border-border/60"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-10 md:mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            企业视频
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mt-3" />
          <p className="text-muted-foreground text-sm mt-3 max-w-2xl leading-relaxed">
            以更直观的方式了解品牌故事、门店场景与国医仲景的动态。
          </p>
        </div>

        <ul className="grid gap-10 md:grid-cols-2">
          {videos.map((item) => {
            const parsed = parseVideoUrl(item.videoUrl)

            return (
              <li
                key={item.id}
                className="flex flex-col rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:border-primary/30 transition-colors"
              >
                <div className="aspect-video w-full bg-muted">
                  {!parsed ? (
                    <div className="flex h-full min-h-[200px] items-center justify-center px-4 text-center text-sm text-muted-foreground">
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
                    <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-3 px-4 text-center">
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

                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="mt-2 text-sm text-foreground/70 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
