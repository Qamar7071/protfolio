"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Code2,
  Database,
  ExternalLink,
  FileText,
  Github,
  Layers,
  Microscope,
  Rocket,
  Star,
  X,
} from "lucide-react";

import { PROJECTS, SOCIAL_LINKS } from "@/lib/constants";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/ui/SectionHeader";
import TiltCard from "@/components/fx/TiltCard";
import Magnetic from "@/components/fx/Magnetic";
import { Reveal, SplitText } from "@/components/fx/Reveal";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

type Project = (typeof PROJECTS)[number];

const pad = (n: number) => String(n).padStart(2, "0");
const isLive = (p: Project) => Boolean(p.liveUrl) && (p.liveUrl as string) !== "#";
const hasCode = (p: Project) => Boolean(p.githubUrl) && (p.githubUrl as string) !== "#";
const contain = (p: Project) => "imageFit" in p && p.imageFit === "contain";

const INTRO_TEXT =
  "Deployed AI and ML apps. Open any project for its dataset, method and results, with code linked where it's public.";

/* -------------------------------------------------------------------------- */
/*  PROJECTS                                                                  */
/*  • desktop: the section pins and vertical scrolling slides the work        */
/*    sideways (horizontal scroll gallery)                                    */
/*  • phones, tablets and reduced motion: a plain stacked list                */
/* -------------------------------------------------------------------------- */
export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const reduce = useReducedMotionSafe();
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="projects" className="relative">
      <div className="hidden lg:block">
        {reduce ? <StackedList onSelect={setSelected} /> : <HorizontalGallery onSelect={setSelected} />}
      </div>
      <div className="lg:hidden">
        <StackedList onSelect={setSelected} />
      </div>

      <ProjectModal project={selected} onClose={close} />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  HORIZONTAL GALLERY                                                        */
