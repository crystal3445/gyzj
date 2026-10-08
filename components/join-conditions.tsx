"use client"

import { useInView } from "@/hooks/use-in-view"
import { Ban } from "lucide-react"

const conditions = [
  "喜爱中医，敬畏艾灸文化，愿意长期从事艾灸事业",
  "认同品牌企业文化、经营理念，服从公司管理并执行门店标准化要求",
  "实干担当，吃苦耐劳，愿意深入店务一线工作，关注并重视服务质量",
  "以顾客为中心，愿意与顾客交流沟通，重视客户体验",
  "愿意不断学习，提升艾灸专业知识、门店管理能力",
  "面对困难主动寻找解决办法，不抱怨不牢骚，专注提升改善门店经营",
  "具备良好的商业信用，诚信待人诚信经营，不偷工减料私换私采损害利己",
  "严格履行加盟协议，愿意接受公司培训计划、市场规划与区域管理支持",
  "具备一定的投资能力，对投资经营收益和风险，有正确认知，心态能够保持韧性",
]

const tenNos = [
  "不热爱中医事业者不合作",
  "自己不参与经营管理者不合作",
  "不认同企业价值观者不合作",
  "不守秩序者不合作",
  "不信中医艾灸者不合作",
  "不诚信，投机者不合作",
  "急功近利有暴利思维者不合作",
  "18岁以下60岁以上不合作",
  "不学习者不合作",
  "生活不能自理者不合作",
]

/** 加盟条件 + 十不文化：位于「加盟模式」之后 */
export function JoinConditions() {
  const { ref, isInView } = useInView()

  return (
    <section id="join-conditions" className="pt-0 pb-20 md:pb-28">
      <div ref={ref} className="container mx-auto px-4">
        {/* Join Conditions */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="font-serif text-2xl font-bold text-foreground text-center mb-8">
            什么样的创业者可以加入国医仲景艾灸之家？
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

        {/* Ten Nos Culture */}
        <div
          className={`max-w-4xl mx-auto mt-16 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <h3 className="font-serif text-2xl font-bold text-foreground text-center mb-8">
            十不文化
          </h3>
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {tenNos.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Ban className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground/80 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
