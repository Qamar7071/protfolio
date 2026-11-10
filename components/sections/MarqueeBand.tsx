"use client";

import { Sparkle } from "lucide-react";

import VelocityMarquee from "@/components/fx/VelocityMarquee";

const TOP = ["AI/ML Engineering", "Python Development", "Multi-agent Systems", "Deployed ML Apps"];
const BOTTOM = ["scikit-learn", "TensorFlow", "Keras", "Flask", "OpenAI API", "Pandas", "Next.js"];

/* -------------------------------------------------------------------------- */
/*  Two crossed tapes of giant text. They drift on their own and speed up /   */
/*  flip direction with the scroll.                                           */
/* -------------------------------------------------------------------------- */
export default function MarqueeBand() {
  return (
    <section aria-label="What I work on" className="relative py-12 sm:py-16 overflow-hidden">
      <div className="relative">
        <div className="relative z-10 w-[112%] -ml-[6%] -rotate-[3deg] bg-secondary-300 text-ink-950 py-4 sm:py-5 shadow-[0_20px_60px_-20px_rgba(255,209,102,0.45)]">
          <VelocityMarquee baseVelocity={-1.6}>
            <span className="flex items-center font-display font-bold uppercase tracking-[-0.03em] text-[clamp(2.25rem,6vw,5rem)] leading-none">
              {TOP.map((t) => (
                <span key={t} className="flex items-center">
                  <span className="px-6 sm:px-10">{t}</span>
                  <Sparkle className="w-7 h-7 sm:w-10 sm:h-10 fill-current" aria-hidden="true" />
                </span>
              ))}
            </span>
          </VelocityMarquee>
        </div>

        <div className="relative -mt-10 sm:-mt-14 w-[112%] -ml-[6%] rotate-[2.5deg] bg-ink-800 border-y border-white/10 py-4 sm:py-5">
          <VelocityMarquee baseVelocity={1.4}>
            <span className="flex items-center font-display font-bold uppercase tracking-[-0.03em] text-[clamp(1.75rem,4.5vw,3.75rem)] leading-none text-outline">
              {BOTTOM.map((t) => (
                <span key={t} className="flex items-center">
                  <span className="px-6 sm:px-10">{t}</span>
                  <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary-400" aria-hidden="true" />
                </span>
              ))}
            </span>
          </VelocityMarquee>
        </div>
      </div>
    </section>
  );
}
