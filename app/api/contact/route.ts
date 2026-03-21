import { NextResponse } from "next/server"
import { z } from "zod"
import { appendFile, mkdir } from "node:fs/promises"
import path from "node:path"

const ContactSchema = z.object({
  name: z.string().min(1).max(50),
  phone: z.string().min(6).max(30),
  targetCity: z.string().min(1).max(50),
  industry: z.string().min(1).max(100),
  hasStore: z.enum(["是", "否"]),
  storeProblem: z.string().max(500).optional().default(""),
  preferGrafting: z.string().max(50).optional().default(""),
  consent: z.literal(true),
})

export async function POST(req: Request) {
  let json: unknown
  try {
    json = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = ContactSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    )
  }

  // 如果“没有门店”，则忽略对应的描述字段（仍允许为空字符串）
  if (parsed.data.hasStore === "否") {
    parsed.data.storeProblem = ""
    parsed.data.preferGrafting = ""
  }

  const payload = {
    ...parsed.data,
    createdAt: new Date().toISOString(),
    // 尽可能取到客户端 IP（部署到 Vercel/NGINX 时通常会有这些头）
    ip:
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      undefined,
    userAgent: req.headers.get("user-agent") || undefined,
  }

  // 始终落地保存一次提交内容，避免 webhook 不可用时用户提交丢失
  try {
    const dataDir = path.join(process.cwd(), "data")
    await mkdir(dataDir, { recursive: true })
    const record = { ...payload }
    await appendFile(path.join(dataDir, "contact-submissions.jsonl"), JSON.stringify(record) + "\n", "utf8")
  } catch (err) {
    console.error("[contact form local save failed]", err)
  }

  // 你可以在 .env.local 配置 CONTACT_WEBHOOK_URL，把数据转发给你的系统
  // 例如：企业微信/飞书 webhook、自建后端、Zapier/Make 等
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL
  /** 飞书群机器人若开启「关键词」安全设置，消息里必须包含该词（与飞书后台配置完全一致） */
  const feishuKeyword = process.env.FEISHU_WEBHOOK_KEYWORD?.trim()

  let delivered = false
  let deliveryError: string | undefined

  if (webhookUrl) {
    const { name, phone, targetCity, industry, hasStore, storeProblem, preferGrafting, createdAt } = payload
    const fields: [string, string][] = [
      ["姓名", name],
      ["联系电话", phone],
      ["计划开店城市", targetCity],
      ["所在行业", industry],
      ["是否有门店", hasStore],
      ...(hasStore === "是" && storeProblem ? [["门店主要问题", storeProblem] as [string, string]] : []),
      ...(hasStore === "是" && preferGrafting ? [["倾向嫁接方案", preferGrafting] as [string, string]] : []),
      ["提交时间", new Date(createdAt).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })],
    ]

    // 标题与正文首行都带上关键词，避免飞书返回 code 19024（Key Words Not Found）
    const title = feishuKeyword
      ? `${feishuKeyword} 📋 新招商咨询`
      : "📋 新招商咨询"
    // 飞书 post.zh_cn.content 必须是「段落数组」：每一行是一个内层数组，元素为富文本片段
    // 扁平的 [{tag,text},...] 会报 19002 unknown content value
    const postContent = fields.map(([label, value], i) => {
      const text =
        i === 0 && feishuKeyword
          ? `${feishuKeyword} ${label}：${value}`
          : `${label}：${value}`
      return [{ tag: "text" as const, text }]
    })

    try {
      const feishuRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          msg_type: "post",
          content: {
            post: {
              zh_cn: {
                title,
                content: postContent,
              },
            },
          },
        }),
      })

      const feishuBody = await feishuRes.text()
      let feishuCode: number | undefined
      let feishuMsg: string | undefined
      try {
        const parsed = JSON.parse(feishuBody) as { code?: number; msg?: string }
        feishuCode = parsed.code
        feishuMsg = parsed.msg
      } catch {
        // 非 JSON 时仅看 HTTP 状态
      }

      // 飞书常返回 HTTP 200，但 body 里 code !== 0 表示未真正投递（如关键词、签名校验失败）
      if (feishuRes.ok && feishuCode === 0) {
        delivered = true
      } else if (feishuRes.ok && typeof feishuCode === "number" && feishuCode !== 0) {
        deliveryError = `Feishu: ${feishuMsg ?? "error"} (code ${feishuCode})`
      } else if (!feishuRes.ok) {
        deliveryError = `Webhook HTTP ${feishuRes.status}${feishuMsg ? `: ${feishuMsg}` : ""}`
      } else {
        deliveryError = feishuMsg ?? "Unknown Feishu response"
      }
      console.log("[feishu webhook]", feishuRes.status, feishuBody)
    } catch (err) {
      deliveryError = err instanceof Error ? `${err.name}: ${err.message}` : "Unknown webhook error"
      console.error("[feishu webhook error]", deliveryError)
    }
  } else {
    // 没配置 webhook 时仍然保证“提交成功”，但你需要去服务器日志里查看提交内容
    // （这是为了避免用户体验受影响）
    console.log("[contact form submission]", payload)
  }

  return NextResponse.json({ ok: true, delivered, deliveryError })
}

