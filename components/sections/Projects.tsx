"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Star,
  Sparkles,
  ArrowUpRight,
  X,
  Layers,
  Code2,
  Rocket,
} from "lucide-react";

import { PROJECTS, PROJECT_CATEGORIES, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

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
        {/* -------------------- HEADER -------------------- */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="eyebrow inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Featured Work
          </span>
          <h2 className="section-heading heading-underline-center mx-auto mt-2">
            Projects that{" "}
            <span className="text-gradient-primary">solve real problems</span>
          </h2>
          <p className="section-subheading mx-auto">
            A selection of AI/ML systems, full-stack web apps, and backend
            services I&apos;ve designed, built, and shipped for clients
            worldwide.
          </p>
        </div>

        {/* -------------------- CATEGORY FILTER -------------------- */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
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

        {/* -------------------- CARDS GRID -------------------- */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* -------------------- BOTTOM CTA -------------------- */}
        <div className="mt-14 text-center">
          <p className="text-dark-500 mb-4">Want to see more of my work?</p>
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

      {/* -------------------- MODAL -------------------- */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  PROJECT CARD                                                              */
/* -------------------------------------------------------------------------- */
function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const hasLive = project.liveUrl && project.liveUrl !== "#";
  const hasCode = project.githubUrl && project.githubUrl !== "#";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.4 }}
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl border border-dark-100 overflow-hidden shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* IMAGE */}
      <div className="relative aspect-project overflow-hidden bg-gradient-to-br from-primary/10 to-secondary-100">
        {!imgFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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

        {/* Category chip */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-dark-900/75 backdrop-blur-md text-white text-xs font-semibold">
            {project.category}
          </span>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-300 text-dark-900 text-xs font-bold shadow-yellow">
              <Star className="w-3 h-3 fill-dark-900" />
              Featured
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/85 via-dark-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-sm font-semibold inline-flex items-center gap-1.5">
            View Details
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-display font-bold text-lg text-dark-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">
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
            <span className="text-xs text-dark-400 px-2 py-0.5">
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
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-dark-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              Code
            </a>
          )}
          <span className="ml-auto text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            Details
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*  PROJECT MODAL                                                             */
/* -------------------------------------------------------------------------- */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  // Reset img state when project changes
  useEffect(() => {
    setImgFailed(false);
  }, [project?.id]);

  // Body scroll lock + Escape to close
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

  const hasLive = project?.liveUrl && project.liveUrl !== "#";
  const hasCode = project?.githubUrl && project.githubUrl !== "#";
  const noLinks = project && !hasLive && !hasCode;

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
                  className="w-full h-full object-cover"
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

              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur shadow-soft flex items-center justify-center hover:bg-white hover:scale-110 transition-all"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-dark-700" />
              </button>

              {/* Category chip */}
              <div className="absolute bottom-4 left-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-dark-900/80 backdrop-blur-md text-white text-xs font-semibold">
                  {project.category}
                </span>
              </div>

              {/* Featured badge */}
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
                <h3 className="text-xs font-bold text-dark-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

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
                      Live Demo
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                  {hasCode && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </a>
                  )}
                </div>
              )}

              {/* Info if no links */}
              {noLinks && (
                <div className="mt-6 p-4 bg-dark-50 rounded-xl text-sm text-dark-500 flex items-start gap-2 border border-dark-100">
                  <Rocket className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-dark-700 mb-0.5">
                      Proprietary / Client Project
                    </p>
                    <p>
                      Details and demo available on request. Reach out via the
                      Contact section!
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
