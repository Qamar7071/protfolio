import type Lenis from "lenis";

/* =========================================================
   Scroll helpers shared by the smooth-scroll engine (Lenis),
   the navbar, modals and the intro.
   Everything falls back to native scrolling when Lenis is not
   running (reduced motion, other pages).
   ========================================================= */

let lenis: Lenis | null = null;
let locks = 0;

/** Called by <SmoothScroll /> when Lenis starts / stops. */
export function setLenis(instance: Lenis | null) {
  lenis = instance;
  if (locks > 0) {
    if (instance) {
      document.documentElement.style.overflow = "";
      instance.stop();
    } else {
      document.documentElement.style.overflow = "hidden";
    }
  }
}

export function getLenis() {
  return lenis;
}

/** Freeze page scrolling (modals, menu, intro). Calls are counted. */
export function lockScroll() {
  locks += 1;
  if (locks > 1) return;
  if (lenis) lenis.stop();
  else document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
  if (locks === 0) return;
  locks -= 1;
  if (locks > 0) return;
  if (lenis) lenis.start();
  document.documentElement.style.overflow = "";
}

/** Smooth-scroll to "#section" (or "section") and update the URL hash. */
export function scrollToSection(href: string) {
  const id = href.replace(/^#/, "");
  const el = document.getElementById(id);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(id === "home" ? 0 : el, { duration: 1.4 }); // html scroll-padding-top leaves room for the navbar
  } else {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }
  window.history.replaceState(null, "", `#${id}`);
}
