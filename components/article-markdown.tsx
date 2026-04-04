import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type Props = {
  content: string
}

export function ArticleMarkdown({ content }: Props) {
  return (
    <div className="md-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}
