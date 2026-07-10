"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, SkipForward, Sparkles } from "lucide-react";

import {
  SITE_CONFIG,
  SKILL_CATEGORIES,
  PROJECTS,
  EXPERIENCE,
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
};

type Topic =
  | "skills" | "projects" | "experience" | "hire" | "contact"
  | "ai" | "fullstack" | "location" | "pricing" | "resume"
  | "education" | "tools" | "about" | null;

/* -------------------------------------------------------------------------- */
/*  Random pick helper                                                        */
/* -------------------------------------------------------------------------- */
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

/* -------------------------------------------------------------------------- */
/*  Response variants — less repetitive replies                               */
/* -------------------------------------------------------------------------- */
const V = {
  greetings: [
    `Hi there! 👋 I'm Qamar's AI assistant. What would you like to know about him?`,
    `Hey! 😊 I can tell you about Qamar's skills, projects, or how to work with him. What's on your mind?`,
    `Hello! I'm here to help you learn about Qamar. Ask me anything!`,
    `Assalam-o-Alaikum! 👋 I'm Qamar's assistant. How can I help you today?`,
  ],
  fallback: [
    `I can help you explore Qamar's:\n\n🎯 **Skills** — his tech stack\n🚀 **Projects** — featured work\n💼 **Experience** — background\n📧 **Contact** — how to reach him\n💰 **Pricing** — how he charges\n\nWhat would you like to know?`,
    `Hmm, let me help you find the right info. Try asking about:\n\n• Qamar's skills or tech stack\n• His projects and portfolio\n• Experience and background\n• How to hire him\n• Contact details\n\nWhat interests you?`,
    `I'm not sure I caught that. Here's what I can tell you about:\n\n🧠 AI/ML expertise\n💻 Full-stack development\n🏗️ Project portfolio\n🤝 Freelance availability\n\nWhich sounds interesting?`,
  ],
  thanks: [
    `You're welcome! 😊 Feel free to reach out to Qamar anytime through the Contact section.`,
    `Glad I could help! Anything else you'd like to know?`,
    `My pleasure! Let me know if you have more questions.`,
  ],
};

