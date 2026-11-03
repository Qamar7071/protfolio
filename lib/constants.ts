/* =========================================================
   SITE CONFIG — Qamar's personal portfolio branding
   ========================================================= */
/* Live URL: set NEXT_PUBLIC_SITE_URL on Vercel if the domain changes */
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://protfolio-4wo9.vercel.app").replace(/\/$/, "");

export const SITE_CONFIG = {
  name: "Qamar",
  fullName: "Qamar Abbas",
  title: "AI/ML Engineer | Python Developer",
  role: "AI/ML Engineer",
  tagline: "I build, evaluate, and deploy practical machine-learning applications.",
  description:
    "Portfolio of Qamar Abbas, an AI/ML engineer and Python developer in Islamabad, Pakistan. Deployed machine-learning apps, a multi-agent trip planner and a Karakoram Highway road-risk model, built while studying BS Artificial Intelligence at Shifa Tameer-e-Millat University.",
  url: SITE_URL,
  ogImage: "/og-image.png",
  location: "Islamabad, Pakistan",
  email: "qamarjamal7071@gmail.com",
  phone: "+923408280700",
  phoneDisplay: "+92 340 8280700",
  availability: "Open to roles, internships and freelance work",
  resumeUrl: "/resume.pdf",
  resumePage: "/resume",
  resumeFileName: "Qamar-Abbas-Resume.pdf",
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
  "machine-learning apps",
  "multi-agent AI systems",
  "Python backends and APIs",
  "data analysis",
] as const;

/* =========================================================
   ABOUT — honest story
   ========================================================= */
export const ABOUT = {
  heading: "Get to know me",
  intro:
    "I'm Qamar Abbas — an AI/ML Engineer and Python Developer who turns real datasets into working, deployed applications. I'm pursuing my BS in Artificial Intelligence at Shifa Tameer-e-Millat University and ship what I learn as live projects.",
  paragraphs: [
    "My foundation is hands-on machine learning. I've completed IBM's Deep Learning & Neural Networks with Keras and Andrew Ng's Supervised Machine Learning course (DeepLearning.AI × Stanford Online), and I apply that work in scikit-learn, TensorFlow, and Keras — from preprocessing and model comparison to honest train/test evaluation.",
    "Lately I've been moving from models to AI products. Vanderbilt University's courses on custom GPT assistants and agentic AI shaped Raahi, a multi-agent trip planner for Northern Pakistan, and the OpenAI-powered USWA school assistant. I also built a calibrated road-risk model for the Karakoram Highway.",
    "I put my work online so people can try it: most projects run as live apps on Vercel or Render, with the code on GitHub. Based in Islamabad, Pakistan, I'm looking for an entry-level role or internship in Python, backend or AI engineering, and I take freelance work.",
  ],
  keyPoints: [
    { title: "Machine Learning", desc: "Regression, classification, ensembles and CNNs, each trained, compared and evaluated end to end." },
    { title: "AI Agents & Assistants", desc: "Custom GPTs, OpenAI API chatbots, and Raahi, a planner run by a team of specialist agents." },
    { title: "Shipped, Not Shelved", desc: "Live apps on Vercel and Render that anyone can open, not demos that only run on my laptop." },
    { title: "Always Learning", desc: "4 Coursera certificates from IBM, DeepLearning.AI, and Vanderbilt — all verifiable." },
  ],
} as const;

/* =========================================================
   SKILLS — honest proficiency levels
   Core = daily use, can explain code
   Learning = used in projects / studying, cannot yet explain internals
   ========================================================= */
export const SKILL_CATEGORIES = [
  {
    title: "Machine learning",
    blurb: "Training, comparing and evaluating models on real datasets.",
    icon: "Brain",
    color: "primary",
    level: "core",
    skills: [
      "Python", "scikit-learn", "TensorFlow", "Keras", "Pandas", "NumPy",
      "Deep Learning", "Linear Regression", "Logistic Regression",
      "Random Forest", "Data Preprocessing",
    ],
  },
  {
    title: "Backend and deployment",
    blurb: "Serving trained models as web apps and APIs, and putting them online.",
    icon: "Server",
    color: "secondary",
    level: "core",
    skills: [
      "Flask", "Git", "GitHub", "Vercel", "Render", "VS Code", "Jupyter Notebook",
      "REST APIs", "JSON APIs", "Jinja2 Templates", "Model Serialization", "Virtual Environments",
    ],
  },
  {
    title: "Learning now",
    blurb: "Used in recent projects. Still building depth.",
    icon: "GraduationCap",
    color: "secondary",
    level: "learning",
    skills: [
      "React", "Next.js", "TypeScript", "Tailwind CSS",
      "Framer Motion", "Java (Basic)", "OpenAI API",
      "LangChain", "Prompt Engineering",
    ],
  },
] as const;

