import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProjectsGrid } from "@/components/projects-grid"
import { TechStack } from "@/components/tech-stack"
import { Footer } from "@/components/footer"
import { CursorGlow } from "@/components/cursor-glow"
import { generateWebsiteStructuredData, generatePersonStructuredData } from "@/lib/structured-data"

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://anexon.tech"
  const websiteStructuredData = generateWebsiteStructuredData(baseUrl)
  const personStructuredData = generatePersonStructuredData()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }} />
      <main className="relative min-h-screen overflow-hidden scanlines">
        <CursorGlow />
        <div className="relative z-10">
          <Header />
          <HeroSection />
          <ProjectsGrid />
          <TechStack />
          <Footer />
        </div>
      </main>
    </>
  )
}
