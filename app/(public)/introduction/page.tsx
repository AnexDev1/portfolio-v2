import { Code2, Layers, Smartphone, Zap, Bot, Globe } from "lucide-react"

export default function IntroductionPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground">
                About Anexon
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
                Hey, I'm{" "}
                <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text">
                  Anwar Nasir
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-3xl">
              A self-taught senior mobile engineer passionate about crafting beautiful, well-designed applications. I go
              by the codename <span className="text-foreground font-medium">Anexon</span> in the developer community.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded border border-border/50 bg-card/50 p-6 sm:p-10 backdrop-blur-sm space-y-8">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">
                My Journey
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">From Curiosity to Craftsmanship</h2>
            </div>

            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
              <p>
                I'm a self-taught senior mobile engineer who fell in love with building apps that people actually enjoy
                using. While Flutter is my primary weapon of choice, I've developed strong skills across the full stack
                — from web development to mobile backend systems.
              </p>

              <p>
                What sets me apart is my obsession with UI/UX. I don't just write code that works; I craft experiences
                that feel right. Every animation, every transition, every pixel matters. This philosophy has helped me
                ship 9+ production apps that users love.
              </p>

              <p>
                I share my journey, projects, and thoughts with my community of 1.4k+ subscribers on{" "}
                <a
                  href="https://t.me/AneXon1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Telegram
                </a>
                . It's where I discuss new technologies, share code snippets, and connect with fellow developers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 space-y-4 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">Expertise</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What I Bring to the Table</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Smartphone,
                title: "Mobile Development",
                description:
                  "Expert in Flutter/Dart with experience shipping production apps. From simple utilities to complex e-commerce platforms.",
              },
              {
                icon: Layers,
                title: "Full Stack Web",
                description:
                  "Proven skills in Next.js, React, and modern web technologies. Building responsive, performant web applications.",
              },
              {
                icon: Code2,
                title: "Backend Systems",
                description:
                  "Experience with Supabase, Firebase, and custom backend solutions. Building scalable APIs and real-time systems.",
              },
              {
                icon: Zap,
                title: "UI/UX Craftsmanship",
                description:
                  "Obsessed with creating beautiful, intuitive interfaces. Every animation and interaction is carefully considered.",
              },
              {
                icon: Bot,
                title: "AI Integration",
                description:
                  "Integrating AI capabilities like Gemini into mobile apps for smarter, context-aware experiences.",
              },
              {
                icon: Globe,
                title: "Open Source",
                description:
                  "Active contributor with multiple open source projects. Believing in sharing knowledge and building in public.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group rounded border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