/* =========================================================
   PROJECTS — real deployed work with full methodology
   ========================================================= */
export const PROJECTS = [
  {
    id: "raahi-ai-travel-concierge",
    title: "Raahi — Multi-Agent Trip Planner",
    category: "AI Agent",
    description:
      "Plans trips across Northern Pakistan with a team of specialist AI agents. Tell it where, when, who and the budget, and it builds a day-by-day plan around real roads, daylight, season and cost, which you can then change by chat or by hand.",
    image: "/projects/raahi-ai.webp",
    imageFit: "contain",
    tech: ["Python", "Multi-agent orchestration", "LLM tool calling", "JavaScript"],
    liveUrl: "https://north-kappa-ivory.vercel.app/",
    githubUrl: "https://github.com/Qamar7071/Agent",
    methodology:
      "A master orchestrator picks only the agents a request needs (itinerary, weather, route, budget, stays, safety, packing, validation) and runs independent ones in parallel. The chat agent calls 12 server-side tools and can fall back to a second LLM provider (OpenAI, Groq or Gemini).",
    evaluation: [
      "Travel Twin tests a plan against what-if scenarios on a copy before you accept changes",
      "Journey Guardian re-checks a trip and scores each day's risk from documented factors",
      "\"How the agents decided\" shows every run as a readable conversation between the agents",
    ],
    featured: true,
  },
  {
    id: "kkh-road-status",
    title: "KKH Road Status — Havelian to Khunjerab",
    category: "AI / ML",
    description:
      "Forecasts next-day blockage risk for 8 segments of the 805 km Karakoram Highway with a calibrated gradient-boosting model, alongside a route planner and a what-if simulator that re-runs the same model in the browser.",
    image: "/projects/kkh-road-status.webp",
    imageFit: "contain",
    tech: ["Python", "scikit-learn", "Gradient Boosting", "Open-Meteo"],
    liveUrl: "https://kkh-road-status.vercel.app/",
    githubUrl: "https://github.com/Qamar7071/KKH-Road-Status",
    dataset:
      "Bootstrap dataset of simulated weather and closures, calibrated to documented KKH patterns (monsoon peaks, Feb–Apr rain-on-snow, the Khunjerab winter closure). The pipeline can rebuild on real Open-Meteo and NASA landslide data.",
    methodology:
      "Gradient boosting with monotonic constraints (more rain, snow, melt or slide reports can never lower the risk) and probability calibration, so a 30% forecast means 30%. One feature function is shared by training and serving, and the trees are exported to JSON for the in-browser simulator.",
    evaluation: [
      "ROC-AUC 0.944 and PR-AUC 0.347, about 14× chance (blockages hit ~2.4% of segment-days)",
      "Beats a logistic-regression baseline (0.928) and a season-only baseline (0.717)",
      "Every live forecast is logged so real-world accuracy can be measured later",
    ],
    disclaimer:
      "The scores come from the simulated bootstrap dataset and show the pipeline works end to end; they are not real-world accuracy. Check official road updates before travelling.",
    featured: true,
  },
  {
    id: "diabetes-risk-screening",
    title: "Diabetes Risk Assessment",
    category: "AI / ML",
    description:
      "Estimates the probability of diabetes from 8 routine health measurements. Logistic Regression, Random Forest and Gradient Boosting were compared on the Pima Indians dataset, and the best model reaches 77.92% test accuracy.",
    image: "/projects/diabetes.webp",
    tech: ["Python", "scikit-learn", "Random Forest", "Flask", "Vercel"],
    liveUrl: "https://diabetes-prediction-app-rho.vercel.app/",
    githubUrl: "https://github.com/Qamar7071/diabetes-prediction-app",
    dataset: "Pima Indians Diabetes Database: 768 records, 8 clinical features.",
    methodology:
      "Biologically invalid zeros (glucose, blood pressure, skin thickness, insulin, BMI) replaced with column medians, then an 80/20 stratified split with StandardScaler. Three models trained and the best kept by test accuracy, served by a Flask JSON API (/predict, /api/info) behind an animated risk gauge.",
    evaluation: [
      "Test accuracy: 77.92% (best of three models)",
      "Train/test split: 80/20, stratified",
      "Model metrics and feature importances served from /api/info",
    ],
    disclaimer:
      "Educational project, not a medical device. Not for diagnosis: always consult a licensed healthcare provider.",
    featured: true,
  },
  {
    id: "uswa-ai-assistant",
    title: "USWA AI Assistant",
    category: "AI / ML",
    description:
      "A knowledge-base chatbot for the Uswa Yultar Education System in Gilgit-Baltistan. Students and parents get instant answers about admissions, fees, class timings, subjects, teachers and holidays.",
    image: "/projects/uswa.webp",
    tech: ["Python", "Flask", "OpenAI API", "SQLite", "Render"],
    liveUrl: "https://uswa-ai-assistant-2.onrender.com/",
    githubUrl: "https://github.com/Qamar7071/uswa-ai-assistant",
    dataset: "Custom knowledge base compiled from the Uswa Yultar Education System's official information.",
    methodology:
      "Flask backend wrapping the OpenAI API with a scoped system prompt that keeps answers on school topics. Chat history is stored in SQLite, with an admin dashboard and a lightweight JavaScript front end, deployed on Render.",
    evaluation: [
      "Tested with 50+ real student and parent questions",
      "Scope restriction keeps it from answering off-topic questions",
      "Response time under 3 seconds",
    ],
    disclaimer:
      "Independent project for the Uswa Yultar Education System, not an official product of the institution.",
    featured: true,
  },
  {
    id: "scholarly-gpa-predictor",
    title: "Scholarly — GPA Predictor",
    category: "AI / ML",
    description:
      "Estimates a student's GPA with Linear Regression from 8 lifestyle factors (study hours, sleep, attendance, previous GPA, assignments, participation, extracurriculars, social media) and shows how much each one moves the result.",
    image: "/projects/gpa.webp",
    tech: ["Python", "Flask", "scikit-learn", "Linear Regression", "Vercel"],
    liveUrl: "https://gpa-predictor-woad.vercel.app/",
    githubUrl: "https://github.com/Qamar7071/gpa_predictor",
    dataset: "Synthetic dataset of 1,500 student records with 8 features, generated for the project.",
    methodology:
      "Linear Regression trained on 80% of the records with StandardScaler features; the coefficients drive the feature-impact chart. Evaluated on the held-out 20% with R² and RMSE.",
    evaluation: [
      "R² 0.608 on the test set",
      "RMSE 0.247 on a 0–4.0 GPA scale",
      "Train/test split: 80/20",
    ],
    disclaimer:
      "Trained on synthetic data. Predictions are for self-reflection, not official academic guidance.",
    featured: true,
  },
  {
    id: "loancheck-eligibility",
    title: "LoanCheck — Educational Prototype",
    category: "AI / ML",
    description:
      "A loan-eligibility prototype using Logistic Regression. Explore how income, loan term, education, credit history and property area change the model's approval prediction.",
    image: "/projects/loan.webp",
    tech: ["Python", "Flask", "scikit-learn", "Logistic Regression", "Vercel"],
    liveUrl: "https://loan-predictor-sigma.vercel.app/",
    githubUrl: "https://github.com/Qamar7071/loan_predictor",
    dataset: "Synthetic dataset of 2,000+ loan applications in PKR, generated for the project.",
    methodology:
      "Logistic Regression on label-encoded categorical and StandardScaler-scaled numeric features. Evaluated on a 20% test split with accuracy, a confusion matrix and ROC-AUC.",
    evaluation: [
      "Accuracy 84% on the test set",
      "ROC-AUC 0.93",
      "Train/test split: 80/20",
    ],
    disclaimer:
      "Educational prototype only, with no affiliation to Bank AL Habib or any financial institution; the styling is UI practice. Not for real loan decisions.",
    featured: true,
  },
  {
    id: "unipredict-pakistan",
    title: "UniPredict — University Admission Predictor",
    category: "AI / ML",
    description:
      "Estimates a student's admission chances at 20+ Pakistani universities with two models, Logistic Regression and a Decision Tree, and flags where they disagree. Includes sign-in and a model dashboard with 7 training charts.",
    image: "/projects/unipredict.webp",
    imageFit: "contain",
    tech: ["Python", "Flask", "scikit-learn", "Matplotlib"],
    liveUrl: "#",
    githubUrl: "https://github.com/Qamar7071/unipredict-pakistan",
    dataset: "Synthetic dataset of 9,000 admission records built on published merit patterns for 20+ universities.",
    methodology:
      "Logistic Regression (with StandardScaler) and a Decision Tree trained on the same features. The final chance is the average of both, with an agreement indicator per university.",
    evaluation: [
      "Logistic Regression: ~87.8% accuracy, ROC-AUC ~0.95",
      "Decision Tree: ~84.9% accuracy, ROC-AUC ~0.93",
      "Charts include model comparison, confusion matrices, ROC curves and the tree itself",
    ],
    disclaimer: "Trained on synthetic data. Use official merit lists for real admission decisions.",
    featured: false,
  },
  {
    id: "rh-labs-digital-solutions",
    title: "RH Labs — Software House Website",
    category: "Web Development",
    description:
      "Website for RH Labs, an Islamabad-based team offering AI chatbots, AI agents and websites. It presents their services, process, portfolio and consultation options for businesses.",
    image: "/projects/rh-labs.webp",
    imageFit: "contain",
    tech: ["HTML", "CSS", "JavaScript", "SEO"],
    liveUrl: "https://rh-labs.vercel.app/",
    githubUrl: "https://github.com/Qamar7071/rh-labs",
    featured: false,
  },
  {
    id: "image-classifier-cnn",
    title: "Image Classification (Cat vs Dog)",
    category: "AI / ML",
    description:
      "A convolutional neural network that classifies images as cats or dogs, covering preprocessing, augmentation, CNN architecture, training and evaluation with TensorFlow/Keras and OpenCV.",
    image: "/projects/cnn.webp",
    tech: ["Python", "TensorFlow", "Keras", "OpenCV", "CNN"],
    liveUrl: "#",
    githubUrl: "#",
    dataset: "Kaggle Dogs vs Cats dataset: labelled images for binary classification.",
    methodology:
      "Three convolutional blocks (Conv2D + MaxPooling) followed by dense layers with dropout. Images resized to 150×150, normalised and augmented with rotation and flips; trained with Adam and binary cross-entropy.",
    evaluation: [
      "Validation accuracy tracked per epoch",
      "Loss curves monitored for overfitting",
    ],
    disclaimer: "Learning project; the code isn't published yet.",
    featured: false,
  },
] as const;

