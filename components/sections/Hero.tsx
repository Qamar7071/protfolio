"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, FileText, Sparkle } from "lucide-react";

import { ROTATING_TITLES, SITE_CONFIG } from "@/lib/constants";
import { scrollToSection } from "@/lib/scroll";
import { useIntroDone } from "@/components/ui/IntroProvider";
import AnimatedText from "@/components/ui/AnimatedText";
import BrandLogo from "@/components/ui/BrandLogo";
import SocialLinks from "@/components/ui/SocialLinks";
import NeuralCanvas from "@/components/fx/NeuralCanvas";
import Magnetic from "@/components/fx/Magnetic";
import Scramble from "@/components/fx/Scramble";
import LocalTime from "@/components/fx/LocalTime";
import TiltCard from "@/components/fx/TiltCard";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

const MASK: [number, number, number, number] = [0.76, 0, 0.24, 1];
const OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* Tool badges floating around the portrait */
const ORBIT = [
  { name: "Python", pos: "top-[10%] -left-5 sm:-left-10", float: "0s" },
  { name: "TensorFlow", pos: "top-[42%] -right-4 sm:-right-6 xl:-right-10", float: "-2s" },
  { name: "scikit-learn", pos: "bottom-[18%] -left-6 sm:-left-12", float: "-4s" },
  { name: "OpenAI API", label: "OpenAI", pos: "-bottom-4 right-[12%]", float: "-1s" },
] as const;

