"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  MessageCircle,
  X,
  Send,
  SkipForward,
  Sparkles,
  UserPlus,
  Mail,
  Phone,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import {
  SITE_CONFIG,
  SOCIAL_LINKS,
  SKILL_CATEGORIES,
  PROJECTS,
  EXPERIENCE,
  CERTIFICATES,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */
type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
  displayedText?: string;
  isStreaming?: boolean;
  showContactPrompt?: boolean;
};

type Topic =
  | "skills" | "projects" | "experience" | "hire" | "contact"
  | "ai" | "fullstack" | "location" | "pricing" | "resume"
  | "education" | "tools" | "about" | "certifications"
  | "diabetes" | "uswa" | "gpa" | "loan" | "cnn"
  | "fiverr" | "internship" | "availability"
  | null;

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

/* -------------------------------------------------------------------------- */
/*  Response variants                                                         */
/* -------------------------------------------------------------------------- */
const V = {
  greetings: [
    `Hi there! 👋 I'm Qamar's AI assistant. Ask me anything about his skills, projects, or how to work with him!`,
    `Hey! 😊 I know all about Qamar — his AI projects, certifications, and background. What would you like to know?`,
    `Assalam-o-Alaikum! 👋 I'm here to help you learn about Qamar Abbas — AI/ML student and Python developer. What's on your mind?`,
    `Hello! I can tell you about Qamar's 5 deployed projects, IBM certification, and freelance services. Ask away!`,
  ],
  fallback: [
    `I can help you explore Qamar's:\n\n🎯 **Skills** — Python, ML, Deep Learning\n🚀 **Projects** — 5 deployed AI apps\n🎓 **Certifications** — IBM, Arduino, Python\n📚 **Education** — BS AI at Shifa University\n💼 **Freelance** — Fiverr services\n📧 **Contact** — how to reach him\n\nWhat would you like to know?`,
    `Hmm, let me help. Try asking about:\n\n• AI/ML projects (diabetes, USWA chatbot, GPA)\n• Skills and tech stack\n• IBM Deep Learning certificate\n• How to hire or contact him\n• Freelance rates\n\nWhat interests you?`,
    `Not sure I caught that. I can share info on:\n\n🧠 AI/ML expertise\n💻 5 live deployed apps\n🎓 6 certifications\n📍 Islamabad, Pakistan\n💼 Available for freelance & internships\n\nWhich sounds interesting?`,
  ],
  thanks: [
    `You're welcome! 😊 Want Qamar to reach out to you directly? Just say "contact me"!`,
    `Glad I could help! Anything else? Or would you like to send Qamar a message?`,
    `My pleasure! Let me know if you have more questions.`,
  ],
};

