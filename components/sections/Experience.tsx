"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Calendar,
  Download,
  GraduationCap,
  Building2,
} from "lucide-react";

import { EXPERIENCE, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  EXPERIENCE SECTION                                                        */
/* -------------------------------------------------------------------------- */
export default function Experience() {
  return (
    <section
      id="experience"
      className="section-padding bg-dark-50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
      <div className="blob w-[400px] h-[400px] bg-primary/15 top-40 -left-32" />
      <div
        className="blob w-[300px] h-[300px] bg-secondary-300/25 bottom-0 -right-24"
        style={{ animationDelay: "3s" }}
      />

      <div className="container-custom relative z-10">
        {/* ============= HEADER ============= */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="eyebrow inline-flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            My Journey
          </span>
          <h2 className="section-heading heading-underline-center mx-auto mt-2">
            Experience &{" "}
            <span className="text-gradient-primary">Education</span>
          </h2>
          <p className="section-subheading mx-auto">
            A student building his career through real projects, freelance work,
            and continuous learning.
          </p>
        </div>

        {/* ============= CURRENTLY ENROLLED BADGE ============= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="bg-gradient-to-r from-primary to-primary-700 rounded-3xl p-6 sm:p-7 text-white shadow-card-hover relative overflow-hidden">
            {/* Decorative icon */}
            <div className="absolute -top-4 -right-4 opacity-15">
              <GraduationCap className="w-32 h-32" />
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-5 relative">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
                <GraduationCap className="w-7 h-7" />
              </div>

              <div className="flex-1">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-secondary-300 text-dark-900 px-3 py-1 rounded-full mb-3 shadow-yellow">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                  Currently Enrolled
                </span>

                <h3 className="text-xl sm:text-2xl font-display font-bold mb-1">
                  Bachelor of Science in Artificial Intelligence
                </h3>
                <p className="text-white/90 text-sm mb-3">
                  Shifa Tameer-e-Millat University, Islamabad
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-white/85">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    2024 – Present
                  </span>
                  <span className="text-white/40">·</span>
                  <span className="inline-flex items-center gap-1.5 font-bold">
                    <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center text-[10px]">
                      A
                    </span>
                    Grade: A
                  </span>
                  <span className="text-white/40">·</span>
                  <span className="font-semibold">4th Semester</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============= TIMELINE ============= */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[22px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-primary/40 to-transparent" />

          {EXPERIENCE.map((exp, i) => (
            <TimelineCard key={`${exp.company}-${i}`} exp={exp} index={i} />
          ))}
        </div>

        {/* ============= BOTTOM CTA ============= */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-14"
        >
          <p className="text-sm text-dark-500 mb-4">
            Want the full details, references & project stats?
          </p>
          <a
            href={SITE_CONFIG.resumeUrl}
            download
            className="btn-outline inline-flex"
          >
            <Download className="w-4 h-4" />
            Download Full Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  TIMELINE CARD                                                             */
/* -------------------------------------------------------------------------- */
function TimelineCard({
  exp,
  index,
}: {
  exp: (typeof EXPERIENCE)[number];
  index: number;
}) {
  const isSecondary = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative pl-16 pb-10 last:pb-0"
    >
      {/* Timeline dot with pulse */}
      <div className="absolute left-[14px] top-1">
        <div className="relative">
          <div
            className={cn(
              "w-4 h-4 rounded-full ring-4 ring-dark-50 relative z-10",
              isSecondary ? "bg-secondary-300" : "bg-primary",
            )}
          />
          <div
            className={cn(
              "absolute inset-0 w-4 h-4 rounded-full animate-ping opacity-30",
              isSecondary ? "bg-secondary-300" : "bg-primary",
            )}
            style={{ animationDuration: "2.5s" }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-dark-100 shadow-soft hover:shadow-card hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 p-6 group">
        {/* Period + Location chips */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full",
              isSecondary
                ? "bg-secondary-100 text-secondary-800"
                : "bg-primary/10 text-primary",
            )}
          >
            <Calendar className="w-3 h-3" />
            {exp.period}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-dark-500 font-medium">
            <MapPin className="w-3 h-3" />
            {exp.location}
          </span>
        </div>

        {/* Role */}
        <h3 className="text-lg sm:text-xl font-display font-bold text-dark-900 mb-1 group-hover:text-primary transition-colors">
          {exp.role}
        </h3>

        {/* Company */}
        <div className="flex items-center gap-1.5 mb-4">
          <Building2 className="w-4 h-4 text-primary" />
          <p
            className={cn(
              "text-sm font-bold",
              isSecondary ? "text-secondary-700" : "text-primary",
            )}
          >
            {exp.company}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-dark-600 leading-relaxed mb-4">
          {exp.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-dark-100">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "text-xs px-2.5 py-1 rounded-lg font-semibold border transition-colors",
                isSecondary
                  ? "bg-secondary-50 border-secondary-200 text-secondary-800 hover:bg-secondary-300"
                  : "bg-primary/5 border-primary/20 text-primary-800 hover:bg-primary hover:text-white hover:border-primary",
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}