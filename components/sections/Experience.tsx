"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Download, MapPin } from "lucide-react";

import { EDUCATION, EXPERIENCE, SITE_CONFIG } from "@/lib/constants";
import BrandLogo from "@/components/ui/BrandLogo";
import SectionHeader from "@/components/ui/SectionHeader";
import Magnetic from "@/components/fx/Magnetic";
import { Reveal } from "@/components/fx/Reveal";

type Entry = {
  key: string;
  logo: string;
  title: string;
  org: string;
  link?: string;
  period: string;
  location: string;
  current?: boolean;
  facts?: string[];
  description: string;
  tags: readonly string[];
};

const ENTRIES: Entry[] = [
  {
    key: "education",
    logo: EDUCATION.logo,
    title: EDUCATION.degree,
    org: EDUCATION.school,
    period: EDUCATION.period,
    location: EDUCATION.location,
    current: true,
    facts: [EDUCATION.grade, EDUCATION.semester],
    description: EDUCATION.description,
    tags: EDUCATION.tags,
  },
  ...EXPERIENCE.map((e) => ({
    key: e.role,
    logo: e.logo,
    title: e.role,
    org: e.company,
    link: e.link,
    period: e.period,
    location: e.location,
    description: e.description,
    tags: e.tags,
  })),
];

const dash = (s: string) => s.replace("—", "–");

/* -------------------------------------------------------------------------- */
/*  EXPERIENCE & EDUCATION — the timeline rail draws itself as you scroll     */
/* -------------------------------------------------------------------------- */
export default function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.75", "end 0.55"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="experience" className="relative section-padding">
      <div className="container-custom">
        <SectionHeader
          index="06"
          label="Experience"
          title="Experience & *education*"
          description="Where I study, and where I've been putting it to work."
        />

        <ol ref={listRef} className="relative max-w-5xl">
          {/* rail: date column (10rem) + gap (2rem) + half a node (1.75rem) on desktop */}
          <div
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-6 sm:left-7 lg:left-[13.75rem] w-px bg-white/10"
          >
            <motion.div
              style={{ scaleY }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-secondary-300 via-violet-400 to-primary-400"
            />
          </div>

          {ENTRIES.map((entry, i) => (
            <TimelineItem key={entry.key} entry={entry} last={i === ENTRIES.length - 1} />
          ))}
        </ol>

        <Reveal className="mt-14 lg:pl-[17.5rem]">
          <Magnetic>
            <a href={SITE_CONFIG.resumeUrl} download={SITE_CONFIG.resumeFileName} className="btn-light">
              <Download className="w-4 h-4" aria-hidden="true" />
              Download full résumé
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}

function TimelineItem({ entry, last }: { entry: Entry; last: boolean }) {
  return (
    <li className={last ? "relative flex gap-4 sm:gap-8" : "relative flex gap-4 sm:gap-8 pb-10 sm:pb-14"}>
      {/* when / where (desktop) */}
      <Reveal y={20} className="hidden lg:block w-40 shrink-0 pt-3 text-right">
        <p className="font-display font-semibold text-white">{dash(entry.period)}</p>
        <p className="mt-1 text-sm text-white/45">{entry.location}</p>
      </Reveal>

      {/* node */}
      <div className="relative z-10 shrink-0">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="grid place-items-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white ring-8 ring-ink-950"
        >
          <BrandLogo name={entry.logo} size={entry.logo === "STMU" ? 40 : 28} square />
        </motion.div>
      </div>

      {/* card */}
      <Reveal className="flex-1 min-w-0">
        <article className="spotlight card-dark p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">{entry.title}</h3>
            {entry.current && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                Currently enrolled
              </span>
            )}
          </div>

          {entry.link ? (
            <a
              href={entry.link}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-1 font-semibold text-secondary-300"
            >
              {entry.org}
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          ) : (
            <p className="mt-1 font-semibold text-secondary-300">{entry.org}</p>
          )}

          <p className="lg:hidden mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/45">
            <span>{dash(entry.period)}</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              {entry.location}
            </span>
          </p>

          {entry.facts && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {entry.facts.map((f) => (
                <li key={f} className="chip-accent">
                  {f}
                </li>
              ))}
            </ul>
          )}

          <p className="mt-5 text-white/60 leading-relaxed max-w-[68ch]">{entry.description}</p>

          <ul className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-2">
            {entry.tags.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        </article>
      </Reveal>
    </li>
  );
}