export const PROJECT_CATEGORIES = [
  "All",
  "AI / ML",
  "AI Agent",
  "Web Development",
] as const;

/* =========================================================
   CERTIFICATES — professional credentials
   ========================================================= */
export const CERTIFICATES = [
  {
    id: "ibm-deep-learning-keras",
    kind: "course",
    title: "Introduction to Deep Learning & Neural Networks with Keras",
    provider: "IBM",
    platform: "Coursera",
    date: "Jul 14, 2026",
    verifyUrl: "https://coursera.org/verify/GYNJY9XS0VZY",
    image: "/certificates/ibm-deep-learning.webp",
    skills: ["Deep Learning", "Neural Networks", "Keras", "TensorFlow"],
    featured: true,
  },
  {
    id: "supervised-machine-learning",
    kind: "course",
    title: "Supervised Machine Learning: Regression and Classification",
    provider: "DeepLearning.AI",
    platform: "Stanford Online · Coursera",
    date: "Oct 2, 2026",
    verifyUrl: "https://coursera.org/verify/3JO81G8D17LT",
    image: "/certificates/supervised-machine-learning.webp",
    pdfUrl: "/certificates/supervised-machine-learning.pdf",
    skills: ["Machine Learning", "Regression", "Classification"],
    featured: true,
  },
  {
    id: "openai-gpts",
    kind: "course",
    title: "OpenAI GPTs: Creating Your Own Custom AI Assistants",
    provider: "Vanderbilt University",
    platform: "Coursera",
    date: "Oct 12, 2026",
    verifyUrl: "https://coursera.org/verify/4G7MV5J8LE59",
    image: "/certificates/openai-gpts.webp",
    pdfUrl: "/certificates/openai-gpts.pdf",
    skills: ["Generative AI", "GPTs", "AI Assistants"],
    featured: true,
  },
  {
    id: "agentic-ai-agents",
    kind: "course",
    title: "Agentic AI and AI Agents: A Primer for Leaders",
    provider: "Vanderbilt University",
    platform: "Coursera",
    date: "Oct 3, 2026",
    verifyUrl: "https://coursera.org/verify/HCI08C4938PS",
    image: "/certificates/agentic-ai-agents.webp",
    pdfUrl: "/certificates/agentic-ai-agents.pdf",
    skills: ["Agentic AI", "AI Agents", "AI Leadership"],
    featured: true,
  },
  {
    id: "python-programming-course",
    kind: "course",
    title: "Python Programming Course",
    provider: "Uswa Public School",
    platform: "Certificate of Appreciation",
    date: "2020",
    verifyUrl: "#",
    image: "/certificates/python-course.webp",
    skills: ["Python", "Programming Fundamentals"],
    featured: true,
  },
  {
    id: "arduino-basic-course",
    kind: "course",
    title: "Basic Arduino Course",
    provider: "Uswa Public School & College",
    platform: "Yultar, Skardu",
    date: "2019",
    verifyUrl: "#",
    image: "/certificates/arduino.webp",
    skills: ["Arduino", "Electronics", "Hardware"],
    featured: false,
  },
  {
    id: "best-award-2022",
    kind: "award",
    title: "Best Award — Naat, Art Competition & Scientific Exhibition",
    provider: "Uswa Public School & College",
    platform: "Yultar, Skardu",
    date: "Mar 17, 2022",
    verifyUrl: "#",
    image: "/certificates/naat-2022.webp",
    skills: ["Leadership", "Creativity", "Public Speaking"],
    featured: false,
  },
  {
    id: "naat-art-science-2017",
    kind: "award",
    title: "Naat, Art & Scientific Exhibition — Certificate of Appreciation",
    provider: "Uswa Public School & College",
    platform: "Yultar, Skardu",
    date: "May 20, 2017",
    verifyUrl: "#",
    image: "/certificates/naat-2017.webp",
    skills: ["Public Speaking", "Art"],
    featured: false,
  },
  {
    id: "oxford-art-competition",
    kind: "award",
    title: "Art Competition Participant",
    provider: "Oxford University Press",
    platform: "Pakistan",
    date: "May 20, 2017",
    verifyUrl: "#",
    image: "/certificates/oxford-art.webp",
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
    logo: "Fiverr",
    link: "https://www.fiverr.com/s/XLG3ybZ",
    period: "2024 — Present",
    location: "Remote (Global)",
    description:
      "Provide Python data analysis, machine learning modeling, and prompt engineering services to clients worldwide. Specializing in custom ChatGPT prompt engineering for real estate professionals and end-to-end data science solutions for startups and students.",
    tags: ["Python", "Scikit-learn", "Prompt Engineering", "Data Analysis"],
  },
  {
    role: "Independent AI/ML Developer",
    company: "Personal Projects",
    logo: "GitHub",
    link: "https://github.com/Qamar7071/",
    period: "2024 — Present",
    location: "Islamabad, Pakistan",
    description:
      "Built and deployed end-to-end ML and AI applications: a multi-agent trip planner, a calibrated road-risk model for the Karakoram Highway, diabetes, GPA and loan predictors, and a school chatbot. Most run live on Vercel or Render, with code on GitHub.",
    tags: ["Python", "Flask", "scikit-learn", "OpenAI API", "Vercel", "Render"],
  },
] as const;

