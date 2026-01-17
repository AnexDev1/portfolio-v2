"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Github, Star, GitFork, ExternalLink, Sparkles, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"

const projects = [
  {
    id: 0,
    title: "Noor",
    description:
      "A beautifully designed Islamic mobile app built with Flutter. Your all-in-one tool for prayer times, Quran reading, Qibla direction, prayer tracking, AI assistant, and Islamic video content with multi-language support.",
    tags: ["Flutter", "Dart", "Riverpod", "Gemini AI", "Firebase"],
    status: "shipped",
    year: "2025",
    stars: 45,
    forks: 12,
    url: "https://github.com/AnexDev1/noor-islamic-app",
    homepage: "https://noor.anexon.tech",
    featured: true,
    highlight: true,
  },
  {
    id: 1,
    title: "CodeCast",
    description:
      "A mobile application designed to help developers stay updated with the latest coding tutorials, tech news, and programming content. Available on Google Play Store.",
    tags: ["Flutter", "Dart", "Mobile", "Education"],
    status: "shipped",
    year: "2025",
    stars: 0,
    forks: 0,
    url: "https://play.google.com/store/apps/details?id=com.anexon.codecast",
    homepage: "https://play.google.com/store/apps/details?id=com.anexon.codecast",
    featured: true,
  },
  {
    id: 2,
    title: "Ethio Cal",
    description:
      "A modern Flutter app displaying Ethiopian date and day with a beautiful Material 3 UI and resizable Android home screen widget. Features animated main screen and dynamic widget updates.",
    tags: ["Flutter", "Dart", "Kotlin", "Android Widget"],
    status: "shipped",
    year: "2025",
    stars: 9,
    forks: 3,
    url: "https://github.com/AnexDev1/ethio_cal",
    featured: true,
  },
  {
    id: 3,
    title: "Hasab AI Flutter SDK",
    description:
      "A comprehensive Flutter SDK for Hasab AI providing speech-to-text, text-to-speech, translation, and chat capabilities for Ethiopian languages including Amharic, Oromo, and Tigrinya.",
    tags: ["Flutter", "Dart", "SDK", "AI", "NLP"],
    status: "shipped",
    year: "2025",
    stars: 15,
    forks: 5,
    url: "https://pub.dev/packages/hasab_ai_flutter",
    featured: true,
  },
  {
    id: 4,
    title: "VeriPay",
    description:
      "A payment verification web app to verify payments instantly across all major Ethiopian banks and mobile money platforms. Fast, secure, and reliable payment verification for businesses.",
    tags: ["Next.js", "TypeScript", "Fintech", "Payments"],
    status: "shipped",
    year: "2025",
    stars: 0,
    forks: 0,
    url: "https://veripay.anexon.tech",
    homepage: "https://veripay.anexon.tech",
    featured: true,
  },
  {
    id: 5,
    title: "JIT Hub",
    description:
      "An AI-powered mobile app for Jimma Institute of Technology students. Features campus navigation, AI study assistant with Gemini 2.0, grade calculator, class schedules, and campus resources.",
    tags: ["Flutter", "Dart", "Gemini AI", "Mapbox", "Hive"],
    status: "shipped",
    year: "2025",
    stars: 20,
    forks: 8,
    url: "https://github.com/AnexDev1/JiT-Hub",
    featured: false,
  },
  {
    id: 6,
    title: "EchoLog",
    description:
      "A Flutter app for capturing and managing audio notes with secure storage, biometric authentication, home screen widget, customizable themes, and easy sharing features.",
    tags: ["Flutter", "Dart", "Audio", "Hive", "Provider"],
    status: "shipped",
    year: "2025",
    stars: 12,
    forks: 4,
    url: "https://github.com/AnexDev1/EchoLog",
    homepage: "https://play.google.com/store/apps/details?id=com.anexon.echolog",
    featured: false,
  },
  {
    id: 7,
    title: "JMarket",
    description:
      "An e-commerce Flutter mobile app with awesome Supabase backend, product listings, and amazing UI. A full-featured marketplace application for buying and selling.",
    tags: ["Flutter", "Dart", "Supabase", "E-commerce"],
    status: "shipped",
    year: "2025",
    stars: 18,
    forks: 6,
    url: "https://github.com/AnexDev1/JMarket",
    featured: false,
  },
  {
    id: 8,
    title: "NativeChat",
    description:
      "A powerful Gemini-powered mobile app with context-aware interactions, voice mode, system info access, call logs analysis, SMS summarization, and versatile coding assistance.",
    tags: ["Flutter", "Dart", "Gemini AI", "Voice", "Context-Aware"],
    status: "shipped",
    year: "2025",
    stars: 25,
    forks: 7,
    url: "https://github.com/AnexDev1/NativeChat",
    featured: false,
  },
]

