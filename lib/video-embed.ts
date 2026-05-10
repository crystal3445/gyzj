/** 解析常见视频地址，生成可嵌入播放的 URL 或原生 <video> 源 */

export type VideoEmbedKind = "youtube" | "bilibili" | "mp4" | "unknown"

export type ParsedVideoUrl = {
  kind: VideoEmbedKind
  /** iframe src 或直接给 <video src> */
  src: string
}

export function parseVideoUrl(raw: string | null | undefined): ParsedVideoUrl | null {
  const url = raw?.trim()
  if (!url) return null

  if (/^https?:\/\//i.test(url) === false) return null

  const lower = url.toLowerCase()
  if (lower.endsWith(".mp4") || lower.endsWith(".webm") || /\.(mp4|webm)(\?|#|$)/i.test(url)) {
    return { kind: "mp4", src: url }
  }

  const yt =
    url.match(/(?:youtube\.com\/watch\?(?:[^&]*&)*v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/i) ??
    url.match(/^https?:\/\/youtu\.be\/([\w-]{11})/i)
  const yid = yt?.[1]
  if (yid) {
    return {
      kind: "youtube",
      src: `https://www.youtube.com/embed/${yid}?rel=0`,
    }
  }

  const bv = url.match(/bilibili\.com\/video\/(BV[a-zA-Z0-9]+)/i)
  const bvid = bv?.[1]
  if (bvid) {
    return {
      kind: "bilibili",
      src: `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(bvid)}&high_quality=1&autoplay=0`,
    }
  }

  return { kind: "unknown", src: url }
}
