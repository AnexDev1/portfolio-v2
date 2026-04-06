"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const techCategories = [
  {
    id: "mobile",
    label: "Mobile",
    icon: "📱",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "group-hover:border-blue-400/50",
    tools: [
      { name: "Flutter", icon: "🎯", description: "Primary framework" },
      { name: "Dart", icon: "💎", description: "Core language" },
      { name: "Riverpod", icon: "🔄", description: "State management" },
      { name: "Firebase", icon: "🔥", description: "Backend & auth" },
      { name: "Supabase", icon: "⚡", description: "DB & storage" },
      { name: "Hive", icon: "📦", description: "Local storage" },
    ],
  },
  {
    id: "web",
    label: "Web",
    icon: "🌐",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "group-hover:border-purple-400/50",
    tools: [
      { name: "React", icon: "⚛️", description: "UI library" },
      { name: "Next.js", icon: "▲", description: "Full-stack framework" },
      { name: "TypeScript", icon: "📘", description: "Type safety" },
      { name: "Tailwind CSS", icon: "🎨", description: "Utility-first CSS" },
      { name: "Node.js", icon: "🟢", description: "Runtime" },
      { name: "PostgreSQL", icon: "🐘", description: "Database" },
    ],
  },
  {
    id: "ai",
    label: "AI & Tools",
    icon: "🤖",
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "group-hover:border-emerald-400/50",
    tools: [
      { name: "Gemini AI", icon: "✨", description: "LLM integration" },
      { name: "REST APIs", icon: "🔗", description: "API design" },
      { name: "Git", icon: "🔀", description: "Version control" },
      { name: "CI/CD", icon: "🚀", description: "Automation" },
      { name: "Figma", icon: "🖼️", description: "Design" },
      { name: "VS Code", icon: "💻", description: "IDE" },
    ],
  },
]

const stats = [
  { label: "Apps Shipped", value: "9+", icon: "📱", accent: "text-blue-400" },
  { label: "Years Coding", value: "4+", icon: "⌨️", accent: "text-purple-400" },
  { label: "Telegram Followers", value: "1.4k+", icon: "👥", accent: "text-cyan-400" },
  { label: "Open Source", value: "8+", icon: "🌐", accent: "text-emerald-400" },
]

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState("mobile")
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)

  const currentCategory = techCategories.find((c) => c.id === activeCategory)

  return (
    <section id="tech-stack" className="px-4 sm:px-6 py-20 sm:py-28 border-t border-border/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-14 space-y-3 animate-fade-in-up">
          <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">Expertise</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Tech Stack</h2>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Technologies and tools I use to bring ideas to life. From mobile-first to full-stack solutions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-xl border border-border bg-card/40 glass p-5 transition-all duration-300 hover:border-primary/40 hover:bg-card/60 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{stat.icon}</span>
                <span className={cn("text-2xl sm:text-3xl font-bold", stat.accent)}>{stat.value}</span>
              </div>
              <p className="font-mono text-xs text-muted-foreground">{stat.label}</p>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap gap-3 mb-10">
          {techCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "flex items-center gap-2.5 px-5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-400",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-[1.02]"
                  : "bg-card/40 border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-card/60",
              )}
            >
              <span className="text-base">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Tools Grid - Modern Icon Cards */}
        <div
          className={cn(
            "rounded-2xl border border-border/60 bg-card/30 glass p-6 sm:p-8 transition-all duration-500",
            currentCategory && `bg-gradient-to-br ${currentCategory.color}`,
          )}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {currentCategory?.tools.map((tool, index) => (
              <div
                key={tool.name}
                className={cn(
                  "group relative flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-background/60 p-5 sm:p-6 transition-all duration-400 cursor-default animate-fade-in",
                  hoveredTool === tool.name
                    ? "border-primary/60 bg-background/90 shadow-lg shadow-primary/10 scale-[1.05] -translate-y-1"
                    : "hover:border-primary/40 hover:bg-background/80 hover:shadow-md hover:-translate-y-0.5",
                )}
                style={{ animationDelay: `${index * 60}ms` }}
                onMouseEnter={() => setHoveredTool(tool.name)}
                onMouseLeave={() => setHoveredTool(null)}
              >
                {/* Icon */}
                <span
                  className={cn(
                    "text-3xl sm:text-4xl transition-transform duration-400",
                    hoveredTool === tool.name && "scale-110",
                  )}
                >
                  {tool.icon}
                </span>

                {/* Name */}
                <span className="font-medium text-sm text-center leading-tight">{tool.name}</span>

                {/* Description tooltip on hover */}
                <span
                  className={cn(
                    "font-mono text-[10px] text-primary/80 text-center transition-all duration-300",
                    hoveredTool === tool.name ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
                  )}
                >
                  {tool.description}
                </span>

                {/* Glow effect */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-transparent transition-opacity duration-400",
                    hoveredTool === tool.name ? "opacity-100" : "opacity-0",
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center animate-fade-in-up stagger-4">
          <p className="font-mono text-sm text-muted-foreground mb-4">Interested in working together?</p>
          <a href="#connect" className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline">
            Let's connect <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
