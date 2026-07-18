/* =========================================================
   SITE CONFIG — Qamar's personal portfolio branding
   ========================================================= */
export const SITE_CONFIG = {
  name: "Qamar",
  fullName: "Qamar Abbas",
  title: "AI/ML Student & Python Developer",
  tagline: "Building intelligent, deployed ML applications.",
  description:
    "Portfolio of Qamar Abbas — AI/ML student and Python developer based in Islamabad, Pakistan. Currently pursuing BS in Artificial Intelligence at Shifa Tameer-e-Millat University while shipping real ML applications to production.",
  url: "https://qamar.dev",
  ogImage: "/og-image.png",
  location: "Islamabad, Pakistan",
  email: "qamarjamal7071@gmail.com",
  phone: "+923408280700",
  availability: "Available for freelance & internships",
  resumeUrl: "/resume.pdf",
} as const;

/* =========================================================
   SOCIAL LINKS
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
  { name: "Certifications", href: "#certifications" },
  { name: "Services", href: "#services" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
] as const;

/* =========================================================
   HERO — rotating titles
   ========================================================= */
export const ROTATING_TITLES = [
  "AI/ML Student",
  "Python Developer",
  "ML Engineer in Training",
  "Data Enthusiast",
  "Problem Solver",
] as const;

export const HERO_HIGHLIGHTS = [
  "Deployed ML applications",
  "IBM-certified in Deep Learning",
  "BS Artificial Intelligence",
  "Freelancing on Fiverr",
] as const;

/* =========================================================
   STATS — real, honest numbers
   ========================================================= */
export const STATS = [
  { value: "5+", label: "Deployed Projects", icon: "Rocket" },
  { value: "10+", label: "Technologies", icon: "Code2" },
  { value: "2", label: "Certifications", icon: "Award" },
  { value: "4+", label: "Years Studying AI", icon: "GraduationCap" },
] as const;

/* =========================================================
   ABOUT — honest story
   ========================================================= */
export const ABOUT = {
  heading: "Get to know me",
  intro:
    "I'm Qamar Abbas — an AI/ML student and Python developer building at the intersection of machine learning and modern web deployment. Currently pursuing my BS in Artificial Intelligence at Shifa Tameer-e-Millat University while shipping real ML applications to production.",
  paragraphs: [
    "I focus on end-to-end machine learning applications using Python, scikit-learn, TensorFlow, and Keras — from training models on real datasets to deploying them as live web applications with Flask, Vercel, and Render.",
    "Based in Islamabad, Pakistan, I'm open to freelance opportunities and internships where I can grow while contributing to meaningful projects. I'm actively learning through hands-on projects, Fiverr freelance work, and industry certifications like IBM's Deep Learning course.",
  ],
  keyPoints: [
    { title: "AI/ML Applications", desc: "Trained and deployed 5+ end-to-end machine learning models on real datasets." },
    { title: "Python Ecosystem", desc: "Comfortable with scikit-learn, TensorFlow, Keras, Pandas, and NumPy for data science." },
    { title: "Modern Deployment", desc: "Ship live apps using Flask, Vercel, and Render — no just-in-my-laptop projects." },
    { title: "Always Learning", desc: "IBM-certified in Deep Learning, pursuing BS AI, freelancing on Fiverr." },
  ],
} as const;

/* =========================================================
   SKILLS — grouped by domain (honest, based on real usage)
   ========================================================= */
export const SKILL_CATEGORIES = [
  {
    title: "AI / Machine Learning",
    icon: "Brain",
    color: "primary",
    skills: [
      "Python", "TensorFlow", "Keras", "Deep Learning",
      "scikit-learn", "Random Forest", "Regression Models",
      "Pandas", "NumPy", "Data Preprocessing",
    ],
  },
  {
    title: "Backend & Web",
    icon: "Server",
    color: "secondary",
    skills: [
      "Python", "Flask", "REST APIs",
      "Java (Basic)", "JavaScript", "HTML", "CSS",
    ],
  },
  {
    title: "Frontend Development",
    icon: "Layout",
    color: "primary",
    skills: [
      "JavaScript", "TypeScript", "React",
      "Next.js", "Tailwind CSS", "Framer Motion",
    ],
  },
  {
    title: "Tools & Deployment",
    icon: "Database",
    color: "secondary",
    skills: [
      "Git", "GitHub", "Vercel", "Render",
      "VS Code", "IntelliJ IDEA", "OpenAI API",
      "Prompt Engineering",
    ],
  },
] as const;

