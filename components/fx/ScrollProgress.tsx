"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/* Thin saffron bar at the very top that fills as the page is read */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 inset-x-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-primary-400 via-violet-400 to-secondary-300"
    />
  );
}
