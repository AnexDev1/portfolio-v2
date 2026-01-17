import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://anexon.tech"),
  title: {
    default: "ANEXON — Anwar Nasir's Digital Workshop",
    template: "%s | ANEXON",
  },
  description:
    "A self-taught senior mobile engineer crafting beautiful Flutter apps and full-stack solutions. Explore projects, artifacts, and insights by Anwar Nasir.",
  keywords: [
    "Mobile Development",
    "Flutter",
    "Dart",
    "Full Stack",
    "React",
    "Next.js",
    "TypeScript",
    "UI/UX",
    "App Development",
    "Anexon",
  ],
  authors: [{ name: "Anwar Nasir", url: "https://github.com/AnexDev1" }],
  creator: "Anwar Nasir",
  publisher: "Anwar Nasir",
  generator: "v0.app",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "ANEXON — Anwar Nasir's Digital Workshop",
    description: "A self-taught senior mobile engineer crafting beautiful Flutter apps and full-stack solutions.",
    siteName: "ANEXON",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ANEXON — Anwar Nasir's Digital Workshop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ANEXON — Anwar Nasir's Digital Workshop",
    description: "A self-taught senior mobile engineer crafting beautiful Flutter apps and full-stack solutions.",
    creator: "@AneXon3",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true} storageKey="theme-mode">
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
