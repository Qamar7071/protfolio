"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Star,
  ArrowUpRight,
  X,
  Layers,
  Code2,
  Rocket,
  Database,
  Microscope,
  BarChart3,
  AlertTriangle,
  FileText,
} from "lucide-react";

import { PROJECTS, PROJECT_CATEGORIES, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/ui/SectionHeader";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */
type Project = (typeof PROJECTS)[number];

/* -------------------------------------------------------------------------- */
/*  PROJECTS SECTION                                                          */
/* -------------------------------------------------------------------------- */
export default function Projects() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof PROJECT_CATEGORIES)[number]>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="projects" className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader
          title="Selected projects"
          description="Deployed AI and ML apps. Open any project for its dataset, method and results, with code linked where it's public."
        />

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {PROJECT_CATEGORIES.map((cat) => {
            const count =
              cat === "All"
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all",
                  isActive
                    ? "bg-primary text-white shadow-button hover:shadow-button-hover -translate-y-0.5"
                    : "bg-white border border-dark-200 text-dark-700 hover:border-primary hover:text-primary",
                )}
              >
                {cat}
                <span
                  className={cn(
                    "inline-flex items-center justify-center min-w-[20px] h-5 rounded-full text-xs px-1.5",
                    isActive
                      ? "bg-white/25"
                      : "bg-dark-100 text-dark-500",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* PROJECTS STRIP — slides left → right, pauses on hover */}
      <ProjectsStrip
        key={activeCategory}
        projects={filtered}
        paused={selectedProject !== null}
        onSelect={setSelectedProject}
      />

      <div className="container-custom">
        {/* BOTTOM CTA */}
        <div className="mt-14 flex flex-wrap items-center gap-x-5 gap-y-3">
          <p className="text-dark-500">Want to see more of my work?</p>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex"
          >
            <Github className="w-4 h-4" />
            View all on GitHub
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* MODAL */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  PROJECTS STRIP — endless left → right slide                               */
/*  • ≥ 4 projects → marquee (pauses on hover / focus / while a modal is open) */
/*  • < 4 projects (a narrow filter) → static centred cards, no fake repeats  */
/* -------------------------------------------------------------------------- */
const CARD_W = 360;
const GAP = 24;

function ProjectsStrip({
  projects,
  paused,
  onSelect,
}: {
  projects: readonly Project[];
  paused: boolean;
  onSelect: (p: Project) => void;
}) {
  if (projects.length < 4) {
    return (
      <div className="container-custom">
        <div className="flex flex-wrap justify-center gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="w-full sm:w-[360px]"
            >
              <ProjectCard project={p} onSelect={() => onSelect(p)} />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Repeat the list so a single half is always wider than any screen,
  // then render two identical halves → translateX(-50% → 0) loops seamlessly.
  const reps = Math.max(1, Math.ceil(2800 / (projects.length * (CARD_W + GAP))));
  const half = Array.from({ length: reps }, (_, rep) =>
    projects.map((p) => ({ project: p, rep })),
  ).flat();
  const duration = half.length * 7; // seconds — ~7s per card feels calm

  const renderHalf = (isDup: boolean) =>
    half.map(({ project, rep }) => (
      <li key={`${project.id}-${rep}`} className="w-[300px] sm:w-[360px] shrink-0">
        <ProjectCard
          project={project}
          onSelect={() => onSelect(project)}
          decorative={isDup || rep > 0}
        />
      </li>
    ));

  return (
    <div className="marquee-viewport marquee-mask group/strip overflow-hidden py-6 -my-2">
      <div
        className="marquee-track flex w-max animate-marquee-ltr group-hover/strip:[animation-play-state:paused] group-focus-within/strip:[animation-play-state:paused]"
        style={{
          animationDuration: `${duration}s`,
          ...(paused ? { animationPlayState: "paused" } : {}),
        }}
      >
        <ul className="flex gap-6 pr-6 items-stretch">{renderHalf(false)}</ul>
        <ul className="marquee-dup flex gap-6 pr-6 items-stretch" aria-hidden="true">
          {renderHalf(true)}
        </ul>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  PROJECT CARD                                                              */
/* -------------------------------------------------------------------------- */
function ProjectCard({
  project,
  onSelect,
  decorative = false,
}: {
  project: Project;
  onSelect: () => void;
  /** repeated copy inside the marquee — mouse-clickable, but skipped by keyboard / screen readers */
  decorative?: boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const hasLive = project.liveUrl && (project.liveUrl as string) !== "#";
  const hasCode = project.githubUrl && (project.githubUrl as string) !== "#";
  const tab = decorative ? -1 : 0;

  return (
    <article
      onClick={onSelect}
      className="group/card h-full w-full cursor-pointer bg-white rounded-2xl border border-dark-100 overflow-hidden shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* IMAGE */}
      <div className="relative aspect-project overflow-hidden bg-gradient-to-br from-primary/10 to-secondary-100">
        {!imgFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={decorative ? "" : project.title}
            loading="lazy"
            draggable={false}
            className={`w-full h-full ${
              "imageFit" in project && project.imageFit === "contain"
                ? "object-contain bg-[#0a1e3a]"
                : "object-cover"
            } group-hover/card:scale-105 transition-transform duration-500`}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-6">
            <Code2 className="w-12 h-12 text-primary/40" />
            <p className="text-sm font-semibold text-primary/60 text-center">
              {project.title}
            </p>
          </div>
        )}

        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-dark-900/75 backdrop-blur-md text-white text-xs font-semibold">
            {project.category}
          </span>
        </div>

        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-300 text-dark-900 text-xs font-bold shadow-yellow">
              <Star className="w-3 h-3 fill-dark-900" />
              Featured
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/85 via-dark-900/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-sm font-semibold inline-flex items-center gap-1.5">
            View Details
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-display font-bold text-lg text-dark-900 mb-2 group-hover/card:text-primary transition-colors line-clamp-1">
          {project.title}
        </h3>
        <p className="text-sm text-dark-500 line-clamp-2 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-xs bg-dark-50 text-dark-700 px-2 py-0.5 rounded-md font-medium"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-xs text-dark-500 px-2 py-0.5">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-1 pt-3 border-t border-dark-100">
          {hasLive && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={tab}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-dark-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live
            </a>
          )}
          {hasCode && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={tab}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-dark-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              Code
            </a>
          )}
          <button
            type="button"
            tabIndex={tab}
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="ml-auto text-xs font-semibold text-primary group-hover/card:translate-x-1 transition-transform inline-flex items-center gap-1 rounded-lg px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            Details
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  PROJECT MODAL — with methodology, dataset, evaluation, disclaimer          */
/* -------------------------------------------------------------------------- */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [project, onClose]);

  const hasLive = project?.liveUrl && (project.liveUrl as string) !== "#";
  const hasCode = project?.githubUrl && (project.githubUrl as string) !== "#";
  const noLinks = project && !hasLive && !hasCode;

  // Safely access optional methodology fields
  const dataset = project && "dataset" in project ? (project as { dataset?: string }).dataset : undefined;
  const methodology = project && "methodology" in project ? (project as { methodology?: string }).methodology : undefined;
  const evaluation = project && "evaluation" in project ? (project as { evaluation?: readonly string[] }).evaluation : undefined;
  const disclaimer = project && "disclaimer" in project ? (project as { disclaimer?: string }).disclaimer : undefined;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-dark-900/60 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* HEADER IMAGE */}
            <div className="relative aspect-project overflow-hidden bg-gradient-to-br from-primary/10 to-secondary-100">
              {!imgFailed ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full ${
                    "imageFit" in project && project.imageFit === "contain"
                      ? "object-contain bg-[#0a1e3a]"
                      : "object-cover"
                  }`}
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                  <Code2 className="w-20 h-20 text-primary/40" />
                  <p className="text-lg font-bold text-primary/60">
                    {project.title}
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur shadow-soft flex items-center justify-center hover:bg-white hover:scale-110 transition-all"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-dark-700" />
              </button>

              <div className="absolute bottom-4 left-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-dark-900/80 backdrop-blur-md text-white text-xs font-semibold">
                  {project.category}
                </span>
              </div>

              {project.featured && (
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-300 text-dark-900 text-xs font-bold shadow-yellow">
                    <Star className="w-3 h-3 fill-dark-900" />
                    Featured
                  </span>
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-6 sm:p-8">
              <h2
                id="modal-title"
                className="text-2xl sm:text-3xl font-display font-bold text-dark-900 mb-3"
              >
                {project.title}
              </h2>
              <p className="text-dark-600 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-dark-500 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
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

              {/* Dataset */}
              {dataset && (
                <div className="mb-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <h3 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Dataset
                  </h3>
                  <p className="text-sm text-dark-700 leading-relaxed">
                    {dataset}
                  </p>
                </div>
              )}

              {/* Methodology */}
              {methodology && (
                <div className="mb-6 p-4 bg-dark-50 rounded-xl border border-dark-100">
                  <h3 className="text-sm font-semibold text-dark-700 mb-2 flex items-center gap-2">
                    <Microscope className="w-4 h-4" />
                    Methodology
                  </h3>
                  <p className="text-sm text-dark-600 leading-relaxed">
                    {methodology}
                  </p>
                </div>
              )}

              {/* Evaluation */}
              {evaluation && evaluation.length > 0 && (
                <div className="mb-6 p-4 bg-secondary-50 rounded-xl border border-secondary-200">
                  <h3 className="text-sm font-semibold text-dark-700 mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Results
                  </h3>
                  <ul className="space-y-1.5">
                    {evaluation.map((item, i) => (
                      <li key={i} className="text-sm text-dark-700 flex items-start gap-2">
                        <span className="text-secondary-700 font-bold mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Disclaimer */}
              {disclaimer && (
                <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <h3 className="text-sm font-semibold text-amber-700 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Note
                  </h3>
                  <p className="text-sm text-dark-700 leading-relaxed">
                    {disclaimer}
                  </p>
                </div>
              )}

              {/* Actions */}
              {(hasLive || hasCode) && (
                <div className="flex flex-wrap gap-3 pt-6 border-t border-dark-100">
                  {hasLive && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live demo
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                  {hasCode && (
                    <>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                      >
                        <Github className="w-4 h-4" />
                        Source code
                      </a>
                      <a
                        href={`${project.githubUrl}#readme`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline"
                      >
                        <FileText className="w-4 h-4" />
                        README
                      </a>
                    </>
                  )}
                </div>
              )}

              {/* Info if no links */}
              {noLinks && (
                <div className="mt-6 p-4 bg-dark-50 rounded-xl text-sm text-dark-500 flex items-start gap-2 border border-dark-100">
                  <Rocket className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-dark-700 mb-0.5">
                      Not published yet
                    </p>
                    <p>
                      Ask me for a walkthrough through the Contact section.
                    </p>
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