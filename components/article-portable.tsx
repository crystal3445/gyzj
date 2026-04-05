import type { PortableTextBlock } from "@portabletext/types"
import { PortableText, type PortableTextComponents } from "@portabletext/react"

type Props = {
  blocks: PortableTextBlock[]
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
}

export function ArticlePortable({ blocks }: Props) {
  return (
    <div className="md-prose">
      <PortableText value={blocks} components={components} />
    </div>
  )
}
