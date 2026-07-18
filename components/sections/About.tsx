"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";

import { ABOUT, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const KEY_POINT_ICONS = [Brain, Server, Code2, Rocket];
const AVATAR_CANDIDATES = ["/avatar.png", "/avatar_jpg.png"];

export default function About() {
  const [avatarIdx, setAvatarIdx] = useState(0);
  const [avatarFailed, setAvatarFailed] = useState(false);

  useEffect(() => {
    setAvatarIdx(0);
    setAvatarFailed(false);
  }, []);

  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-fade pointer-events-none" />
      <div className="blob w-[400px] h-[400px] bg-primary/10 top-40 -right-32" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="eyebrow inline-flex items-center gap-2">
            <User className="w-4 h-4" />
            About Me
          </span>
          <h2 className="section-heading heading-underline-center mx-auto mt-2">
            Get to <span className="text-gradient-primary">know me</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14 max-w-6xl mx-auto items-start">
          {/* LEFT: Photo + Quick facts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary-300/30 relative shadow-card">
                {!avatarFailed ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={AVATAR_CANDIDATES[avatarIdx]}
                    alt="Qamar Abbas"
                    className="w-full h-full object-cover"
                    onError={() => {
                      if (avatarIdx < AVATAR_CANDIDATES.length - 1) {
                        setAvatarIdx((i) => i + 1);
                      } else {
                        setAvatarFailed(true);
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-6xl font-display font-bold text-primary/40">
                      QA
                    </div>
                  </div>
                )}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur shadow-lg">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  <span className="text-xs font-bold text-dark-800">Available</span>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-secondary-300 rounded-3xl -z-10" />
              <div className="absolute -top-3 -left-3 w-16 h-16 bg-primary/30 rounded-2xl -z-10" />
            </div>

            <div className="bg-dark-50 rounded-2xl p-5 space-y-3">
              <QuickFact icon={<GraduationCap className="w-4 h-4" />} label="Education" value="BS AI · Grade A" />
              <QuickFact icon={<MapPin className="w-4 h-4" />} label="Location" value={SITE_CONFIG.location} />
              <QuickFact icon={<Briefcase className="w-4 h-4" />} label="Work" value="Freelance & Independent" />
              <QuickFact icon={<Award className="w-4 h-4" />} label="Certified" value="IBM Deep Learning" />
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
