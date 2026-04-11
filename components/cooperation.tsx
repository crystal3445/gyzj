"use client"

import { useInView } from "@/hooks/use-in-view"
import { Store, Building, TrendingUp, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

type CooperationMode = {
  icon: LucideIcon
  level: string
  price: string
  description: string
  features: string[]
  highlight: boolean
  backgroundImage?: string
}

const cooperationModes: CooperationMode[] = [
  {
    icon: Store,
    level: "罐法合作店",
    price: "8900元",
    description: "适合已有门店老板嫁接，轻资产快速上手",
    features: [
      "门店净利润100%归加盟商",
      "适合已有门店老板嫁接",
      "大品牌供给流量",
      "全程运营指导",
    ],
    highlight: false,
    backgroundImage: "/images/guanf-hezuo-bg.png",
  },
  {
    icon: Building,
    level: "标准店",
    price: "44,900元",
    description: "120㎡标准店，2张床，员工2人，含14万+零售价产品礼包",
    features: [
      "门店净利润100%归加盟商",
      "价值14万+产品礼包",
      "最美灸师培训",
      "1公里区域保护",
    ],
    highlight: true,
  },
  {
    icon: TrendingUp,
    level: "形象店",
    price: "147900元",
    description: "签约区域收益，享受更多权益",
    features: [
      "门店净利润+复购差价",
      "签约区域收益",
      "更大区域保护",
      "专属运营支持",
    ],
    highlight: false,
  },
]

export function Cooperation() {
  const { ref, isInView } = useInView()

  const scrollToContact = () => {
    const element = document.querySelector("#contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="cooperation" className="py-20 md:py-28">
      <div ref={ref} className="container mx-auto px-4">
        {/* Section Title */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            加盟模式
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-4" />
          <p className="text-foreground/70 max-w-2xl mx-auto">
            多层级加盟体系，满足不同投资需求
          </p>
        </div>

        {/* Cooperation Modes */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {cooperationModes.map((mode, index) => {
            const Icon = mode.icon
            return (
            <div
              key={index}
              className={`relative border rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl ${
                mode.backgroundImage ? "bg-transparent" : "bg-card"
              } ${
                mode.highlight
                  ? "border-primary shadow-lg scale-105 md:scale-110"
                  : "border-border hover:-translate-y-1"
              } ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {mode.backgroundImage ? (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(rgba(250, 244, 232, 0.88), rgba(250, 244, 232, 0.92)), url(${mode.backgroundImage})`,
                  }}
                />
              ) : null}

              {/* Highlight badge */}
              {mode.highlight && (
                <div className="absolute top-0 right-0 z-20 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg">
                  推荐
                </div>
              )}

              <div className="relative z-10 p-6 md:p-8">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    mode.highlight ? "bg-primary" : "bg-primary/10"
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 ${
                      mode.highlight ? "text-primary-foreground" : "text-primary"
                    }`}
                  />
                </div>

                {/* Content */}
                <h3 className="font-serif text-2xl font-bold text-foreground text-center mb-2">
                  {mode.level}
                </h3>
                <div className="text-center mb-3">
                  <span className="text-primary font-bold text-xl">{mode.price}</span>
                </div>
                <p className="text-foreground/70 text-center text-sm mb-6">
                  {mode.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {mode.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  onClick={scrollToContact}
                  className={`w-full ${
                    mode.highlight
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-background hover:bg-primary/10 text-foreground border border-border"
                  }`}
                >
                  了解详情
                </Button>
              </div>
            </div>
            )
          })}
        </div>

        {/* Cost Reference */}
        <div
          className={`max-w-4xl mx-auto bg-card border border-border rounded-xl p-6 md:p-8 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <h3 className="font-serif text-xl font-bold text-foreground text-center mb-6">
            标准店经营投入参考
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-primary font-bold mb-3">一次性投入</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li className="flex justify-between">
                  <span>首批套餐费</span>
                  <span className="text-foreground font-medium">44,900元</span>
                </li>
                <li className="flex justify-between">
                  <span>市场保证金（可退）</span>
                  <span className="text-foreground font-medium">5,000元</span>
                </li>
                <li className="flex justify-between">
                  <span>线上运营保证金</span>
                  <span className="text-foreground font-medium">3,000元</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-primary font-bold mb-3">包含内容</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>价值14万+品牌零售价产品礼包</li>
                <li>品牌授权书</li>
                <li>最美灸师培训（不培训不发货）</li>
                <li>门店平面布局/文宣设计</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-foreground/50 mt-4 text-center">
            * 不包含门店租金、装修、耗材、人员等费用
          </p>
        </div>
      </div>
    </section>
  )
}
