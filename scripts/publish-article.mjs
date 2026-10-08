#!/usr/bin/env node
/**
 * 官网文章自动发布脚本（Sanity REST API 版，零依赖）
 * 用法：
 *   node scripts/publish-article.mjs <markdown文件> [--title "标题"] [--slug url别名]
 *        [--excerpt "摘要"] [--pin] [--draft] [--date ISO时间] [--keyword "搜索词"]
 *
 * 排版映射（Markdown → 官网 Portable Text）：
 *   ##   → 二级标题      ###  → 三级标题
 *   **x**→ 加粗          *x*  → 斜体
 *   >    → 引用块        - / * → 项目符号列表
 *   1.   → 编号列表      ![alt](本地路径) → 上传图片并配 alt（图注留空）
 *
 * SEO 图片规则：
 *   - 所有图片（含二维码）的 alt 固定格式：「国医仲景艾灸馆加盟」+ 当篇文章的搜索词（--keyword / frontmatter keyword）
 *   - 图注（caption）留空，不在文章页面显示 SEO 词
 *   - 不写「扫码咨询微信加盟」这类营销话术
 */
import fs from "node:fs"
import path from "node:path"

function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local")
  const env = {}
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
      if (line.trim().startsWith("#")) continue
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (m) env[m[1]] = m[2]
    }
  }
  return env
}

function parseArgs(argv) {
  const args = { _: [] }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a.startsWith("--")) {
      const key = a.slice(2)
      if (key === "pin" || key === "draft") args[key] = true
      else args[key] = argv[++i]
    } else args._.push(a)
  }
  return args
}

function randKey() {
  return Math.random().toString(36).slice(2, 10)
}

/** 行内解析：**加粗** *斜体* [链接](url) → Sanity spans + markDefs */
function textBlock(style, text) {
  const children = []
  const markDefs = []
  const re = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(\[([^\]]+)\]\(([^)\s]+)\))/g
  let last = 0
  let m
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) children.push({ _type: "span", marks: [], text: text.slice(last, m.index), _key: randKey() })
    if (m[2] !== undefined) children.push({ _type: "span", marks: ["strong"], text: m[2], _key: randKey() })
    else if (m[4] !== undefined) children.push({ _type: "span", marks: ["em"], text: m[4], _key: randKey() })
    else if (m[6] !== undefined) {
      const key = randKey()
      markDefs.push({ _key: key, _type: "link", href: m[7] })
      children.push({ _type: "span", marks: [key], text: m[6], _key: randKey() })
    }
    last = re.lastIndex
  }
  if (last < text.length) children.push({ _type: "span", marks: [], text: text.slice(last), _key: randKey() })
  return {
    _type: "block",
    _key: randKey(),
    style,
    markDefs,
    children: children.length ? children : [{ _type: "span", text: "", marks: [], _key: randKey() }],
  }
}

function slugify(title, fallback) {
  let s = (title || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90)
  if (!s || /^-+$/.test(s)) s = fallback
  return s
}

