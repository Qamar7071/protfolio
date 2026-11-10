"use client";

import { Fragment, useRef } from "react";
import { motion, useInView } from "framer-motion";

import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const MASK_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

/* -------------------------------------------------------------------------- */
/*  Reveal — fade + rise once, when the block scrolls into view.              */
/* -------------------------------------------------------------------------- */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "article" | "section" | "p" | "span";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/* -------------------------------------------------------------------------- */
/*  SplitText — every word slides up out of its own mask (title reveal).      */
/*  Wrap a word in *asterisks* to set it in the italic serif accent.          */
/*  Screen readers get the plain sentence once.                               */
/* -------------------------------------------------------------------------- */
type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

export function SplitText({
  text,
  as = "h2",
  className,
  wordClassName,
  accentClassName = "accent text-gradient pr-[0.08em]",
  delay = 0,
  stagger = 0.06,
  play,
  duration = 1,
}: {
  text: string;
  as?: Tag;
  className?: string;
  wordClassName?: string;
  accentClassName?: string;
  delay?: number;
  stagger?: number;
  /** control the start yourself; otherwise it plays when scrolled into view */
  play?: boolean;
  duration?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const show = play ?? inView;
  const Comp = as as React.ElementType;

  const plain = text.replace(/\*/g, "");
  const lines = text.split("\n");
  let index = 0;

  return (
    <Comp ref={ref} className={className}>
      <span className="sr-only">{plain}</span>
      <span aria-hidden="true">
        {lines.map((line, li) => (
          <span key={li} className="block">
            {line.split(" ").filter(Boolean).map((raw, wi, arr) => {
              const accent = raw.startsWith("*") && raw.endsWith("*") && raw.length > 2;
              const word = accent ? raw.slice(1, -1) : raw;
              const i = index++;
              return (
                <Fragment key={wi}>
                  <span className="inline-block overflow-hidden align-bottom pb-[0.2em] -mb-[0.2em] pt-[0.04em] -mt-[0.04em]">
                    <motion.span
                      className={cn("inline-block will-change-transform", wordClassName, accent && accentClassName)}
                      initial={{ y: "110%", rotate: 4 }}
                      animate={show ? { y: "0%", rotate: 0 } : { y: "110%", rotate: 4 }}
                      transition={{ duration, ease: MASK_EASE, delay: delay + i * stagger }}
                    >
                      {word}
                    </motion.span>
                  </span>
                  {wi < arr.length - 1 ? " " : null}
                </Fragment>
              );
            })}
          </span>
        ))}
      </span>
    </Comp>
  );
}

/* -------------------------------------------------------------------------- */
/*  LineReveal — a horizontal rule that draws itself in.                      */
/* -------------------------------------------------------------------------- */
export function LineReveal({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn("h-px bg-white/10 origin-left", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.4, ease: MASK_EASE, delay }}
    />
  );
}
