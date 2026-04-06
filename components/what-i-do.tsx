"use client"

import { cn } from "@/lib/utils"
import { Code2, Smartphone, Globe, Cpu, Palette, Zap } from "lucide-react"

const services = [
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Cross-platform Flutter apps with native performance, beautiful Material 3 design, and seamless UX.",
    gradient: "from-blue-500/10 to-cyan-500/10",
    iconColor: "text-blue-400",
    borderHover: "hover:border-blue-400/40",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Full-stack web applications with Next.js, React, and TypeScript. Fast, responsive, and accessible.",
    gradient: "from-purple-500/10 to-pink-500/10",
    iconColor: "text-purple-400",
    borderHover: "hover:border-purple-400/40",
  },
  {
    icon: Cpu,
    title: "AI Integration",
    description: "Smart features powered by Gemini AI, natural language processing, and intelligent automation.",
    gradient: "from-emerald-500/10 to-teal-500/10",
    iconColor: "text-emerald-400",
    borderHover: "hover:border-emerald-400/40",
  },
  {
    icon: Code2,
    title: "SDK Development",
    description: "Developer-friendly packages and SDKs published to pub.dev and npm, with full documentation.",
    gradient: "from-amber-500/10 to-orange-500/10",
    iconColor: "text-amber-400",
    borderHover: "hover:border-amber-400/40",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Clean, intuitive interfaces following Material Design and Human Interface Guidelines.",
    gradient: "from-rose-500/10 to-pink-500/10",
    iconColor: "text-rose-400",
    borderHover: "hover:border-rose-400/40",
  },
  {
    icon: Zap,
    title: "API Design",
    description: "RESTful APIs, real-time systems with Supabase, Firebase integration, and backend architecture.",
    gradient: "from-cyan-500/10 to-blue-500/10",
    iconColor: "text-cyan-400",
    borderHover: "hover:border-cyan-400/40",
  },
]

export function WhatIDo() {
  return (
    <section id="what-i-do" className="px-4 sm:px-6 py-20 sm:py-28 border-t border-border/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-14 space-y-3 animate-fade-in-up">
          <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">Services</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">What I Do</h2>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            From concept to deployment — I build polished digital products that users love.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={cn(
                "group relative overflow-hidden rounded-xl border border-border/60 bg-card/40 glass p-6 sm:p-7 transition-all duration-400 hover-lift animate-fade-in-up",
                service.borderHover,
              )}
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              {/* Icon */}
              <div
                className={cn(
                  "mb-5 inline-flex items-center justify-center rounded-xl w-12 h-12 bg-gradient-to-br transition-all duration-300 group-hover:scale-110",
                  service.gradient,
                )}
              >
                <service.icon className={cn("h-6 w-6", service.iconColor)} />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-lg font-bold tracking-tight transition-all duration-300 group-hover:text-gradient">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>

              {/* Hover gradient */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10",
                  service.gradient,
                )}
              />

              {/* Bottom line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
