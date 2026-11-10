"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";

import AnimatedText from "@/components/ui/AnimatedText";
import { lockScroll, unlockScroll } from "@/lib/scroll";

/* -------------------------------------------------------------------------- */
/*  IntroOverlay — page intro inspired by three Jitter templates              */
/*                                                                            */
/*   • Sliding Title Reveal  → the name slides up out of a mask               */
/*   • Counter: Bold Poster  → big 0 → 100 % counter + progress bar           */
/*   • Sliding Blocks        → five columns lift away like a curtain          */
/*                                                                            */
/*  Plays once per browser session. Click / Esc skips it.                     */
/*  onReveal fires while the curtain is still lifting so the hero can start;  */
/*  onFinish fires once it has fully left the screen.                         */
/* -------------------------------------------------------------------------- */
const BLOCKS = 5;
const COUNT_SECONDS = 2;
const CURTAIN_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

interface IntroOverlayProps {
  onReveal: () => void;
  onFinish: () => void;
}

export default function IntroOverlay({ onReveal, onFinish }: IntroOverlayProps) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const exitingRef = useRef(false);

  const startExit = useCallback(() => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    setExiting(true);
  }, []);

  /* The CSS "cover" that hid the page before hydration can go now — these
     blocks are on screen. Also lock scroll while the intro plays. */
  useEffect(() => {
    document.documentElement.removeAttribute("data-intro");
    lockScroll();

    const failsafe = setTimeout(startExit, 6000);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") startExit();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      unlockScroll();
      clearTimeout(failsafe);
      window.removeEventListener("keydown", onKey);
    };
  }, [startExit]);

  /* 0 → 100 counter, then a short beat, then the curtain lifts */
  useEffect(() => {
    let beat: ReturnType<typeof setTimeout> | undefined;
    const controls = animate(0, 100, {
      duration: COUNT_SECONDS,
      ease: [0.45, 0, 0.2, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        beat = setTimeout(startExit, 300);
      },
    });
    return () => {
      controls.stop();
      clearTimeout(beat);
    };
  }, [startExit]);

  useEffect(() => {
    if (!exiting) return;
    const reveal = setTimeout(onReveal, 600);
    const finish = setTimeout(onFinish, 1500);
    return () => {
      clearTimeout(reveal);
      clearTimeout(finish);
    };
  }, [exiting, onReveal, onFinish]);

  return (
    <div
      className="fixed inset-0 z-[100] cursor-pointer select-none"
      role="presentation"
      aria-hidden="true"
      onClick={startExit}
    >
      {/* CURTAIN — five columns that lift away one after another */}
      <div className="absolute inset-0 flex items-start">
        {Array.from({ length: BLOCKS }, (_, i) => (
          <motion.div
            key={i}
            // 6px taller than the screen: the yellow lip stays hidden until the block lifts
            className="h-[calc(100%+6px)] flex-1 bg-ink-900 border-b-[6px] border-secondary-300 shadow-[1px_0_0_0_#0a0a12]"
            initial={false}
            animate={{ y: exiting ? "-100%" : "0%" }}
            transition={{
              duration: 0.9,
              ease: CURTAIN_EASE,
              delay: exiting ? i * 0.08 : 0,
            }}
          />
        ))}
      </div>

      {/* CONTENT */}
      <motion.div
        className="absolute inset-0 flex flex-col text-white bg-[radial-gradient(ellipse_at_50%_45%,rgba(99,102,241,0.28),transparent_60%)]"
        animate={exiting ? { opacity: 0, y: -40 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
      >
        {/* top bar */}
        <div className="flex items-center justify-between px-6 sm:px-10 pt-6 sm:pt-8">
          <span className="font-display font-bold tracking-tight text-lg">
            Qamar<span className="text-secondary-300">.</span>
          </span>
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
            Portfolio
          </span>
        </div>

        {/* name + role */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="font-display font-bold tracking-tight leading-none text-[2.75rem] sm:text-7xl lg:text-8xl">
            <AnimatedText
              text="Qamar Abbas"
              variant="slide"
              delay={0.25}
              stagger={0.05}
              wave={false}
            />
            {/* "Bouncy Period" */}
            <motion.span
              className="inline-block text-secondary-300"
              initial={{ y: -180, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 9, delay: 1.1 }}
            >
              .
            </motion.span>
          </div>

          <div className="mt-5 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-white/75">
            <AnimatedText
              text="AI/ML Engineer · Python Developer"
              variant="blur"
              delay={1.1}
              stagger={0.02}
              wave={false}
            />
          </div>
        </div>

        {/* counter */}
        <div className="px-6 sm:px-10 pb-8 sm:pb-10 flex items-end justify-between">
          <div className="flex items-start font-display font-bold leading-none tabular-nums">
            <span className="inline-block text-7xl sm:text-9xl tabular-nums">{count}</span>
            <span className="mt-2 sm:mt-4 ml-1 text-3xl sm:text-5xl text-secondary-300">%</span>
          </div>
          <span className="hidden sm:block pb-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
            Click to skip
          </span>
        </div>
      </motion.div>

      {/* progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1.5 bg-secondary-300"
        style={{ width: `${count}%` }}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