/* =========================================================
   PROJECTS — real deployed work
   ========================================================= */
export const PROJECTS = [
  {
    id: "diabetes-risk-screening",
    title: "Diabetes Risk Assessment",
    category: "AI / ML",
    description:
      "A clinical screening tool that predicts diabetes probability from 8 routine health measurements. Uses ensemble ML models — Random Forest, Logistic Regression, and Gradient Boosting — trained on the Pima Indians Diabetes dataset with 768 records.",
    image: "/projects/diabetes.png",
    tech: ["Python", "Scikit-learn", "Random Forest", "JavaScript", "Vercel"],
    liveUrl: "https://diabetes-prediction-app-rho.vercel.app/",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "uswa-ai-assistant",
    title: "USWA AI Assistant",
    category: "AI / ML",
    description:
      "An intelligent chatbot built for the Uswa Yultar Education System in Gilgit-Baltistan. Helps students and parents get instant answers about admissions, fees, class timings, subjects, teachers, and holidays — powered by LLM technology with contextual understanding.",
    image: "/projects/uswa.png",
    tech: ["Python", "OpenAI API", "Flask", "JavaScript", "Render"],
    liveUrl: "https://uswa-ai-assistant-2.onrender.com/",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "scholarly-gpa-predictor",
    title: "Scholarly — GPA Predictor",
    category: "AI / ML",
    description:
      "An academic prediction engine that estimates student GPA using Linear Regression trained on 1,500 records. Analyzes 8 lifestyle factors — study hours, sleep, attendance, previous GPA, assignments, participation, extracurriculars, and social media — with feature-impact analysis. R² 0.608, RMSE 0.247.",
    image: "/projects/gpa.png",
    tech: ["Python", "Flask", "Scikit-learn", "Linear Regression", "Vercel"],
    liveUrl: "https://gpa-predictor-woad.vercel.app/",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "loancheck-eligibility",
    title: "LoanCheck — AL Habib",
    category: "AI / ML",
    description:
      "An AI-powered loan eligibility portal styled after Bank AL Habib. Uses Logistic Regression trained on 2,000+ records to give instant approval probability assessments based on income, loan terms, education, credit history, and property area. 84% accuracy, 0.93 ROC-AUC score. Follows State Bank of Pakistan guidelines.",
    image: "/projects/loan.png",
    tech: ["Python", "Flask", "Scikit-learn", "Logistic Regression", "Vercel"],
    liveUrl: "https://loan-predictor-sigma.vercel.app/",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "image-classifier-cnn",
    title: "Image Classification (Cat vs Dog)",
    category: "AI / ML",
    description:
      "Convolutional Neural Network image classifier that categorizes images as cats or dogs. Covers image preprocessing, feature extraction, model training, and evaluation using TensorFlow/Keras and OpenCV. Great starting point for computer vision projects.",
    image: "/projects/cnn.png",
    tech: ["Python", "TensorFlow", "Keras", "OpenCV", "CNN"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
] as const;

export const PROJECT_CATEGORIES = ["All", "AI / ML"] as const;

/* =========================================================
   CERTIFICATES — professional credentials
   ========================================================= */
export const CERTIFICATES = [
  {
    id: "ibm-deep-learning-keras",
    title: "Introduction to Deep Learning & Neural Networks with Keras",
    provider: "IBM",
    platform: "Coursera",
    date: "Jul 14, 2026",
    verifyUrl: "https://coursera.org/verify/GYNJY9XS0VZY",
    image: "/certificates/ibm-deep-learning.png",
    skills: ["Deep Learning", "Neural Networks", "Keras", "TensorFlow"],
    featured: true,
  },
  {
    id: "python-programming-course",
    title: "Python Programming Course",
    provider: "Uswa Public School",
    platform: "Certificate of Appreciation",
    date: "2020",
    verifyUrl: "#",
    image: "/certificates/python-course.png",
    skills: ["Python", "Programming Fundamentals"],
    featured: true,
  },
  {
    id: "arduino-basic-course",
    title: "Basic Arduino Course",
    provider: "Uswa Public School & College",
    platform: "Yultar, Skardu",
    date: "2019",
    verifyUrl: "#",
    image: "/certificates/arduino.png",
    skills: ["Arduino", "Electronics", "Hardware"],
    featured: false,
  },
  {
    id: "best-award-2022",
    title: "Best Award — Naat, Art Competition & Scientific Exhibition",
    provider: "Uswa Public School & College",
    platform: "Yultar, Skardu",
    date: "Mar 17, 2022",
    verifyUrl: "#",
    image: "/certificates/naat-2022.png",
    skills: ["Leadership", "Creativity", "Public Speaking"],
    featured: false,
  },
  {
    id: "naat-art-science-2017",
    title: "Naat, Art & Scientific Exhibition — Certificate of Appreciation",
    provider: "Uswa Public School & College",
    platform: "Yultar, Skardu",
    date: "May 20, 2017",
    verifyUrl: "#",
    image: "/certificates/naat-2017.png",
    skills: ["Public Speaking", "Art"],
    featured: false,
  },
  {
    id: "oxford-art-competition",
    title: "Art Competition Participant",
    provider: "Oxford University Press",
    platform: "Pakistan",
    date: "May 20, 2017",
    verifyUrl: "#",
    image: "/certificates/oxford-art.png",
    skills: ["Art", "Creativity"],
    featured: false,
  },
] as const;

/* =========================================================
   EXPERIENCE — real work
   ========================================================= */
export const EXPERIENCE = [
  {
    role: "Freelance Python & ML Developer",
    company: "Fiverr",
    period: "2024 — Present",
    location: "Remote (Global)",
    description:
      "Provide Python data analysis, machine learning modeling, and prompt engineering services to clients worldwide. Specializing in custom ChatGPT prompt engineering for real estate professionals and end-to-end data science solutions for startups and students.",
    tags: ["Python", "Scikit-learn", "Prompt Engineering", "Data Analysis"],
  },
  {
    role: "Independent AI/ML Developer",
    company: "Personal Projects",
    period: "2024 — Present",
    location: "Islamabad, Pakistan",
    description:
      "Built and deployed 5+ end-to-end machine learning applications including diabetes risk prediction, GPA forecasting, loan eligibility assessment, and educational AI chatbots. All projects are live on Vercel and Render with real-world use cases.",
    tags: ["Python", "Flask", "TensorFlow", "Keras", "Vercel", "Render"],
  },
] as const;

/* =========================================================
   TESTIMONIALS — will grow with real clients
   ========================================================= */
export const TESTIMONIALS: {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}[] = [];

/* =========================================================
   TECH MARQUEE — logos row
   ========================================================= */
export const TECH_MARQUEE = [
  "Python", "TensorFlow", "Keras", "scikit-learn",
  "Flask", "JavaScript", "TypeScript", "Next.js",
  "React", "Tailwind CSS", "Vercel", "Render",
  "Git", "OpenAI API", "Pandas", "NumPy",
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
   FAQ
   ========================================================= */
export const FAQS = [
  {
    q: "What kind of projects do you take on?",
    a: "AI/ML applications, Python-based data analysis, prompt engineering, and machine learning model development. I especially enjoy projects that involve real-world datasets and end-to-end deployment.",
  },
  {
    q: "Do you work remotely?",
    a: "Yes. I'm based in Islamabad, Pakistan, and work remotely with clients worldwide through Fiverr and direct engagements.",
  },
  {
    q: "Are you available for internships?",
    a: "Yes! As an AI/ML student, I'm actively looking for internship opportunities where I can contribute to real projects while learning from experienced teams.",
  },
  {
    q: "How quickly can you start?",
    a: "For freelance projects, usually within a few days. For internships, I balance university commitments — please reach out and we can discuss schedule.",
  },
] as const;

/* =========================================================
   FOOTER LINKS
   ========================================================= */
export const FOOTER_LINKS = {
  navigate: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
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