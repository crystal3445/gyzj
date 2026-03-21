import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { BrandIntro } from "@/components/brand-intro"
import { StoreOutput } from "@/components/store-output"
import { Advantages } from "@/components/advantages"
import { Cooperation } from "@/components/cooperation"
import { Process } from "@/components/process"
import { Support } from "@/components/support"
import { Stats } from "@/components/stats"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <BrandIntro />
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
