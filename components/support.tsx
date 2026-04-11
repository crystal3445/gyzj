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
    description: "艾草领域口碑好品牌，重塑行业品质标准，以广泛的品牌影响力赋能门店",
  },
  {
    icon: Package,
    title: "产品供应支持",
    description: "以非遗艾绒为核心，全系产品供应链，源头直采，品质保障",
  },
  {
    icon: Settings,
    title: "运营管理支持",
    description: "从销售服务流程标准化、数字化、系统化等，全方位赋能门店运营管理",
  },
  {
    icon: Shield,
    title: "区域保护支持",
    description: "公司对合作门店实行1公里区域保护，由外联部严格监督市场规范",
  },
  {
    icon: Megaphone,
    title: "营销活动支持",
    description: "为合作门店提供多频次多样化的营销活动方案，促进门店业绩提升",
  },
  {
    icon: Users,
    title: "引流拓客支持",
    description: "线上爆粉系统、抖音生活服务、美团团购，线下标准化拓客方案全渠道引流",
  },
  {
    icon: FileText,
    title: "文宣资料支持",
    description: "核心软装文宣、活动文宣、产品文宣各类宣传片等",
  },
  {
    icon: Palette,
    title: "形象设计支持",
    description: "门店标准化输出，平面空间设计、三感七觉场景打造等",
  },
  {
    icon: HeadphonesIcon,
    title: "专属服务支持",
    description: "总部客服中心专属服务，运营部KA大客户专属服务，多级服务体系",
  },
  {
    icon: GraduationCap,
    title: "开店培训支持",
    description: "线上繁星计划、社群/直播课程，线下最美灸师培训、区域带教、下店商扶等",
  },
]

const conditions = [
  "遵守国家法律法规的相关规定，具有独立合法资格的法人或自然人",
  "有强烈的创业意愿，热爱中医行业，对艾灸有一定认知",
  "热爱学习，跨行小白至少需要3个月-1年的学习周期",
  "最好有过养生行业或其他行业门店经营的实操经验",
  "具有一定的资金能力，且为自由支配资产，具备一定的抗风险能力",
  "门店独立自主经营、自负盈亏，有独立思考、解决问题的能力",
  "了解当地营商环境，能处理好门店当地的行政关系",
  "具有较强的品牌意识和坦诚健康的合作心态，具备契约精神，正心正念，诚信经营",
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
            合作支持
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-4" />
          <p className="text-foreground/70 max-w-2xl mx-auto">
            十大支持体系，全程赋能门店发展
          </p>
        </div>

        {/* Support Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-20">
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

        {/* Join Conditions */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <h3 className="font-serif text-2xl font-bold text-foreground text-center mb-8">
            加盟条件
          </h3>
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <ul className="space-y-4">
              {conditions.map((condition, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary-foreground text-xs font-bold">{index + 1}</span>
                  </div>
                  <span className="text-foreground/80 text-sm leading-relaxed">{condition}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
