"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Github, Star, GitFork, ExternalLink, Sparkles, Search, Filter, ArrowUpRight, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { projects, allTags, type Project } from "@/lib/projects-data"

const PlayStoreIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
  </svg>
)

const filters = ["all", "shipped", "in-progress", "archived"]
const categoryFilters = [
  { id: "all", label: "All", icon: "🔮" },
  { id: "mobile", label: "Mobile", icon: "📱" },
  { id: "web", label: "Web", icon: "🌐" },
  { id: "sdk", label: "SDK", icon: "📦" },
  { id: "ai", label: "AI", icon: "🤖" },
]

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl animate-fade-in" />

      {/* Modal */}
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card glass shadow-2xl animate-scale-in scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white transition-all hover:bg-black/60 hover:scale-110"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Banner */}
        <div className={cn("relative h-64 sm:h-80 overflow-hidden bg-gradient-to-br", project.bannerGradient)}>
          <img
            src={project.banner}
            alt={`${project.title} preview`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500"
            onLoad={(e) => {
              (e.target as HTMLImageElement).style.opacity = "1"
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none"
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl opacity-15">
              {project.category === "mobile" ? "📱" : project.category === "web" ? "🌐" : project.category === "sdk" ? "📦" : "🤖"}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

          {/* Status & Year */}
          <div className="absolute bottom-6 left-6 flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3.5 py-1.5">
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  project.status === "shipped" && "bg-emerald-400",
                  project.status === "in-progress" && "bg-yellow-400 animate-pulse",
                  project.status === "archived" && "bg-gray-400",
                )}
              />
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/90">{project.status}</span>
            </div>
            <span className="font-mono text-xs text-white/60">{project.year}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">{project.title}</h2>

          <p className="text-base text-muted-foreground leading-relaxed mb-6">{project.longDescription}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-border/80 bg-secondary/60 px-3 py-1.5 font-mono text-xs text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border/30">
            {project.stars > 0 && (
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-medium text-foreground">{project.stars}</span> stars
              </span>
            )}
            {project.forks > 0 && (
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <GitFork className="h-4 w-4" />
                <span className="font-medium text-foreground">{project.forks}</span> forks
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-xl border border-border bg-secondary/50 px-5 py-3 font-mono text-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
              >
                <Github className="h-4 w-4" />
                View Source
                <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-xl border border-primary bg-primary/10 px-5 py-3 font-mono text-sm text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <ExternalLink className="h-4 w-4" />
                Visit Live
                <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
            {project.playstoreUrl && (
              <a
                href={project.playstoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-5 py-3 font-mono text-sm text-emerald-500 transition-all duration-300 hover:bg-emerald-500 hover:text-white"
              >
                <PlayStoreIcon className="h-4 w-4" />
                Google Play
                <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProjectsPageContent() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredProjects = projects.filter((p) => {
    const matchesFilter = activeFilter === "all" || p.status === activeFilter
    const matchesCategory = activeCategory === "all" || p.category === activeCategory
    const matchesSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => p.tags.includes(tag))
    return matchesFilter && matchesSearch && matchesTags && matchesCategory
  })

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <>
      <section className="px-4 sm:px-6 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Hero */}
          <div className={cn("mb-12 sm:mb-16 space-y-4", isVisible ? "animate-fade-in-up" : "opacity-0")}>
            <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
              Project Showcase
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              All Projects
            </h1>
            <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              A comprehensive collection of apps, tools, and experiments. Each project represents a problem solved and
              a skill sharpened.
            </p>

            {/* Project count stats section */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-6 pt-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-3xl font-bold text-primary leading-none">{projects.length}</span>
                <span className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Total Projects</span>
              </div>
              <div className="hidden sm:block h-10 w-px bg-border/50" />
              <div className="flex flex-col gap-1.5">
                <span className="text-3xl font-bold text-primary leading-none">
                  {projects.filter((p) => p.status === "shipped").length}
                </span>
                <span className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Shipped</span>
              </div>
              <div className="hidden sm:block h-10 w-px bg-border/50" />
              <div className="flex flex-col gap-1.5">
                <span className="text-3xl font-bold text-primary leading-none">
                  {projects.reduce((sum, p) => sum + (p.stars || 0), 0)}
                </span>
                <span className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Total Stars</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className={cn("mb-10 space-y-6 opacity-0", isVisible && "animate-fade-in-up stagger-2")}>
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card/40 border-border/60 focus:border-primary/50 rounded-xl h-11"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categoryFilters.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 active:scale-[0.98]",
                    activeCategory === cat.id
                      ? "border-primary bg-primary/15 text-primary shadow-sm shadow-primary/20"
                      : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground hover:bg-secondary/50",
                  )}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
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
              <Filter className="h-4 w-4 text-muted-foreground mr-1 self-center" />
              {allTags.map((tag) => (
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
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="rounded-md border border-destructive/30 bg-destructive/10 px-2.5 py-1 font-mono text-xs text-destructive transition-all duration-200 hover:bg-destructive/20"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <article
                key={project.id}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border bg-card/40 glass transition-all duration-400 active:scale-[0.99] hover-lift cursor-pointer opacity-0",
                  isVisible && "animate-fade-in-up",
                  "border-border/60 hover:border-primary/40",
                  project.highlight && "sm:col-span-2",
                )}
                style={{ animationDelay: `${(index % 6) * 80 + 200}ms` }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Banner */}
                <div
                  className={cn(
                    "relative h-44 sm:h-52 overflow-hidden bg-gradient-to-br",
                    project.bannerGradient,
                    project.highlight && "sm:h-60",
                  )}
                >
                  <img
                    src={project.banner}
                    alt={`${project.title} preview`}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500"
                    onLoad={(e) => {
                      (e.target as HTMLImageElement).style.opacity = "1"
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none"
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-15 group-hover:opacity-25 group-hover:scale-110 transition-all duration-500">
                      {project.category === "mobile" ? "📱" : project.category === "web" ? "🌐" : project.category === "sdk" ? "📦" : "🤖"}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/30 to-transparent" />

                  {/* Featured badge */}
                  {project.highlight && (
                    <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3 py-1.5">
                      <Sparkles className="h-3 w-3 text-white" />
                      <span className="font-mono text-[10px] uppercase tracking-wider text-white font-medium">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Status */}
                  <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3 py-1.5">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        project.status === "shipped" && "bg-emerald-400",
                        project.status === "in-progress" && "bg-yellow-400 animate-pulse",
                        project.status === "archived" && "bg-gray-400",
                      )}
                    />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/90">
                      {project.status}
                    </span>
                  </div>

                  {/* Quick action overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-5 py-2.5 font-mono text-xs text-white">
                      <span>View Details</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <div className="mb-2 font-mono text-xs text-muted-foreground">{project.year}</div>

                  <h3
                    className={cn(
                      "mb-2.5 font-bold tracking-tight transition-all duration-300 group-hover:text-gradient",
                      project.highlight ? "text-xl sm:text-2xl" : "text-lg",
                    )}
                  >
                    {project.title}
                  </h3>

                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Links row */}
                  <div className="flex items-center gap-3 pt-2 border-t border-border/30">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground hover:text-primary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="h-3.5 w-3.5" />
                        Source
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-[11px] text-primary hover:text-foreground transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Live
                      </a>
                    )}
                    {project.playstoreUrl && (
                      <a
                        href={project.playstoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-500 hover:text-foreground transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <PlayStoreIcon className="h-3.5 w-3.5" />
                        Play Store
                      </a>
                    )}

                    {project.stars > 0 && (
                      <div className="flex items-center gap-3 ml-auto font-mono text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {project.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="h-3 w-3" />
                          {project.forks}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
              </article>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 opacity-30">🔍</div>
              <p className="font-mono text-sm text-muted-foreground mb-2">No projects found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setActiveFilter("all")
                  setActiveCategory("all")
                  setSelectedTags([])
                }}
                className="font-mono text-xs text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </>
  )
}
