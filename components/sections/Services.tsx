"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { ArrowUpRight, Check, Plus } from "lucide-react";

import { PROJECTS, SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import BrandLogo from "@/components/ui/BrandLogo";
import SectionHeader from "@/components/ui/SectionHeader";
import Magnetic from "@/components/fx/Magnetic";
import { Reveal } from "@/components/fx/Reveal";

type Service = (typeof SERVICES)[number];
type Project = (typeof PROJECTS)[number];

const related = (s: Service) => PROJECTS.find((p) => p.id === s.relatedProject);
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

/* -------------------------------------------------------------------------- */
/*  SERVICES — big rows that fill with colour on hover, open for details,    */
/*  and show a preview of related work that follows the mouse.                */
/* -------------------------------------------------------------------------- */
export default function Services() {
  const [open, setOpen] = useState<number | null>(0);
  const [hovered, setHovered] = useState<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.5 });
  const rotate = useTransform(useVelocity(sx), [-1600, 1600], [-14, 14], { clamp: true });

  const preview = hovered !== null && hovered !== open ? related(SERVICES[hovered]) : undefined;

  return (
    <section id="services" className="relative section-padding">
      <div className="container-custom">
        <SectionHeader
          index="05"
          label="Services"
          title="What I *offer*"
          description="Four kinds of work I take on. Each one ends with something you can open and use, not just a report."
        />

        <ul
          className="border-t border-white/10"
          onPointerMove={(e) => {
            if (e.pointerType !== "mouse") return;
            x.set(e.clientX);
            y.set(e.clientY);
          }}
          onPointerLeave={() => setHovered(null)}
        >
          {SERVICES.map((s, i) => (
            <ServiceRow
              key={s.id}
              service={s}
              open={open === i}
              onToggle={() => setOpen((o) => (o === i ? null : i))}
              onHover={(e) => {
                if (e.pointerType === "mouse") {
                  x.set(e.clientX);
                  y.set(e.clientY);
                  // first hover: start the preview at the pointer instead of flying in
                  if (hovered === null) {
                    sx.jump(e.clientX);
                    sy.jump(e.clientY);
                  }
                }
                setHovered(i);
              }}
            />
          ))}
        </ul>

        <Reveal className="mt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-3xl border border-dashed border-white/15 px-6 sm:px-8 py-6">
          <p className="text-white/60">
            <span className="font-semibold text-white">Not sure which one fits?</span> Book a free 30-minute call and
            we&apos;ll scope it together.
          </p>
          <Magnetic>
            <a href="#contact" className="btn-light shrink-0">
              Book a call
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </Magnetic>
        </Reveal>
      </div>

      {/* floating preview of related work (mouse only) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
        style={{ x: sx, y: sy, rotate }}
      >
        <AnimatePresence>
          {preview && (
            <motion.div
              key={preview.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ x: "-50%", y: "-50%" }}
              className="absolute w-72 aspect-project rounded-2xl overflow-hidden border border-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
            >
              <PreviewImage project={preview} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function ServiceRow({
  service,
  open,
  onToggle,
  onHover,
}: {
  service: Service;
  open: boolean;
  onToggle: () => void;
  onHover: (e: React.PointerEvent) => void;
}) {
  const project = related(service);
  const panelId = `service-panel-${service.id}`;
  const buttonId = `service-button-${service.id}`;

  return (
    <li className="border-b border-white/10">
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          onPointerEnter={onHover}
          aria-expanded={open}
          aria-controls={panelId}
          className="group relative w-full overflow-hidden text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-secondary-300/40"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-secondary-300 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:scale-y-100"
          />
          <span className="relative flex items-center gap-4 sm:gap-8 py-7 sm:py-9 px-1 sm:px-4 text-white transition-colors duration-300 group-hover:text-ink-950">
            <span className="font-display text-sm sm:text-base text-white/40 group-hover:text-ink-950/60 tabular-nums w-7 sm:w-10 shrink-0 transition-colors">
              {service.number}
            </span>
            <span className="flex-1 min-w-0 font-display font-bold tracking-[-0.035em] text-[clamp(1.6rem,4.6vw,3.75rem)] leading-[1.02] transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:translate-x-2 sm:group-hover:translate-x-4">
              {service.title}
            </span>
            <span className="hidden md:block text-sm text-white/50 group-hover:text-ink-950/70 max-w-[20ch] text-right transition-colors">
              {service.tagline}
            </span>
            <span
              className={cn(
                "grid place-items-center w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-white/20 group-hover:border-ink-950/30 shrink-0 transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)]",
                open && "rotate-45 bg-white text-ink-950 border-white",
              )}
            >
              <Plus className="w-5 h-5" aria-hidden="true" />
            </span>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 pt-2 pb-12 px-1 sm:px-4 sm:pl-[4.5rem]">
              <div className="lg:col-span-4">
                <p className="text-lg text-white/75 leading-relaxed">{service.description}</p>
                <p className="mt-5 text-sm text-white/45">
                  <span className="text-white/70">Good fit for:</span> {service.idealFor}
                </p>
              </div>

              <div className="lg:col-span-4">
                <h4 className="eyebrow mb-4">What&apos;s included</h4>
                <ul className="space-y-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-white/75">
                      <span className="mt-0.5 grid place-items-center w-5 h-5 rounded-full bg-secondary-300 text-ink-950 shrink-0">
                        <Check className="w-3 h-3" strokeWidth={3.5} aria-hidden="true" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <h4 className="eyebrow mt-8 mb-3">{service.toolsLabel}</h4>
                <ul className="flex flex-wrap gap-2">
                  {service.tools.map((t) => (
                    <li key={t} className="chip !py-1.5">
                      <span className="grid place-items-center w-5 h-5 rounded-full bg-white">
                        <BrandLogo name={t} size={12} square />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {project && (
                <div className="lg:col-span-4">
                  <RelatedWork project={project} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function PreviewImage({ project, className }: { project: Project; className?: string }) {
  const contain = "imageFit" in project && project.imageFit === "contain";
  return (
    <img
      src={project.image}
      alt=""
      loading="lazy"
      className={cn("w-full h-full", contain ? "object-contain bg-[#0a1e3a]" : "object-cover object-top", className)}
    />
  );
}

function RelatedWork({ project }: { project: Project }) {
  const live = project.liveUrl && (project.liveUrl as string) !== "#";
  return (
    <div className="spotlight card-dark p-4">
      <div className="aspect-project rounded-2xl overflow-hidden border border-white/10">
        <PreviewImage project={project} />
      </div>
      <p className="mt-4 eyebrow">Related work</p>
      <p className="mt-1 font-display font-semibold text-lg text-white leading-snug">{project.title}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {live && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary !px-4 !py-2 text-sm">
            Open live app
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        )}
        <a href="#contact" className="btn-light !px-4 !py-2 text-sm">
          Discuss a project
        </a>
      </div>
    </div>
  );
}
