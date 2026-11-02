"use client";

import { motion } from "framer-motion";
import {
  User,
  Brain,
  Server,
  Code2,
  Rocket,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  ArrowRight,
  BadgeCheck,
  ExternalLink,
} from "lucide-react";

import { ABOUT, CERTIFICATES, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const KEY_POINT_ICONS = [Brain, Server, Code2, Rocket];

/* Verified online certificates only (have a real verify link) — oldest first */
const LEARNING_PATH = CERTIFICATES.filter((c) => c.verifyUrl !== "#")
  .map((c) => ({ ...c, time: new Date(c.date).getTime() }))
  .sort((a, b) => a.time - b.time);

export default function About() {
  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-fade pointer-events-none" />
      <div className="blob w-[400px] h-[400px] bg-primary/10 top-40 -right-32" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="eyebrow flex items-center justify-center gap-2">
            <User className="w-4 h-4" />
            About Me
          </span>
          <h2 className="section-heading heading-underline-center mx-auto mt-2">
            Get to <span className="text-gradient-primary">know me</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14 max-w-6xl mx-auto items-start">
          {/* LEFT: Quick facts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-dark-50 rounded-2xl p-5 space-y-3">
              <QuickFact icon={<GraduationCap className="w-4 h-4" />} label="Education" value="BS AI · Grade A" />
              <QuickFact icon={<MapPin className="w-4 h-4" />} label="Location" value={SITE_CONFIG.location} />
              <QuickFact icon={<Briefcase className="w-4 h-4" />} label="Work" value="Freelance & Independent" />
              <QuickFact icon={<Award className="w-4 h-4" />} label="Certified" value={`${LEARNING_PATH.length} verified Coursera certificates`} />
            </div>

            {/* Learning path — built from the real certificates */}
            <div className="rounded-2xl border border-dark-100 bg-white p-5 shadow-soft">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-dark-400 mb-5">
                <BadgeCheck className="w-4 h-4 text-primary" />
                Learning path
              </h3>
              <ol className="relative space-y-5 border-l-2 border-primary/15 ml-1.5">
                {LEARNING_PATH.map((c, i) => (
                  <motion.li
                    key={c.id}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.12, duration: 0.45 }}
                    className="relative pl-5"
                  >
                    <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-white" />
                    <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                      {c.date} · {c.provider}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold leading-snug text-dark-900">
                      {c.title}
                    </p>
                    <a
                      href={c.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-dark-500 hover:text-primary transition-colors"
                    >
                      Verify on Coursera
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </motion.li>
                ))}
              </ol>
            </div>
          </motion.div>

          {/* RIGHT: Bio + KeyPoints */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="border-l-4 border-primary pl-5 py-1">
              <p className="text-lg sm:text-xl text-dark-900 font-display leading-relaxed">
                {ABOUT.intro}
              </p>
            </div>

            <div className="space-y-4">
              {ABOUT.paragraphs.map((p, i) => (
                <p key={i} className="text-dark-600 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {ABOUT.keyPoints.map((kp, i) => {
                const Icon = KEY_POINT_ICONS[i] ?? Brain;
                const isSecondary = i % 2 === 1;
                return (
                  <motion.div
                    key={kp.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={cn(
                      "p-4 rounded-2xl border transition-all hover:shadow-card hover:-translate-y-1",
                      isSecondary
                        ? "bg-secondary-50 border-secondary-200 hover:border-secondary-400"
                        : "bg-primary/5 border-primary/20 hover:border-primary/50",
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
                      isSecondary ? "bg-secondary-300 text-dark-900" : "bg-primary text-white",
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-dark-900 mb-1">{kp.title}</h3>
                    <p className="text-sm text-dark-500 leading-relaxed">{kp.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="pt-4">
              <a href="#contact" className="btn-primary inline-flex">
                Let&apos;s work together
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function QuickFact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-white text-primary flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-dark-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold text-dark-900 truncate">{value}</p>
      </div>
    </div>
  );
}
