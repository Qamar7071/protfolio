"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Brain,
  Server,
  Layout,
  Database,
  Sparkles,
  Zap,
  TrendingUp,
} from "lucide-react";

import { SKILL_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Icon map                                                                  */
/* -------------------------------------------------------------------------- */
const ICON_MAP = {
  Brain,
  Server,
  Layout,
  Database,
} as const;

type IconName = keyof typeof ICON_MAP;

/* -------------------------------------------------------------------------- */
/*  Animated counter — counts from 0 to target when in view                   */
/* -------------------------------------------------------------------------- */
function useCountUp(target: number, inView: boolean, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(target * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, inView, duration]);

  return value;
}

/* -------------------------------------------------------------------------- */
/*  SKILLS SECTION                                                            */
/* -------------------------------------------------------------------------- */
export default function Skills() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Total skills across all categories
  const totalSkills = SKILL_CATEGORIES.reduce(
    (acc, c) => acc + c.skills.length,
    0,
  );
  const totalCategories = SKILL_CATEGORIES.length;

  const animatedTotal = useCountUp(totalSkills, inView);
  const animatedCategories = useCountUp(totalCategories, inView);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding bg-dark-50 relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
      <div className="blob w-[400px] h-[400px] bg-primary/15 top-40 -left-32" />
      <div
        className="blob w-[350px] h-[350px] bg-secondary-300/25 bottom-0 -right-24"
        style={{ animationDelay: "3s" }}
      />

      <div className="container-custom relative z-10">
        {/* ============== HEADER ============== */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="eyebrow inline-flex items-center gap-2">
            <Zap className="w-4 h-4" />
            My Toolkit
          </span>
          <h2 className="section-heading heading-underline-center mx-auto mt-2">
            Skills that <span className="text-gradient-primary">ship products</span>
          </h2>
          <p className="section-subheading mx-auto">
            A carefully curated stack across AI/ML, backend, frontend, and DevOps —
            each tool chosen for reliability and real-world results.
          </p>
        </div>

        {/* ============== CATEGORY CARDS GRID ============== */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {SKILL_CATEGORIES.map((cat, i) => (
            <SkillCategoryCard key={cat.title} category={cat} index={i} />
          ))}
        </div>

        {/* ============== BOTTOM STATS STRIP ============== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl border border-dark-100 shadow-soft overflow-hidden"
        >
          <div className="grid grid-cols-3 divide-x divide-dark-100">
            {/* Total skills */}
            <div className="p-6 sm:p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-display font-black text-dark-900">
                {animatedTotal}+
              </div>
              <p className="text-xs sm:text-sm text-dark-500 font-semibold mt-1">
                Technologies
              </p>
            </div>

            {/* Categories */}
            <div className="p-6 sm:p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary-100 text-secondary-700 mb-3">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-display font-black text-dark-900">
                {animatedCategories}
              </div>
              <p className="text-xs sm:text-sm text-dark-500 font-semibold mt-1">
                Domains
              </p>
            </div>

            {/* Always learning */}
            <div className="p-6 sm:p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
                <Brain className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-display font-black text-dark-900">
                24/7
              </div>
              <p className="text-xs sm:text-sm text-dark-500 font-semibold mt-1">
                Learning mode
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  SKILL CATEGORY CARD                                                       */
/* -------------------------------------------------------------------------- */
function SkillCategoryCard({
  category,
  index,
}: {
  category: (typeof SKILL_CATEGORIES)[number];
  index: number;
}) {
  const Icon = ICON_MAP[category.icon as IconName] ?? Sparkles;
  // Alternate primary/secondary accent for visual rhythm
  const isSecondary = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group relative bg-white rounded-3xl border border-dark-100 p-6 sm:p-8",
        "shadow-soft hover:shadow-card-hover hover:-translate-y-2",
        "hover:border-primary/30 transition-all duration-400 overflow-hidden",
      )}
    >
      {/* Dots pattern on hover */}
      <div className="absolute inset-0 bg-dots opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />

      {/* Corner glow on hover */}
      <div
        className={cn(
          "absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
          isSecondary ? "bg-secondary-300/40" : "bg-primary/25",
        )}
      />

      <div className="relative">
        {/* Header row */}
        <div className="flex items-start justify-between mb-6">
          {/* Icon */}
          <div
            className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center",
              "transition-all duration-400",
              isSecondary
                ? "bg-secondary-100 text-secondary-700 group-hover:bg-secondary-300 group-hover:text-dark-900"
                : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white",
              "group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg",
            )}
          >
            <Icon className="w-8 h-8" />
          </div>

          {/* Skill count badge */}
          <div className="text-right">
            <div
              className={cn(
                "text-4xl sm:text-5xl font-display font-black leading-none",
                isSecondary ? "text-secondary-700" : "text-primary",
              )}
            >
              {category.skills.length}
            </div>
            <p className="text-xs font-bold text-dark-400 uppercase tracking-wider mt-1">
              tools
            </p>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-display font-bold text-dark-900 mb-1">
          {category.title}
        </h3>
        <p className="text-sm text-dark-500 mb-6">
          Skills I use daily in this domain
        </p>

        {/* Skill chips with staggered reveal */}
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1 + i * 0.04,
                duration: 0.35,
                type: "spring",
                stiffness: 200,
              }}
              className={cn(
                "inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold",
                "border transition-all duration-200 cursor-default",
                isSecondary
                  ? "bg-secondary-50 border-secondary-200 text-secondary-800 hover:bg-secondary-300 hover:border-secondary-400"
                  : "bg-primary/5 border-primary/20 text-primary-800 hover:bg-primary hover:text-white hover:border-primary",
              )}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
