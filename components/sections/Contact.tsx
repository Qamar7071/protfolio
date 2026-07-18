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
  ArrowRight,
} from "lucide-react";

import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import SocialLinks from "@/components/ui/SocialLinks";
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
    <section id="contact" className="section-padding bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-radial-fade pointer-events-none" />
      <div className="blob w-[400px] h-[400px] bg-primary/15 -top-32 -right-32" />
      <div
        className="blob w-[350px] h-[350px] bg-secondary-300/25 bottom-0 -left-24"
        style={{ animationDelay: "3s" }}
      />

      <div className="container-custom relative z-10">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="eyebrow inline-flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Let&apos;s Work Together
          </span>
          <h2 className="section-heading heading-underline-center mx-auto mt-2">
            Have a project?{" "}
            <span className="text-gradient-primary">Let&apos;s talk</span>
          </h2>
          <p className="section-subheading mx-auto">
            Share your project details below and I&apos;ll respond within 24 hours.
            Every inquiry gets a personal reply — no bots, no auto-responders.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {/* =========== LEFT: INFO PANEL =========== */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact cards */}
            <div className="space-y-3">
              <ContactCard
                icon={<Mail className="w-5 h-5" />}
                label="Email"
                value={SITE_CONFIG.email}
                href={`mailto:${SITE_CONFIG.email}`}
              />
              <ContactCard
                icon={<Phone className="w-5 h-5" />}
                label="WhatsApp"
                value={SITE_CONFIG.phone}
                href={SOCIAL_LINKS.whatsapp}
              />
              <ContactCard
                icon={<MapPin className="w-5 h-5" />}
                label="Location"
                value={SITE_CONFIG.location}
                subtitle="Remote-friendly · Global timezones"
              />
            </div>

            {/* Why work with me */}
            <div className="bg-gradient-to-br from-primary to-primary-700 rounded-3xl p-6 text-white shadow-card-hover relative overflow-hidden">
              <div className="absolute top-4 right-4 opacity-20">
                <Sparkles className="w-16 h-16" />
              </div>
              <h3 className="font-display font-bold text-lg mb-4 relative">
                Why work with me?
              </h3>
              <ul className="space-y-3 relative">
                <WhyPoint
                  icon={<Clock className="w-4 h-4" />}
                  title="24-hour response"
                  desc="I reply to every inquiry personally within a day."
                />
                <WhyPoint
                  icon={<Zap className="w-4 h-4" />}
                  title="Ships live projects"
                  desc="5+ deployed ML apps — no just-in-my-laptop demos."
                />
                <WhyPoint
                  icon={<Shield className="w-4 h-4" />}
                  title="Transparent pricing"
                  desc="Clear estimates before we start. No surprises."
                />
              </ul>
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs font-bold text-dark-500 uppercase tracking-wider mb-3">
                Or connect on
              </p>
              <SocialLinks size="md" />
            </div>
          </div>

          {/* =========== RIGHT: INQUIRY FORM =========== */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl border border-dark-100 shadow-card p-6 sm:p-8 relative overflow-hidden"
            >
              {sent ? (
                <SuccessState onReset={() => setSent(false)} />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="mb-2">
                    <h3 className="text-xl font-display font-bold text-dark-900 mb-1">
                      Project Inquiry
                    </h3>
                    <p className="text-sm text-dark-500">
                      Fill in the details and I&apos;ll get back to you within 24 hours.
                    </p>
                  </div>

                  {/* Personal Info */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Your Name" required icon={<User className="w-4 h-4" />}>
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
                  <Field label="Project Title" required icon={<Sparkles className="w-4 h-4" />}>
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
                    label="Project Description"
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
                  <Field label="Additional Notes" hint="Optional">
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
                        Send Project Inquiry
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-dark-400 text-center">
                    Your message opens in WhatsApp with all details pre-filled.
                    Just hit Send there to deliver. No spam, no data stored.
                  </p>
                </form>
              )}
            </motion.div>
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
function ContactCard({
  icon,
  label,
  value,
  subtitle,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle?: string;
  href?: string;
}) {
  const Content = (
    <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-dark-100 shadow-soft hover:shadow-card hover:border-primary/30 hover:-translate-y-0.5 transition-all group">
      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-dark-400 uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-sm font-semibold text-dark-900 truncate">{value}</p>
        {subtitle && <p className="text-xs text-dark-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
      {Content}
    </a>
  ) : (
    Content
  );
}

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
      <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="font-bold text-sm">{title}</p>
        <p className="text-xs text-white/80 leading-relaxed">{desc}</p>
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
        {hint && <span className="text-[10px] text-dark-400">{hint}</span>}
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
