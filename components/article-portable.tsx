import type { ArbitraryTypedObject } from "@portabletext/types"
import { PortableText, type PortableTextComponents } from "@portabletext/react"
import { urlForImage } from "@/lib/sanity/image"

type Props = {
  /** 正文块（段落 + 图片等），顺序即阅读顺序 */
  blocks: ArbitraryTypedObject[]
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#"
      return (
        <a href={href} rel="noopener noreferrer" target="_blank">
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      const url = urlForImage(value)
      if (!url) return null
      const alt =
        typeof value?.alt === "string" && value.alt.length > 0 ? value.alt : ""
      const caption =
        typeof value?.caption === "string" && value.caption.length > 0
          ? value.caption
          : null
      return (
        <figure className="my-6">
          <img
            src={url}
            alt={alt}
            className="w-full max-w-full h-auto rounded-md border border-border/60"
            loading="lazy"
          />
          {caption ? (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {caption}
            </figcaption>
          ) : null}
        </figure>
      )
    },
  },
}

export function ArticlePortable({ blocks }: Props) {
  return (
    <div className="md-prose">
      <PortableText value={blocks} components={components} />
    </div>
  )
}
