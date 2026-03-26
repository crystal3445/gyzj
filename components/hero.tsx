"use client"

import { Button } from "@/components/ui/button"
import { useInView } from "@/hooks/use-in-view"

export function Hero() {
  const { ref, isInView } = useInView()

  const scrollToContact = () => {
    const element = document.querySelector("#contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/images/vast-field.jpg" 
          alt="艾草种植基地" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/85" />
      </div>

      <div
        ref={ref}
        className={`container mx-auto px-4 text-center relative z-10 transition-all duration-1000 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm">
            <span className="text-primary font-medium">非遗艾绒</span>
            <span className="w-1 h-1 bg-primary rounded-full" />
            <span className="text-primary font-medium">始于1905</span>
          </div>
        </div>

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img 
            src="/images/logo.jpg" 
            alt="国医仲景" 
            className="w-32 h-32 md:w-40 md:h-40 object-contain"
          />
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
          国医仲景
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl lg:text-3xl text-secondary font-medium mb-4">
          中医艾灸社区连锁康养门店
        </p>

        {/* Description */}
        <p className="text-foreground/70 text-base md:text-lg max-w-2xl mx-auto mb-4">
          专注艾熏 · 健康养生体验空间
        </p>

        {/* Tagline */}
        <p className="text-primary text-sm md:text-base font-medium mb-10">
          全程帮扶 · 生态供应链 · 低门槛创业 · 大健康创业首选
        </p>

        {/* CTA Button */}
        <Button
          onClick={scrollToContact}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          合作咨询
        </Button>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-foreground/50 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
