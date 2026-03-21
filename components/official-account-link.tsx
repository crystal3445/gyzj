"use client"

import { useState } from "react"

/**
 * 点击「华草视界」后弹出二维码，适配“只有二维码、没有稳定链接”的公众号场景。
 * 可选配置：
 * NEXT_PUBLIC_WECHAT_QR_IMAGE=/images/wechat-qr.png
 * NEXT_PUBLIC_WECHAT_OFFICIAL_URL=https://mp.weixin.qq.com/...（若有可用链接则显示备用按钮）
 */
export function OfficialAccountLink({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const qrImage = process.env.NEXT_PUBLIC_WECHAT_QR_IMAGE?.trim() || "/images/wechat-qr.png"
  const url = process.env.NEXT_PUBLIC_WECHAT_OFFICIAL_URL?.trim()

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
        aria-label="打开公众号二维码"
      >
        华草视界
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-card border border-border p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl font-bold text-foreground">关注官方公众号</h3>
              <button
                type="button"
                className="text-foreground/60 hover:text-foreground"
                onClick={() => setOpen(false)}
                aria-label="关闭"
              >
                关闭
              </button>
            </div>

            <img
              src={qrImage}
              alt="华草视界公众号二维码"
              className="mx-auto w-56 h-56 object-contain rounded-md border border-border bg-background"
            />
            <p className="text-center text-sm text-foreground/70 mt-3">
              请使用微信扫一扫，关注「华草视界」
            </p>

            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full justify-center rounded-md border border-border px-3 py-2 text-sm text-foreground hover:bg-background"
              >
                备用：打开公众号链接
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}
