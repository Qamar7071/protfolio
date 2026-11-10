"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  Building2,
  Briefcase,
  Calendar,
  DollarSign,
  MessageSquare,
  CheckCircle2,
  Loader2,
  Zap,
  Clock,
  Shield,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import BrandLogo from "@/components/ui/BrandLogo";
import Magnetic from "@/components/fx/Magnetic";
import { LineReveal, Reveal, SplitText } from "@/components/fx/Reveal";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Form options                                                              */
/* -------------------------------------------------------------------------- */
const SERVICES = [
  "AI Chatbot Development",
  "AI-Powered Website",
  "Prompt Engineering",
  "Custom AI/ML Model",
  "Data Analysis / Preprocessing",
  "Python Development",
  "Other / Not sure",
];

const TIMELINES = [
  "ASAP — Urgent",
  "Within 1 week",
  "Within 1 month",
  "1 – 3 months",
  "Flexible",
];

const BUDGETS = [
  "Under $100",
  "$100 – $500",
  "$500 – $2,000",
  "$2,000 – $5,000",
  "$5,000+",
  "Let's discuss",
];

/* Direct channels shown in the left panel */
const CHANNELS = [
  {
    label: "Email",
    logo: "Gmail",
    value: SITE_CONFIG.email,
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${SITE_CONFIG.email}`,
  },
  { label: "WhatsApp", logo: "WhatsApp", value: SITE_CONFIG.phone, href: SOCIAL_LINKS.whatsapp },
  { label: "LinkedIn", logo: "LinkedIn", value: "Qamar Abbas", href: SOCIAL_LINKS.linkedin },
  { label: "Fiverr", logo: "Fiverr", value: "Hire me on Fiverr", href: SOCIAL_LINKS.fiverr },
  { label: "GitHub", logo: "GitHub", value: "Qamar7071", href: SOCIAL_LINKS.github },
] as const;

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */
type FormData = {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  projectTitle: string;
  description: string;
  timeline: string;
  budget: string;
  notes: string;
};

const INITIAL: FormData = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  projectTitle: "",
  description: "",
  timeline: "",
  budget: "",
  notes: "",
};

/* -------------------------------------------------------------------------- */
/*  WhatsApp message builder                                                  */
/* -------------------------------------------------------------------------- */
function buildWhatsAppMessage(d: FormData): string {
  const lines: string[] = [
    "🌟 *New Project Inquiry from Portfolio!*",
    "",
    "👤 *Client Details*",
    `Name: ${d.name}`,
    `Email: ${d.email}`,
  ];
  if (d.company.trim()) lines.push(`Company: ${d.company}`);
  if (d.phone.trim()) lines.push(`Phone: ${d.phone}`);

  lines.push("", "🎯 *Project Details*");
  lines.push(`Service: ${d.service}`);
  lines.push(`Title: ${d.projectTitle}`);
  lines.push("", "📝 *Description:*", d.description);

  lines.push("");
  if (d.timeline) lines.push(`📅 Timeline: ${d.timeline}`);
  if (d.budget) lines.push(`💰 Budget: ${d.budget}`);

  if (d.notes.trim()) {
    lines.push("", "📎 *Additional Notes:*", d.notes);
  }

  lines.push("", "---", "_Sent from Qamar's portfolio contact form_ ✨");
  return lines.join("\n");
}

function sendToWhatsApp(message: string) {
  const phoneDigits = SITE_CONFIG.phone.replace(/[^0-9]/g, "");
  const url = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}


/* -------------------------------------------------------------------------- */
/*  CONTACT SECTION                                                           */
/* -------------------------------------------------------------------------- */
export default function Contact() {
  const [data, setData] = useState<FormData>(INITIAL);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
  };

  const validate = (): string | null => {
    if (!data.name.trim()) return "Please enter your name";
    if (!data.email.trim()) return "Please enter your email";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) return "Please enter a valid email";
    if (!data.service) return "Please select a service";
    if (!data.projectTitle.trim()) return "Please enter a project title";
    if (!data.description.trim()) return "Please describe your project";
    if (data.description.trim().length < 20) return "Please add a bit more detail (at least 20 characters)";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }

    setSending(true);
    setTimeout(() => {
      sendToWhatsApp(buildWhatsAppMessage(data));
      setSent(true);
      setSending(false);
      toast.success("WhatsApp opening — hit Send to deliver!");
      setTimeout(() => {
        setSent(false);
        setData(INITIAL);
      }, 4000);
    }, 400);
  };

  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[120vw] h-[70vh] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.18),transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle,rgba(255,209,102,0.08),transparent_60%)]" />
      </div>

      <div className="container-custom">
        <Reveal y={16} className="eyebrow mb-8">
          <span className="text-secondary-300">(07)</span>
          <span className="h-px w-10 bg-white/25" aria-hidden="true" />
          <span>Contact</span>
        </Reveal>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <SplitText
            as="h2"
            text={"Let's build\nsomething *great.*"}
            className="font-display font-bold text-white text-[clamp(3rem,9.5vw,8.75rem)] leading-[0.9] tracking-[-0.05em]"
          />
          <Reveal delay={0.3} className="shrink-0">
            <Magnetic strength={0.45}>
              <a
                href={CHANNELS[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative grid place-items-center w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-secondary-300 text-ink-950 font-display font-semibold text-lg text-center leading-tight transition-transform duration-500 hover:scale-105"
              >
                <span>
                  Get in
                  <br />
                  touch
                </span>
                <ArrowUpRight
                  className="absolute top-9 right-9 sm:top-11 sm:right-11 w-6 h-6 transition-transform duration-500 group-hover:rotate-45"
                  aria-hidden="true"
                />
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <LineReveal className="mt-16" />

        <div className="mt-16 grid lg:grid-cols-12 gap-14 lg:gap-16">
          {/* =========== CHANNELS =========== */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-lg text-white/65 leading-relaxed max-w-[42ch]">
                Tell me what you&apos;re working on. I reply to every inquiry myself, usually within 24 hours.
              </p>
            </Reveal>

            <ul className="mt-10 border-t border-white/10">
              {CHANNELS.map((c, i) => (
                <Reveal as="li" key={c.label} delay={i * 0.05} y={16} className="border-b border-white/10">
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300 rounded-lg"
                  >
                    <span className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0">
                      <BrandLogo name={c.logo} size={22} square />
                    </span>
                    <span className="min-w-0 flex-1 transition-transform duration-500 group-hover:translate-x-2">
                      <span className="block text-xs uppercase tracking-[0.2em] text-white/40">{c.label}</span>
                      <span className="block font-semibold text-white truncate group-hover:text-secondary-300 transition-colors">
                        {c.value}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="w-5 h-5 text-white/30 group-hover:text-secondary-300 group-hover:rotate-45 transition-all duration-500 shrink-0"
                      aria-hidden="true"
                    />
                  </a>
                </Reveal>
              ))}
            </ul>

            <ul className="mt-10 space-y-5">
              <WhyPoint
                icon={<Clock className="w-4 h-4" />}
                title="Reply within 24 hours"
                desc="Every inquiry gets a personal answer, not an auto-responder."
              />
              <WhyPoint
                icon={<Zap className="w-4 h-4" />}
                title="Working software, not slides"
                desc="5+ deployed ML apps you can open today."
              />
              <WhyPoint
                icon={<Shield className="w-4 h-4" />}
                title="Clear estimate first"
                desc="You see scope and price before any work starts."
              />
            </ul>

            <p className="mt-10 flex items-center gap-2 text-sm text-white/45">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              {SITE_CONFIG.location}, working with clients remotely
            </p>
          </div>

          {/* =========== INQUIRY FORM =========== */}
          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="card-dark p-6 sm:p-10 backdrop-blur-sm">
              {sent ? (
                <SuccessState onReset={() => setSent(false)} />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="mb-2">
                    <h3 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-white mb-1">
                      Project inquiry
                    </h3>
                    <p className="text-sm text-white/50">
                      Fill this in and it opens WhatsApp with your brief ready to send.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field id="f-name" label="Your name" required icon={<User className="w-4 h-4" />}>
                      <input
                        id="f-name"
                        type="text"
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="John Doe"
                        disabled={sending}
                        className="form-input"
                      />
                    </Field>
                    <Field id="f-email" label="Email" required icon={<Mail className="w-4 h-4" />}>
                      <input
                        id="f-email"
                        type="email"
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="you@example.com"
                        disabled={sending}
                        className="form-input"
                      />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field id="f-company" label="Company" icon={<Building2 className="w-4 h-4" />}>
                      <input
                        id="f-company"
                        type="text"
                        autoComplete="organization"
                        value={data.company}
                        onChange={(e) => update("company", e.target.value)}
                        placeholder="Optional"
                        disabled={sending}
                        className="form-input"
                      />
                    </Field>
                    <Field id="f-phone" label="Phone" icon={<Phone className="w-4 h-4" />}>
                      <input
                        id="f-phone"
                        type="tel"
                        autoComplete="tel"
                        value={data.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="Optional"
                        disabled={sending}
                        className="form-input"
                      />
                    </Field>
                  </div>

                  <div className="pt-1 border-t border-white/10" />

                  <Field id="f-service" label="What service do you need?" required icon={<Briefcase className="w-4 h-4" />}>
                    <select
                      id="f-service"
                      value={data.service}
                      onChange={(e) => update("service", e.target.value)}
                      disabled={sending}
                      className="form-input"
                    >
                      <option value="">Select a service...</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field id="f-title" label="Project title" required icon={<Sparkles className="w-4 h-4" />}>
                    <input
                      id="f-title"
                      type="text"
                      value={data.projectTitle}
                      onChange={(e) => update("projectTitle", e.target.value)}
                      placeholder="e.g. Customer Support Chatbot for E-commerce"
                      disabled={sending}
                      className="form-input"
                    />
                  </Field>

                  <Field
                    id="f-description"
                    label="Project description"
                    required
                    icon={<MessageSquare className="w-4 h-4" />}
                    hint={`${data.description.length}/500 chars · min 20`}
                  >
                    <textarea
                      id="f-description"
                      value={data.description}
                      onChange={(e) => update("description", e.target.value.slice(0, 500))}
                      placeholder="Describe your project — what you want to build, your goals, any specific requirements..."
                      rows={4}
                      disabled={sending}
                      className="form-input resize-none"
                    />
                  </Field>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field id="f-timeline" label="Timeline" icon={<Calendar className="w-4 h-4" />}>
                      <select
                        id="f-timeline"
                        value={data.timeline}
                        onChange={(e) => update("timeline", e.target.value)}
                        disabled={sending}
                        className="form-input"
                      >
                        <option value="">Select...</option>
                        {TIMELINES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field id="f-budget" label="Budget" icon={<DollarSign className="w-4 h-4" />}>
                      <select
                        id="f-budget"
                        value={data.budget}
                        onChange={(e) => update("budget", e.target.value)}
                        disabled={sending}
                        className="form-input"
                      >
                        <option value="">Select...</option>
                        {BUDGETS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field id="f-notes" label="Additional notes" hint="Optional">
                    <textarea
                      id="f-notes"
                      value={data.notes}
                      onChange={(e) => update("notes", e.target.value.slice(0, 300))}
                      placeholder="Anything else you'd like to share?"
                      rows={2}
                      disabled={sending}
                      className="form-input resize-none"
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={sending}
                    className={cn("btn-light w-full !py-4 text-base", sending && "opacity-70 pointer-events-none")}
                  >
                    {sending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                        Preparing your message...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" aria-hidden="true" />
                        Send inquiry on WhatsApp
                      </>
                    )}
                  </button>

                  <p className="text-xs text-white/40 text-center">
                    Hit Send in WhatsApp to deliver it. Nothing is stored on this site.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */
function WhyPoint({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <li className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] text-secondary-300 flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-sm text-white">{title}</p>
        <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
      </div>
    </li>
  );
}

function Field({
  id,
  label,
  required,
  icon,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={id} className="flex items-center gap-1.5 text-xs font-semibold text-white/70">
          {icon && <span className="text-secondary-300">{icon}</span>}
          {label}
          {required && <span className="text-secondary-300">*</span>}
        </label>
        {hint && <span className="text-[11px] text-white/40">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-10">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-400/15 text-emerald-300 mb-5"
      >
        <CheckCircle2 className="w-12 h-12" aria-hidden="true" />
      </motion.div>
      <h3 className="text-2xl font-display font-bold text-white mb-2">Almost there! 🎉</h3>
      <p className="text-white/55 max-w-sm mx-auto mb-6">
        WhatsApp opened with your full inquiry pre-filled. Just click <strong className="text-white">Send</strong>{" "}
        there — Qamar will get back to you within 24 hours.
      </p>
      <button type="button" onClick={onReset} className="btn-secondary text-sm">
        Send another inquiry
      </button>
    </div>
  );
}
