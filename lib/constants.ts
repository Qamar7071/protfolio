/* =========================================================
   SITE CONFIG — Qamar's personal portfolio branding
   ========================================================= */
export const SITE_CONFIG = {
  name: "Qamar",
  fullName: "Qamar Abbas",
  title: "AI/ML Engineer & Full-Stack Developer",
  tagline: "Building intelligent, production-ready software.",
  description:
    "Portfolio of Qamar — AI/ML Engineer, Python & Java Developer, and Full-Stack Engineer based in Islamabad, Pakistan. I build intelligent, scalable, production-ready software with clean code and real-world impact.",
  url: "https://qamar.dev",
  ogImage: "/og-image.png",
  location: "Islamabad, Pakistan",
  email: "qamarjamal7071@gmail.com",
  phone: "+923408280700",
  availability: "Available for freelance & full-time roles",
  resumeUrl: "/resume.pdf",
} as const;

/* =========================================================
   SOCIAL LINKS
   Note: keys use lowercase for consistency with the app code.
   ========================================================= */
export const SOCIAL_LINKS = {
  github: "https://github.com/Qamar7071/",
  linkedin: "https://www.linkedin.com/in/qamar-abbas-39a971392",
  facebook: "https://www.facebook.com/profile.php?id=61564853759422",
  fiverr: "https://www.fiverr.com/s/XLG3ybZ",
  email: "mailto:qamarjamal7071@gmail.com",
  whatsapp: "https://wa.me/923408280700",
} as const;

/* =========================================================
   NAVIGATION
   ========================================================= */
export const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
] as const;

/* =========================================================
   HERO — rotating titles (typewriter effect)
   ========================================================= */
export const ROTATING_TITLES = [
  "AI/ML Engineer",
  "Python Developer",
  "Java Developer",
  "Full-Stack Developer",
  "Problem Solver",
] as const;

export const HERO_HIGHLIGHTS = [
  "Production-ready ML systems",
  "Scalable backend APIs",
  "Clean, tested code",
  "End-to-end delivery",
] as const;

/* =========================================================
   STATS — Apna College style number strip
   ========================================================= */
export const STATS = [
  { value: "3+", label: "Years of Experience", icon: "Briefcase" },
  { value: "40+", label: "Projects Delivered", icon: "Rocket" },
  { value: "20+", label: "Happy Clients", icon: "Users" },
  { value: "15+", label: "Technologies Mastered", icon: "Code2" },
] as const;

/* =========================================================
   ABOUT
   ========================================================= */
export const ABOUT = {
  heading: "Get to know me",
  intro:
    "I'm Qamar — an engineer who lives at the intersection of machine learning and full-stack development. From training and deploying ML models to shipping polished, production-ready web applications, I turn ideas into working software.",
  paragraphs: [
    "I specialize in AI/ML systems using Python, PyTorch, and TensorFlow, and I build robust backend and full-stack applications with Java (Spring Boot), Node.js, and modern frontend stacks.",
    "Based in Islamabad, Pakistan, I work with startups and teams worldwide to design, build, and deploy software that solves real problems — with clean architecture, strong tests, and pixel-perfect UI.",
  ],
  keyPoints: [
    { title: "AI/ML Systems", desc: "Model training, deployment, and MLOps for real production use cases." },
    { title: "Backend Engineering", desc: "Java Spring Boot & Python APIs, database design, and scalable services." },
    { title: "Full-Stack Delivery", desc: "React, Next.js, and TypeScript apps — designed, built, and shipped." },
    { title: "Clean Code", desc: "Tested, documented, and reviewed — engineered to last." },
  ],
} as const;

/* =========================================================
   SKILLS — grouped by domain
   ========================================================= */
export const SKILL_CATEGORIES = [
  {
    title: "AI / Machine Learning",
    icon: "Brain",
    color: "primary",
    skills: [
      "Python", "PyTorch", "TensorFlow", "scikit-learn",
      "Hugging Face", "OpenAI API", "LangChain", "Pandas", "NumPy",
    ],
  },
  {
    title: "Backend Development",
    icon: "Server",
    color: "secondary",
    skills: [
      "Java", "Spring Boot", "FastAPI", "Django",
      "Node.js", "Express", "REST APIs", "GraphQL", "Microservices",
    ],
  },
  {
    title: "Frontend Development",
    icon: "Layout",
    color: "primary",
    skills: [
      "TypeScript", "React", "Next.js", "Tailwind CSS",
      "Framer Motion", "Redux", "React Query", "Zustand",
    ],
  },
  {
    title: "Databases & DevOps",
    icon: "Database",
    color: "secondary",
    skills: [
      "PostgreSQL", "MongoDB", "MySQL", "Redis",
      "Docker", "Kubernetes", "AWS", "Git", "CI/CD",
    ],
  },
] as const;

