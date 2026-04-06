import { BlogHero } from "@/components/public/blog/blog-hero";
import { BlogList } from "@/components/public/blog/blog-list";
import { BlogSidebar } from "@/components/public/blog/blog-sidebar";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anexon.tech';

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on Flutter development, AI integration, mobile architecture, and lessons from shipping real-world apps by Anwar Nasir.",
  openGraph: {
    title: "Blog — ANEXON",
    description: "Articles on Flutter development, AI integration, and mobile architecture by Anwar Nasir.",
    url: `${baseUrl}/blog`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ANEXON Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — ANEXON",
    description: "Articles on Flutter development, AI integration, and mobile architecture by Anwar Nasir.",
    images: [`${baseUrl}/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
};

export default function BlogPage() {
  return (
    <div>
      <BlogHero />
      <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-border/30">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            <BlogList />
            <BlogSidebar />
          </div>
        </div>
      </section>
    </div>
  );
}