/* -------------------------------------------------------------------------- */
/*  HERO                                                                      */
/* -------------------------------------------------------------------------- */
export default function Hero() {
  const intro = useIntroDone();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();

  // parallax while the hero scrolls away
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 220]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const appear = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: intro ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { duration: 1, ease: OUT, delay },
  });

  return (
    <section id="home" ref={ref} className="relative isolate min-h-[100svh] flex flex-col overflow-hidden">
      {/* ============================== BACKGROUND ============================== */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -top-[35%] left-1/2 -translate-x-1/2 w-[150vw] h-[95vh] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.30),transparent_62%)]" />
        <div className="absolute top-[18%] -left-[12%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.20),transparent_62%)] animate-aurora" />
        <div className="absolute -bottom-[15%] -right-[12%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(255,209,102,0.11),transparent_62%)] animate-aurora [animation-delay:-7s]" />
        <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_30%,transparent_100%)]" />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: intro ? 1 : 0 }}
          transition={{ duration: 2.2, delay: 0.5 }}
        >
          <NeuralCanvas className="w-full h-full" />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      {/* ============================== CONTENT ============================== */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="container-custom w-full flex-1 flex flex-col justify-center pt-24 sm:pt-28 pb-10"
      >
        {/* meta row */}
        <motion.div {...appear(0.15)} className="flex flex-wrap items-center justify-between gap-3 mb-8 lg:mb-10">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md pl-3 pr-4 py-1.5 text-xs sm:text-sm text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {SITE_CONFIG.availability}
          </span>
          <span className="hidden sm:inline-flex eyebrow">
            Islamabad, PK <span className="h-px w-6 bg-white/25" aria-hidden="true" /> <LocalTime />
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-14 lg:gap-8 items-center">
          {/* ---------- name + intro ---------- */}
          <div className="lg:col-span-7 xl:col-span-8">
            <h1 className="font-display font-bold tracking-[-0.055em] leading-[0.86] text-[clamp(4.25rem,19vw,9rem)] lg:text-[clamp(6.5rem,11vw,10.5rem)]">
              <span className="sr-only">
                {SITE_CONFIG.fullName}, {SITE_CONFIG.title}
              </span>
              <span aria-hidden="true" className="block text-white">
                <AnimatedText text="Qamar" variant="slide" play={intro} delay={0.25} stagger={0.06} wave={false} />
              </span>
              <span aria-hidden="true" className="block">
                <span className="text-outline">
                  <AnimatedText text="Abbas" variant="slide" play={intro} delay={0.45} stagger={0.06} wave={false} />
                </span>
                <motion.span
                  className="inline-block text-secondary-300"
                  initial={{ y: "-140%", opacity: 0 }}
                  animate={intro ? { y: "0%", opacity: 1 } : { y: "-140%", opacity: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 9, delay: 1.15 }}
                >
                  .
                </motion.span>
              </span>
            </h1>

            <motion.div {...appear(1)} className="mt-8 lg:mt-9 max-w-2xl">
              <p className="font-display text-xl sm:text-2xl lg:text-[1.75rem] text-white leading-snug tracking-tight">
                AI/ML Engineer <span className="accent text-gradient text-[1.15em] px-0.5">&amp;</span> Python Developer
              </p>
              <p className="mt-3 text-white/60 text-base sm:text-lg leading-relaxed max-w-[48ch]">
                {SITE_CONFIG.tagline}
              </p>
              <p className="mt-4 font-mono text-sm text-white/45" aria-live="off">
                <span className="text-primary-300">&gt;</span> focused_on:{" "}
                <Scramble words={ROTATING_TITLES} play={intro} className="text-secondary-300" />
                <span className="inline-block w-2 h-4 -mb-0.5 ml-1 bg-secondary-300/80 animate-pulse" aria-hidden="true" />
              </p>
            </motion.div>

            <motion.div {...appear(1.2)} className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Magnetic>
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#projects");
                  }}
                  className="btn-light text-base !px-7 !py-4"
                >
                  View my work
                  <ArrowDownRight className="w-5 h-5" aria-hidden="true" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={SITE_CONFIG.resumePage} className="btn-secondary text-base !px-7 !py-4">
                  <FileText className="w-5 h-5" aria-hidden="true" />
                  Resume
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* ---------- portrait ---------- */}
          <motion.div style={{ y: photoY }} className="lg:col-span-5 xl:col-span-4">
            <div className="relative mx-auto w-[min(76vw,340px)] lg:w-full lg:max-w-[390px]">
              <TiltCard max={6} className="rounded-[2rem]" data-cursor="view" data-cursor-label="Hi!">
                <motion.div
                  className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-ink-800"
                  initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                  animate={intro ? { clipPath: "inset(0% 0% 0% 0%)" } : { clipPath: "inset(100% 0% 0% 0%)" }}
                  transition={{ duration: 1.4, ease: MASK, delay: 0.55 }}
                >
                  <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.35 }}
                    animate={intro ? { scale: 1 } : { scale: 1.35 }}
                    transition={{ duration: 2, ease: OUT, delay: 0.55 }}
                  >
                    <Image
                      src="/avatar-portrait.webp"
                      alt={`${SITE_CONFIG.fullName}, ${SITE_CONFIG.title}`}
                      fill
                      priority
                      quality={90}
                      sizes="(min-width: 1024px) 390px, 76vw"
                      className="object-cover object-center"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-white/55">Currently</p>
                    <p className="mt-1 font-display font-semibold text-white text-lg leading-tight">
                      BS Artificial Intelligence
                    </p>
                    <p className="text-sm text-white/60">Shifa Tameer-e-Millat University</p>
                  </div>
                </motion.div>
              </TiltCard>

              {/* floating tool badges */}
              {ORBIT.map((o, i) => (
                <motion.div
                  key={o.name}
                  className={`absolute z-10 ${o.pos}`}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={intro ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
                  transition={{ type: "spring", stiffness: 240, damping: 16, delay: 1.5 + i * 0.12 }}
                >
                  <div className="animate-float" style={{ animationDelay: o.float }}>
                    <span className="flex items-center gap-2 rounded-2xl border border-white/15 bg-ink-900/80 backdrop-blur-md pl-1.5 pr-3 py-1.5 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.7)]">
                      <span className="grid place-items-center w-8 h-8 rounded-xl bg-white">
                        <BrandLogo name={o.name} size={20} square />
                      </span>
                      <span className="text-xs font-semibold text-white/90">{"label" in o ? o.label : o.name}</span>
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* rotating badge */}
              <motion.div
                aria-hidden="true"
                className="absolute -top-12 -right-4 sm:-right-8 xl:-right-12 z-10 w-28 h-28 sm:w-32 sm:h-32"
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={intro ? { opacity: 1, rotate: 0, scale: 1 } : { opacity: 0, rotate: -90, scale: 0.6 }}
                transition={{ duration: 1.2, ease: OUT, delay: 1.3 }}
              >
                <span className="absolute inset-0 rounded-full bg-ink-950/75 backdrop-blur-md border border-white/10" />
                <svg viewBox="0 0 120 120" className="relative w-full h-full animate-spin-slower">
                  <defs>
                    <path id="hero-badge-path" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
                  </defs>
                  <text fill="rgba(255,255,255,0.85)" style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2 }}>
                    <textPath href="#hero-badge-path" textLength="280" lengthAdjust="spacing">
                      OPEN TO WORK • AI/ML ENGINEER •
                    </textPath>
                  </text>
                </svg>
                <span className="absolute inset-0 m-auto grid place-items-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-secondary-300 text-ink-950">
                  <Sparkle className="w-5 h-5 fill-current" />
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ============================== BOTTOM ROW ============================== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: intro ? 1 : 0 }}
        transition={{ duration: 1, delay: 1.7 }}
        className="relative container-custom w-full pb-8 flex items-end justify-between gap-6"
      >
        <SocialLinks size="sm" />
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#about");
          }}
          className="hidden sm:flex absolute left-1/2 -translate-x-1/2 bottom-8 flex-col items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/50 hover:text-white transition-colors"
        >
          Scroll
          <span className="relative block w-px h-14 bg-white/15 overflow-hidden" aria-hidden="true">
            <span className="absolute inset-0 bg-secondary-300 animate-scroll-line" />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
