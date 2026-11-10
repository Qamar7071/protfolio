"use client";

import { useEffect, useState } from "react";

/**
 * prefers-reduced-motion, read only after mount.
 * Framer's useReducedMotion() reads the media query during the first client
 * render, which can differ from the server HTML and break hydration whenever
 * a component renders different markup for reduced motion.
 */
export function useReducedMotionSafe() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduce;
}