/* -------------------------------------------------------------------------- */
/*  Bot brain — returns { text, topic }                                       */
/* -------------------------------------------------------------------------- */
function getBotResponse(input: string, lastTopic: Topic): { text: string; topic: Topic } {
  const q = input.toLowerCase().trim();

  // Follow-up detection — reuses last topic on short/generic prompts
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

  // About / Who
  if (/^(who|about|introduce|yourself|qamar)$/.test(q) || /who\s(is|are)/.test(q) || /tell.+about/.test(q)) {
    return {
      text: `**Qamar** is an AI/ML Engineer & Full-Stack Developer based in ${SITE_CONFIG.location}. He builds intelligent, production-ready software — from ML models to full web apps.\n\nHe's especially strong in:\n• 🧠 AI/ML systems (Python, PyTorch, LangChain)\n• 💻 Full-stack apps (Next.js, Java Spring Boot)\n• ☁️ Cloud & DevOps (Docker, AWS)\n\nWant to know about his skills, projects, or how to hire him?`,
      topic: "about",
    };
  }

  // Skills
  if (/skill|tech|stack|know|programm|language|framework|expert|good\s?at/.test(q)) {
    const skills = SKILL_CATEGORIES.map(
      (c) => `**${c.title}:** ${c.skills.slice(0, 4).join(", ")}`,
    ).join("\n\n");
    return {
      text: `Here's Qamar's tech stack:\n\n${skills}\n\nHe's especially strong in **AI/ML** and **full-stack**. Want details on any specific area?`,
      topic: "skills",
    };
  }

  // AI / ML
  if (/\bai\b|\bml\b|machine\s?learning|deep\s?learning|pytorch|tensorflow|llm|gpt|langchain|neural|nlp|computer\s?vision/.test(q)) {
    return {
      text: `AI/ML is Qamar's specialty! 🧠\n\n• **Languages:** Python (primary)\n• **Frameworks:** PyTorch, TensorFlow, scikit-learn\n• **LLMs:** OpenAI, LangChain, RAG systems\n• **Deployment:** FastAPI, Docker, MLOps pipelines\n\nCheck his "AI Resume Analyzer" and "Chatbot Platform" projects — both use production LLM setups!`,
      topic: "ai",
    };
  }

  // Full-stack
  if (/full[-\s]?stack|frontend|backend|react|next|node|web\s?dev|\bapi\b|typescript|javascript/.test(q)) {
    return {
      text: `Qamar is a full-stack engineer:\n\n**Frontend:** React, Next.js, TypeScript, Tailwind CSS\n**Backend:** Java Spring Boot, Node.js, FastAPI, Django\n**Databases:** PostgreSQL, MongoDB, Redis\n**DevOps:** Docker, AWS, CI/CD\n\nHe delivers end-to-end web apps — from design to deployment.`,
      topic: "fullstack",
    };
  }

  // Projects
  if (/project|work|portfolio|built|create|made|showcase|example|demo/.test(q)) {
    const featured = PROJECTS.filter((p) => p.featured).slice(0, 3);
    const list = featured
      .map((p) => `• **${p.title}** — ${p.description.split(".")[0]}`)
      .join("\n");
    return {
      text: `Qamar has built **${PROJECTS.length}+ projects**. Here are his featured ones:\n\n${list}\n\nScroll down to the Projects section for live demos and GitHub links! 🚀`,
      topic: "projects",
    };
  }

  // Experience
  if (/experience|year|career|history|background|previous|role|job\s?history/.test(q)) {
    const list = EXPERIENCE.map(
      (e) => `• **${e.role}** at ${e.company} (${e.period})`,
    ).join("\n");
    return {
      text: `Qamar has **3+ years** of professional experience:\n\n${list}\n\nHe's currently available for freelance and full-time roles!`,
      topic: "experience",
    };
  }

  // Hire / freelance
  if (/hire|freelance|available|work\s?with|collaborate|join|team|opportunit|recruit/.test(q)) {
    return {
      text: `Yes, Qamar is **${SITE_CONFIG.availability}** 🎯\n\nBest ways to reach out:\n📧 ${SITE_CONFIG.email}\n📱 WhatsApp button in the hero section\n💼 Or use the Contact form on this page\n\nHe typically responds within **24 hours** and offers free 30-min discovery calls.`,
      topic: "hire",
    };
  }

  // Contact
  if (/contact|email|reach|phone|number|whatsapp|call|message|dm/.test(q)) {
    return {
      text: `Contact Qamar directly:\n\n📧 **Email:** ${SITE_CONFIG.email}\n📱 **Phone:** ${SITE_CONFIG.phone}\n📍 **Location:** ${SITE_CONFIG.location}\n\nAll social links (Gmail, WhatsApp, GitHub, LinkedIn, Facebook) are in the hero section — click any icon to connect!`,
      topic: "contact",
    };
  }

  // Resume
  if (/resume|\bcv\b|download|pdf/.test(q)) {
    return {
      text: `You can download Qamar's resume from the **"Resume" button** in the top-right of the navbar. 📄\n\nIt has full details of his experience, skills, projects, and education.`,
      topic: "resume",
    };
  }

  // Location
  if (/location|where|based|city|country|pakistan|from|live|timezone/.test(q)) {
    return {
      text: `Qamar is based in **${SITE_CONFIG.location}** 🇵🇰\n\nHe works remotely with clients worldwide across multiple time zones — perfect for async collaboration.`,
      topic: "location",
    };
  }

  // Pricing
  if (/price|cost|rate|charge|fee|budget|how\s?much|payment|salary|hourly/.test(q)) {
    return {
      text: `Qamar's pricing is flexible based on project scope: 💰\n\n• **Fixed-price** for well-defined MVPs\n• **Weekly/monthly** for ongoing work\n• **Hourly** for consulting sessions\n\nHe shares a clear estimate before starting — no surprises. Reach out via the Contact form for a quote!`,
      topic: "pricing",
    };
  }

  // Education
  if (/education|study|degree|university|college|graduation|qualifi|learn/.test(q)) {
    return {
      text: `Qamar has a strong Computer Science background and continues learning through hands-on projects, open-source contributions, and staying current with the latest AI/ML research.\n\nFor specific credentials, check his LinkedIn or resume.`,
      topic: "education",
    };
  }

  // Tools
  if (/tool|editor|ide|setup|environment|use|workflow/.test(q)) {
    return {
      text: `Qamar's daily toolkit: 🛠️\n\n• **Editors:** VS Code, IntelliJ IDEA, Cursor\n• **Version Control:** Git, GitHub\n• **DevOps:** Docker, Kubernetes, AWS\n• **Design:** Figma\n• **Collab:** Slack, Notion, Linear`,
      topic: "tools",
    };
  }

  // Thanks / bye
  if (/thank|thanks|bye|goodbye|see\s?you|later|great|awesome|cool/.test(q)) {
    return { text: pick(V.thanks), topic: null };
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
  "Tell me about AI/ML work",
];

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

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Escape closes
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // Cleanup stream on unmount
  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    };
  }, []);

  /* --------- Stream text character-by-character --------- */
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

  /* --------- Skip current streaming --------- */
  const skipStreaming = () => {
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }
    setMessages((prev) =>
      prev.map((m) => (m.isStreaming ? { ...m, displayedText: m.text, isStreaming: false } : m)),
    );
  };

  /* --------- Send a user message --------- */
  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    skipStreaming();

    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: "user", text: trimmed }]);
    setInput("");
    setIsTyping(true);

    const thinkTime = 700 + Math.random() * 800;
    setTimeout(() => {
      const { text: response, topic } = getBotResponse(trimmed, lastTopic);
      if (topic) setLastTopic(topic);

      const msgId = `b-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        { id: msgId, role: "bot", text: response, displayedText: "", isStreaming: true },
      ]);
      setIsTyping(false);
      streamText(msgId, response);
    }, thinkTime);
  };

  const anyStreaming = messages.some((m) => m.isStreaming);

  return (
    <>
      {/* ========== FLOATING BUTTON ========== */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={cn(
              "fixed bottom-6 right-6 z-40",
              "flex items-center gap-2.5 px-5 py-3 rounded-full",
              "bg-primary text-white font-semibold shadow-button",
              "hover:bg-primary-600 hover:shadow-button-hover hover:-translate-y-0.5",
              "transition-all duration-200",
            )}
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

      {/* ========== CHAT WINDOW ========== */}
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
              "sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[380px] sm:h-[560px] sm:max-h-[80vh] sm:rounded-3xl",
              "flex flex-col overflow-hidden",
            )}
            role="dialog"
            aria-label="Chat with Qamar's assistant"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-700 text-white px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm leading-tight">
                    Qamar&apos;s AI Assistant
                  </p>
                  <p className="text-xs text-white/80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    Online · Instant replies
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-dark-50">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
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
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-dark-400 text-center mt-2 flex items-center justify-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                AI-powered · Instant answers · No data stored
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
          "max-w-[75%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap break-words leading-relaxed",
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

/** Renders **bold** markdown as <strong> */
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