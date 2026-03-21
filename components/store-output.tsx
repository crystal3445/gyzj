"use client"

import { useInView } from "@/hooks/use-in-view"
import { Target, Zap, Store, LayoutGrid, Package, GraduationCap } from "lucide-react"

const outputItems = [
  {
    number: "01",
    title: "门店定位",
    description: "专注艾熏的健康养生体验空间，社区型康养连锁品牌",
    icon: Target,
    details: ["健体养生调理空间", "文化传承体验空间", "国医国学学习空间", "邻里关系舒压空间"],
  },
  {
    number: "02",
    title: "项目优势",
    description: "标准化、连锁化、专业化、复制快",
    icon: Zap,
    details: ["社区客流量稳定", "邻里口碑生意", "镇店爆品助力", "多维度门店赋能"],
  },
  {
    number: "03",
    title: "门店形象",
    description: "120㎡左右，是艾灸之家标准店最佳空间模型",
    icon: Store,
    details: ["标准店面积120㎡", "2张灸床配置", "基础员工2人", "品字型布局"],
  },
  {
    number: "04",
    title: "门店复制模型",
    description: "品字型布局，大社区连锁，单店盈利模型打造",
    icon: LayoutGrid,
    details: ["员工共享", "客源共享", "产品共享", "标准化复制"],
  },
  {
    number: "05",
    title: "产品体系",
    description: "以非遗艾绒为核心，1+N产品体系，打造流量型极致大单品",
    icon: Package,
    details: ["灸床-引流拓客", "温养罐套-留客跑量", "古方御养膏-升单盈利", "艾灸沙发-居家增收"],
  },
  {
    number: "06",
    title: "培训帮扶",
    description: "完善教育培训体系，赋能人才培养",
    icon: GraduationCap,
    details: ["最美灸师培训", "最美华草人", "艾传承书院", "区域带教/下店商扶"],
  },
]

export function StoreOutput() {
  const { ref, isInView } = useInView()

  return (
    <section id="output" className="py-20 md:py-28">
      <div ref={ref} className="container mx-auto px-4">
        {/* Section Title */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            整店运营
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-4" />
          <p className="text-foreground/70 max-w-2xl mx-auto">
            华草香艾·艾灸之家，以用户为中心，打造有人情·有温情·暖人心的健康养生体验空间
          </p>
        </div>

        {/* Output Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outputItems.map((item, index) => (
            <div
              key={item.number}
              className={`group bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Number badge */}
              <div className="flex items-start justify-between mb-4">
                <span className="font-serif text-4xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                  {item.number}
                </span>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-foreground/70 text-sm mb-4">{item.description}</p>

              {/* Details */}
              {item.details && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                  {item.details.map((detail, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-background rounded text-secondary"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
