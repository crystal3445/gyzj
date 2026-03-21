"use client"

import { useInView } from "@/hooks/use-in-view"
import { useEffect, useState } from "react"

const stats = [
  { number: 4, suffix: "代", label: "传承历史" },
  { number: 8, suffix: "万亩", label: "联合种植基地" },
  { number: 8000, suffix: "+", label: "连锁门店" },
  { number: 100, suffix: "+", label: "品类产品" },
  { number: 7, suffix: "大", label: "上游供应链" },
  { number: 20, suffix: "+", label: "省级运营中心" },
]

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
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
        setCurrent(Math.floor(increment * currentStep))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref}>
      {current.toLocaleString()}
      {suffix}
    </span>
  )
}

export function Stats() {
  const { ref, isInView } = useInView()

  return (
    <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/images/field-aerial.jpg" 
          alt="艾草种植基地" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-1000 relative z-10 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            品牌实力
          </h2>
          <div className="w-16 h-1 bg-primary-foreground/50 mx-auto rounded-full mb-4" />
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            三产融合 · 源头供应链 · 深度推进艾产业高质量发展
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-500 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-2">
                <AnimatedNumber target={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-primary-foreground/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
