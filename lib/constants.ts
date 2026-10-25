/* =========================================================
   SITE CONFIG — Qamar's personal portfolio branding
   ========================================================= */
export const SITE_CONFIG = {
  name: "Qamar",
  fullName: "Qamar Abbas",
  title: "AI/ML Engineer | Python Developer",
  tagline: "I build, evaluate, and deploy practical machine-learning applications.",
  description:
    "Portfolio of Qamar Abbas — AI/ML Engineer and Python Developer based in Islamabad, Pakistan. I build, evaluate, and deploy practical machine-learning applications while pursuing my BS in Artificial Intelligence at Shifa Tameer-e-Millat University.",
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
  "AI/ML Engineer",
  "Python Developer",
  "Data Scientist",
  "ML Model Builder",
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
  { value: "9", label: "Certifications", icon: "Award" },
  { value: "4", label: "Semesters Completed", icon: "GraduationCap" },
] as const;

/* =========================================================
   ABOUT — honest story
   ========================================================= */
export const ABOUT = {
  heading: "Get to know me",
  intro:
    "I'm Qamar Abbas — an AI/ML Engineer and Python Developer who builds, evaluates, and deploys practical machine-learning applications. Currently pursuing my BS in Artificial Intelligence at Shifa Tameer-e-Millat University while shipping real ML systems to production.",
  paragraphs: [
    "I focus on end-to-end machine learning applications using Python, scikit-learn, TensorFlow, and Keras — from training models on real datasets to deploying them as live web applications with Flask, Vercel, and Render.",
    "Based in Islamabad, Pakistan, I'm open to freelance opportunities and internships where I can grow while contributing to meaningful projects. I'm actively learning through hands-on projects, Fiverr freelance work, and industry certifications like IBM's Deep Learning course and Andrew Ng's Supervised ML course.",
  ],
  keyPoints: [
    { title: "AI/ML Applications", desc: "Trained and deployed 5+ end-to-end machine learning models on real datasets." },
    { title: "Python Ecosystem", desc: "Comfortable with scikit-learn, TensorFlow, Keras, Pandas, and NumPy for data science." },
    { title: "Modern Deployment", desc: "Ship live apps using Flask, Vercel, and Render — no just-in-my-laptop projects." },
    { title: "Always Learning", desc: "IBM-certified in Deep Learning, pursuing BS AI, freelancing on Fiverr." },
  ],
} as const;

/* =========================================================
   SKILLS — honest proficiency levels
   Core = daily use, can explain code
   Learning = used in projects / studying, cannot yet explain internals
   ========================================================= */
export const SKILL_CATEGORIES = [
  {
    title: "AI / Machine Learning",
    icon: "Brain",
    color: "primary",
    level: "core",
    skills: [
      "Python", "scikit-learn", "TensorFlow", "Keras",
      "Deep Learning", "Linear Regression", "Logistic Regression",
      "Random Forest", "Pandas", "NumPy", "Data Preprocessing",
    ],
  },
  {
    title: "Python Backend",
    icon: "Server",
    color: "secondary",
    level: "core",
    skills: [
      "Python", "Flask", "REST APIs",
      "Jinja2 Templates", "Model Serialization", "JSON APIs",
    ],
  },
  {
    title: "Tools & Deployment",
    icon: "Database",
    color: "primary",
    level: "core",
    skills: [
      "Git", "GitHub", "Vercel", "Render",
      "VS Code", "Jupyter Notebook", "Virtual Environments",
    ],
  },
  {
    title: "Currently Learning",
    icon: "GraduationCap",
    color: "secondary",
    level: "learning",
    skills: [
      "React", "Next.js", "TypeScript", "Tailwind CSS",
      "Framer Motion", "Java (Basic)", "OpenAI API",
      "Prompt Engineering", "LangChain",
    ],
  },
] as const;

/* =========================================================
   PROJECTS — real deployed work with full methodology
   ========================================================= */
