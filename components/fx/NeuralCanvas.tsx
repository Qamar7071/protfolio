"use client";

import { useEffect, useRef } from "react";

/* -------------------------------------------------------------------------- */
/*  NeuralCanvas — a drifting "neural network": nodes link up when they come  */
/*  close, and the mouse acts like an extra neuron that pushes nodes aside    */
/*  and wires itself to the ones nearby.                                      */
/*                                                                            */
/*  Pauses when off screen or when the tab is hidden; draws a single still    */
/*  frame for people who prefer reduced motion.                               */
/* -------------------------------------------------------------------------- */
type Node = { x: number; y: number; vx: number; vy: number; r: number; c: number };

const COLORS = ["129,137,248", "167,139,250", "255,209,102"]; // indigo, violet, saffron
const LINK = 135;
const MOUSE_LINK = 190;

export default function NeuralCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // phones fire resize when the URL bar slides: keep the nodes if only the height moved
      const sameWidth = nodes.length > 0 && Math.abs(rect.width - w) < 2;
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (sameWidth) return;

      const count = Math.round(Math.min(120, Math.max(34, (w * h) / 13000)));
      nodes = Array.from({ length: count }, () => {
        const roll = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32,
          r: Math.random() * 1.5 + 0.7,
          c: roll < 0.07 ? 2 : roll < 0.55 ? 0 : 1,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        if (!reduce) {
          // mouse pushes nodes gently aside
          if (mouse.active) {
            const dx = n.x - mouse.x;
            const dy = n.y - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 120 * 120 && d2 > 0.01) {
              const d = Math.sqrt(d2);
              const f = (1 - d / 120) * 0.6;
              n.x += (dx / d) * f;
              n.y += (dy / d) * f;
            }
          }
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = w + 20;
          else if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          else if (n.y > h + 20) n.y = -20;
        }
      }

      // links between nodes
      ctx.lineWidth = 0.7;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const alpha = (1 - Math.sqrt(d2) / LINK) * 0.32;
            ctx.strokeStyle = `rgba(129,137,248,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // the mouse "neuron"
      if (mouse.active) {
        ctx.lineWidth = 0.9;
        for (const n of nodes) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_LINK * MOUSE_LINK) {
            const alpha = (1 - Math.sqrt(d2) / MOUSE_LINK) * 0.55;
            ctx.strokeStyle = `rgba(255,209,102,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${COLORS[n.c]},0.9)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resize();

    if (reduce) {
      draw();
      const onResize = () => {
        resize();
        draw();
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    let raf = 0;
    let running = false;
    let onScreen = true;

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || !onScreen || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.y >= 0 && mouse.y <= rect.height;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    start();

    return () => {
      stop();
      io.disconnect();
      clearTimeout(resizeTimer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