const filters = ["all", "shipped", "in-progress", "archived"]
const allTags = [...new Set(projects.flatMap((p) => p.tags))]

export function ProjectsPageContent() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredProjects = projects.filter((p) => {
    const matchesFilter = activeFilter === "all" || p.status === activeFilter
    const matchesSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => p.tags.includes(tag))
    return matchesFilter && matchesSearch && matchesTags
  })

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <section ref={sectionRef} className="px-4 sm:px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <div className={cn("mb-12 sm:mb-16 space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">Artifacts</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Open Source Projects</h1>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            A collection of tools, experiments, and contributions to the open source community. Built with passion,
            maintained with care.
          </p>
        </div>

        {/* Search and Filters */}
        <div className={cn("mb-10 space-y-6 opacity-0", isVisible && "animate-fade-in-up stagger-2")}>
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card/40 border-border/60 focus:border-primary/50"
            />
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "rounded-lg border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 active:scale-[0.98]",
                  activeFilter === filter
                    ? "border-primary bg-primary/15 text-primary shadow-sm shadow-primary/20"
                    : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground hover:bg-secondary/50",
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2">
            <Filter className="h-4 w-4 text-muted-foreground mr-2 self-center" />
            {allTags.slice(0, 10).map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={cn(
                  "rounded-md border px-2.5 py-1 font-mono text-xs transition-all duration-200",
                  selectedTags.includes(tag)
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border/60 bg-secondary/40 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className={cn(
                "group relative overflow-hidden rounded-xl border bg-card/40 p-6 sm:p-7 glass transition-all duration-400 active:scale-[0.99] hover-lift opacity-0",
                isVisible && "animate-fade-in-up",
                hoveredProject === project.id && "border-primary/40 bg-card/70",
                "highlight" in project && project.highlight
                  ? "sm:col-span-2 lg:col-span-2 border-primary/30 bg-gradient-to-br from-primary/8 via-card/50 to-primary/8"
                  : "border-border/60",
                project.featured && !("highlight" in project && project.highlight) && "sm:col-span-2 lg:col-span-1",
              )}
              style={{ animationDelay: `${(index % 6) * 80 + 200}ms` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {"highlight" in project && project.highlight && (
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3.5 py-1.5 animate-pulse-glow">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-medium">
                    Featured
                  </span>
                </div>
              )}

              <div
                className={cn(
                  "absolute right-5 top-5 flex items-center gap-2.5",
                  "highlight" in project && project.highlight && "top-5",
                )}
              >
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-shadow duration-300",
                    project.status === "shipped" && "bg-primary shadow-sm shadow-primary/50",
                    project.status === "in-progress" && "bg-yellow-500 animate-pulse shadow-sm shadow-yellow-500/50",
                    project.status === "archived" && "bg-muted-foreground",
                  )}
                />
                <span className="font-mono text-xs text-muted-foreground">{project.status}</span>
              </div>

              <div
                className={cn(
                  "mb-5 font-mono text-xs text-muted-foreground",
                  "highlight" in project && project.highlight && "mt-10",
                )}
              >
                {project.year}
              </div>

              <h3
                className={cn(
                  "mb-3 font-bold tracking-tight transition-all duration-300 group-hover:text-gradient",
                  "highlight" in project && project.highlight ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
                )}
              >
                {project.title}
              </h3>

              <p
                className={cn(
                  "mb-5 text-sm leading-relaxed text-muted-foreground",
                  "highlight" in project && project.highlight ? "line-clamp-3" : "line-clamp-2",
                )}
              >
                {project.description}
              </p>

              <div className="mb-5 flex items-center gap-5 font-mono text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 transition-colors group-hover:text-yellow-500">
                  <Star className="h-3.5 w-3.5" />
                  {project.stars}
                </span>
                <span className="flex items-center gap-1.5 transition-colors group-hover:text-foreground">
                  <GitFork className="h-3.5 w-3.5" />
                  {project.forks}
                </span>
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border/80 bg-secondary/60 px-2.5 py-1 font-mono text-xs text-secondary-foreground transition-colors hover:border-primary/50 hover:bg-primary/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-all duration-300 group/link"
                >
                  <Github className="h-4 w-4 transition-transform group-hover/link:scale-110" />
                  <span className="underline-animate">source</span>
                </a>
                {"homepage" in project && project.homepage && (
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-xs text-primary hover:text-foreground transition-all duration-300 group/link"
                  >
                    <ExternalLink className="h-4 w-4 transition-transform group-hover/link:scale-110 group-hover/link:rotate-12" />
                    <span className="underline-animate">live</span>
                  </a>
                )}
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono text-sm text-muted-foreground">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  )
}
