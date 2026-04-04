import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts"
import { ArticleMarkdown } from "@/components/article-markdown"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) {
    return { title: "文章未找到" }
  }
  return {
    title: `${post.frontmatter.title} | 国医仲景`,
    description: post.frontmatter.description ?? post.frontmatter.title,
  }
}

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <article className="container mx-auto px-4 pt-24 pb-16 max-w-3xl">
        <Link
          href="/news"
          className="text-sm text-primary hover:underline mb-8 inline-block"
        >
          ← 返回资讯列表
        </Link>
        <header className="mb-10">
          <time
            dateTime={post.frontmatter.date}
            className="text-sm text-muted-foreground"
          >
            {format(new Date(post.frontmatter.date), "yyyy年M月d日", {
              locale: zhCN,
            })}
          </time>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">
            {post.frontmatter.title}
          </h1>
          {post.frontmatter.description ? (
            <p className="text-foreground/70 mt-4 text-lg">
              {post.frontmatter.description}
            </p>
          ) : null}
        </header>
        <ArticleMarkdown content={post.content} />
      </article>
      <Footer />
    </main>
  )
}
