"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Download,
  ArrowRight,
  Sparkles,
  MapPin,
} from "lucide-react";

import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  NAVBAR                                                                    */
/* -------------------------------------------------------------------------- */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  /* -------------------- Scroll shadow ------------------------------------ */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* -------------------- Active section via IntersectionObserver ---------- */
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* -------------------- Body scroll lock when drawer open ---------------- */
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  /* -------------------- Escape key closes drawer ------------------------- */
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  /* -------------------- Nav click handler -------------------------------- */
  const handleNavClick = useCallback((href: string) => {
    setIsMobileOpen(false);
    // Small delay so drawer close animation feels smooth on mobile
    setTimeout(() => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", href);
      }
    }, 100);
  }, []);

  /* =====================================================================
     RENDER
     ===================================================================== */
  return (
    <>
      {/* ============================ TOP BAR ============================ */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          "bg-white/95 backdrop-blur-md",
          isScrolled
            ? "shadow-soft border-b border-dark-100"
            : "border-b border-transparent",
        )}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* ------------------------ LOGO ------------------------ */}
            <Link
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
              className="flex items-center gap-2.5 group shrink-0"
              aria-label={`${SITE_CONFIG.name} — Home`}
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white font-display font-bold text-lg shadow-button group-hover:shadow-button-hover group-hover:scale-105 transition-all duration-200">
                Q
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-secondary-300 border-2 border-white" />
              </div>

              <span className="hidden sm:flex flex-col leading-tight">
                <span className="font-display font-bold text-dark-900 text-lg">
                  {SITE_CONFIG.name}
                  <span className="text-primary">.</span>
                </span>
                <span className="text-[10px] text-dark-500 font-semibold uppercase tracking-wider">
                  AI/ML · Full-Stack
                </span>
              </span>
            </Link>

            {/* ------------------- DESKTOP NAV LINKS ------------------- */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  activeSection === link.href.replace("#", "");

                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className={cn(
                        "relative px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200",
                        isActive
                          ? "text-primary"
                          : "text-dark-700 hover:text-primary",
                      )}
                    >
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="navbar-active-indicator"
                          className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-primary rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* --------------------- DESKTOP CTAs --------------------- */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href={SITE_CONFIG.resumeUrl}
                download
                className="btn-ghost text-sm"
                aria-label="Download Resume"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contact");
                }}
                className="btn-primary text-sm py-2.5"
              >
                <Sparkles className="w-4 h-4" />
                Hire Me
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* -------------------- MOBILE HAMBURGER -------------------- */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-dark-700 hover:bg-dark-100 hover:text-primary transition-colors"
              aria-label="Open menu"
              aria-expanded={isMobileOpen}
              aria-controls="mobile-drawer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </nav>
        </div>
      </motion.header>

      {/* ============================ MOBILE DRAWER ============================ */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-50 bg-dark-900/50 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.aside
              id="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm bg-white shadow-2xl lg:hidden flex flex-col overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between p-5 border-b border-dark-100 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white font-display font-bold shadow-button">
                    Q
                  </div>
                  <span className="font-display font-bold text-dark-900 text-lg">
                    {SITE_CONFIG.name}
                    <span className="text-primary">.</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-dark-700 hover:bg-dark-100 hover:text-primary transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer location strip */}
              <div className="px-5 py-3 bg-primary/5 border-b border-dark-100 flex items-center gap-2 text-xs text-dark-600 shrink-0">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span className="font-medium">{SITE_CONFIG.location}</span>
                <span className="ml-auto flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-semibold text-dark-700">Available</span>
                </span>
              </div>

              {/* Drawer links */}
              <ul className="flex flex-col p-4 gap-1 flex-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive =
                    activeSection === link.href.replace("#", "");
                  return (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(link.href);
                        }}
                        className={cn(
                          "flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-dark-700 hover:bg-dark-50 hover:text-primary",
                        )}
                      >
                        <span>{link.name}</span>
                        <ArrowRight
                          className={cn(
                            "w-4 h-4 transition-all",
                            isActive
                              ? "translate-x-0 opacity-100"
                              : "-translate-x-1 opacity-0",
                          )}
                        />
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Drawer CTAs */}
              <div className="p-5 border-t border-dark-100 space-y-3 shrink-0">
                <a
                  href={SITE_CONFIG.resumeUrl}
                  download
                  onClick={() => setIsMobileOpen(false)}
                  className="btn-secondary w-full text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#contact");
                  }}
                  className="btn-primary w-full text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  Hire Me
                </a>
                <p className="text-xs text-dark-500 text-center pt-1">
                  {SITE_CONFIG.availability}
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16 md:h-20" aria-hidden="true" />
    </>
  );
}
