/* =========================================================
   RESUME — the one-page CV shown at /resume and exported to
   /public/resume.pdf. Facts come from the projects' READMEs,
   the live apps and Coursera; keep them in sync with constants.ts.
   ========================================================= */
import { CERTIFICATES, EDUCATION, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";

const strip = (url: string) => url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");

export const RESUME = {
  name: SITE_CONFIG.fullName,
  role: "AI/ML Engineer · Python Developer",
  contacts: [
    { kind: "email", label: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
    { kind: "phone", label: SITE_CONFIG.phoneDisplay, href: SOCIAL_LINKS.whatsapp },
    { kind: "location", label: SITE_CONFIG.location },
    { kind: "web", label: strip(SITE_CONFIG.url), href: SITE_CONFIG.url },
    { kind: "github", label: strip(SOCIAL_LINKS.github), href: SOCIAL_LINKS.github },
    { kind: "linkedin", label: strip(SOCIAL_LINKS.linkedin), href: SOCIAL_LINKS.linkedin },
  ],

  summary:
    "AI student and Python developer who builds machine-learning apps end to end, from data preparation to evaluation and a live web app. Looking for an entry-level Python, backend or AI engineering role, or an internship.",

  skills: [
    { label: "Languages", value: "Python, SQL (SQLite), JavaScript, Java (basic), C++ (coursework)" },
    {
      label: "Machine learning",
      value: "scikit-learn, TensorFlow, Keras, pandas, NumPy, Matplotlib; ensembles, gradient boosting, CNNs",
    },
    { label: "AI and LLMs", value: "OpenAI API, multi-agent orchestration, LLM tool calling, prompt engineering, custom GPTs" },
    {
      label: "Backend and web",
      value: "Flask, REST/JSON APIs, SQLite, Git, GitHub, Vercel, Render; React and Next.js (learning)",
    },
  ],

  projects: [
    {
      title: "Raahi",
      subtitle: "Multi-agent AI trip planner for Northern Pakistan",
      stack: "Python, LLM APIs, JavaScript",
      links: [
        { label: "north-kappa-ivory.vercel.app", href: "https://north-kappa-ivory.vercel.app/" },
        { label: "github.com/Qamar7071/Agent", href: "https://github.com/Qamar7071/Agent" },
      ],
      bullets: [
        "Built a master orchestrator that sends each request only to the specialist agents it needs (itinerary, weather, route, budget, stays, safety, packing) and runs independent agents in parallel.",
        "Gave the chat agent 12 server-side tools and an optional backup LLM provider (OpenAI, Groq or Gemini); plans are stress-tested with what-if scenarios before changes are accepted.",
      ],
    },
    {
      title: "KKH Road Status",
      subtitle: "Blockage-risk forecasts for the Karakoram Highway",
      stack: "Python, scikit-learn",
      links: [
        { label: "kkh-road-status.vercel.app", href: "https://kkh-road-status.vercel.app/" },
        { label: "github.com/Qamar7071/KKH-Road-Status", href: "https://github.com/Qamar7071/KKH-Road-Status" },
      ],
      bullets: [
        "Trained a calibrated gradient-boosting model with monotonic constraints that forecasts next-day blockage risk for 8 segments, Havelian to Khunjerab; the same trees run in the browser for a what-if simulator.",
        "ROC-AUC 0.944 and PR-AUC 0.347 (about 14× chance) on a simulated bootstrap dataset, ahead of logistic-regression (0.928) and season-only (0.717) baselines.",
      ],
    },
    {
      title: "Diabetes Risk Assessment",
      subtitle: "Clinical screening web app",
      stack: "Flask, scikit-learn",
      links: [
        { label: "diabetes-prediction-app-rho.vercel.app", href: "https://diabetes-prediction-app-rho.vercel.app/" },
        { label: "Code", href: "https://github.com/Qamar7071/diabetes-prediction-app" },
      ],
      bullets: [
        "Compared Logistic Regression, Random Forest and Gradient Boosting on the Pima dataset (768 records); the best reaches 77.92% test accuracy and is served by a Flask JSON API behind a risk-gauge UI.",
      ],
    },
    {
      title: "USWA AI Assistant",
      subtitle: "Knowledge-base school chatbot",
      stack: "Flask, OpenAI API, SQLite",
      links: [
        { label: "uswa-ai-assistant-2.onrender.com", href: "https://uswa-ai-assistant-2.onrender.com/" },
        { label: "Code", href: "https://github.com/Qamar7071/uswa-ai-assistant" },
      ],
      bullets: [
        "Scoped chatbot that answers admissions, fees, timings and holiday questions for a Gilgit-Baltistan school, with chat history in SQLite and an admin dashboard.",
      ],
    },
    {
      title: "More ML apps",
      subtitle: "GPA predictor, LoanCheck, UniPredict",
      stack: "Flask, scikit-learn",
      links: [
        { label: "GPA", href: "https://gpa-predictor-woad.vercel.app/" },
        { label: "LoanCheck", href: "https://loan-predictor-sigma.vercel.app/" },
        { label: "UniPredict code", href: "https://github.com/Qamar7071/unipredict-pakistan" },
      ],
      bullets: [
        "Linear Regression GPA predictor (R² 0.608, RMSE 0.247), Logistic Regression loan-eligibility prototype (84% accuracy, ROC-AUC 0.93) and a two-model admission predictor for 20+ universities (~87.8% accuracy), all on synthetic data.",
      ],
    },
  ],

  experience: [
    {
      role: "Freelance Python & ML Developer",
      org: "Fiverr",
      where: "Remote",
      period: "2024 – Present",
      bullets: [
        "Deliver Python data analysis, machine-learning models and prompt engineering for clients, including custom ChatGPT prompt systems for real-estate professionals and data-science projects for startups and students.",
      ],
    },
  ],

  education: {
    degree: EDUCATION.degree,
    school: EDUCATION.school,
    where: "Islamabad",
    period: EDUCATION.period.replace("—", "–"),
    details: `${EDUCATION.grade}, ${EDUCATION.semester}. Coursework: linear algebra, algorithms in C++, AI fundamentals.`,
  },

  certifications: CERTIFICATES.filter((c) => c.verifyUrl !== "#").map((c) => ({
    title: c.title,
    issuer: c.provider === "DeepLearning.AI" ? "DeepLearning.AI and Stanford Online" : c.provider,
    date: c.date.replace(/ \d+,/, ""),
    href: c.verifyUrl,
  })),

  languages: "English (professional), Urdu (native)",
} as const;
