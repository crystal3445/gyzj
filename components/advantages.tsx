"use client"

import { useInView } from "@/hooks/use-in-view"
import { 
  Award, 
  Leaf, 
  Tv,
  Building2,
  BadgeCheck,
  Factory
} from "lucide-react"

const advantages = [
  {
    icon: Award,
    title: "非遗艾绒制作技艺",
    description: "2021年被评为南阳市非物质文化遗产代表性项目，第四代传承人肖吉全为市级代表性传承人",
    image: "/images/heritage-plaque.jpg",
  },
  {
    icon: BadgeCheck,
    title: "商业特许经营备案企业",
    description: "中华人民共和国商务部商业特许经营备案企业，具有连锁加盟的资质",
    image: "/images/mofcom-franchise.png",
  },
  {
    icon: Tv,
    title: "央视《焦点访谈》专访",
    description: "2021年央视《焦点访谈》专访报道，肖老匠心制艾事迹，让中医药回归本源，造福苍生",
    image: "/images/cctv-interview.jpg",
  },
  {
    icon: Building2,
    title: "基地自建仓储车间",
    description: "4000+吨陈艾叶储存，保证每一颗艾柱都是用三年陈艾制作而成，满足全国门店的需求",
    image: "/images/warehouse.jpg",
  },
  {
    icon: Leaf,
    title: "近八万亩艾草种植",
    description: "南阳是全国最大的艾产品加工基地，自有种植约1万亩，联合种植7万亩左右",
    image: "/images/vast-field.jpg",
  },
  {
    icon: Factory,
    title: "完善的自有供应链体系",
    description: "艾绒厂、设备厂、膏贴厂等",
    image: "/images/supply-chain.jpg",
  },
]

export function Advantages() {
  const { ref, isInView } = useInView()

  return (
    <section id="advantages" className="py-12 md:py-16 bg-background">
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
              className={`bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="aspect-[16/9] bg-muted/40 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-5">
                {/* Icon */}
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2 -mt-8 relative z-10 border-4 border-card">
                  <item.icon className="w-4.5 h-4.5 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-base font-bold text-foreground mb-1.5">
                  {item.title}
                </h3>
                <p className="text-foreground/70 text-xs leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
