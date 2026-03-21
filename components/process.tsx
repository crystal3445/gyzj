"use client"

import { useInView } from "@/hooks/use-in-view"
import { 
  MessageCircle, 
  MapPin, 
  UserCheck, 
  FileSignature, 
  Palette, 
  Hammer,
  GraduationCap,
  Package,
  Rocket,
  Store
} from "lucide-react"

const steps = [
  {
    icon: MessageCircle,
    title: "咨询",
    description: "咨询各区域招商代理人员",
  },
  {
    icon: MapPin,
    title: "店面选址",
    description: "在招商代理人员协助下自行选址",
  },
  {
    icon: UserCheck,
    title: "加盟商考察",
    description: "到公司或所在地门店考察",
  },
  {
    icon: FileSignature,
    title: "评估通过",
    description: "签订特许合同，缴纳加盟费用",
  },
  {
    icon: Palette,
    title: "店面设计",
    description: "公司评估店面，出平面空间设计图",
  },
  {
    icon: Hammer,
    title: "装修办证",
    description: "根据公司标准装修，办理营业执照",
  },
  {
    icon: GraduationCap,
    title: "培训学习",
    description: "参加线上线下培训，提升专业知识",
  },
  {
    icon: Package,
    title: "产品到货",
    description: "自用分享，按标准流程提前试营业",
  },
  {
    icon: Rocket,
    title: "正式开业",
    description: "按公司运营管理标准执行门店经营",
  },
]

export function Process() {
  const { ref, isInView } = useInView()

  return (
    <section id="process" className="py-20 md:py-28 bg-card">
      <div ref={ref} className="container mx-auto px-4">
        {/* Section Title */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            加盟流程
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-4" />
          <p className="text-foreground/70 max-w-2xl mx-auto">
            九步轻松开启健康事业新篇章
          </p>
        </div>

        {/* Process Steps - Desktop */}
        <div className="hidden lg:block max-w-6xl mx-auto">
          <div className="grid grid-cols-5 gap-4 mb-8">
            {steps.slice(0, 5).map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col items-center transition-all duration-500 ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center mb-3 relative">
                  <step.icon className="w-7 h-7 text-primary" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-serif text-base font-bold text-foreground text-center mb-1">
                  {step.title}
                </h3>
                <p className="text-foreground/70 text-xs text-center">{step.description}</p>
                {index < 4 && (
                  <div className="absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4 max-w-5xl mx-auto">
            {steps.slice(5).map((step, index) => (
              <div
                key={index + 5}
                className={`relative flex flex-col items-center transition-all duration-500 ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${(index + 5) * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center mb-3 relative">
                  <step.icon className="w-7 h-7 text-primary" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                    {index + 6}
                  </div>
                </div>
                <h3 className="font-serif text-base font-bold text-foreground text-center mb-1">
                  {step.title}
                </h3>
                <p className="text-foreground/70 text-xs text-center">{step.description}</p>
                {index < 3 && (
                  <div className="absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 transition-all duration-500 ${
                isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center relative">
                  <step.icon className="w-5 h-5 text-primary" />
                  <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-8 bg-border mt-2" />
                )}
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-serif text-base font-bold text-foreground mb-1">
                  {step.title}
                </h3>
                <p className="text-foreground/70 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