/* -------------------------------------------------------------------------- */
/*  Bot brain — comprehensive knowledge of Qamar                              */
/* -------------------------------------------------------------------------- */
function getBotResponse(
  input: string,
  lastTopic: Topic,
): { text: string; topic: Topic; showContactPrompt?: boolean } {
  const q = input.toLowerCase().trim();

  // Follow-up detection
  const isFollowUp =
    /^(more|tell me more|another|which|any other|more info|details|explain|expand|go on|continue|and)\b/i.test(q) ||
    (q.length < 10 && lastTopic !== null);
  if (isFollowUp && lastTopic) {
    return getBotResponse(lastTopic, null);
  }

  // Greetings
  if (/^(hi|hello|hey|salam|assalam|hola|good\s(morning|afternoon|evening))\b/i.test(q)) {
    return { text: pick(V.greetings), topic: null };
  }

  // About / who
  if (/^(who|about|introduce|yourself|qamar)$/.test(q) || /who\s(is|are)/.test(q) || /tell.+about/.test(q)) {
    return {
      text: `**Qamar Abbas** is an ambitious AI/ML student and Python developer based in ${SITE_CONFIG.location} 🇵🇰\n\n• 🎓 Pursuing **BS in Artificial Intelligence** (Grade A) at Shifa Tameer-e-Millat University since 2024\n• 🚀 Built and deployed **5+ AI/ML applications** on real datasets\n• 🏆 **IBM-certified** in Deep Learning & Neural Networks (Coursera, 2026)\n• 💼 Active **freelancer on Fiverr** offering ML and prompt engineering services\n• 🔥 Passionate about turning ideas into production ML systems\n\nWant to know about his projects, skills, or how to hire him?`,
      topic: "about",
    };
  }

  // Education / university
  if (/education|study|studies|degree|university|college|graduation|qualifi|learn|shifa|school/.test(q)) {
    return {
      text: `Qamar is currently pursuing his **Bachelor of Science in Artificial Intelligence** at **Shifa Tameer-e-Millat University**, Islamabad. 🎓\n\n• 📅 Started: 2024\n• 📚 Currently in **4th semester**\n• 🎯 Focus: Machine Learning, Data Science, Python\n• ⭐ Grade: A\n\nHe complements his degree with real-world projects and industry certifications like IBM's Deep Learning course.`,
      topic: "education",
    };
  }

  // Skills / general
  if (/^skill|tech\s?stack|know|programm|language|framework|expert|good\s?at/.test(q)) {
    const skills = SKILL_CATEGORIES.map(
      (c) => `**${c.title}:** ${c.skills.slice(0, 5).join(", ")}`,
    ).join("\n\n");
    return {
      text: `Qamar's tech stack:\n\n${skills}\n\nHe's especially strong in **AI/ML with Python**. Want to know about a specific area?`,
      topic: "skills",
    };
  }

  // AI / ML deep
  if (/\bai\b|\bml\b|machine\s?learning|deep\s?learning|pytorch|tensorflow|keras|neural|nlp|computer\s?vision|scikit/.test(q)) {
    return {
      text: `AI/ML is Qamar's core focus! 🧠\n\n**Frameworks:** TensorFlow, Keras, scikit-learn\n**Models he's used:** Random Forest, Logistic Regression, Gradient Boosting, Linear Regression, CNN\n**Data tools:** Pandas, NumPy\n**IBM Certified** in Deep Learning & Neural Networks (2026)\n\nHe's shipped 5 production ML apps — from clinical diabetes screening (ensemble models) to a CNN cat/dog classifier. Ask me about any specific project!`,
      topic: "ai",
    };
  }

  // Python
  if (/python|django|flask|fastapi/.test(q)) {
    return {
      text: `Python is Qamar's primary language! 🐍\n\n• **ML/Data:** scikit-learn, TensorFlow, Keras, Pandas, NumPy\n• **Web/Backend:** Flask (used in 4+ live projects)\n• **Certified** in Python programming from 2019\n• Uses Python daily for freelance data analysis on Fiverr\n\nAll his deployed ML apps run on Python + Flask backends.`,
      topic: "skills",
    };
  }

  // Full-stack / web
  if (/full[-\s]?stack|frontend|backend|react|next|node|web\s?dev|\bapi\b|typescript|javascript/.test(q)) {
    return {
      text: `Qamar is expanding into full-stack:\n\n**Frontend:** JavaScript, TypeScript, React, Next.js, Tailwind CSS\n**Backend:** Python (Flask), REST APIs\n**Deployment:** Vercel, Render (all his apps are live!)\n\nHis portfolio (this site) is built with Next.js + TypeScript + Tailwind — proving he can ship modern web apps too.`,
      topic: "fullstack",
    };
  }

  // Projects list
  if (/project|work|portfolio|built|create|made|showcase|example|demo|apps?/.test(q)) {
    const featured = PROJECTS.filter((p) => p.featured).slice(0, 4);
    const list = featured
      .map((p) => `• **${p.title}** — ${p.description.split(".")[0]}`)
      .join("\n");
    return {
      text: `Qamar has ${PROJECTS.length} projects, ${featured.length} of them **live and deployed**:\n\n${list}\n\nAll live at Vercel/Render. Scroll to the Projects section for live previews and details! Or ask me about a specific one 🚀`,
      topic: "projects",
    };
  }

  // Individual projects
  if (/diabetes|health|clinical|medical/.test(q)) {
    return {
      text: `**Diabetes Risk Assessment** 🏥\n\nA clinical ML screening tool that predicts diabetes probability from 8 routine health measurements. Uses an **ensemble** of Random Forest, Logistic Regression, and Gradient Boosting — trained on the Pima Indians Diabetes dataset (768 records).\n\n🔗 Live: diabetes-prediction-app-rho.vercel.app`,
      topic: "diabetes",
    };
  }
  if (/uswa|chatbot|school\s?bot|education\s?chat/.test(q)) {
    return {
      text: `**USWA AI Assistant** 🤖\n\nAn intelligent education chatbot Qamar built for **Uswa Yultar Education System** (Gilgit-Baltistan). Helps students and parents get instant answers about admissions, fees, timings, subjects, and holidays.\n\nPowered by LLM with contextual understanding.\n\n🔗 Live: uswa-ai-assistant-2.onrender.com`,
      topic: "uswa",
    };
  }
  if (/gpa|scholarly|grade\s?prediction|student\s?performance/.test(q)) {
    return {
      text: `**Scholarly — GPA Predictor** 📊\n\nAn academic prediction engine that estimates GPA using **Linear Regression** trained on 1,500 records. Analyzes 8 lifestyle factors: study hours, sleep, attendance, previous GPA, assignments, participation, extracurriculars, and social media.\n\n• R² = 0.608\n• RMSE = 0.247\n• Feature-impact analysis included\n\n🔗 Live: gpa-predictor-woad.vercel.app`,
      topic: "gpa",
    };
  }
  if (/loan|bank|credit|al\s?habib|eligibility/.test(q)) {
    return {
      text: `**LoanCheck — AL Habib** 🏦\n\nAn AI-powered loan eligibility portal styled after Bank AL Habib. Uses **Logistic Regression** trained on 2,000+ records for instant approval assessments.\n\n• **84% accuracy**, 0.93 ROC-AUC\n• Considers income, loan terms, education, credit history, property area\n• Follows State Bank of Pakistan guidelines\n\n🔗 Live: loan-predictor-sigma.vercel.app`,
      topic: "loan",
    };
  }
  if (/cat|dog|image\s?class|cnn|convolution|computer\s?vision/.test(q)) {
    return {
      text: `**Image Classification (Cat vs Dog)** 🐱🐶\n\nA **Convolutional Neural Network** that classifies images as cats or dogs. Built with TensorFlow/Keras and OpenCV.\n\nCovers: image preprocessing, CNN architecture, feature extraction, model training, and evaluation. Great foundation for more advanced computer vision work.`,
      topic: "cnn",
    };
  }

  // Certifications
  if (/certifi|credenti|award|coursera|ibm|badge|arduino/.test(q)) {
    const list = CERTIFICATES.map(
      (c) => `• **${c.title}** — ${c.provider} (${c.date})`,
    ).join("\n");
    return {
      text: `Qamar has **${CERTIFICATES.length} certifications** 🏆\n\n${list}\n\nAll verified. The IBM Deep Learning cert is verifiable on Coursera. See the Certifications section for details!`,
      topic: "certifications",
    };
  }

  // Experience
  if (/experience|year|career|history|background|previous|role|job\s?history|internship/.test(q)) {
    return {
      text: `Qamar's experience so far:\n\n**Freelance Python & ML Developer** at Fiverr (2024 – Present)\nData analysis, ML modeling, and prompt engineering services for global clients.\n\n**Independent AI/ML Developer** (2024 – Present)\nBuilt and deployed 5+ end-to-end ML applications on real datasets.\n\nAs an AI/ML student, he's actively building his career through hands-on projects and freelance work.`,
      topic: "experience",
    };
  }

  // Fiverr
  if (/fiverr|freelance|gig/.test(q)) {
    return {
      text: `Qamar actively freelances on **Fiverr** 💼\n\nServices offered:\n• Python data analysis & preprocessing\n• Machine learning modeling\n• Custom ChatGPT prompt engineering\n• End-to-end AI solutions\n\n🔗 Check his Fiverr profile via the Contact section, or reach out directly for custom quotes.`,
      topic: "fiverr",
    };
  }

  // Hire / availability
  if (/hire|available|work\s?with|collaborate|join|team|opportunit|recruit|internship/.test(q)) {
    return {
      text: `Yes! Qamar is **${SITE_CONFIG.availability}** 🎯\n\nHe's especially open to:\n• 🎓 Internship opportunities (AI/ML focus)\n• 💼 Freelance ML/data projects\n• 🚀 Collaborative student projects\n\nHe typically responds within **24 hours**.\n\nWould you like him to reach out to you directly? Just tell me a bit about what you need!`,
      topic: "hire",
      showContactPrompt: true,
    };
  }

  // Contact
  if (/contact|email|reach|phone|number|whatsapp|call|message|dm/.test(q)) {
    return {
      text: `Here's how to reach Qamar:\n\n📧 **Email:** ${SITE_CONFIG.email}\n📱 **Phone/WhatsApp:** ${SITE_CONFIG.phone}\n📍 **Location:** ${SITE_CONFIG.location}\n\n**Fastest way:** Use the button below to send Qamar a message directly via WhatsApp with your info!`,
      topic: "contact",
      showContactPrompt: true,
    };
  }

  // Resume
  if (/resume|\bcv\b|download|pdf/.test(q)) {
    return {
      text: `You can download Qamar's professional resume from the **"Resume" button** in the top-right of the navbar. 📄\n\nIt covers his:\n• Education (BS AI at Shifa University)\n• 5 deployed AI/ML projects with live links\n• IBM Deep Learning certification\n• Freelance experience on Fiverr\n• Complete technical skill set`,
      topic: "resume",
    };
  }

  // Location
  if (/location|where|based|city|country|pakistan|from|live|timezone|islamabad/.test(q)) {
    return {
      text: `Qamar is based in **${SITE_CONFIG.location}** 🇵🇰\n\nHe works remotely with clients globally — timezone flexible for async collaboration across the Middle East, Europe, and beyond.`,
      topic: "location",
    };
  }

  // Pricing
  if (/price|cost|rate|charge|fee|budget|how\s?much|payment|salary|hourly|quote/.test(q)) {
    return {
      text: `Qamar's pricing is flexible & student-friendly: 💰\n\n**Fiverr gigs:**\n• Custom ChatGPT prompts — starting at $15\n• Python data analysis & ML — starting at $90\n\n**Custom projects:**\n• Fixed-price for well-defined scopes\n• Weekly rates for ongoing work\n\nHe provides transparent estimates before starting. Would you like to discuss your project?`,
      topic: "pricing",
      showContactPrompt: true,
    };
  }

  // Tools
  if (/tool|editor|ide|setup|environment|use|workflow|vs\s?code/.test(q)) {
    return {
      text: `Qamar's daily toolkit: 🛠️\n\n• **Editors:** VS Code, IntelliJ IDEA\n• **Version Control:** Git, GitHub\n• **Deployment:** Vercel, Render\n• **ML Tools:** Jupyter, scikit-learn, TensorFlow\n• **Design:** Figma (basic)\n• **AI:** OpenAI API, prompt engineering`,
      topic: "tools",
    };
  }

  // GitHub / LinkedIn
  if (/github|linkedin|social|profile/.test(q)) {
    return {
      text: `Find Qamar online:\n\n🐙 **GitHub:** github.com/Qamar7071\n💼 **LinkedIn:** linkedin.com/in/qamar-abbas-39a971392\n💰 **Fiverr:** All active gigs live\n📘 **Facebook:** Personal profile\n\nAll social links are in the hero section — one click away!`,
      topic: "contact",
    };
  }

  // Response time
  if (/response|reply|answer|how\s?soon|when|fast/.test(q)) {
    return {
      text: `Qamar typically responds within **24 hours** ⏱️\n\nFor Fiverr messages, usually faster. For urgent projects, WhatsApp is the fastest way to reach him.\n\nWant to send a message right now?`,
      topic: "contact",
      showContactPrompt: true,
    };
  }

  // Thanks / bye
  if (/thank|thanks|bye|goodbye|see\s?you|later|great|awesome|cool|nice/.test(q)) {
    return { text: pick(V.thanks), topic: null };
  }

  // Age / personal
  if (/age|old|birthday|born/.test(q)) {
    return {
      text: `That's personal info I'll let Qamar share directly! 😊 What I can tell you: he's an active AI student since 2024, actively building his career, and passionate about ML.\n\nWant to know about his professional side? Ask about projects, skills, or how to hire him!`,
      topic: null,
    };
  }

  // Fallback
  return { text: pick(V.fallback), topic: null };
}