export const PROJECTS = [
  {
    id: "rh-labs-digital-solutions",
    title: "RH Labs — Intelligent Digital Solutions",
    category: "Web Development",
    description:
      "A software house website for RH Labs, an Islamabad-based team offering AI chatbots, AI agents, and modern websites. It presents their services, process, portfolio, and consultation options for businesses.",
    image: "/projects/rh-labs.png",
    imageFit: "contain",
    tech: ["AI Chatbots", "AI Agents", "Websites & Web Apps"],
    liveUrl: "https://rh-labs.vercel.app/",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "raahi-ai-travel-concierge",
    title: "Raahi AI — Travel Concierge",
    category: "AI Agent",
    description:
      "An AI travel concierge for Northern Pakistan that helps travelers discover destinations and plan personalised trips around real routes, seasons, and budgets.",
    image: "/projects/raahi-ai.png",
    imageFit: "contain",
    tech: ["AI Agent", "Travel Planning", "Northern Pakistan"],
    liveUrl: "https://north-kappa-ivory.vercel.app/",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "kkh-road-status",
    title: "KKH Road Status — Havelian to Khunjerab",
    category: "Travel Tools",
    description:
      "A road-status and trip-planning dashboard for the 805 km Karakoram Highway. Explore eight route segments, check forecast risk and road reports, and plan a journey from Havelian to Khunjerab.",
    image: "/projects/kkh-road-status.png",
    imageFit: "contain",
    tech: ["Interactive Risk Map", "Route Planning", "Weather Forecasts", "Community Reports"],
    liveUrl: "https://kkh-road-status.vercel.app/",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "diabetes-risk-screening",
    title: "Diabetes Risk Assessment",
    category: "AI / ML",
    description:
      "A clinical screening tool that predicts diabetes probability from 8 routine health measurements. Compares ensemble ML models — Random Forest, Logistic Regression, and Gradient Boosting — on the Pima Indians Diabetes dataset.",
    image: "/projects/diabetes.png",
    tech: ["Python", "Scikit-learn", "Random Forest", "Flask", "Vercel"],
    liveUrl: "https://diabetes-prediction-app-rho.vercel.app/",
    githubUrl: "https://github.com/Qamar7071/diabetes-prediction-app",
    dataset: "Pima Indians Diabetes Database (UCI / Kaggle) — 768 records, 8 health features.",
    methodology:
      "80/20 train-test split with stratified sampling. StandardScaler for feature normalization. Compared Random Forest, Logistic Regression, and Gradient Boosting using 5-fold cross-validation. Selected best-performing model based on accuracy and ROC-AUC on held-out test set.",
    evaluation: [
      "Train/test split: 80/20 stratified",
      "Cross-validation: 5-fold",
      "Metrics tracked: Accuracy, Precision, Recall, ROC-AUC",
    ],
    disclaimer:
      "Educational project for learning purposes only. NOT a medical device. Not for clinical diagnosis — always consult a licensed healthcare provider.",
    featured: true,
  },
  {
    id: "uswa-ai-assistant",
    title: "USWA AI Assistant",
    category: "AI / ML",
    description:
      "A knowledge-base chatbot built for the Uswa Yultar Education System in Gilgit-Baltistan. Helps students and parents get instant answers about admissions, fees, class timings, subjects, teachers, and holidays using the OpenAI API.",
    image: "/projects/uswa.png",
    tech: ["Python", "OpenAI API", "Flask", "JavaScript", "Render"],
    liveUrl: "https://uswa-ai-assistant-2.onrender.com/",
    githubUrl: "https://github.com/Qamar7071/uswa-ai-assistant",
    dataset: "Custom knowledge base compiled from Uswa Yultar Education System's official information.",
    methodology:
      "Flask backend wrapping the OpenAI API with a scoped system prompt that restricts responses to school-related queries. Context-aware conversation handling, deployed on Render with a lightweight JavaScript frontend.",
    evaluation: [
      "Tested with 50+ real student/parent questions",
      "Scope restriction prevents off-topic responses",
      "Response time: < 3 seconds",
    ],
    disclaimer:
      "Independent educational project for Uswa Yultar Education System. Not an official product of USWA institution.",
    featured: true,
  },
  {
    id: "scholarly-gpa-predictor",
    title: "Scholarly — GPA Predictor",
    category: "AI / ML",
    description:
      "An academic prediction engine that estimates student GPA using Linear Regression. Analyzes 8 lifestyle factors — study hours, sleep, attendance, previous GPA, assignments, participation, extracurriculars, and social media — with feature-impact analysis.",
    image: "/projects/gpa.png",
    tech: ["Python", "Flask", "Scikit-learn", "Linear Regression", "Vercel"],
    liveUrl: "https://gpa-predictor-woad.vercel.app/",
    githubUrl: "https://github.com/Qamar7071/gpa-predictor",
    dataset:
      "Synthetic student lifestyle dataset — 1,500 records with 8 features (publicly available on Kaggle).",
    methodology:
      "Linear Regression trained on 80% of 1,500 records. Features standardized with StandardScaler. Model coefficients used for feature-impact visualization. Evaluated on 20% held-out test set using R² and RMSE.",
    evaluation: [
      "R² Score: 0.608 (test set)",
      "RMSE: 0.247 (on 0 – 4.0 GPA scale)",
      "Train/test split: 80/20",
    ],
    disclaimer:
      "Educational project trained on a synthetic / public dataset. Predictions are for self-reflection, NOT official academic guidance.",
    featured: true,
  },
  {
    id: "loancheck-eligibility",
    title: "LoanCheck — Educational Prototype",
    category: "AI / ML",
    description:
      "An educational loan-eligibility prototype that uses Logistic Regression trained on a public loan dataset. Users can explore how factors like income, loan terms, education, credit history, and property area influence a model's approval prediction.",
    image: "/projects/loan.png",
    tech: ["Python", "Flask", "Scikit-learn", "Logistic Regression", "Vercel"],
    liveUrl: "https://loan-predictor-sigma.vercel.app/",
    githubUrl: "https://github.com/Qamar7071/loan-predictor",
    dataset:
      "Public loan approval dataset (Kaggle) — ~2,000 records with income, loan amount, credit history, and demographic features.",
    methodology:
      "Logistic Regression trained on 80% of ~2,000 records. Categorical features encoded with LabelEncoder, numerical features scaled with StandardScaler. Evaluated on 20% test set with accuracy, confusion matrix, and ROC-AUC.",
    evaluation: [
      "Accuracy: 84% (test set)",
      "ROC-AUC: 0.93",
      "Train/test split: 80/20",
    ],
    disclaimer:
      "⚠️ EDUCATIONAL PROTOTYPE ONLY. This is a personal learning project — it has NO affiliation with Bank AL Habib or any financial institution. The styling is for UI practice. NOT for real loan decisions. Always consult a licensed bank for actual loan assessments.",
    featured: true,
  },
  {
    id: "image-classifier-cnn",
    title: "Image Classification (Cat vs Dog)",
    category: "AI / ML",
    description:
      "A Convolutional Neural Network image classifier that categorizes images as cats or dogs. Covers image preprocessing, feature extraction, CNN architecture, model training, and evaluation using TensorFlow/Keras and OpenCV.",
    image: "/projects/cnn.png",
    tech: ["Python", "TensorFlow", "Keras", "OpenCV", "CNN"],
    liveUrl: "#",
    githubUrl: "https://github.com/Qamar7071/image-classification-cnn",
    dataset: "Kaggle Dogs vs Cats dataset — labeled images for binary classification.",
    methodology:
      "CNN with 3 convolutional blocks (Conv2D + MaxPooling), followed by dense layers with dropout for regularization. Images resized to 150×150, normalized, and augmented with rotation/flipping. Trained with Adam optimizer and binary cross-entropy loss.",
    evaluation: [
      "Validation accuracy: tracked per epoch",
      "Loss curves monitored for overfitting",
      "Image preprocessing with OpenCV",
    ],
    disclaimer:
      "Beginner-friendly computer vision project — a learning foundation for more advanced vision work.",
    featured: false,
  },
] as const;

