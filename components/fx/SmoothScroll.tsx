"use client";

import { useEffect } from "react";
import Lenis from "lenis";

import { setLenis } from "@/lib/scroll";

/* -------------------------------------------------------------------------- */
/*  SmoothScroll — inertia scrolling with Lenis (desktop wheel / trackpad).   */
/*  Touch scrolling stays native. Skipped entirely for reduced motion.        */
/* -------------------------------------------------------------------------- */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      wheelMultiplier: 1,
      anchors: { duration: 1.4 }, // offset comes from html scroll-padding-top
    });
    setLenis(lenis);

    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
