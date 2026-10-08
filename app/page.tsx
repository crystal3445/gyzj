import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { BrandIntro } from "@/components/brand-intro"
import { CompanyVideos } from "@/components/company-videos"
import { HomeNews } from "@/components/home-news"
import { VideosNews } from "@/components/videos-news"
import { StoreOutput } from "@/components/store-output"
import { Advantages } from "@/components/advantages"
import { ProductIntro } from "@/components/product-intro"
import { Cooperation } from "@/components/cooperation"
import { Process } from "@/components/process"
import { Support } from "@/components/support"
import { JoinConditions } from "@/components/join-conditions"
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
      <Stats />
      <BrandIntro />
      <Advantages />
      <ProductIntro />
      <VideosNews videos={companyVideos} posts={homeNews} />
      <StoreOutput />
      <Support />
      <Cooperation />
      <JoinConditions />
      <Process />
      <ContactForm />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
