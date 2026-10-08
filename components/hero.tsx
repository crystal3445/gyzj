"use client"

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      {/* 桌面端：米黄底 + 人物贴底居中偏左 + 文字居右 */}
      <div className="hidden md:block relative mx-auto" style={{ minHeight: "470px" }}>
        {/* 人物（透明底抠图，贴底，略靠中间） */}
        <img
          src="/images/hero/hero-people.png"
          alt="国医仲景艾灸服务"
          className="absolute bottom-0 object-contain object-bottom"
          style={{ left: "7%", width: "54%", maxWidth: "740px" }}
          loading="eager"
        />

        {/* 文字（HTML 重做，加大字号、放宽间距） */}
        <div className="absolute text-right" style={{ right: "16%", top: "31%" }}>
          <h1
            className="font-serif whitespace-nowrap"
            style={{
              color: "#2D6B4F",
              fontWeight: 900,
              fontSize: "clamp(32px, 3.8vw, 56px)",
              lineHeight: 1.3,
              letterSpacing: "0.04em",
            }}
          >
            国医仲景艾灸之家
          </h1>
          <p
            className="font-medium whitespace-nowrap"
            style={{
              color: "rgba(45, 107, 79, 0.85)",
              fontSize: "clamp(16px, 2vw, 28px)",
              lineHeight: 1.8,
              letterSpacing: "0.06em",
              marginTop: "1em",
            }}
          >
            专业艾熏连锁品牌·全国火热加盟中
          </p>

          {/* 获取加盟资料按钮 */}
          <div className="mt-8">
            <a
              href="#contact"
              className="inline-block rounded-full px-8 py-3 text-white font-medium text-base shadow-md hover:shadow-lg hover:opacity-90 transition-all"
              style={{ backgroundColor: "#2D6B4F", letterSpacing: "0.08em" }}
            >
              获取加盟资料
            </a>
          </div>
        </div>
      </div>

      {/* 手机端：文字在上，人物在下 */}
      <div className="md:hidden">
        <div className="px-4 pt-10 pb-6 text-center">
          <h1
            className="font-serif text-3xl"
            style={{ color: "#2D6B4F", fontWeight: 900, lineHeight: 1.3 }}
          >
            国医仲景艾灸之家
          </h1>
          <p className="font-medium text-base mt-3" style={{ color: "rgba(45, 107, 79, 0.85)" }}>
            专业艾熏连锁品牌·全国火热加盟中
          </p>
          <a
            href="#contact"
            className="inline-block mt-5 rounded-full px-7 py-2.5 text-white font-medium shadow-md"
            style={{ backgroundColor: "#2D6B4F", letterSpacing: "0.08em" }}
          >
            获取加盟资料
          </a>
        </div>
        <img
          src="/images/hero/hero-people.png"
          alt="国医仲景艾灸服务"
          className="w-full object-contain"
          loading="eager"
        />
      </div>
    </section>
  )
}
