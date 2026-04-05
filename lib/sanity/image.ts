import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url"
import { isSanityEnabled } from "@/lib/sanity/client"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim()
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

const builder =
  projectId && projectId.length >= 8
    ? createImageUrlBuilder({ projectId, dataset })
    : null

/** 将 Sanity 图片块 / asset 转为 CDN 地址（用于正文） */
export function urlForImage(source: SanityImageSource | null | undefined): string | null {
  if (!isSanityEnabled() || !builder || !source) return null
  try {
    return builder.image(source).width(1200).fit("max").auto("format").url()
  } catch {
    return null
  }
}
