export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  status: "shipped" | "in-progress" | "archived";
  year: string;
  stars: number;
  forks: number;
  githubUrl?: string;
  liveUrl?: string;
  playstoreUrl?: string;
  banner: string; // gradient fallback or image path
  bannerGradient: string;
  featured: boolean;
  highlight?: boolean;
  category: "mobile" | "web" | "sdk" | "ai";
}

export const projects: Project[] = [
  {
    id: 0,
    title: "Noor",
    description:
      "A comprehensive Islamic app built with Flutter featuring prayer times, Quran reader, Tasbih counter, Qibla compass, and daily Islamic content.",
    longDescription:
      "A beautifully designed Islamic mobile app built with Flutter. Your all-in-one tool for prayer times, Quran reading, Qibla direction, prayer tracking, AI assistant, and Islamic video content with multi-language support. Features Material 3 design with smooth animations and offline capabilities.",
    tags: ["Flutter", "Dart", "Riverpod", "Gemini AI", "Firebase"],
    status: "shipped",
    year: "2025",
    stars: 45,
    forks: 12,
    githubUrl: "https://github.com/AnexDev1/noor-islamic-app",
    liveUrl: "https://noor.anexon.tech",
    banner: "/projects/noor_banner.png",
    bannerGradient: "from-emerald-600 via-teal-500 to-cyan-400",
    featured: true,
    highlight: true,
    category: "mobile",
  },
  {
    id: 1,
    title: "CodeCast",
    description:
      "A mobile app to help developers stay updated with the latest coding tutorials, tech news, and programming content.",
    longDescription:
      "A mobile application designed to help developers stay updated with the latest coding tutorials, tech news, and programming content. Features curated feeds, bookmarking, offline reading, and personalized content recommendations. Available on Google Play Store.",
    tags: ["Flutter", "Dart", "Mobile", "Education"],
    status: "shipped",
    year: "2025",
    stars: 0,
    forks: 0,
    playstoreUrl:
      "https://play.google.com/store/apps/details?id=com.anexon.codecast",
    banner: "/projects/codecast_banner.png",
    bannerGradient: "from-violet-600 via-purple-500 to-fuchsia-400",
    featured: true,
    category: "mobile",
  },
  {
    id: 2,
    title: "Ethio Cal",
    description:
      "Ethiopian Calendar app with home screen widget support, date conversion, holidays, and Material 3 design.",
    longDescription:
      "A modern Flutter app displaying Ethiopian date and day with a beautiful Material 3 UI and resizable Android home screen widget. Features animated main screen, dynamic widget updates, Ethiopian holiday tracking, and seamless date conversion between Ethiopian and Gregorian calendars.",
    tags: ["Flutter", "Dart", "Kotlin", "Android Widget"],
    status: "shipped",
    year: "2025",
    stars: 9,
    forks: 3,
    githubUrl: "https://github.com/AnexDev1/ethio_cal",
    banner: "/projects/ethiocal_banner.png",
    bannerGradient: "from-amber-500 via-orange-500 to-red-400",
    featured: true,
    category: "mobile",
  },
  {
    id: 3,
    title: "Hasab AI Flutter SDK",
    description:
      "Flutter SDK for Hasab AI providing speech-to-text, text-to-speech, and translation for Ethiopian languages.",
    longDescription:
      "A comprehensive Flutter SDK for Hasab AI providing speech-to-text, text-to-speech, translation, and chat capabilities for Ethiopian languages including Amharic, Oromo, and Tigrinya. Published on pub.dev with full documentation and example implementations.",
    tags: ["Flutter", "Dart", "SDK", "AI", "NLP"],
    status: "shipped",
    year: "2025",
    stars: 15,
    forks: 5,
    githubUrl: "https://pub.dev/packages/hasab_ai_flutter",
    banner: "/project-banners/hasabai.webp",
    bannerGradient: "from-blue-600 via-indigo-500 to-violet-400",
    featured: true,
    category: "sdk",
  },
  {
    id: 4,
    title: "VeriPay",
    description:
      "Payment verification web app for Ethiopian banks and mobile money platforms. Fast, secure, and reliable.",
    longDescription:
      "A payment verification web app to verify payments instantly across all major Ethiopian banks and mobile money platforms. Fast, secure, and reliable payment verification for businesses. Built with Next.js and TypeScript for maximum performance and reliability.",
    tags: ["Next.js", "TypeScript", "Fintech", "Payments"],
    status: "shipped",
    year: "2025",
    stars: 0,
    forks: 0,
    liveUrl: "https://veripay.anexon.tech",
    banner: "/projects/veripay_banner.png",
    bannerGradient: "from-cyan-500 via-blue-500 to-indigo-500",
    featured: true,
    category: "web",
  },
  {
    id: 5,
    title: "JIT Hub",
    description:
      "AI-powered mobile app for Jimma Institute of Technology students with campus navigation and study tools.",
    longDescription:
      "An AI-powered mobile app for Jimma Institute of Technology students. Features campus navigation, AI study assistant with Gemini 2.0, grade calculator, class schedules, and campus resources. Designed to make student life easier and more productive.",
    tags: ["Flutter", "Dart", "Gemini AI", "Mapbox", "Hive"],
    status: "shipped",
    year: "2025",
    stars: 20,
    forks: 8,
    githubUrl: "https://github.com/AnexDev1/JiT-Hub",
    banner: "/projects/jithub_banner.png",
    bannerGradient: "from-rose-500 via-pink-500 to-fuchsia-400",
    featured: false,
    category: "mobile",
  },
  {
    id: 6,
    title: "EchoLog",
    description:
      "Audio notes app with secure storage, biometric authentication, home screen widget, and easy sharing.",
    longDescription:
      "A Flutter app for capturing and managing audio notes with secure storage, biometric authentication, home screen widget, customizable themes, and easy sharing features. Available on Google Play Store with an intuitive UI and offline support.",
    tags: ["Flutter", "Dart", "Audio", "Hive", "Provider"],
    status: "shipped",
    year: "2025",
    stars: 12,
    forks: 4,
    githubUrl: "https://github.com/AnexDev1/EchoLog",
    playstoreUrl:
      "https://play.google.com/store/apps/details?id=com.anexon.echolog",
    banner: "/projects/echolog.png",
    bannerGradient: "from-green-500 via-emerald-500 to-teal-400",
    featured: false,
    category: "mobile",
  },
  {
    id: 7,
    title: "JMarket",
    description:
      "E-commerce mobile app with Supabase backend, product listings, cart management, and stunning UI.",
    longDescription:
      "An e-commerce Flutter mobile app with awesome Supabase backend, product listings, cart management, and amazing UI. A full-featured marketplace application for buying and selling with real-time updates and secure transactions.",
    tags: ["Flutter", "Dart", "Supabase", "E-commerce"],
    status: "shipped",
    year: "2025",
    stars: 18,
    forks: 6,
    githubUrl: "https://github.com/AnexDev1/JMarket",
    banner: "/projects/jmarket_banner.png",
    bannerGradient: "from-yellow-500 via-amber-500 to-orange-400",
    featured: false,
    category: "mobile",
  },
  {
    id: 8,
    title: "NativeChat",
    description:
      "Gemini-powered mobile app with context-aware interactions, voice mode, and coding assistance.",
    longDescription:
      "A powerful Gemini-powered mobile app with context-aware interactions, voice mode, system info access, call logs analysis, SMS summarization, and versatile coding assistance. Features a clean, modern interface with support for multiple conversation threads.",
    tags: ["Flutter", "Dart", "Gemini AI", "Voice", "Context-Aware"],
    status: "shipped",
    year: "2025",
    stars: 25,
    forks: 7,
    githubUrl: "https://github.com/AnexDev1/NativeChat",
    banner: "/project-banners/nativechat.webp",
    bannerGradient: "from-sky-500 via-blue-500 to-indigo-400",
    featured: false,
    category: "ai",
  },
  {
    id: 9,
    title: "FocusTrack",
    description:
      "A productivity native desktop app with real-time tracking, advanced analytics, data export, and beautiful UI/UX.",
    longDescription:
      "A powerful desktop application that tracks active applications with intelligent app name extraction, provides live activity monitoring, idle time detection, and comprehensive session management. It features beautiful glassmorphic UI, advanced analytics with multiple time views, and complete data export capabilities.",
    tags: ["Desktop", "Productivity", "Analytics", "Rust", "React"],
    status: "shipped",
    year: "2025",
    liveUrl: "https://focustrack-tawny.vercel.app/",
    githubUrl: "https://github.com/AnexDev1/focustrack",
    stars: 0,
    forks: 0,
    banner: "/projects/focustrack_banner.png",
    bannerGradient: "from-purple-500 via-indigo-500 to-blue-400",
    featured: true,
    category: "web",
  },
  {
    id: 10,
    title: "Addis AI Flutter SDK",
    description:
      "A clean, robust, and asynchronous Dart SDK for the Addis AI REST and Realtime API tailored for Ethiopian languages.",
    longDescription:
      "A clean, robust, and asynchronous Dart SDK for the Addis AI REST and Realtime API. Purpose-built for Ethiopian languages, providing native-level generation, understanding, and speech synthesis for Amharic and Afan Oromo. Features include multimodal chat, streaming responses, TTS, and Realtime WebSockets for voice-to-voice agents.",
    tags: ["Flutter", "Dart", "SDK", "AI", "NLP"],
    status: "shipped",
    year: "2025",
    stars: 0,
    forks: 0,
    githubUrl: "https://pub.dev/packages/addis_ai_sdk",
    banner: "/projects/addis_ai.png",
    bannerGradient: "from-indigo-600 via-purple-600 to-violet-500",
    featured: true,
    category: "sdk",
  },
  {
    id: 11,
    title: "Abren Inemarr!",
    description:
      "An interactive Habeshan education app for kids learning Amharic and Afaan Oromoo with games, challenges, and a safe parental environment.",
    longDescription:
      "Abren Inemarr! is an interactive educational platform designed for children to explore Habeshan languages and culture. Through a structured learning journey, kids master the Ge'ez script, complete daily challenges, earn achievements, and track progress on a global leaderboard. It combines modern gamification with traditional values for a playful, parent-approved early learning experience.",
    tags: ["Flutter", "Dart", "Education", "Cultural", "Gamification"],
    status: "shipped",
    year: "2026",
    stars: 0,
    forks: 0,
    banner: "/projects/children_banner.png",
    bannerGradient: "from-amber-500 via-orange-500 to-rose-500",
    featured: true,
    category: "mobile",
  },
];

export const allTags = [...new Set(projects.flatMap((p) => p.tags))];
export const categories = ["all", "mobile", "web", "sdk", "ai"] as const;
export type Category = (typeof categories)[number];
