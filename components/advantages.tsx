"use client"

import { useInView } from "@/hooks/use-in-view"
import { 
  Award, 
  Leaf, 
  Tv,
  Building2,
  Rocket,
  Shield
} from "lucide-react"

const advantages = [
  {
    icon: Award,
    title: "非遗艾绒制作技艺",
    description: "2021年被评为南阳市非物质文化遗产代表性项目，第四代传承人肖吉全为市级代表性传承人",
    image: "/images/drying-mugwort.jpg",
  },
  {
    icon: Leaf,
    title: "近八万亩艾草种植",
    description: "南阳是全国最大的艾产品加工基地，自有种植约1万亩，联合种植7万亩左右",
    image: "/images/vast-field.jpg",
  },
  {
    icon: Tv,
    title: "央视《焦点访谈》专访",
    description: "2021年央视《焦点访谈》专访报道，肖老匠心制艾事迹，让中医药回归本源，造福苍生",
    image: "/images/farmer-examining.jpg",
  },
  {
    icon: Building2,
    title: "河南省双龙头企业",
    description: "河南省农业产业化重点龙头企业&河南省省级扶贫龙头企业，首届南阳艾草协会会长单位",
    image: "/images/warehouse.jpg",
  },
  {
    icon: Rocket,
    title: "艾草种子上过太空",
    description: "南阳艾1号种子搭乘神舟十二号航天飞船进入太空，通过诱变育种技术改良艾草基因",
    image: "/images/field-aerial.jpg",
  },
  {
    icon: Shield,
    title: "艾产业高质量发展主委单位",
    description: "中国中医药研究促进会艾产业高质量发展专业委员会主委单位",
    image: "/images/aging-facility.jpg",
  },
]

export function Advantages() {
  const { ref, isInView } = useInView()

  return (
    <section id="advantages" className="py-20 md:py-28 bg-card">
      <div ref={ref} className="container mx-auto px-4">
        {/* Section Title */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            品牌优势
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-4" />
          <p className="text-foreground/70 max-w-2xl mx-auto">
            六大核心优势，为您的创业之路保驾护航
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {advantages.map((item, index) => (
            <div
              key={index}
              className={`bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="h-40 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6">
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 -mt-10 relative z-10 border-4 border-background">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
