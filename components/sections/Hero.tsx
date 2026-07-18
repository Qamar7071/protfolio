"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles, MapPin, Star } from "lucide-react";

import { SITE_CONFIG, ROTATING_TITLES, STATS } from "@/lib/constants";
import SocialLinks from "@/components/ui/SocialLinks";
import { cn } from "@/lib/utils";

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
      // full word typed -> pause, then start deleting
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      // fully deleted -> move to next word
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      // type or delete one character
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
/*  Avatar candidates — tries each format until one loads                     */
/*  Just drop your photo in /public named avatar.png (or .jpg/.jpeg/.webp)     */
/* -------------------------------------------------------------------------- */
const AVATAR_CANDIDATES = [
  "/avatar.png",
  "/avatar_jpg.png",
  "/avatar.jpg",
  "/avatar.jpeg",
  "/avatar.webp",
];

/* -------------------------------------------------------------------------- */
/*  HERO                                                                      */
/* -------------------------------------------------------------------------- */
export default function Hero() {
  const typed = useTypewriter(ROTATING_TITLES);
  const [avatarIdx, setAvatarIdx] = useState(0);
  const avatarFailed = avatarIdx >= AVATAR_CANDIDATES.length;

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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Availability chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
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

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              <span className="block text-dark-900">Hi, I&apos;m Qamar</span>
              <span className="block text-gradient-primary mt-1">
                {SITE_CONFIG.title.split("&")[0].trim()}
              </span>
            </h1>

            {/* Typewriter role line */}
            <p className="mt-5 text-lg sm:text-xl text-dark-600 font-medium h-8">
              <span>I build as a </span>
              <span className="text-primary font-bold">{typed}</span>
              <span className="inline-block w-0.5 h-5 bg-primary ml-0.5 align-middle animate-pulse" />
            </p>

            {/* Subheading */}
            <p className="mt-4 text-base sm:text-lg text-dark-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {SITE_CONFIG.description.split(".")[0]}. Based in{" "}
              <span className="inline-flex items-center gap-1 font-semibold text-dark-700">
                <MapPin className="w-4 h-4 text-primary" />
                {SITE_CONFIG.location}
              </span>
              .
            </p>

            {/* CTAs — Apna College style (yellow accent word) */}
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

            {/* Trust indicators */}
            <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-secondary-400 text-secondary-400"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-dark-700">5.0</span>
                <span className="text-sm text-dark-400">rating</span>
              </div>
              <div className="w-px h-5 bg-dark-200" />
              <div className="text-sm">
                <span className="font-bold text-dark-900">20+</span>{" "}
                <span className="text-dark-400">happy clients</span>
              </div>
            </div>
          </motion.div>

          {/* ============================ RIGHT: SHIELD PHOTO ============================ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Shield / pentagon frame (Apna College signature shape) */}
              <div className="relative">
                {/* Blue border layer */}
                <div
                  className="relative w-[240px] h-[290px] sm:w-[290px] sm:h-[350px] lg:w-[320px] lg:h-[385px] bg-primary shadow-card-hover"
                  style={{
                    clipPath:
                      "polygon(0% 0%, 100% 0%, 100% 82%, 50% 100%, 0% 82%)",
                  }}
                >
                  {/* Inner image (inset creates the border thickness) */}
                  <div
                    className="absolute inset-[4px] bg-dark-100 overflow-hidden"
                    style={{
                      clipPath:
                        "polygon(0% 0%, 100% 0%, 100% 82%, 50% 100%, 0% 82%)",
                    }}
                  >
                    {!avatarFailed ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={AVATAR_CANDIDATES[avatarIdx]}
                        alt={`${SITE_CONFIG.fullName} — ${SITE_CONFIG.title}`}
                        className="absolute inset-0 w-full h-full object-cover object-[center_30%] scale-125"
                        onError={() => setAvatarIdx((i) => i + 1)}
                      />
                    ) : (
                      // Fallback shown when NO avatar image is found in /public
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary-200 flex flex-col items-center justify-center gap-2">
                        <span className="text-7xl font-display font-bold text-primary/50">
                          Q
                        </span>
                        <span className="text-xs font-semibold text-dark-400 px-4 text-center">
                          Add avatar.png to /public
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Floating badge: live projects */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -left-4 sm:-left-8 top-16 card-flat !p-3 flex items-center gap-2.5 bg-white shadow-card animate-float"
              >
                <span className="icon-box !w-10 !h-10">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div className="text-left">
                  <p className="text-lg font-bold text-dark-900 leading-none">
                    5+
                  </p>
                  <p className="text-xs text-dark-500">Live Projects</p>
                </div>
              </motion.div>

              {/* Floating badge: IBM certified */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.75 }}
                className="absolute -right-2 sm:-right-6 bottom-24 card-flat !p-3 flex items-center gap-2.5 bg-white shadow-card animate-float"
                style={{ animationDelay: "1.5s" }}
              >
                <span className="icon-box-yellow !w-10 !h-10">🎓</span>
                <div className="text-left">
                  <p className="text-lg font-bold text-dark-900 leading-none">
                    IBM
                  </p>
                  <p className="text-xs text-dark-500">Certified</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}