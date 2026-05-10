import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { BrandIntro } from "@/components/brand-intro"
import { CompanyVideos } from "@/components/company-videos"
import { HomeNews } from "@/components/home-news"
import { StoreOutput } from "@/components/store-output"
import { Advantages } from "@/components/advantages"
import { Cooperation } from "@/components/cooperation"
import { Process } from "@/components/process"
import { Support } from "@/components/support"
import { Stats } from "@/components/stats"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"
import { getAllPosts, HOME_NEWS_LIMIT } from "@/lib/posts"
import { getCompanyVideos } from "@/lib/videos"

/** 与资讯页一致，新文章约 60 秒内出现在首页 */
export const revalidate = 60

export default async function Home() {
  const allPosts = await getAllPosts()
  const companyVideos = await getCompanyVideos()
  const homeNews = allPosts.slice(0, HOME_NEWS_LIMIT)

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <BrandIntro />
      <CompanyVideos videos={companyVideos} />
      <HomeNews posts={homeNews} />
      <StoreOutput />
      <Advantages />
      <Cooperation />
      <Process />
      <Support />
      <Stats />
      <ContactForm />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