function makeApi(env) {
  const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = env.NEXT_PUBLIC_SANITY_DATASET || "production"
  const token = env.SANITY_API_TOKEN
  if (!projectId || !token) throw new Error("缺少 NEXT_PUBLIC_SANITY_PROJECT_ID 或 SANITY_API_TOKEN（.env.local）")
  const base = `https://${projectId}.api.sanity.io/v1`
  const headers = { Authorization: `Bearer ${token}` }

  async function fetchJson(url, opts) {
    const res = await fetch(url, opts)
    const body = await res.json()
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${JSON.stringify(body).slice(0, 300)}`)
    return body
  }

  return {
    dataset,
    async query(groq) {
      return fetchJson(`${base}/data/query/${dataset}?query=${encodeURIComponent(groq)}`, { headers })
    },
    async mutate(doc) {
      return fetchJson(`${base}/data/mutate/${dataset}`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ mutations: [doc] }),
      })
    },
    async uploadImage(filePath) {
      const buf = fs.readFileSync(filePath)
      const mime = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".gif": "image/gif", ".webp": "image/webp", ".avif": "image/avif" }[path.extname(filePath).toLowerCase()] || "image/jpeg"
      const d = await fetchJson(`${base}/assets/images/${dataset}?filename=${encodeURIComponent(path.basename(filePath))}`, {
        method: "POST",
        headers: { ...headers, "Content-Type": mime },
        body: buf,
      })
      const doc = d.document || d
      if (!doc || !doc._id) throw new Error(`图片上传返回异常: ${JSON.stringify(d).slice(0, 200)}`)
      return doc
    },
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const file = args._[0]
  if (!file) {
    console.error("用法: node scripts/publish-article.mjs <markdown文件> [--title 标题] [--slug 别名] [--excerpt 摘要] [--keyword 搜索词] [--pin] [--draft] [--date ISO时间]")
    process.exit(1)
  }
  const abs = path.resolve(file)
  const md = fs.readFileSync(abs, "utf8")

  let body = md
  let fm = {}
  const fmMatch = md.match(/^---\n([\s\S]*?)\n---\n?/)
  if (fmMatch) {
    body = md.slice(fmMatch[0].length)
    for (const line of fmMatch[1].split("\n")) {
      const kv = line.match(/^([A-Za-z_]+)\s*:\s*(.*)$/)
      if (kv) fm[kv[1]] = kv[2].replace(/^["']|["']$/g, "")
    }
  }

  const api = makeApi(loadEnv())

  const title = args.title || fm.title
  if (!title) {
    console.error("缺少标题：请用 --title 或在 frontmatter 里写 title")
    process.exit(1)
  }
  const keyword = args.keyword || fm.keyword || ""
  if (!keyword) console.warn("⚠️ 未指定 --keyword 或 frontmatter keyword，图片 alt 将使用 Markdown 原 alt 文本（不利于 SEO 加权）")
  const publishedAt = args.date || fm.publishedAt || (fm.date ? `${fm.date}T09:00:00+08:00` : new Date().toISOString())
  const fallbackSlug = `post-${publishedAt.slice(0, 10).replace(/-/g, "")}`
  const slug = slugify(args.slug || fm.slug, fallbackSlug)

  // 解析正文块
  const lines = body.split("\n")
  const blocks = []
  let para = []
  let quote = []
  const flushPara = () => {
    if (para.length) {
      blocks.push(textBlock("normal", para.join(" ")))
      para = []
    }
  }
  const flushQuote = () => {
    if (quote.length) {
      blocks.push(textBlock("blockquote", quote.join(" ")))
      quote = []
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.replace(/\s+$/, "")
    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/)
    if (imgMatch) {
      flushPara()
      flushQuote()
      const imgPath = path.resolve(path.dirname(abs), imgMatch[2])
      if (!fs.existsSync(imgPath)) {
        console.error(`图片不存在，跳过: ${imgPath}`)
        continue
      }
      console.log(`上传图片: ${path.basename(imgPath)}`)
      const asset = await api.uploadImage(imgPath)
      // alt 固定格式：国医仲景艾灸馆加盟 + 当篇搜索词（2026-08-28 用户定稿）
      const imgAlt = keyword ? `国医仲景艾灸馆加盟${keyword}` : (imgMatch[1] || path.basename(imgPath, path.extname(imgPath)))
      blocks.push({
        _type: "image",
        _key: randKey(),
        asset: { _type: "reference", _ref: asset._id },
        alt: imgAlt,
        caption: "",
      })
      continue
    }
    if (/^\s*$/.test(line)) {
      flushPara()
      flushQuote()
      continue
    }
    const h = line.match(/^(#{1,3})\s+(.*)$/)
    if (h) {
      flushPara()
      flushQuote()
      blocks.push(textBlock(h[1].length <= 2 ? "h2" : "h3", h[2]))
      continue
    }
    const q = line.match(/^>\s?(.*)$/)
    if (q) {
      flushPara()
      quote.push(q[1])
      continue
    }
    flushQuote()
    const ul = line.match(/^[-*]\s+(.*)$/)
    if (ul) {
      flushPara()
      const b = textBlock("normal", ul[1])
      b.listItem = "bullet"
      b.level = 1
      blocks.push(b)
      continue
    }
    const ol = line.match(/^\d+[.、]\s+(.*)$/)
    if (ol) {
      flushPara()
      const b = textBlock("normal", ol[1])
      b.listItem = "number"
      b.level = 1
      blocks.push(b)
      continue
    }
    para.push(line.trim())
  }
  flushPara()
  flushQuote()

  const excerpt = args.excerpt || fm.excerpt || fm.description || ""

  const doc = {
    _type: "post",
    title,
    slug: { _type: "slug", current: slug },
    publishedAt,
    excerpt,
    content: blocks,
    published: !args.draft,
    pinned: !!args.pin,
  }

  await api.mutate({ create: doc })
  let docId = "未知"
  for (let i = 0; i < 3; i++) {
    await new Promise((r) => setTimeout(r, 1500))
    const lookup = await api.query(`*[_type == "post" && slug.current == "${slug}"][0]{_id}`)
    if (lookup?.result?.[0]?._id) {
      docId = lookup.result[0]._id
      break
    }
  }
  console.log("发布成功 ✅")
  console.log(`  文档ID: ${docId}`)
  console.log(`  状态: ${args.draft ? "草稿（官网不展示，后台可见）" : "已发布（官网展示）"}`)
  console.log(`  关键词: ${keyword || "未指定"}`)
  console.log(`  官网地址: https://gyzjhcxa.com/news/${slug} （约 1-2 分钟后可见）`)
  console.log(`  后台编辑: https://gyzjhcxa.com/studio/desk/post`)
}

main().catch((e) => {
  console.error("发布失败:", e.message)
  process.exit(1)
})
