"use client"

import { useInView } from "@/hooks/use-in-view"
import { 
  Award, 
  Package, 
  Settings, 
  Shield, 
  Megaphone, 
  Users, 
  FileText, 
  Palette,
  HeadphonesIcon,
  GraduationCap
} from "lucide-react"

const supports = [
  {
    icon: Award,
    title: "品牌授权支持",
    description: "艾草领域口碑好品牌，市场认知度高，客户认可度好",
  },
  {
    icon: Package,
    title: "爆品供应支持",
    description: "以非遗艾绒为核心，全系产品供应链，源头直采，品质保障",
  },
  {
    icon: Settings,
    title: "运营管理支持",
    description: "标准化销售服务流程，国医华草APP等系统化、数字化赋能门店",
  },
  {
    icon: GraduationCap,
    title: "开店培训支持",
    description: "线上繁星计划/社群陪跑，线下最美灸师、最美华草人/区域带教等",
  },
  {
    icon: HeadphonesIcon,
    title: "专属服务体系",
    description: "总部客服、售后设备技术、省级运营中心等",
  },
  {
    icon: FileText,
    title: "文案资料支持",
    description: "核心软装文宣、活动文宣、各类宣传片等",
  },
  {
    icon: Palette,
    title: "门店形象支持",
    description: "门店标准化场景化输出，平面空间设计",
  },
  {
    icon: Shield,
    title: "区域保护支持",
    description: "1公里区域保护，由外联部严格监督市场规范",
  },
  {
    icon: Users,
    title: "超级引流体系",
    description: "爆粉系统/美团团购，抖音&快手生活服务，线下标准化拓客等",
  },
  {
    icon: Megaphone,
    title: "营销活动支持",
    description: "多频次多样化营销活动方案，促进门店业绩提升",
  },
]

export function Support() {
  const { ref, isInView } = useInView()

  return (
    <section id="support" className="py-20 md:py-28">
      <div ref={ref} className="container mx-auto px-4">
        {/* Section Title */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            十大加盟支持
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-4" />
          <p className="text-foreground/70 max-w-2xl mx-auto">
            十大支持体系，全程赋能门店发展
          </p>
        </div>

        {/* Support Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {supports.map((item, index) => (
            <div
              key={index}
              className={`bg-card border border-border rounded-lg p-4 text-center hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-sm font-bold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-foreground/60 text-xs leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
