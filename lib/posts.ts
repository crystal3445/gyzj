import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { groq } from "next-sanity"
import { getSanityClient, isSanityEnabled } from "@/lib/sanity/client"

const postsDirectory = path.join(process.cwd(), "content/posts")

export type PostFrontmatter = {
  title: string
  date: string
  description?: string
  draft?: boolean
}

export type PostListItem = {
  slug: string
  frontmatter: PostFrontmatter
}

const postsIndexQuery = groq`
  *[_type == "post" && published == true && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    "date": publishedAt,
    "description": excerpt
  }
`

const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && published == true][0]{
    title,
    publishedAt,
    excerpt,
    body,
    "slug": slug.current
  }
`

function getPostSlugsLocal(): string[] {
  if (!fs.existsSync(postsDirectory)) return []
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
}

function getPostBySlugLocal(slug: string): {
  slug: string
  frontmatter: PostFrontmatter
  content: string
} | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null
  const raw = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(raw)
  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
  }
}

function getAllPostsLocal(): PostListItem[] {
  return getPostSlugsLocal()
    .map((slug) => getPostBySlugLocal(slug))
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .filter((p) => !p.frontmatter.draft)
    .map(({ slug, frontmatter }) => ({ slug, frontmatter }))
}

function toIsoDate(value: unknown): string {
  if (value == null) return new Date().toISOString()
  if (typeof value === "string") return value
  return new Date(value as string).toISOString()
}

async function getAllPostsSanity(): Promise<PostListItem[]> {
  const client = getSanityClient()
  if (!client) return []
  try {
    const rows = await client.fetch<
      {
        slug: string
        title: string
        date: string
        description?: string | null
      }[]
    >(postsIndexQuery)
    return rows.map((row) => ({
      slug: row.slug,
      frontmatter: {
        title: row.title,
        date: toIsoDate(row.date),
        description: row.description ?? undefined,
      },
    }))
  } catch (e) {
    console.error("[posts] Sanity fetch failed:", e)
    return []
  }
}

function mergeBySlug(
  sanityPosts: PostListItem[],
  localPosts: PostListItem[]
): PostListItem[] {
  const map = new Map<string, PostListItem>()
  for (const p of localPosts) map.set(p.slug, p)
  for (const p of sanityPosts) map.set(p.slug, p)
  return Array.from(map.values()).sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  )
}

export async function getAllPosts(): Promise<PostListItem[]> {
  const local = getAllPostsLocal()
  if (!isSanityEnabled()) return local
  const remote = await getAllPostsSanity()
  return mergeBySlug(remote, local)
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts()
  return posts.map((p) => p.slug)
}

export async function getPostBySlug(
  slug: string
): Promise<{
  slug: string
  frontmatter: PostFrontmatter
  content: string
} | null> {
  if (isSanityEnabled()) {
    const client = getSanityClient()
    if (client) {
      try {
        const doc = await client.fetch<{
          title: string
          publishedAt: string
          excerpt?: string | null
          body?: string | null
          slug: string
        } | null>(postBySlugQuery, { slug })
        if (doc) {
          return {
            slug: doc.slug,
            frontmatter: {
              title: doc.title,
              date: toIsoDate(doc.publishedAt),
              description: doc.excerpt ?? undefined,
            },
            content: doc.body ?? "",
          }
        }
      } catch (e) {
        console.error("[posts] Sanity single fetch failed:", e)
      }
    }
  }
  const local = getPostBySlugLocal(slug)
  if (!local || local.frontmatter.draft) return null
  return local
}
