"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const techCategories = [
  {
    id: "mobile",
    label: "Mobile",
    color: "from-blue-500/20 to-cyan-500/20",
    skills: [
      { name: "Flutter", level: 95, icon: "🎯" },
      { name: "Dart", level: 95, icon: "💎" },
      { name: "Riverpod", level: 90, icon: "🔄" },
      { name: "Firebase", level: 85, icon: "🔥" },
      { name: "Supabase", level: 88, icon: "⚡" },
    ],
  },
  {
    id: "web",
    label: "Web",
    color: "from-purple-500/20 to-pink-500/20",
    skills: [
      { name: "React", level: 85, icon: "⚛️" },
      { name: "Next.js", level: 82, icon: "▲" },
      { name: "TypeScript", level: 80, icon: "📘" },
      { name: "Tailwind CSS", level: 90, icon: "🎨" },
      { name: "Node.js", level: 78, icon: "🟢" },
    ],
  },
  {
    id: "ai",
    label: "AI & Tools",
    color: "from-emerald-500/20 to-teal-500/20",
    skills: [
      { name: "Gemini AI", level: 85, icon: "✨" },
      { name: "REST APIs", level: 92, icon: "🔗" },
      { name: "Git", level: 90, icon: "🔀" },
      { name: "CI/CD", level: 75, icon: "🚀" },
      { name: "Figma", level: 70, icon: "🖼️" },
    ],
  },
]

const stats = [
  { label: "Apps Shipped", value: "9+", icon: "📱" },
  { label: "Years Coding", value: "4+", icon: "⌨️" },
  { label: "Telegram Followers", value: "1.4k+", icon: "👥" },
  { label: "Open Source", value: "8+", icon: "🌐" },
]

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState("mobile")

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-xl border border-border bg-card/40 glass p-5 transition-all duration-300 hover:border-primary/40 hover:bg-card/60 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-2xl sm:text-3xl font-bold text-gradient">{stat.value}</span>
              </div>
              <p className="font-mono text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {techCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-300",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card/40 border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div
          className={cn(
            "rounded-xl border border-border bg-card/40 glass p-6 sm:p-8 transition-all duration-500",
            currentCategory && `bg-gradient-to-br ${currentCategory.color}`,
          )}
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {currentCategory?.skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group relative overflow-hidden rounded-lg bg-background/50 p-4 transition-all duration-300 hover:bg-background/80 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{skill.icon}</span>
                    <span className="font-medium">{skill.name}</span>
                  </div>
                  <span className="font-mono text-xs text-primary">{skill.level}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
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
