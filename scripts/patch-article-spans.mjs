#!/usr/bin/env node
/**
 * patch-spans.mjs — 按 slug 拉取线上文章，对 span 文本和 excerpt 做「旧→新」替换后写回（保留图片块）
 * 用法: node patch-spans.mjs <mapping.json>  （mapping: { slug: [[old,new],...] }）
 */
import fs from "node:fs"
import path from "node:path"

function loadEnv() {
  const envPath = path.resolve("/Users/tuya/Documents/investment-site", ".env.local")
  const env = {}
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/)
    if (m) env[m[1]] = m[2]
  }
  return env
}

const mapping = JSON.parse(fs.readFileSync(process.argv[2], "utf8"))
const env = loadEnv()
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || "production"
const base = `https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1`
const headers = { Authorization: `Bearer ${env.SANITY_API_TOKEN}` }
const j = async (url, opts) => {
  const res = await fetch(url, opts)
  const b = await res.json()
  if (!res.ok) throw new Error(`${res.status}: ${JSON.stringify(b).slice(0, 200)}`)
  return b
}

function applyPairs(s, pairs) {
  let out = s, hit = 0
  for (const [o, n] of pairs) {
    if (out.includes(n)) { /* 已是新值 */ }
    else if (out.includes(o)) { out = out.split(o).join(n); hit++ }
  }
  return [out, hit]
}

for (const [slug, pairs] of Object.entries(mapping)) {
  const q = `*[_type == "post" && slug.current == "${slug}"][0]{_id, excerpt, content}`
  const { result: doc } = await j(`${base}/data/query/${dataset}?query=${encodeURIComponent(q)}`, { headers })
  if (!doc) { console.log(`SKIP ${slug}: 未找到`); continue }

  let hits = 0
  let [excerpt, e1] = applyPairs(doc.excerpt || "", pairs); hits += e1
  const content = (doc.content || []).map(block => {
    if (block._type !== "block" || !block.children) return block
    return { ...block, children: block.children.map(ch => {
      if (ch._type !== "span" || !ch.text) return ch
      const [t, h] = applyPairs(ch.text, pairs); hits += h
      return { ...ch, text: t }
    }) }
  })
  if (hits === 0) { console.log(`SKIP ${slug}: 无命中（已是新值）`); continue }
  await j(`${base}/data/mutate/${dataset}`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ patch: { id: doc._id, set: { content, excerpt } } }] }),
  })
  console.log(`patched ${slug} (${doc._id}) 替换 ${hits} 处`)
}
console.log("全部完成")
