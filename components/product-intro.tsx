import { Flame, ShieldCheck, Leaf, Cog, Users } from "lucide-react"

const promises = [
  { icon: Flame, left: "每一款产品研发", right: "尊重用户真实需求" },
  { icon: ShieldCheck, left: "每一次技术迭代", right: "反复推敲实证检验" },
  { icon: Leaf, left: "每一份原材料臻选", right: "纯净透明安全可靠" },
  { icon: Cog, left: "每一道生产工艺", right: "恪守标准严格规范" },
  { icon: Users, left: "每一轮用户反馈", right: "真实体验持续改进" },
]

const milestones = [
  { num: "1800多个", unit: "小时日光洗礼", desc: "端午至阳之时采收" },
  { num: "1095个", unit: "日夜沉寂蜕变", desc: "真年份3年陈褪其燥烈" },
  { num: "10000多次", unit: "反复锤炼", desc: "炼就温润通透艾火" },
]

const gallery = [
  { src: "/images/products/field-machine.jpg", alt: "基地化生态种植" },
  { src: "/images/products/warehouse-aged.jpg", alt: "三年陈艾仓储" },
  { src: "/images/products/moxa-wool.jpg", alt: "三年陈艾绒" },
]

export function ProductIntro() {
  return (
    <section id="products" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        {/* 开篇：真与实 */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-primary font-medium tracking-widest mb-4 text-sm">华草臻品 · 产品体系</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8 leading-snug">
            真与实
            <br />
            是我们的底色
          </h2>
          <p className="text-foreground/80 leading-loose text-justify indent-8">
            {"根植于源远流长的中医文化，以厚道功夫抱朴守真，让艾更有温度，是华草不变的信仰。传承非遗匠心精神，倾听最本真的用户诉求，沉入真实生活场景，开发每一款养生臻品，只为"}
            <span className="text-primary font-semibold">真品质、真效果、真口碑</span>
            {"。"}
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-20">
          <img
            src="/images/products/herb-field.jpg"
            alt="道地艾草采收"
            className="w-full rounded-full object-cover aspect-[740/215]"
          />
        </div>

        {/* 真材实料 */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">
            真材实料 <span className="text-primary">真心无价</span>
          </h3>
          <p className="text-foreground/80 leading-loose text-justify indent-8">
            {"从选品调研的求真务实，到研发生产的精益求精，我们对原材料拒绝任何成分不明的妥协，对每一道生产工序严苛审视，让抵达用户手中的产品饱含真心真意，以赤诚之心温暖生命之火。"}
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-20">
          <img
            src="/images/products/product-display.jpg"
            alt="华草产品陈列"
            className="w-full rounded-xl object-cover"
          />
        </div>

        {/* 五个每一 */}
        <div className="max-w-2xl mx-auto mb-20 space-y-5">
          {promises.map((item, index) => (
            <div key={index} className="flex items-center justify-center gap-0">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0 z-10 border-4 border-card">
                <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
              </div>
              <div className="flex-1 max-w-md flex items-center h-10 md:h-12">
                <div className="flex-1 bg-background border border-border rounded-r-full pl-5 pr-2 flex items-center h-full">
                  <span className="font-serif font-bold text-foreground text-sm md:text-base whitespace-nowrap">
                    {item.left}
                  </span>
                </div>
                <div className="flex-1 bg-primary rounded-r-full -ml-4 pl-7 pr-5 flex items-center h-full">
                  <span className="text-primary-foreground text-xs md:text-sm whitespace-nowrap">
                    {item.right}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 大地礼赠 时间厚藏 */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">
            大地礼赠 <span className="text-primary">时间厚藏</span>
          </h3>
          <p className="text-foreground/80 leading-loose text-justify indent-8">
            {"好艾生道地，亦当三年陈。为此我们始终恪守时间的节律，在"}
            <span className="text-primary font-semibold">北纬33°</span>
            {"得天独厚的环境中，基地化生态种植，从改善基因性能培育道地南阳艾。"}
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <img
            src="/images/products/nanyang-map.jpg"
            alt="道地南阳艾 · 北纬33°"
            className="w-full rounded-xl object-cover"
          />
        </div>

        <div className="max-w-3xl mx-auto text-center mb-10 space-y-2">
          {milestones.map((m, index) => (
            <p key={index} className="text-foreground/80 text-sm md:text-base">
              <span className="text-primary font-bold">{m.num}</span>
              {m.unit} · {m.desc}
            </p>
          ))}
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-3 md:gap-5 mb-20">
          {gallery.map((g, index) => (
            <img
              key={index}
              src={g.src}
              alt={g.alt}
              className="w-full rounded-lg object-cover aspect-square"
            />
          ))}
        </div>

        {/* 道地真本草 / 严苛质检 */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          <div className="bg-background border border-border rounded-xl overflow-hidden">
            <img
              src="/images/products/herbal-product.jpg"
              alt="古方千草御养系列"
              className="w-full object-cover"
            />
            <div className="p-6">
              <h4 className="font-serif text-xl font-bold text-foreground mb-3 text-center">
                道地真本草 <span className="text-primary">自然心呵护</span>
              </h4>
              <p className="text-foreground/70 text-sm leading-relaxed">
                {"传承东方本草文化，在非遗艾古法灸基础上，结合现代养生需求，研发御养、居家等系列臻品，以百草之精华，养生命之灵机，予身心自然能量。"}
              </p>
            </div>
          </div>

          <div className="bg-background border border-border rounded-xl overflow-hidden">
            <img
              src="/images/products/qc-product.jpg"
              alt="非遗艾绒 · 一品一码"
              className="w-full object-cover"
            />
            <div className="p-6">
              <h4 className="font-serif text-xl font-bold text-foreground mb-3 text-center">
                严苛质检 <span className="text-primary">一品一码</span>
              </h4>
              <p className="text-foreground/70 text-sm leading-relaxed">
                {"无论中药饮片级艾柱生产标准，还是草本调养的古方御养、现代创新的智能设备等，从质检报告到质量认证，唯有历经严格质检的产品，方能获得专属溯源ID。"}
              </p>
            </div>
          </div>
        </div>

        {/* 产品生态全景 */}
        <div className="max-w-5xl mx-auto">
          <img
            src="/images/products/eco-overview.jpg"
            alt="艾灸之家产品生态：创新艾灸体验，极致流量的单品稳营收"
            className="w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  )
}
