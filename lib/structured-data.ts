import type { BlogPost } from "./blog-data"

export function generateBlogPostStructuredData(post: BlogPost, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${url}/og-images/${post.slug}.png`,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: post.author.name,
      url: "https://github.com/AnexDev1",
    },
    publisher: {
      "@type": "Person",
      name: "Anwar Nasir",
      url: "https://anexon.tech",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${url}/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.tags.join(", "),
    timeRequired: post.readTime,
  }
}

export function generateWebsiteStructuredData(url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ANEXON",
    description:
      "Anwar Nasir's digital workshop — a self-taught senior mobile engineer crafting beautiful Flutter apps and full-stack solutions.",
    url: url,
    author: {
      "@type": "Person",
      name: "Anwar Nasir",
      url: "https://github.com/AnexDev1",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export function generatePersonStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Anwar Nasir",
    alternateName: "Anexon",
    url: "https://anexon.tech",
    image: "https://anexon.tech/developer-portrait.png",
    sameAs: ["https://github.com/AnexDev1", "https://twitter.com/AneXon3", "https://t.me/AneXon1"],
    jobTitle: "Senior Mobile Engineer",
    worksFor: {
      "@type": "Organization",
      name: "ANEXON",
    },
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
