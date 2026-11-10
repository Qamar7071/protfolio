"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Cursor — dot + trailing ring (mouse / trackpad only).                     */
/*                                                                            */
/*  • links & buttons     → ring grows into an inverting disc                 */
/*  • [data-cursor="view"] → big saffron disc with a label                    */
/*    (label from data-cursor-label, default "View")                          */
/*  • form fields          → custom cursor hides, native text cursor shows    */
/*                                                                            */
/*  It also feeds --mx / --my to any .spotlight card under the pointer.       */
/* -------------------------------------------------------------------------- */
type Mode = "default" | "hover" | "view" | "text" | "hidden";

const RING: Variants = {
  default: { width: 38, height: 38, opacity: 1, backgroundColor: "rgba(255,255,255,0)", borderColor: "rgba(255,255,255,0.55)" },
  hover: { width: 64, height: 64, opacity: 1, backgroundColor: "rgba(255,255,255,1)", borderColor: "rgba(255,255,255,1)" },
  view: { width: 104, height: 104, opacity: 1, backgroundColor: "rgba(255,209,102,1)", borderColor: "rgba(255,209,102,1)" },
  text: { width: 38, height: 38, opacity: 0, backgroundColor: "rgba(255,255,255,0)", borderColor: "rgba(255,255,255,0)" },
  hidden: { width: 38, height: 38, opacity: 0, backgroundColor: "rgba(255,255,255,0)", borderColor: "rgba(255,255,255,0)" },
};

const INTERACTIVE = "[data-cursor], a, button, [role='button'], summary, label, input, textarea, select";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("hidden");
  const [label, setLabel] = useState("View");
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, { stiffness: 420, damping: 36, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 420, damping: 36, mass: 0.55 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    setEnabled(true);
    const root = document.documentElement;
    root.classList.add("has-cursor");

    let seen = false;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      if (!seen) {
        seen = true;
        setMode("default");
      }

      const spot = (e.target as Element | null)?.closest?.<HTMLElement>(".spotlight");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    };

    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>(INTERACTIVE);
      if (!el) return setMode("default");
      const kind = el.dataset.cursor;
      if (kind === "view") {
        setLabel(el.dataset.cursorLabel || "View");
        return setMode("view");
      }
      if (el.matches("input, textarea, select")) return setMode("text");
      setMode("hover");
    };

    const onLeave = () => setMode("hidden");
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  const showDot = mode === "default";

  return (
    <>
      {/* trailing ring — the layer itself blends so the disc inverts the page under it */}
      <div
        aria-hidden="true"
        className={
          "cursor-layer pointer-events-none fixed inset-0 z-[9999] " +
          (mode === "hover" ? "mix-blend-difference" : "")
        }
      >
        <motion.div className="absolute left-0 top-0" style={{ x: ringX, y: ringY }}>
          <motion.div
            variants={RING}
            initial="hidden"
            animate={mode}
            transition={{ type: "spring", stiffness: 300, damping: 26, mass: 0.6 }}
            style={{ x: "-50%", y: "-50%", scale: pressed ? 0.85 : 1 }}
            className="absolute rounded-full border flex items-center justify-center"
          >
            {mode === "view" && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[13px] font-bold uppercase tracking-[0.14em] text-ink-950"
              >
                {label}
              </motion.span>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* precise dot */}
      <div aria-hidden="true" className="cursor-layer pointer-events-none fixed inset-0 z-[10000]">
        <motion.div className="absolute left-0 top-0" style={{ x, y }}>
          <motion.div
            animate={{ scale: showDot ? 1 : 0, opacity: showDot ? 1 : 0 }}
            transition={{ duration: 0.18 }}
            style={{ x: "-50%", y: "-50%" }}
            className="absolute w-1.5 h-1.5 rounded-full bg-secondary-300"
          />
        </motion.div>
      </div>
    </>
  );
}
