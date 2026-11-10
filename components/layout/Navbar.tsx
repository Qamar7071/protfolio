"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { NAV_LINKS, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { lockScroll, scrollToSection, unlockScroll } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import Magnetic from "@/components/fx/Magnetic";
import LocalTime from "@/components/fx/LocalTime";

const LINKS = NAV_LINKS.filter((l) => l.href !== "#home");
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

/* -------------------------------------------------------------------------- */
/*  NAVBAR — floating glass pill that hides while you scroll down and comes   */
/*  back when you scroll up; full-screen menu on smaller screens.             */
/* -------------------------------------------------------------------------- */
export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 240 && y > prev + 2);
    if (y < prev - 2) setHidden(false);
  });

  /* active section */
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(
      (el): el is HTMLElement => el !== null,
    );
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* menu: lock scroll + Esc */
  useEffect(() => {
    if (!open) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (href: string) => {
    if (open) {
      setOpen(false);
      setTimeout(() => scrollToSection(href), 450);
    } else {
      scrollToSection(href);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden && !open ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed top-0 inset-x-0 z-[60]"
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between gap-4 h-20 md:h-24">
            {/* LOGO */}
            <Magnetic strength={0.25}>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  go("#home");
                }}
                className="group flex items-center gap-3 font-display font-bold text-xl tracking-tight text-white"
                aria-label={`${SITE_CONFIG.fullName}, back to top`}
              >
                <span className="relative grid place-items-center w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md overflow-hidden">
                  <span className="transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:-translate-y-10">Q</span>
                  <span className="absolute translate-y-10 text-secondary-300 transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:translate-y-0">A</span>
                </span>
                <span className="hidden sm:inline">
                  {SITE_CONFIG.name}
                  <span className="text-secondary-300">.</span>
                </span>
              </a>
            </Magnetic>

            {/* DESKTOP PILL */}
            <ul
              className={cn(
                "hidden lg:flex items-center gap-1 rounded-full border px-2 py-1.5 transition-colors duration-500",
                scrolled
                  ? "border-white/10 bg-ink-900/70 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]"
                  : "border-white/[0.06] bg-white/[0.03] backdrop-blur-md",
              )}
            >
              {LINKS.map((link) => {
                const on = active === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        go(link.href);
                      }}
                      aria-current={on ? "true" : undefined}
                      className={cn(
                        "relative block px-3.5 py-2 text-[13px] font-medium rounded-full transition-colors duration-300",
                        on ? "text-ink-950" : "text-white/65 hover:text-white",
                      )}
                    >
                      {on && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-white"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{link.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-2">
              <Magnetic className="hidden md:inline-block">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    go("#contact");
                  }}
                  className="btn-light !py-2.5 !px-5 text-sm"
                >
                  Let&apos;s talk
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </Magnetic>

              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="lg:hidden relative z-[60] grid place-items-center w-12 h-12 rounded-full border border-white/15 bg-ink-900/70 backdrop-blur-md"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="site-menu"
              >
                <span className="relative block w-5 h-3">
                  <span
                    className={cn(
                      "absolute left-0 w-5 h-[1.5px] bg-white transition-all duration-500 ease-[cubic-bezier(.76,0,.24,1)]",
                      open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 w-5 h-[1.5px] bg-white transition-all duration-500 ease-[cubic-bezier(.76,0,.24,1)]",
                      open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
                    )}
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* FULL-SCREEN MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-lenis-prevent
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 3rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:hidden fixed inset-0 z-[55] bg-ink-900 overflow-y-auto"
          >
            <div aria-hidden="true" className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.35),transparent_65%)]" />
            <div className="container-custom relative min-h-full flex flex-col pt-28 pb-10">
              <p className="eyebrow mb-6">Menu</p>
              <ul className="flex-1">
                {NAV_LINKS.map((link, i) => (
                  <li key={link.href} className="overflow-hidden border-b border-white/10">
                    <motion.a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        go(link.href);
                      }}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.05 }}
                      className={cn(
                        "group flex items-baseline gap-4 py-3 font-display font-bold tracking-[-0.03em] text-[2.1rem] sm:text-5xl leading-none",
                        active === link.href.slice(1) ? "text-secondary-300" : "text-white",
                      )}
                    >
                      <span className="text-xs font-medium tracking-normal text-white/40 w-6">0{i + 1}</span>
                      <span className="transition-transform duration-500 group-hover:translate-x-3">{link.name}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-10 grid grid-cols-2 gap-6 text-sm"
              >
                <div>
                  <p className="text-white/40 mb-2">Say hello</p>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="block text-white break-all">
                    {SITE_CONFIG.email}
                  </a>
                  <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="block text-white mt-1">
                    {SITE_CONFIG.phoneDisplay}
                  </a>
                </div>
                <div>
                  <p className="text-white/40 mb-2">Islamabad</p>
                  <LocalTime className="text-white" />
                  <a href={SITE_CONFIG.resumePage} className="mt-1 flex items-center gap-1 text-secondary-300">
                    Resume <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