export const PROJECT_CATEGORIES = [
  "All",
  "AI / ML",
  "AI Agent",
  "Travel Tools",
  "Web Development",
] as const;

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
    id: "supervised-machine-learning",
    title: "Supervised Machine Learning: Regression and Classification",
    provider: "DeepLearning.AI",
    platform: "Stanford Online · Coursera",
    date: "Oct 2, 2026",
    verifyUrl: "https://coursera.org/verify/3JO81G8D17LT",
    image: "",
    pdfUrl: "/certificates/supervised-machine-learning.pdf",
    skills: ["Machine Learning", "Regression", "Classification"],
    featured: true,
  },
  {
    id: "openai-gpts",
    title: "OpenAI GPTs: Creating Your Own Custom AI Assistants",
    provider: "Vanderbilt University",
    platform: "Coursera",
    date: "Oct 12, 2026",
    verifyUrl: "https://coursera.org/verify/4G7MV5J8LE59",
    image: "",
    pdfUrl: "/certificates/openai-gpts.pdf",
    skills: ["Generative AI", "GPTs", "AI Assistants"],
    featured: true,
  },
  {
    id: "agentic-ai-agents",
    title: "Agentic AI and AI Agents: A Primer for Leaders",
    provider: "Vanderbilt University",
    platform: "Coursera",
    date: "Oct 3, 2026",
    verifyUrl: "https://coursera.org/verify/HCI08C4938PS",
    image: "",
    pdfUrl: "/certificates/agentic-ai-agents.pdf",
    skills: ["Agentic AI", "AI Agents", "AI Leadership"],
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
   TECH MARQUEE — logos row (what I actually use)
   ========================================================= */
export const TECH_MARQUEE = [
  "Python", "TensorFlow", "Keras", "scikit-learn",
  "Flask", "Pandas", "NumPy", "Vercel", "Render",
  "Git", "GitHub", "Jupyter", "VS Code",
] as const;

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
    idealFor: "Content creators & small teams using LLMs",
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
    { name: "ML Model Development", href: "#services" },
    { name: "Python Data Analysis", href: "#services" },
    { name: "AI Chatbots", href: "#services" },
    { name: "Prompt Engineering", href: "#services" },
  ],
  resources: [
    { name: "Resume", href: SITE_CONFIG.resumeUrl },
    { name: "GitHub", href: SOCIAL_LINKS.github },
    { name: "LinkedIn", href: SOCIAL_LINKS.linkedin },
    { name: "Fiverr", href: SOCIAL_LINKS.fiverr },
  ],
} as const;