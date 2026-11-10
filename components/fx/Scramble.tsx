"use client";

import { useEffect, useState } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01%&";

/* -------------------------------------------------------------------------- */
/*  Scramble — cycles through words with a "decoding" glitch between them.   */
/* -------------------------------------------------------------------------- */
export default function Scramble({
  words,
  interval = 2600,
  className,
  play = true,
}: {
  words: readonly string[];
  interval?: number;
  className?: string;
  play?: boolean;
}) {
  const reduce = useReducedMotionSafe();
  const [display, setDisplay] = useState<string>(words[0] ?? "");

  useEffect(() => {
    if (!play || words.length < 2) return;

    let index = 0;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;

    const decode = (from: string, to: string) => {
      const length = Math.max(from.length, to.length);
      const queue = Array.from({ length }, (_, k) => {
        const start = Math.floor(Math.random() * 18);
        return { from: from[k] ?? "", to: to[k] ?? "", start, end: start + 8 + Math.floor(Math.random() * 18) };
      });
      let frame = 0;
      const tick = () => {
        let out = "";
        let done = 0;
        for (const q of queue) {
          if (frame >= q.end) {
            done++;
            out += q.to;
          } else if (frame >= q.start) {
            out += q.to === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          } else {
            out += q.from;
          }
        }
        setDisplay(out);
        if (done === queue.length) {
          timer = setTimeout(next, interval);
          return;
        }
        frame++;
        raf = requestAnimationFrame(tick);
      };
      tick();
    };

    const next = () => {
      const from = words[index];
      index = (index + 1) % words.length;
      if (reduce) {
        setDisplay(words[index]);
        timer = setTimeout(next, interval);
      } else {
        decode(from, words[index]);
      }
    };

    timer = setTimeout(next, interval);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [words, interval, reduce, play]);

  return (
    <span className={className}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
