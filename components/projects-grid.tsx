"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Github, Star, GitFork, ExternalLink, Sparkles, ArrowRight, Play } from "lucide-react"
import { projects } from "@/lib/projects-data"

const PlayStoreIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
  </svg>
)

// Show only featured projects on homepage (max 4)
const featuredProjects = projects.filter((p) => p.featured).slice(0, 4)

export function ProjectsGrid() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  return (
    <section id="projects" className="px-4 sm:px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-14 flex flex-col gap-6 sm:gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3 animate-fade-in-up">
            <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">Artifacts</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Featured Projects</h2>
            <p className="max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed">
              A selection of my best work. Mobile apps, web platforms, and developer tools.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <article
              key={project.id}
              className={cn(
                "group relative overflow-hidden rounded-xl border bg-card/40 glass transition-all duration-400 active:scale-[0.99] hover-lift animate-fade-in-up",
                hoveredProject === project.id
                  ? "border-primary/50 bg-card/70"
                  : "border-border/60",
                project.highlight && "sm:col-span-2",
              )}
              style={{ animationDelay: `${(index % 6) * 100 + 200}ms` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Banner / Preview */}
              <div className={cn(
                "relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br",
                project.bannerGradient,
                project.highlight && "sm:h-64",
              )}>
                {/* Try to load image, fallback to gradient */}
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
                {/* Gradient fallback content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl sm:text-7xl opacity-20 group-hover:opacity-30 transition-all duration-500 group-hover:scale-110">
                    {project.category === "mobile" ? "📱" : project.category === "web" ? "🌐" : project.category === "sdk" ? "📦" : "🤖"}
                  </span>
                </div>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/40 to-transparent" />

                {/* Featured badge */}
                {project.highlight && (
                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3.5 py-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white font-medium">
                      Featured
                    </span>
                  </div>
                )}

                {/* Status */}
                <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3 py-1.5">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      project.status === "shipped" && "bg-emerald-400 shadow-sm shadow-emerald-400/50",
                      project.status === "in-progress" && "bg-yellow-400 animate-pulse",
                      project.status === "archived" && "bg-gray-400",
                    )}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/90">{project.status}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7">
                <div className="mb-2 font-mono text-xs text-muted-foreground">{project.year}</div>

                <h3 className={cn(
                  "mb-3 font-bold tracking-tight transition-all duration-300 group-hover:text-gradient",
                  project.highlight ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
                )}>
                  {project.title}
                </h3>

                <p className="mb-5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {project.description}
                </p>

                <div className="mb-5 flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border/80 bg-secondary/60 px-2.5 py-1 font-mono text-xs text-secondary-foreground transition-colors hover:border-primary/50 hover:bg-primary/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-all duration-300 group/link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="h-4 w-4 transition-transform group-hover/link:scale-110" />
                      <span className="underline-animate">source</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-mono text-xs text-primary hover:text-foreground transition-all duration-300 group/link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4 transition-transform group-hover/link:scale-110 group-hover/link:rotate-12" />
                      <span className="underline-animate">live</span>
                    </a>
                  )}
                  {project.playstoreUrl && (
                    <a
                      href={project.playstoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-mono text-xs text-primary hover:text-foreground transition-all duration-300 group/link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <PlayStoreIcon className="h-4 w-4 transition-transform group-hover/link:scale-110" />
                      <span className="underline-animate">play store</span>
                    </a>
                  )}
                  {project.stars > 0 && (
                    <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground ml-auto">
                      <Star className="h-3.5 w-3.5" />
                      {project.stars}
                    </span>
                  )}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="mt-12 flex justify-center animate-fade-in-up stagger-4">
          <Link
            href="/projects"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl border border-primary bg-primary/10 px-8 py-4 font-mono text-sm text-primary transition-all duration-500 hover:text-primary-foreground active:scale-[0.98]"
          >
            <span className="relative z-10">view all projects</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-500 group-hover:translate-x-0" />
          </Link>
        </div>
      </div>
    </section>
  )
}
