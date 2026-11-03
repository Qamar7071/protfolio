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
    if (data.description.trim().length < 20)
      return "Please add a bit more detail (at least 20 characters)";
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
      const msg = buildWhatsAppMessage(data);
      sendToWhatsApp(msg);
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
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 rounded-[2rem] overflow-hidden border border-dark-200 shadow-card">
          {/* =========== LEFT: CHANNELS PANEL =========== */}
          <div className="lg:col-span-5 bg-primary-950 text-white p-7 sm:p-10 lg:p-12">
            <h2 className="font-display font-bold text-[2.5rem] sm:text-5xl leading-[1.02] tracking-[-0.035em] text-white">
              Let&apos;s build something
              <span className="text-secondary-300" aria-hidden="true">.</span>
            </h2>
            <p className="mt-5 text-white/70 leading-relaxed max-w-[42ch]">
              Tell me what you&apos;re working on. I reply to every inquiry myself,
              usually within 24 hours.
            </p>

            <ul className="mt-10 space-y-1">
              {CHANNELS.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl -mx-3 px-3 py-3 hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300 transition-colors"
                  >
                    <span className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0">
                      <BrandLogo name={c.logo} size={22} square />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-white/55">{c.label}</span>
                      <span className="block font-semibold truncate">{c.value}</span>
                    </span>
                    <ArrowUpRight
                      className="w-4 h-4 text-white/35 group-hover:text-secondary-300 transition-colors shrink-0"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <ul className="mt-10 pt-8 border-t border-white/10 space-y-5">
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

            <p className="mt-10 flex items-center gap-2 text-sm text-white/55">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              {SITE_CONFIG.location}, working with clients remotely
            </p>
          </div>

          {/* =========== RIGHT: INQUIRY FORM =========== */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 lg:p-12">
            <div>
              {sent ? (
                <SuccessState onReset={() => setSent(false)} />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="mb-2">
                    <h3 className="text-2xl font-display font-bold tracking-tight text-dark-900 mb-1">
                      Project inquiry
                    </h3>
                    <p className="text-sm text-dark-500">
                      Fill this in and it opens WhatsApp with your brief ready to send.
                    </p>
                  </div>

                  {/* Personal Info */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Your name" required icon={<User className="w-4 h-4" />}>
                      <input
                        type="text"
                        value={data.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="John Doe"
                        disabled={sending}
                        className="form-input"
                      />
                    </Field>
                    <Field label="Email" required icon={<Mail className="w-4 h-4" />}>
                      <input
                        type="email"
                        value={data.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="you@example.com"
                        disabled={sending}
                        className="form-input"
                      />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Company" icon={<Building2 className="w-4 h-4" />}>
                      <input
                        type="text"
                        value={data.company}
                        onChange={(e) => update("company", e.target.value)}
                        placeholder="Optional"
                        disabled={sending}
                        className="form-input"
                      />
                    </Field>
                    <Field label="Phone" icon={<Phone className="w-4 h-4" />}>
                      <input
                        type="tel"
                        value={data.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="Optional"
                        disabled={sending}
                        className="form-input"
                      />
                    </Field>
                  </div>

                  <div className="pt-2 border-t border-dark-100" />

                  {/* Service */}
                  <Field
                    label="What service do you need?"
                    required
                    icon={<Briefcase className="w-4 h-4" />}
                  >
                    <select
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

                  {/* Project title */}
                  <Field label="Project title" required icon={<Sparkles className="w-4 h-4" />}>
                    <input
                      type="text"
                      value={data.projectTitle}
                      onChange={(e) => update("projectTitle", e.target.value)}
                      placeholder="e.g. Customer Support Chatbot for E-commerce"
                      disabled={sending}
                      className="form-input"
                    />
                  </Field>

                  {/* Description */}
                  <Field
                    label="Project description"
                    required
                    icon={<MessageSquare className="w-4 h-4" />}
                    hint={`${data.description.length}/500 chars · min 20`}
                  >
                    <textarea
                      value={data.description}
                      onChange={(e) => update("description", e.target.value.slice(0, 500))}
                      placeholder="Describe your project — what you want to build, your goals, any specific requirements..."
                      rows={4}
                      disabled={sending}
                      className="form-input resize-none"
                    />
                  </Field>

                  {/* Timeline + Budget */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Timeline" icon={<Calendar className="w-4 h-4" />}>
                      <select
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
                    <Field label="Budget" icon={<DollarSign className="w-4 h-4" />}>
                      <select
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

                  {/* Notes */}
                  <Field label="Additional notes" hint="Optional">
                    <textarea
                      value={data.notes}
                      onChange={(e) => update("notes", e.target.value.slice(0, 300))}
                      placeholder="Anything else you'd like to share?"
                      rows={2}
                      disabled={sending}
                      className="form-input resize-none"
                    />
                  </Field>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={sending}
                    className={cn(
                      "w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl",
                      "bg-primary text-white font-bold text-base shadow-button",
                      "hover:bg-primary-600 hover:shadow-button-hover hover:-translate-y-0.5",
                      "disabled:bg-dark-300 disabled:hover:translate-y-0",
                      "transition-all",
                    )}
                  >
                    {sending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Preparing your message...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send inquiry on WhatsApp
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-dark-500 text-center">
                    Hit Send in WhatsApp to deliver it. Nothing is stored on this site.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Form input styles */}
      <style jsx global>{`
        .form-input {
          width: 100%;
          padding: 0.625rem 0.875rem;
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 0.625rem;
          font-size: 0.875rem;
          color: #0f172a;
          transition: all 0.2s;
        }
        .form-input:focus {
          outline: none;
          border-color: #4854d9;
          background: white;
          box-shadow: 0 0 0 3px rgba(72, 84, 217, 0.1);
        }
        .form-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .form-input::placeholder {
          color: #94a3b8;
        }
      `}</style>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */
function WhyPoint({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-white/10 text-secondary-300 flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-sm text-white/60 leading-relaxed">{desc}</p>
      </div>
    </li>
  );
}

function Field({
  label,
  required,
  icon,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="flex items-center gap-1.5 text-xs font-bold text-dark-700">
          {icon && <span className="text-primary">{icon}</span>}
          {label}
          {required && <span className="text-primary">*</span>}
        </label>
        {hint && <span className="text-[10px] text-dark-500">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-5"
      >
        <CheckCircle2 className="w-12 h-12" />
      </motion.div>
      <h3 className="text-2xl font-display font-bold text-dark-900 mb-2">
        Almost there! 🎉
      </h3>
      <p className="text-dark-500 max-w-sm mx-auto mb-6">
        WhatsApp opened with your full inquiry pre-filled. Just click{" "}
        <strong>Send</strong> there — Qamar will get back to you within 24 hours.
      </p>
      <button type="button" onClick={onReset} className="btn-secondary text-sm">
        Send another inquiry
      </button>
    </div>
  );
}
