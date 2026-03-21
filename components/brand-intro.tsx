"use client"

import { useInView } from "@/hooks/use-in-view"



export function BrandIntro() {
  const { ref, isInView } = useInView()

  return (
    <section id="brand" className="py-20 md:py-28 bg-card">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-1000 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              {"品牌溯源"}
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-4" />
            <p className="text-secondary font-medium">{"华草香艾: 一缕真艾香 一生常安康"}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div className="order-2 md:order-1">
              <img 
                src="/images/farmer-examining.jpg" 
                alt="非遗传承人肖吉全检视艾草" 
                className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
              />
              <p className="text-center text-sm text-foreground/60 mt-2">{"第四代传承人肖吉全检视艾草"}</p>
            </div>
            
            <div className="order-1 md:order-2 space-y-4">
              <div className="flex justify-center md:justify-start mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                  <span className="text-primary font-medium">{"四代传承"}</span>
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  <span className="text-primary font-medium">{"非遗艾绒"}</span>
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  <span className="text-primary font-medium">{"始于1905"}</span>
                </div>
              </div>

              <p className="text-base text-foreground/80 leading-relaxed">
                {"我国自古就有艾草的传说与民俗。商朝末年,名医萧艾偶然发现野草之火疗疾,遂以萧艾之名命之。历代名医先贤不断研究,艾灸疗法日益成熟。东汉末年,医圣张仲景在伤寒杂病论中留下千古名句: "}
                <span className="text-primary font-semibold">{"治病之要术,无过艾灸"}</span>
                {"。"}
              </p>

              <p className="text-base text-foreground/80 leading-relaxed">
                {"清朝末年,萧氏家族名医"}
                <span className="text-primary font-semibold">{"萧青方"}</span>
                {"带领族人来到医圣故里南阳,用灸疗解决了许多疑难杂症,并留下艾绒制作技艺的传承。2021年被评为"}
                <span className="text-primary font-semibold">{"南阳市非物质文化遗产代表性项目"}</span>
                {"。"}
              </p>

              <p className="text-base text-foreground/80 leading-relaxed">
                {"其第四代传承人、国医仲景集团创始人"}
                <span className="text-primary font-semibold">{"肖吉全"}</span>
                {"2022年被评为南阳市市级非物质文化遗产项目艾绒制作技艺代表性传承人。"}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <img 
              src="/images/field-aerial.jpg" 
              alt="艾草种植基地俯瞰" 
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
            <img 
              src="/images/drying-mugwort.jpg" 
              alt="传统艾草晾晒" 
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
            <img 
              src="/images/farmer-working.jpg" 
              alt="艾草田间管理" 
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="text-center mb-12 px-4 py-6 bg-background rounded-xl">
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              {"站在健康中国的新起点,国医仲景致力弘扬艾灸文化,坚守道地南阳艾,以"}
              <span className="text-primary font-semibold">{"3年陈真年份非遗艾绒"}</span>
              {"为核心,不断丰富艾生活新场景,让好艾真艾造福更多百姓,为千千万万个家庭带去艾与温暖,一生安康!"}
            </p>
          </div>

          <div className="bg-background rounded-xl p-6 md:p-8 mb-12">
            <h3 className="font-serif text-xl font-bold text-foreground text-center mb-6">{"企业文化"}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-primary font-bold mb-2">{"使命"}</div>
                <p className="text-foreground/70 text-sm">{"艾进万家 使命必达"}</p>
              </div>
              <div className="text-center">
                <div className="text-primary font-bold mb-2">{"愿景"}</div>
                <p className="text-foreground/70 text-sm">{"弘扬国粹 世代传承 一路有艾 健康国人"}</p>
              </div>
              <div className="text-center">
                <div className="text-primary font-bold mb-2">{"价值观"}</div>
                <p className="text-foreground/70 text-sm">{"南阳艾 遵道地 致良知 本为民"}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-bold text-primary mb-1">4</div>
              <div className="text-sm text-foreground/60">{"代传承"}</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-bold text-primary mb-1">8万亩</div>
              <div className="text-sm text-foreground/60">{"联合种植基地"}</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-bold text-primary mb-1">8000+</div>
              <div className="text-sm text-foreground/60">{"连锁门店"}</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-bold text-primary mb-1">100+</div>
              <div className="text-sm text-foreground/60">{"品类产品"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
