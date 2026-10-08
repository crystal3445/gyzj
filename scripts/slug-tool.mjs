#!/usr/bin/env node
/**
 * 官网 Sanity 文章查重 / 删除工具（零依赖，REST API）
 * 用法：
 *   node scripts/slug-tool.mjs --list                     # 列出全站重复 slug
 *   node scripts/slug-tool.mjs --slug <slug>              # 列出某 slug 的全部文档
 *   node scripts/slug-tool.mjs --slug <slug> --keep-newest # 同 slug 只保留最新一篇，其余删除
 *   node scripts/slug-tool.mjs --id <docId> --delete       # 按文档 id 删除单篇
 *
 * 背景：整篇重发会 create 出新文档，产生同 slug 重复（旧副本需手动删）。
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

const env = loadEnv()
const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || "production"
const token = env.SANITY_API_TOKEN
if (!projectId || !token) throw new Error("缺少 NEXT_PUBLIC_SANITY_PROJECT_ID 或 SANITY_API_TOKEN（.env.local）")
const base = `https://${projectId}.api.sanity.io/v1`
const headers = { Authorization: `Bearer ${token}` }

async function query(groq, params = {}) {
  let url = `${base}/data/query/${dataset}?query=${encodeURIComponent(groq)}`
  for (const [k, v] of Object.entries(params)) {
    url += `&$${k}=${encodeURIComponent(JSON.stringify(v))}`
  }
  const res = await fetch(url, { headers })
  const body = await res.json()
  if (!res.ok) throw new Error(`${res.status}: ${JSON.stringify(body).slice(0, 300)}`)
  return body.result
}

async function mutate(mutations) {
  const res = await fetch(`${base}/data/mutate/${dataset}`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations }),
  })
  const body = await res.json()
  if (!res.ok) throw new Error(`${res.status}: ${JSON.stringify(body).slice(0, 300)}`)
  return body
}

function arg(name) {
  const i = process.argv.indexOf(`--${name}`)
  return i === -1 ? null : process.argv[i + 1]
}
const has = (name) => process.argv.includes(`--${name}`)

const slug = arg("slug")
const id = arg("id")

if (has("list")) {
  const rows = await query(
    `*[_type=="post" && defined(slug.current)]{ "slug": slug.current, _id, _createdAt, title } | order(slug asc)`
  )
  const map = new Map()
  for (const r of rows) map.set(r.slug, [...(map.get(r.slug) || []), r])
  const dups = [...map.entries()].filter(([, v]) => v.length > 1)
  console.log(`总文章: ${rows.length} 篇；重复 slug: ${dups.length} 组`)
  for (const [s, v] of dups) {
    console.log(`\n● ${s}（${v.length} 篇）`)
    for (const r of v) console.log(`   ${r._id}  ${r._createdAt}  ${r.title || ""}`)
  }
} else if (slug) {
  const rows = await query(
    `*[_type=="post" && slug.current==$slug]{_id,_createdAt,_updatedAt,title} | order(_createdAt desc)`,
    { slug }
  )
  const vars = ""
  console.log(`slug=${slug} 共 ${rows.length} 篇：`)
  for (const r of rows) console.log(`   ${r._id}  创建 ${r._createdAt}  更新 ${r._updatedAt}  ${r.title || ""}`)
  if (has("keep-newest")) {
    const drop = rows.slice(1)
    if (!drop.length) {
      console.log("无需删除（只有 1 篇）")
    } else {
      await mutate(drop.map((r) => ({ delete: { id: r._id } })))
      console.log(`已删除 ${drop.length} 篇旧副本: ${drop.map((r) => r._id).join(", ")}`)
    }
  }
} else if (id && has("delete")) {
  await mutate([{ delete: { id } }])
  console.log(`已删除 ${id}`)
} else {
  console.log("用法见文件头注释")
}
