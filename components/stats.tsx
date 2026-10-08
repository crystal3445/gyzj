"use client"

import { useInView } from "@/hooks/use-in-view"
import { useEffect, useState } from "react"

const stats = [
  { number: 8, suffix: "万亩", label: "联合种植基地" },
  { number: 100, suffix: "+", label: "品类产品" },
  { number: 7, suffix: "大", label: "上游供应链" },
  { number: 20, suffix: "+", label: "省级运营中心" },
]

const statsExtended: Array<{
  number: number
  suffix: string
  label: string
  decimals?: number
  noSeparator?: boolean
}> = [
  { number: 10, suffix: "余个", label: "海外国家" },
  { number: 4000, suffix: "+", label: "专营门店落地" },
  { number: 1.2, suffix: "w+", label: "灸疗师专业认证", decimals: 1 },
  { number: 2300, suffix: "w+", label: "终端用户触达", noSeparator: true },
]

function AnimatedNumber({
  target,
  suffix,
  decimals = 0,
  noSeparator = false,
}: {
  target: number
  suffix: string
  decimals?: number
  noSeparator?: boolean
}) {
  const [current, setCurrent] = useState(0)
  const { ref, isInView } = useInView({ threshold: 0.5 })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const increment = target / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      if (currentStep >= steps) {
        setCurrent(target)
        clearInterval(timer)
      } else {
        const value = decimals > 0
          ? increment * currentStep
          : Math.floor(increment * currentStep)
        setCurrent(value)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, target, decimals])

  const display = noSeparator
    ? current.toFixed(decimals)
    : current.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export function Stats() {
  const { ref, isInView } = useInView()

  return (
    <section
      className="py-12 md:py-16 relative overflow-hidden"
      style={{ backgroundColor: "#5B8A70" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/field-aerial.jpg"
          alt="艾草种植基地"
          className="w-full h-full object-cover opacity-15"
        />
      </div>
      {/* 顶部米黄渐变，与上方首屏自然衔接 */}
      <div
        className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #F5EDD8, rgba(245,237,216,0))" }}
      />
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-1000 relative z-10 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Section Title */}
        <div className="text-center mb-14">
          <h2
            className="font-serif text-5xl md:text-6xl mb-6"
            style={{
              color: "#FFFFFF",
              fontWeight: 900,
              textShadow: "0 2px 8px rgba(0,0,0,0.28)",
              letterSpacing: "0.04em",
            }}
          >
            国医仲景
          </h2>
          <p
            className="max-w-4xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.95)", textShadow: "0 1px 6px rgba(0,0,0,0.25)" }}
          >
            国医仲景是一个艾灸馆连锁品牌，定位【社区康养门店】，运营成本低，客流稳定，复购高，目前全国有4000+门店。
          </p>
          <p
            className="max-w-4xl mx-auto leading-relaxed mt-2"
            style={{ color: "rgba(255,255,255,0.95)", textShadow: "0 1px 6px rgba(0,0,0,0.25)" }}
          >
            品牌致力于服务每一个认可中医文化，热爱养生，想要创业开店的伙伴，最终实现“艾进万家，天下无疾”的大愿。
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-500 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className="font-serif text-5xl md:text-6xl lg:text-7xl mb-3 leading-none"
                style={{
                  color: "#FFFFFF",
                  fontWeight: 900,
                  textShadow: "0 3px 12px rgba(0,0,0,0.35)",
                }}
              >
                <AnimatedNumber target={stat.number} suffix="" />
                <span className="text-2xl md:text-3xl ml-1" style={{ fontWeight: 800 }}>
                  {stat.suffix}
                </span>
              </div>
              <div
                className="text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.92)", textShadow: "0 1px 6px rgba(0,0,0,0.3)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Extended Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-14">
          {statsExtended.map((stat, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-500 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${(index + 6) * 100}ms` }}
            >
              <div
                className="font-serif text-5xl md:text-6xl lg:text-7xl mb-3 leading-none"
                style={{
                  color: "#FFFFFF",
                  fontWeight: 900,
                  textShadow: "0 3px 12px rgba(0,0,0,0.35)",
                }}
              >
                <AnimatedNumber
                  target={stat.number}
                  suffix=""
                  decimals={stat.decimals ?? 0}
                  noSeparator={stat.noSeparator ?? false}
                />
                <span className="text-2xl md:text-3xl ml-1" style={{ fontWeight: 800 }}>
                  {stat.suffix}
                </span>
              </div>
              <div
                className="text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.92)", textShadow: "0 1px 6px rgba(0,0,0,0.3)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