/* -------------------------------------------------------------------------- */
/*  Suggestion chips                                                          */
/* -------------------------------------------------------------------------- */
const SUGGESTIONS = [
  "What are your skills?",
  "Show me projects",
  "How to hire you?",
  "Tell me about certifications",
];

/* -------------------------------------------------------------------------- */
/*  WhatsApp notification helper                                              */
/* -------------------------------------------------------------------------- */
function sendLeadToWhatsApp(name: string, email: string, message: string) {
  const text =
    `🌟 *New Lead from Portfolio Chatbot!*\n\n` +
    `👤 *Name:* ${name}\n` +
    `📧 *Email:* ${email}\n\n` +
    `💬 *Message:*\n${message}\n\n` +
    `---\n_Sent from Qamar's portfolio chatbot_ 🤖`;

  // Extract just digits from phone (WhatsApp format needs no +)
  const phoneDigits = SITE_CONFIG.phone.replace(/[^0-9]/g, "");
  const url = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/* -------------------------------------------------------------------------- */
/*  CHATBOT                                                                   */
/* -------------------------------------------------------------------------- */
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lastTopic, setLastTopic] = useState<Topic>(null);
  const [messages, setMessages] = useState<Message[]>(() => {
    const g = pick(V.greetings);
    return [{ id: "welcome", role: "bot", text: g, displayedText: g, isStreaming: false }];
  });
  const [showContactForm, setShowContactForm] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showContactForm) setShowContactForm(false);
        else setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [showContactForm]);

  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    };
  }, []);

  const streamText = useCallback((msgId: string, fullText: string) => {
    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    let i = 0;
    const CHARS_PER_TICK = 3;
    const TICK_MS = 18;
    streamIntervalRef.current = setInterval(() => {
      i += CHARS_PER_TICK;
      if (i >= fullText.length) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId ? { ...m, displayedText: fullText, isStreaming: false } : m,
          ),
        );
        if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
        streamIntervalRef.current = null;
        return;
      }
      setMessages((prev) =>
        prev.map((m) => (m.id === msgId ? { ...m, displayedText: fullText.slice(0, i) } : m)),
      );
    }, TICK_MS);
  }, []);

  const skipStreaming = () => {
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }
    setMessages((prev) =>
      prev.map((m) => (m.isStreaming ? { ...m, displayedText: m.text, isStreaming: false } : m)),
    );
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    skipStreaming();

    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", text: trimmed }]);
    setInput("");
    setIsTyping(true);

    const thinkTime = 700 + Math.random() * 800;
    setTimeout(() => {
      const response = getBotResponse(trimmed, lastTopic);
      if (response.topic) setLastTopic(response.topic);

      const msgId = `b-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: msgId,
          role: "bot",
          text: response.text,
          displayedText: "",
          isStreaming: true,
          showContactPrompt: response.showContactPrompt,
        },
      ]);
      setIsTyping(false);
      streamText(msgId, response.text);
    }, thinkTime);
  };

  const anyStreaming = messages.some((m) => m.isStreaming);
  const hasContactPrompt = messages.some(
    (m) => m.showContactPrompt && !m.isStreaming,
  );

  return (
    <>
      {/* FLOATING BUTTON */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3 rounded-full bg-primary text-white font-semibold shadow-button hover:bg-primary-600 hover:shadow-button-hover hover:-translate-y-0.5 transition-all duration-200"
            aria-label="Open chat"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Ask Qamar</span>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-secondary-300" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={cn(
              "fixed z-50 bg-white shadow-2xl border border-dark-100",
              "inset-x-0 bottom-0 rounded-t-3xl max-h-[85vh]",
              "sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[400px] sm:h-[600px] sm:max-h-[85vh] sm:rounded-3xl",
              "flex flex-col overflow-hidden",
            )}
            role="dialog"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-700 text-white px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm leading-tight">Qamar&apos;s AI Assistant</p>
                  <p className="text-xs text-white/80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    Online · Instant replies
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowContactForm(true)}
                  title="Contact Qamar directly"
                  className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Contact Qamar"
                >
                  <UserPlus className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-dark-50 relative">
              {messages.map((msg) => (
                <div key={msg.id}>
                  <MessageBubble message={msg} />
                  {msg.showContactPrompt && !msg.isStreaming && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="ml-10 mt-2"
                    >
                      <button
                        type="button"
                        onClick={() => setShowContactForm(true)}
                        className="inline-flex items-center gap-2 text-xs font-bold bg-primary text-white px-4 py-2 rounded-full shadow-button hover:bg-primary-600 hover:-translate-y-0.5 transition-all"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        Send Qamar a message
                      </button>
                    </motion.div>
                  )}
                </div>
              ))}
              {isTyping && <ThinkingIndicator />}

              {messages.length === 1 && !isTyping && !anyStreaming && (
                <div className="pt-2">
                  <p className="text-xs text-dark-400 font-semibold mb-2 px-1">Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => sendMessage(s)}
                        className="text-xs bg-white border border-dark-200 hover:border-primary hover:text-primary text-dark-700 px-3 py-1.5 rounded-full font-medium transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Skip streaming */}
            {anyStreaming && (
              <div className="flex justify-center -my-1">
                <button
                  type="button"
                  onClick={skipStreaming}
                  className="text-xs bg-white border border-dark-200 hover:border-primary hover:text-primary text-dark-500 px-3 py-1 rounded-full font-semibold flex items-center gap-1 shadow-soft"
                >
                  <SkipForward className="w-3 h-3" />
                  Skip
                </button>
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-dark-100 bg-white shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(input);
                    }
                  }}
                  placeholder="Ask about Qamar..."
                  className="flex-1 px-4 py-2.5 bg-dark-50 border border-transparent focus:border-primary focus:bg-white focus:outline-none rounded-full text-sm placeholder:text-dark-400 text-dark-900"
                  disabled={isTyping}
                />
                <button
                  type="button"
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-full bg-primary text-white hover:bg-primary-600 disabled:bg-dark-200 disabled:cursor-not-allowed flex items-center justify-center transition-colors shrink-0"
                  aria-label="Send"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-dark-400 text-center mt-2 flex items-center justify-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                AI-powered · Notification sent to Qamar via WhatsApp
              </p>
            </div>

            {/* Contact form overlay */}
            <AnimatePresence>
              {showContactForm && (
                <ContactFormOverlay onClose={() => setShowContactForm(false)} />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  CONTACT FORM OVERLAY — lead capture with WhatsApp send                    */
/* -------------------------------------------------------------------------- */
function ContactFormOverlay({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    setSending(true);

    // Small delay for UX
    setTimeout(() => {
      sendLeadToWhatsApp(name, email, message);
      setSent(true);
      setSending(false);
      toast.success("Opening WhatsApp — click Send to complete!");
      setTimeout(onClose, 2500);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-10 bg-white/95 backdrop-blur-sm flex items-start justify-center p-5 overflow-y-auto"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="w-full mt-4"
      >
        {sent ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-display font-bold text-dark-900 mb-2">
              Almost there! 🎉
            </h3>
            <p className="text-sm text-dark-500">
              WhatsApp is opening — just click <strong>Send</strong> to deliver your message to Qamar.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-display font-bold text-dark-900">
                  Send Qamar a message
                </h3>
                <p className="text-xs text-dark-500 mt-0.5">
                  Direct WhatsApp — usually replies within 24h
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-dark-100 flex items-center justify-center text-dark-500"
                aria-label="Close form"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-dark-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  disabled={sending}
                  className="w-full px-3 py-2 bg-dark-50 border border-dark-200 focus:border-primary focus:bg-white focus:outline-none rounded-lg text-sm text-dark-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-dark-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={sending}
                  className="w-full px-3 py-2 bg-dark-50 border border-dark-200 focus:border-primary focus:bg-white focus:outline-none rounded-lg text-sm text-dark-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-dark-700 mb-1">
                  Your Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi Qamar, I'd like to discuss..."
                  rows={4}
                  disabled={sending}
                  className="w-full px-3 py-2 bg-dark-50 border border-dark-200 focus:border-primary focus:bg-white focus:outline-none rounded-lg text-sm text-dark-900 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold shadow-button hover:bg-primary-600 hover:-translate-y-0.5 disabled:bg-dark-300 disabled:hover:translate-y-0 transition-all"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Opening WhatsApp...
                  </>
                ) : (
                  <>
                    <Phone className="w-4 h-4" />
                    Send via WhatsApp
                  </>
                )}
              </button>

              <p className="text-[10px] text-dark-400 text-center">
                Message opens in WhatsApp — click Send there to deliver.
                No spam, no data stored.
              </p>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */
function MessageBubble({ message }: { message: Message }) {
  const isBot = message.role === "bot";
  const shownText = isBot
    ? message.isStreaming
      ? message.displayedText ?? ""
      : message.text
    : message.text;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("flex gap-2", isBot ? "justify-start" : "justify-end")}
    >
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-700 text-white flex items-center justify-center shrink-0 shadow-soft">
          <Sparkles className="w-4 h-4" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap break-words leading-relaxed",
          isBot
            ? "bg-white text-dark-800 rounded-tl-sm shadow-soft"
            : "bg-primary text-white rounded-tr-sm",
        )}
      >
        {formatText(shownText)}
        {message.isStreaming && (
          <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 align-middle animate-pulse" />
        )}
      </div>
    </motion.div>
  );
}

function ThinkingIndicator() {
  return (
    <div className="flex gap-2 justify-start">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-700 text-white flex items-center justify-center shrink-0 shadow-soft">
        <Sparkles className="w-4 h-4 animate-pulse" />
      </div>
      <div className="bg-white shadow-soft rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
        <span className="text-xs text-dark-500 font-medium">Thinking...</span>
      </div>
    </div>
  );
}

function formatText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}