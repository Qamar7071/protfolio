"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowUpRight, Bot, Brain, Check, LineChart, Wand2 } from "lucide-react";

import { PROJECTS, SERVICES } from "@/lib/constants";
import BrandLogo from "@/components/ui/BrandLogo";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const ICONS = { Brain, LineChart, Bot, Wand2 } as const;
type Service = (typeof SERVICES)[number];
type Project = (typeof PROJECTS)[number];

/* -------------------------------------------------------------------------- */
/*  SERVICES — pick a service on the left, details + related work on the right */
/* -------------------------------------------------------------------------- */
export default function Services() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number, focus = false) => {
    const next = (i + SERVICES.length) % SERVICES.length;
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      select(i + 1, true);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      select(i - 1, true);
    } else if (e.key === "Home") {
      e.preventDefault();
      select(0, true);
    } else if (e.key === "End") {
      e.preventDefault();
      select(SERVICES.length - 1, true);
    }
  };

  const service = SERVICES[active];
  const related = PROJECTS.find((p) => p.id === service.relatedProject);

  return (
    <MotionConfig reducedMotion="user">
      <section id="services" className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Services"
            description="Four kinds of work I take on. Each one ends with something you can open and use, not just a report."
          />

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            {/* ---------- Service list ---------- */}
            <div
              role="tablist"
              aria-label="Services"
              className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto no-scrollbar snap-x scroll-px-4 sm:scroll-px-0 -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 lg:pb-0"
            >
              {SERVICES.map((s, i) => {
                const Icon = ICONS[s.icon as keyof typeof ICONS] ?? Brain;
                const on = i === active;
                return (
                  <button
                    key={s.id}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    id={`service-tab-${s.id}`}
                    role="tab"
                    type="button"
                    aria-selected={on}
                    aria-controls="service-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => select(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className={cn(
                      "snap-start shrink-0 w-[78%] sm:w-[46%] lg:w-full text-left rounded-2xl border px-5 py-4 transition-colors",
                      "flex items-start gap-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30",
                      on
                        ? "bg-primary border-primary text-white shadow-button"
                        : "bg-white border-dark-200 text-dark-900 hover:border-dark-300 hover:bg-dark-50",
                    )}
                  >
                    <span
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                        on ? "bg-white/15 text-white" : "bg-primary/10 text-primary",
                      )}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display font-semibold leading-snug">{s.title}</span>
                      <span className={cn("block mt-0.5 text-sm", on ? "text-white/75" : "text-dark-500")}>
                        {s.tagline}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ---------- Detail panel ---------- */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={service.id}
                  id="service-panel"
                  role="tabpanel"
                  aria-labelledby={`service-tab-${service.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="rounded-3xl border border-dark-200 bg-white overflow-hidden"
                >
                  <ServiceDetail service={service} />
                  {related && <RelatedWork project={related} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ---------- Not sure ---------- */}
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-dashed border-dark-300 px-6 py-5">
            <p className="text-dark-600">
              <span className="font-semibold text-dark-900">Not sure which one fits?</span>{" "}
              Book a free 30-minute call and we&apos;ll scope it together.
            </p>
            <a href="#contact" className="btn-outline shrink-0">
              Book a call
            </a>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

function ServiceDetail({ service }: { service: Service }) {
  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-dark-900">
        {service.title}
      </h3>
      <p className="mt-1 font-semibold text-primary">{service.tagline}</p>
      <p className="mt-4 text-dark-600 leading-relaxed max-w-[60ch]">{service.description}</p>

      <div className="mt-8 grid sm:grid-cols-2 gap-8">
        <div>
          <h4 className="text-sm font-semibold text-dark-900">What&apos;s included</h4>
          <ul className="mt-3 space-y-2.5">
            {service.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-dark-700">
                <Check className="w-4 h-4 mt-0.5 text-primary shrink-0" strokeWidth={3} aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-dark-900">{service.toolsLabel}</h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {service.tools.map((t) => (
              <li
                key={t}
                className="inline-flex items-center gap-2 rounded-xl border border-dark-200 bg-white pl-2 pr-3 py-1.5 text-sm font-medium text-dark-800"
              >
                <BrandLogo name={t} size={20} square />
                {t}
              </li>
            ))}
          </ul>

          <h4 className="mt-6 text-sm font-semibold text-dark-900">Good fit for</h4>
          <p className="mt-1.5 text-sm text-dark-600">{service.idealFor}</p>
        </div>
      </div>
    </div>
  );
}

function RelatedWork({ project }: { project: Project }) {
  const contain = "imageFit" in project && project.imageFit === "contain";
  const live = project.liveUrl && (project.liveUrl as string) !== "#";

  return (
    <div className="border-t border-dark-200 bg-dark-50 p-6 sm:p-8 flex flex-col sm:flex-row gap-5 sm:gap-6">
      <div className="w-full sm:w-52 aspect-project rounded-xl overflow-hidden border border-dark-200 bg-white shrink-0">
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          className={cn("w-full h-full", contain ? "object-contain bg-[#0a1e3a]" : "object-cover object-top")}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-dark-500">Related work</p>
        <p className="font-display font-semibold text-lg text-dark-900 leading-snug">{project.title}</p>
        <p className="mt-1 text-sm text-dark-500 leading-relaxed line-clamp-2">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {live && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !px-4 !py-2 text-sm"
            >
              Open live app
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
          <a href="#contact" className="btn-primary !px-4 !py-2 text-sm">
            Discuss a project
          </a>
        </div>
      </div>
    </div>
  );
}
