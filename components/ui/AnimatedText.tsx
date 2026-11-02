"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  AnimatedText — kinetic-typography reveal (Jitter-style)                   */
/*                                                                            */
/*  bounce → letters spring up with a little overshoot + rotation             */
/*  slide  → letters glide up out of a mask (title-reveal)                    */
/*  blur   → letters fade in from a soft blur                                 */
/*                                                                            */
/*  After the reveal, an occasional "wave" ripples through the letters        */
/*  (CSS-only, see .letter-wave in globals.css). Respects reduced motion.     */
/* -------------------------------------------------------------------------- */
type Variant = "bounce" | "slide" | "blur";

interface AnimatedTextProps {
  text: string;
  variant?: Variant;
  /** seconds before the first letter starts */
  delay?: number;
  /** seconds between letters */
  stagger?: number;
  className?: string;
  /** idle ripple through the letters after the reveal */
  wave?: boolean;
  /** colour the letters flash through during the ripple */
  waveColor?: string;
  /** hold the reveal until true (e.g. while the page intro is still playing) */
  play?: boolean;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SPRING = { type: "spring", stiffness: 320, damping: 14, mass: 0.8 } as const;

const LETTER_VARIANTS: Record<Variant, Variants> = {
  bounce: {
    hidden: { opacity: 0, y: "0.7em", rotate: 10, scale: 0.6 },
    show: {
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        y: SPRING,
        rotate: SPRING,
        scale: SPRING,
        opacity: { duration: 0.25 },
      },
    },
  },
  slide: {
    hidden: { y: "115%" },
    show: { y: 0, transition: { duration: 0.7, ease: EASE } },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)", y: 14 },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.7, ease: EASE },
    },
  },
};

export default function AnimatedText({
  text,
  variant = "bounce",
  delay = 0,
  stagger = 0.04,
  className,
  wave = true,
  waveColor = "#4854d9",
  play = true,
}: AnimatedTextProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");
  let letterIndex = 0;

  return (
    <motion.span
      className={cn("inline", className)}
      initial="hidden"
      animate={play ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      style={{ "--wave": waveColor } as React.CSSProperties}
    >
      {words.map((word, w) => (
        <Fragment key={w}>
          <span
            className={cn(
              "inline-block whitespace-nowrap",
              // mask so letters glide up from "behind" a line (room for descenders)
              variant === "slide" && "overflow-hidden align-bottom py-[0.12em] -my-[0.12em]",
            )}
          >
            {word.split("").map((ch) => {
              const i = letterIndex++;
              return (
                <motion.span
                  key={i}
                  variants={LETTER_VARIANTS[variant]}
                  className="inline-block will-change-transform"
                >
                  <span
                    className={wave ? "letter-wave" : "inline-block"}
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    {ch}
                  </span>
                </motion.span>
              );
            })}
          </span>
          {w < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  );
}
