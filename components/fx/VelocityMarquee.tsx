"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/* -------------------------------------------------------------------------- */
/*  VelocityMarquee — endless text band that speeds up while you scroll and   */
/*  flips direction with the scroll direction.                                */
/* -------------------------------------------------------------------------- */
export default function VelocityMarquee({
  children,
  baseVelocity = -2,
  className,
}: {
  children: React.ReactNode;
  /** % of one copy per second; negative = right → left */
  baseVelocity?: number;
  className?: string;
}) {
  const reduce = useReducedMotionSafe();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    moveBy += direction.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div className="flex flex-nowrap whitespace-nowrap will-change-transform" style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} aria-hidden={i > 0 ? true : undefined} className={cn("block shrink-0", className)}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