/* =========================================================
   PROJECTS — featured work
   ========================================================= */
export const PROJECTS = [
  {
    id: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    category: "AI / ML",
    description:
      "An intelligent resume screening platform that uses NLP and semantic matching to rank candidates against job descriptions, with explainable scoring.",
    image: "/projects/resume-analyzer.png",
    tech: ["Python", "FastAPI", "Hugging Face", "Next.js", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "smart-inventory",
    title: "Smart Inventory System",
    category: "Full-Stack",
    description:
      "End-to-end inventory management platform with ML-based demand forecasting, real-time dashboards, and multi-warehouse support.",
    image: "/projects/inventory.png",
    tech: ["Java", "Spring Boot", "React", "PostgreSQL", "Docker"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "chatbot-platform",
    title: "Multi-Tenant Chatbot Platform",
    category: "AI / ML",
    description:
      "SaaS chatbot platform powered by LLMs with knowledge-base integration, custom personas, and analytics for each tenant.",
    image: "/projects/chatbot.png",
    tech: ["Python", "LangChain", "OpenAI", "Next.js", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "finance-tracker",
    title: "Personal Finance Tracker",
    category: "Full-Stack",
    description:
      "Beautiful, secure personal finance app with budgets, insights, and category-level analytics — mobile-first PWA.",
    image: "/projects/finance.png",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: "image-classifier",
    title: "Vision Classifier API",
    category: "AI / ML",
    description:
      "Fine-tuned computer-vision model served as a REST API with autoscaling, batch inference, and monitoring.",
    image: "/projects/vision.png",
    tech: ["Python", "PyTorch", "FastAPI", "Docker", "AWS"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: "ecommerce-platform",
    title: "Modern E-Commerce Platform",
    category: "Full-Stack",
    description:
      "Headless commerce storefront with Stripe payments, admin dashboard, and blazing-fast product search.",
    image: "/projects/ecommerce.png",
    tech: ["Next.js", "Stripe", "Node.js", "MongoDB", "Redis"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
] as const;

export const PROJECT_CATEGORIES = ["All", "AI / ML", "Full-Stack"] as const;

/* =========================================================
   EXPERIENCE — work timeline
   ========================================================= */
export const EXPERIENCE = [
  {
    role: "AI/ML Engineer",
    company: "Freelance",
    period: "2024 — Present",
    location: "Remote",
    description:
      "Building custom ML models, LLM integrations, and AI-powered products for startups and enterprise clients across Pakistan, the Middle East, and Europe.",
    tags: ["Python", "PyTorch", "LangChain", "FastAPI"],
  },
  {
    role: "Full-Stack Developer",
    company: "Tech Studio",
    period: "2023 — 2024",
    location: "Islamabad, Pakistan",
    description:
      "Delivered production-grade web apps using Next.js, Node.js, and PostgreSQL. Led frontend architecture and mentored junior developers.",
    tags: ["Next.js", "Node.js", "TypeScript", "PostgreSQL"],
  },
  {
    role: "Java Backend Developer",
    company: "Enterprise Solutions",
    period: "2022 — 2023",
    location: "Islamabad, Pakistan",
    description:
      "Built and maintained Spring Boot microservices for financial and inventory systems, with REST APIs, JWT auth, and CI/CD pipelines.",
    tags: ["Java", "Spring Boot", "Microservices", "Docker"],
  },
] as const;

/* =========================================================
   TESTIMONIALS
   ========================================================= */
export const TESTIMONIALS = [
  {
    name: "Ahmed Khan",
    role: "Founder, StartupX",
    avatar: "/testimonials/1.jpg",
    quote:
      "Qamar delivered an ML-powered dashboard that saved us weeks of engineering. Clean code, fast delivery, and genuinely great communication.",
    rating: 5,
  },
  {
    name: "Sarah Ali",
    role: "CTO, FinTech Labs",
    avatar: "/testimonials/2.jpg",
    quote:
      "One of the most reliable full-stack engineers I've worked with. Ships on time, thinks about edge cases, and writes code the whole team can read.",
    rating: 5,
  },
  {
    name: "Bilal Iqbal",
    role: "Product Manager, SaaS Co",
    avatar: "/testimonials/3.jpg",
    quote:
      "From backend APIs to a beautiful frontend, Qamar handled the entire product build. The AI features he shipped became our biggest selling point.",
    rating: 5,
  },
  {
    name: "Fatima Hassan",
    role: "Engineering Lead, Retail Tech",
    avatar: "/testimonials/4.jpg",
    quote:
      "Excellent at breaking down complex ML problems and turning them into production systems. Highly recommend for AI + full-stack work.",
    rating: 5,
  },
] as const;

/* =========================================================
   TECH MARQUEE — logos row
   ========================================================= */
export const TECH_MARQUEE = [
  "Python", "Java", "TypeScript", "React", "Next.js",
  "Node.js", "Spring Boot", "PyTorch", "TensorFlow",
  "PostgreSQL", "MongoDB", "Docker", "AWS", "LangChain",
  "FastAPI", "Tailwind CSS",
] as const;

/* =========================================================
   SERVICES — AI-focused offerings
   ========================================================= */
export const SERVICES = [
  {
    id: "chatbot",
    number: "01",
    icon: "Bot",
    title: "AI Chatbot Development",
    tagline: "Smart bots that talk like humans",
    description:
      "Custom chatbots powered by GPT / Claude with knowledge base integration, custom personas, and multi-channel deployment.",
    features: [
      "Custom LLM integration (GPT, Claude, Llama)",
      "RAG & vector database setup",
      "Multi-channel: web, WhatsApp, Slack",
      "Analytics & conversation insights",
    ],
    deliverables: ["Python", "LangChain", "React", "PostgreSQL"],
    idealFor: "Startups & customer support teams",
  },
  {
    id: "ai-websites",
    number: "02",
    icon: "Globe",
    title: "AI-Powered Websites",
    tagline: "Websites that think & adapt",
    description:
      "Modern web apps with AI features baked in — smart search, content generation, personalization, and voice interaction.",
    features: [
      "Next.js + AI feature integration",
      "AI search, chat & recommendations",
      "SEO-optimized & blazing fast",
      "Payments & authentication included",
    ],
    deliverables: ["Next.js", "TypeScript", "Vercel", "OpenAI API"],
    idealFor: "SaaS, e-commerce & content platforms",
  },
  {
    id: "prompt-engineering",
    number: "03",
    icon: "Wand2",
    title: "Prompt Engineering",
    tagline: "Crafting prompts that actually work",
    description:
      "Design, test, and optimize prompts for maximum accuracy and consistency. Prompt libraries, chains, and evaluation frameworks.",
    features: [
      "Prompt design & optimization",
      "Chain-of-thought templates",
      "Testing & evaluation suites",
      "Reusable prompt libraries + docs",
    ],
    deliverables: ["System prompts", "Templates", "Eval reports", "Docs"],
    idealFor: "Teams building on GPT, Claude, Gemini",
  },
  {
    id: "ai-models",
    number: "04",
    icon: "Brain",
    title: "Custom AI Models",
    tagline: "Models trained for your data",
    description:
      "Train, fine-tune, and deploy custom ML models for classification, prediction, computer vision, or NLP tasks.",
    features: [
      "Model training & fine-tuning",
      "Computer vision & NLP tasks",
      "REST API deployment",
      "MLOps & production monitoring",
    ],
    deliverables: ["PyTorch", "FastAPI", "Docker", "AWS/GCP"],
    idealFor: "Enterprises with proprietary data",
  },
] as const;

/* =========================================================
   FAQ — bottom of contact section
   ========================================================= */
export const FAQS = [
  {
    q: "What kind of projects do you take on?",
    a: "AI/ML systems, full-stack web apps, and backend services — from MVPs to production-scale rebuilds. I especially enjoy projects that combine ML with real product surfaces.",
  },
  {
    q: "Do you work remotely?",
    a: "Yes. I'm based in Islamabad, Pakistan, and work remotely with clients worldwide across multiple time zones.",
  },
  {
    q: "How do you price your work?",
    a: "Depending on scope: fixed-price for well-defined MVPs, or weekly/monthly for ongoing engineering work. I always share a clear estimate before we start.",
  },
  {
    q: "How quickly can you start?",
    a: "For most projects, I can start within 1–2 weeks. For urgent work, I try to accommodate faster timelines when my schedule allows.",
  },
] as const;

/* =========================================================
   FOOTER LINKS  — real URLs from SOCIAL_LINKS
   ========================================================= */
export const FOOTER_LINKS = {
  navigate: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ],
  services: [
    { name: "AI Chatbot Development", href: "#services" },
    { name: "AI-Powered Websites", href: "#services" },
    { name: "Prompt Engineering", href: "#services" },
    { name: "Custom AI Models", href: "#services" },
  ],
  resources: [
    { name: "Resume", href: SITE_CONFIG.resumeUrl },
    { name: "GitHub", href: SOCIAL_LINKS.github },
    { name: "LinkedIn", href: SOCIAL_LINKS.linkedin },
    { name: "Fiverr", href: SOCIAL_LINKS.fiverr },
  ],
} as const;