/* -------------------------------------------------------------------------- */
function HorizontalGallery({ onSelect }: { onSelect: (p: Project) => void }) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);
  const dist = useMotionValue(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      const d = Math.max(0, el.scrollWidth - window.innerWidth);
      dist.set(d);
      setDistance(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [dist]);

  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const x = useTransform([scrollYProgress, dist], ([p, d]: number[]) => -p * d);
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(PROJECTS.length - 1, Math.max(0, Math.round(p * (PROJECTS.length + 1)) - 1)));
  });

  return (
    <div ref={outer} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_10%_90%,rgba(99,102,241,0.16),transparent_55%)]"
        />

        {/* top bar: label + progress */}
        <div className="container-custom w-full pt-28 flex items-end justify-between gap-6">
          <p className="eyebrow">
            <span className="text-secondary-300">(03)</span>
            <span className="h-px w-10 bg-white/25" aria-hidden="true" />
            <span>Selected work</span>
          </p>
          <div className="flex items-center gap-4 font-display text-sm text-white/45" aria-hidden="true">
            <span className="tabular-nums text-white">{pad(active + 1)}</span>
            <span className="relative block w-44 h-px bg-white/15 overflow-hidden">
              <motion.span style={{ scaleX: bar }} className="absolute inset-0 origin-left bg-secondary-300" />
            </span>
            <span className="tabular-nums">{pad(PROJECTS.length)}</span>
          </div>
        </div>

        {/* sliding track */}
        <motion.div
          ref={track}
          style={{ x }}
          className="flex-1 flex items-center gap-12 xl:gap-16 w-max pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-[8vw] will-change-transform"
        >
          <div className="shrink-0 w-[min(34vw,470px)] pr-4">
            <SplitText
              as="h2"
              text={"Selected\n*work*"}
              className="font-display font-bold text-white text-[clamp(3.5rem,7vw,7.25rem)] leading-[0.9] tracking-[-0.045em]"
            />
            <Reveal delay={0.3}>
              <p className="mt-8 text-white/60 leading-relaxed max-w-[36ch]">{INTRO_TEXT}</p>
              <p className="mt-10 eyebrow">
                Keep scrolling
                <ArrowRight className="w-4 h-4 text-secondary-300 animate-pulse" aria-hidden="true" />
              </p>
            </Reveal>
          </div>

          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              onSelect={() => onSelect(p)}
              className="shrink-0 w-[min(60vw,760px,calc((100vh-360px)*1.6))]"
            />
          ))}

          <div className="shrink-0 w-[min(30vw,420px)] flex flex-col items-start gap-10">
            <p className="font-display font-bold text-white text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[0.95] tracking-[-0.04em]">
              More on <span className="accent text-gradient pr-1">GitHub</span>
            </p>
            <Magnetic strength={0.4}>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid place-items-center w-40 h-40 rounded-full bg-secondary-300 text-ink-950 font-display font-semibold text-lg transition-transform duration-500 hover:scale-105"
              >
                <span className="flex flex-col items-center gap-1">
                  <Github className="w-6 h-6" aria-hidden="true" />
                  All repos
                </span>
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  STACKED LIST (phones / tablets / reduced motion)                          */
/* -------------------------------------------------------------------------- */
function StackedList({ onSelect }: { onSelect: (p: Project) => void }) {
  return (
    <div className="container-custom section-padding">
      <SectionHeader index="03" label="Selected work" title="Selected *work*" description={INTRO_TEXT} />
      <ul className="grid md:grid-cols-2 gap-x-6 gap-y-16">
        {PROJECTS.map((p, i) => (
          <Reveal as="li" key={p.id} delay={(i % 2) * 0.1}>
            <ProjectCard project={p} index={i} onSelect={() => onSelect(p)} />
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-16">
        <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
          <Github className="w-4 h-4" aria-hidden="true" />
          All projects on GitHub
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </Reveal>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  PROJECT CARD                                                              */
/* -------------------------------------------------------------------------- */
function ProjectCard({
  project,
  index,
  onSelect,
  className,
}: {
  project: Project;
  index: number;
  onSelect: () => void;
  className?: string;
}) {
  const live = isLive(project);
  const code = hasCode(project);

  return (
    <article className={cn("group", className)}>
      <div className="flex items-center justify-between mb-4 text-sm">
        <span className="font-display text-white/40 tabular-nums">
          {pad(index + 1)} / {pad(PROJECTS.length)}
        </span>
        <span className="chip">{project.category}</span>
      </div>

      <TiltCard
        max={5}
        role="button"
        tabIndex={0}
        aria-label={`Open details for ${project.title}`}
        data-cursor="view"
        data-cursor-label="Open"
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
          }
        }}
        className="relative aspect-[16/10] rounded-[1.75rem] overflow-hidden border border-white/10 bg-ink-800 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary-300/40"
      >
        <ProjectImage
          project={project}
          className="transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {project.featured && (
          <span className="absolute top-4 left-4 chip-accent">
            <Star className="w-3 h-3 fill-current" aria-hidden="true" />
            Featured
          </span>
        )}
      </TiltCard>

      <div className="mt-6 flex items-start justify-between gap-5">
        <div className="min-w-0">
          <h3 className="font-display text-2xl xl:text-[2rem] font-bold tracking-tight text-white leading-tight transition-colors duration-300 group-hover:text-secondary-300">
            {project.title}
          </h3>
          <p className="mt-2 text-white/55 leading-relaxed line-clamp-2 max-w-[58ch]">{project.description}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          {live && (
            <RoundLink href={project.liveUrl} label={`Open ${project.title} live`}>
              <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
            </RoundLink>
          )}
          {code && (
            <RoundLink href={project.githubUrl} label={`Source code of ${project.title}`}>
              <Github className="w-5 h-5" aria-hidden="true" />
            </RoundLink>
          )}
        </div>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tech.slice(0, 5).map((t) => (
          <li key={t} className="chip">
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}

function ProjectImage({ project, className }: { project: Project; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 bg-gradient-to-br from-primary-500/20 to-ink-900">
        <Code2 className="w-12 h-12 text-white/30" aria-hidden="true" />
        <p className="text-sm font-semibold text-white/50 text-center">{project.title}</p>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={project.image}
      alt={`Screenshot of ${project.title}`}
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
      className={cn(
        "absolute inset-0 w-full h-full",
        contain(project) ? "object-contain bg-[#0a1e3a]" : "object-cover object-top",
        className,
      )}
    />
  );
}

function RoundLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      onClick={(e) => e.stopPropagation()}
      className="btn-fill grid place-items-center w-12 h-12 rounded-full border border-white/15 text-white hover:text-ink-950 hover:border-secondary-300 transition-colors duration-300"
    >
      {children}
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/*  PROJECT MODAL — dataset, method, results, disclaimer                      */
/* -------------------------------------------------------------------------- */
function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    lockScroll();
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onEsc);
    };
  }, [project, onClose]);

  const dataset = project && "dataset" in project ? (project as { dataset?: string }).dataset : undefined;
  const methodology =
    project && "methodology" in project ? (project as { methodology?: string }).methodology : undefined;
  const evaluation =
    project && "evaluation" in project ? (project as { evaluation?: readonly string[] }).evaluation : undefined;
  const disclaimer =
    project && "disclaimer" in project ? (project as { disclaimer?: string }).disclaimer : undefined;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          data-lenis-prevent
          className="fixed inset-0 z-[80] bg-ink-950/80 backdrop-blur-md flex items-end sm:items-center justify-center sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.97 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-[2rem] sm:rounded-[2rem] border border-white/10 bg-ink-900 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]"
          >
            <div className="relative aspect-project overflow-hidden bg-ink-800">
              <ProjectImage project={project} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 grid place-items-center w-11 h-11 rounded-full bg-ink-950/70 backdrop-blur border border-white/15 text-white hover:bg-secondary-300 hover:text-ink-950 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-5 flex gap-2">
                <span className="chip !bg-ink-950/70 backdrop-blur">{project.category}</span>
                {project.featured && (
                  <span className="chip-accent">
                    <Star className="w-3 h-3 fill-current" aria-hidden="true" />
                    Featured
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 sm:p-9">
              <h2 id="project-modal-title" className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                {project.title}
              </h2>
              <p className="mt-4 text-white/65 leading-relaxed">{project.description}</p>

              <div className="mt-8">
                <h3 className="eyebrow mb-3">
                  <Layers className="w-4 h-4" aria-hidden="true" />
                  Tech stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {dataset && (
                <DetailBlock icon={<Database className="w-4 h-4" />} title="Dataset">
                  <p>{dataset}</p>
                </DetailBlock>
              )}
              {methodology && (
                <DetailBlock icon={<Microscope className="w-4 h-4" />} title="Methodology">
                  <p>{methodology}</p>
                </DetailBlock>
              )}
              {evaluation && evaluation.length > 0 && (
                <DetailBlock icon={<BarChart3 className="w-4 h-4" />} title="Results" accent>
                  <ul className="space-y-2">
                    {evaluation.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-secondary-300 shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </DetailBlock>
              )}
              {disclaimer && (
                <DetailBlock icon={<AlertTriangle className="w-4 h-4" />} title="Note" warn>
                  <p>{disclaimer}</p>
                </DetailBlock>
              )}

              {(isLive(project) || hasCode(project)) && (
                <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-3">
                  {isLive(project) && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-light">
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      Live demo
                    </a>
                  )}
                  {hasCode(project) && (
                    <>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                        <Github className="w-4 h-4" aria-hidden="true" />
                        Source code
                      </a>
                      <a
                        href={`${project.githubUrl}#readme`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                      >
                        <FileText className="w-4 h-4" aria-hidden="true" />
                        README
                      </a>
                    </>
                  )}
                </div>
              )}

              {!isLive(project) && !hasCode(project) && (
                <div className="mt-8 p-5 rounded-2xl border border-white/10 bg-white/[0.03] text-sm text-white/60 flex items-start gap-3">
                  <Rocket className="w-5 h-5 text-secondary-300 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-white mb-0.5">Not published yet</p>
                    <p>Ask me for a walkthrough through the Contact section.</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DetailBlock({
  icon,
  title,
  children,
  accent,
  warn,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  accent?: boolean;
  warn?: boolean;
}) {
  return (
    <div
      className={cn(
        "mt-5 p-5 rounded-2xl border text-sm leading-relaxed",
        warn
          ? "border-amber-400/25 bg-amber-400/[0.06] text-amber-100/80"
          : accent
            ? "border-secondary-300/25 bg-secondary-300/[0.05] text-white/75"
            : "border-white/10 bg-white/[0.03] text-white/70",
      )}
    >
      <h3
        className={cn(
          "mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]",
          warn ? "text-amber-300" : accent ? "text-secondary-300" : "text-white/50",
        )}
      >
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );
}
