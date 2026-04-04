"use client"

import { usePathname } from "next/navigation"
import { OfficialAccountLink } from "@/components/official-account-link"

export function Footer() {
  const pathname = usePathname()
  const resolveHref = (href: string) => {
    if (href.startsWith("/")) return href
    if (pathname === "/") return href
    return "/" + href
  }

  return (
    <footer className="bg-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/images/logo.jpg" 
                alt="国医仲景" 
                className="w-12 h-12 object-contain"
              />
              <span className="font-serif text-xl font-bold text-background">国医仲景</span>
            </div>
            <p className="text-background/60 text-sm leading-relaxed mb-4">
              河南国医华草健康产业集团有限公司，非遗艾绒，始于1905，四代传承中医智慧，致力于打造艾灸行业知名国民品牌。
            </p>
            <p className="text-background/60 text-sm">
              使命：艾进万家 使命必达
            </p>
          </div>

          {/* Quick Links - 2 columns grid */}
          <div>
            <h4 className="font-serif text-lg font-bold text-background mb-4">快速导航</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {[
                { label: "品牌介绍", href: "#brand" },
                { label: "合作模式", href: "#cooperation" },
                { label: "整店运营", href: "#output" },
                { label: "合作流程", href: "#process" },
                { label: "品牌优势", href: "#advantages" },
                { label: "资讯动态", href: "/news" },
                { label: "合作咨询", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.label + link.href}
                  href={resolveHref(link.href)}
                  className="text-background/60 hover:text-primary transition-colors text-sm py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-bold text-background mb-4">联系我们</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-primary whitespace-nowrap">合作热线：</span>
                <a href="tel:18768189822" className="text-background hover:text-primary transition-colors font-medium">
                  187-6818-9822
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary whitespace-nowrap">公众号：</span>
                <OfficialAccountLink className="text-background/80 hover:text-primary transition-colors underline-offset-2 hover:underline" />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/40 text-sm text-center md:text-left">
              © 2025 国医仲景. All rights reserved. 河南国医华草健康产业集团有限公司
            </p>
            <div className="flex items-center gap-4 text-background/40 text-sm">
              <span>中国好艾 华草香艾</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