export const EDUCATION = {
  degree: "BS Artificial Intelligence",
  school: "Shifa Tameer-e-Millat University",
  logo: "STMU",
  location: "Islamabad, Pakistan",
  period: "2024 — Present",
  grade: "Grade A",
  semester: "4th semester",
  description:
    "Coursework so far covers linear algebra, sorting and searching algorithms in C++, and core AI concepts. The projects and certificates on this page are what I build alongside it.",
  tags: ["Linear Algebra", "C++ Algorithms", "AI Fundamentals"],
} as const;

/* =========================================================
   SERVICES — AI-focused offerings
   ========================================================= */
export const SERVICES = [
  {
    id: "ml-models",
    number: "01",
    icon: "Brain",
    title: "ML Model Development",
    tagline: "From data to deployed model",
    description:
      "End-to-end machine learning: data preprocessing, model training, evaluation, and deployment as a Flask web application.",
    features: [
      "Classification & regression models",
      "Model comparison & tuning",
      "Train/test methodology & metrics",
      "Flask app deployment on Vercel/Render",
    ],
    deliverables: ["Python", "scikit-learn", "Flask", "Vercel"],
    toolsLabel: "Built with",
    tools: ["Python", "scikit-learn", "Flask", "Vercel"],
    relatedProject: "diabetes-risk-screening",
    idealFor: "Startups & students needing ML prototypes",
  },
  {
    id: "data-analysis",
    number: "02",
    icon: "LineChart",
    title: "Python Data Analysis",
    tagline: "Clean, analyze, visualize",
    description:
      "Data cleaning, exploration, and visualization using Python's data stack. Jupyter notebooks with reproducible analysis.",
    features: [
      "Data cleaning & preprocessing",
      "Exploratory data analysis (EDA)",
      "Visualization with Matplotlib/Seaborn",
      "Clear written insights & reports",
    ],
    deliverables: ["Pandas", "NumPy", "Matplotlib", "Jupyter"],
    toolsLabel: "Built with",
    tools: ["Pandas", "NumPy", "Matplotlib", "Jupyter"],
    relatedProject: "scholarly-gpa-predictor",
    idealFor: "Students & researchers needing EDA work",
  },
  {
    id: "ai-chatbots",
    number: "03",
    icon: "Bot",
    title: "AI Chatbot (OpenAI API)",
    tagline: "Scoped assistants for your use case",
    description:
      "Custom knowledge-base chatbots using the OpenAI API, deployed as Flask web apps. Scoped to specific domains with controlled responses.",
    features: [
      "OpenAI API integration",
      "Scoped system prompts",
      "Flask web app deployment",
      "Simple JavaScript frontend",
    ],
    deliverables: ["Python", "OpenAI API", "Flask", "Render"],
    toolsLabel: "Built with",
    tools: ["Python", "OpenAI API", "Flask", "Render"],
    relatedProject: "uswa-ai-assistant",
    idealFor: "Schools, small businesses, educational projects",
  },
  {
    id: "prompt-engineering",
    number: "04",
    icon: "Wand2",
    title: "Prompt Engineering",
    tagline: "Prompts that actually work",
    description:
      "Design, test, and document prompts for consistent LLM output. Includes prompt libraries and usage guides.",
    features: [
      "Prompt design & iteration",
      "Testing with multiple inputs",
      "Prompt libraries & docs",
      "ChatGPT/Claude/Gemini compatible",
    ],
    deliverables: ["System prompts", "Templates", "Usage docs"],
    toolsLabel: "Works with",
    tools: ["ChatGPT", "Claude", "Gemini"],
    relatedProject: "raahi-ai-travel-concierge",
    idealFor: "Content creators & small teams using LLMs",
  },
] as const;

/* =========================================================
   FOOTER LINKS
   ========================================================= */
export const FOOTER_LINKS = {
  navigate: NAV_LINKS,
  work: [
    { name: "Resume (web)", href: "/resume" },
    { name: "Resume (PDF)", href: "/resume.pdf" },
    { name: "GitHub", href: SOCIAL_LINKS.github },
    { name: "Fiverr", href: SOCIAL_LINKS.fiverr },
    { name: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  ],
  services: [
    { name: "ML Model Development", href: "#services" },
    { name: "Python Data Analysis", href: "#services" },
    { name: "AI Chatbots", href: "#services" },
    { name: "Prompt Engineering", href: "#services" },
  ],
} as const;