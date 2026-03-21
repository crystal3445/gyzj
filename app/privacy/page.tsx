import Link from "next/link"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-10 md:py-16 max-w-3xl">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-6">隐私政策</h1>
        <p className="text-foreground/70 leading-7 mb-6">
          本页面用于说明我们如何收集、使用和保护您在招商咨询表单中提交的个人信息。
        </p>

        <section className="space-y-4 text-foreground/80 leading-7">
          <p>
            1. 收集信息：当您提交招商咨询时，我们会收集您填写的姓名、联系电话、拟开店城市、行业信息及相关咨询内容。
          </p>
          <p>
            2. 使用目的：我们仅将上述信息用于招商咨询沟通、项目评估与回访，不用于与招商无关的用途。
          </p>
          <p>
            3. 信息保护：我们采取合理的管理与技术措施保护您的信息，防止未经授权的访问、泄露或滥用。
          </p>
          <p>
            4. 信息保存：我们将在实现上述目的所需期限内保存您的信息，超出期限后将进行删除或匿名化处理。
          </p>
          <p>
            5. 联系我们：若您希望查询、更正或删除个人信息，可通过页面中的联系方式与我们联系。
          </p>
        </section>

        <div className="mt-10">
          <Link href="/" className="text-primary underline underline-offset-2">
            返回首页
          </Link>
        </div>
      </div>
    </main>
  )
}

