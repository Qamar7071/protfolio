"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";

import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

/* -------------------------------------------------------------------------- */
/*  TiltCard — 3D tilt towards the pointer + a soft glare that follows it.    */
/* -------------------------------------------------------------------------- */
type Props = HTMLMotionProps<"div"> & { max?: number; glare?: boolean };

const TiltCard = forwardRef<HTMLDivElement, Props>(function TiltCard(
  { children, className, max = 7, glare = true, style, onPointerMove, onPointerLeave, ...rest },
  forwarded,
) {
  const ref = useRef<HTMLDivElement>(null);
  useImperativeHandle(forwarded, () => ref.current as HTMLDivElement);
  const reduce = useReducedMotionSafe();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const gx = useMotionValue("50%");
  const gy = useMotionValue("50%");
  const glareBg = useMotionTemplate`radial-gradient(520px circle at ${gx} ${gy}, rgba(255,255,255,0.14), transparent 42%)`;

  return (
    <motion.div
      ref={ref}
      {...rest}
      onPointerMove={(e) => {
        onPointerMove?.(e);
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * max * 2);
        rx.set(-(py - 0.5) * max * 2);
        gx.set(`${px * 100}%`);
        gy.set(`${py * 100}%`);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1100, ...style }}
      className={cn("relative group/tilt", className)}
    >
      {children as React.ReactNode}
      {glare && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover/tilt:opacity-100 transition-opacity duration-500"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
});

export default TiltCard;
