"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin, Award, GraduationCap, Clock } from "lucide-react";

import { SITE_CONFIG, ROTATING_TITLES } from "@/lib/constants";
import SocialLinks from "@/components/ui/SocialLinks";
import AnimatedText from "@/components/ui/AnimatedText";
import { useIntroDone } from "@/components/ui/IntroProvider";

/* -------------------------------------------------------------------------- */
/*  Typewriter hook — cycles through ROTATING_TITLES                          */
/* -------------------------------------------------------------------------- */
function useTypewriter(words: readonly string[], speed = 90, pause = 1600) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];

    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting
              ? current.slice(0, prev.length - 1)
              : current.slice(0, prev.length + 1),
          );
        },
        deleting ? speed / 2 : speed,
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, speed, pause]);

  return text;
}

/* -------------------------------------------------------------------------- */
/*  HERO                                                                      */
/* -------------------------------------------------------------------------- */
export default function Hero() {
  const typed = useTypewriter(ROTATING_TITLES);
  // hero waits for the page intro (true straight away when the intro is skipped)
  const intro = useIntroDone();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-radial-fade pointer-events-none" />
      <div className="absolute inset-0 bg-dots bg-dots-md opacity-40 pointer-events-none" />
      <div className="blob w-[420px] h-[420px] bg-primary/20 -top-32 -left-32" />
      <div
        className="blob w-[360px] h-[360px] bg-secondary-300/30 top-40 -right-24"
        style={{ animationDelay: "3s" }}
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-5rem)] py-12 lg:py-0">
          {/* ============================ LEFT: TEXT ============================ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={intro ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Availability chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={intro ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <span className="text-sm font-semibold text-primary">
                {SITE_CONFIG.availability}
              </span>
            </motion.div>

            {/* Headline — kinetic text reveal (screen readers get the plain text) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              <span className="sr-only">
                Hi, I&apos;m Qamar — AI/ML Engineer | Python Developer
              </span>
              <span aria-hidden="true" className="block text-dark-900">
                <AnimatedText
                  text="Hi, I'm Qamar"
                  variant="bounce"
                  play={intro}
                  delay={0.25}
                  waveColor="#4854d9"
                />
              </span>
              <span aria-hidden="true" className="block text-primary mt-2">
                <AnimatedText
                  text="AI/ML Engineer"
                  variant="slide"
                  play={intro}
                  delay={0.85}
                  stagger={0.045}
                  waveColor="#8189f8"
                />
              </span>
              <span
                aria-hidden="true"
                className="block text-dark-700 text-3xl sm:text-4xl lg:text-5xl mt-1"
              >
                <AnimatedText
                  text="| Python Developer"
                  variant="blur"
                  play={intro}
                  delay={1.55}
                  stagger={0.03}
                  wave={false}
                />
              </span>
            </h1>

            {/* Specific tagline */}
            <p className="mt-5 text-lg sm:text-xl text-dark-700 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              I build, evaluate, and deploy practical machine-learning applications.
            </p>

            {/* Typewriter role line */}
            <p className="mt-4 text-base sm:text-lg text-dark-500 font-medium h-7">
              <span>Also known as a </span>
              <span className="text-primary font-bold">{typed}</span>
              <span className="inline-block w-0.5 h-5 bg-primary ml-0.5 align-middle animate-pulse" />
            </p>

            {/* Location + availability line */}
            <p className="mt-4 text-sm sm:text-base text-dark-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Based in{" "}
              <span className="inline-flex items-center gap-1 font-semibold text-dark-700">
                <MapPin className="w-4 h-4 text-primary" />
                {SITE_CONFIG.location}
              </span>
              , open to remote freelance projects and internships worldwide.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => scrollTo("projects")}
                className="btn-primary text-base px-7 py-3.5"
              >
                <span className="text-secondary-300">Explore</span> My Projects
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href={SITE_CONFIG.resumeUrl}
                download
                className="btn-secondary text-base px-7 py-3.5"
              >
                <Download className="w-5 h-5" />
                Resume
              </a>
            </div>

            {/* Social links */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <span className="text-sm font-semibold text-dark-400 uppercase tracking-wider">
                Connect
              </span>
              <SocialLinks />
            </div>

            {/* Trust indicators — honest credentials */}
            <div className="mt-8 flex flex-wrap items-center gap-2 justify-center lg:justify-start">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-dark-200 shadow-soft">
                <Award className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold text-dark-700">IBM Certified</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-dark-200 shadow-soft">
                <GraduationCap className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold text-dark-700">BS AI · Shifa University</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-dark-200 shadow-soft">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold text-dark-700">24hr Response</span>
              </div>
            </div>
          </motion.div>

          {/* ============================ RIGHT: PHOTO ============================ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={intro ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Soft glow behind the photo */}
              <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-primary/30 via-transparent to-secondary-300/40 blur-3xl pointer-events-none" />

              <div className="relative w-[260px] h-[260px] sm:w-[330px] sm:h-[330px] lg:w-[410px] lg:h-[410px]">
                {/* Slowly turning gradient ring */}
                <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#4854d9,#ffd166,#4854d9)] animate-spin-slow shadow-card-hover" />

                <div className="absolute inset-[5px] rounded-full bg-white p-[5px]">
                  <div className="relative h-full w-full rounded-full overflow-hidden bg-dark-100">
                    {/* Photo settles in: slight zoom + blur → sharp */}
                    <motion.div
                      initial={{ opacity: 0, scale: 1.12, filter: "blur(14px)" }}
                      animate={
                        intro
                          ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                          : { opacity: 0, scale: 1.12, filter: "blur(14px)" }
                      }
                      transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src="/avatar-full.webp"
                        alt={`${SITE_CONFIG.fullName} — ${SITE_CONFIG.title}`}
                        fill
                        priority
                        quality={95}
                        sizes="(min-width: 1024px) 410px, (min-width: 640px) 330px, 260px"
                        className="object-cover"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}