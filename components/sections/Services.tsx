"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Globe,
  Wand2,
  Brain,
  Sparkles,
  Check,
  ArrowRight,
  Zap,
  MessageCircle,
} from "lucide-react";

import { SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Icon map — resolves string names from constants to real components        */
/* -------------------------------------------------------------------------- */
const ICON_MAP = {
  Bot,
  Globe,
  Wand2,
  Brain,
} as const;

type IconName = keyof typeof ICON_MAP;

/* -------------------------------------------------------------------------- */
/*  SERVICES SECTION                                                          */
/* -------------------------------------------------------------------------- */
export default function Services() {
  return (
    <section
      id="services"
      className="section-padding bg-dark-50 relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
      <div className="blob w-[400px] h-[400px] bg-primary/15 -top-32 -left-32" />
      <div
        className="blob w-[350px] h-[350px] bg-secondary-300/25 bottom-0 -right-24"
        style={{ animationDelay: "3s" }}
      />

      <div className="container-custom relative z-10">
        {/* -------------------- HEADER -------------------- */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="eyebrow inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            What I Offer
          </span>
          <h2 className="section-heading heading-underline-center mx-auto mt-2">
            AI Services that{" "}
            <span className="text-gradient-primary">ship real value</span>
          </h2>
          <p className="section-subheading mx-auto">
            Four focused offerings that combine cutting-edge AI with solid
            engineering — from chatbots to custom models, delivered with care.
          </p>
        </div>

        {/* -------------------- SERVICES GRID -------------------- */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* -------------------- BOTTOM CTA STRIP -------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 bg-gradient-to-r from-primary to-primary-700 rounded-3xl p-8 sm:p-10 text-white shadow-card-hover overflow-hidden relative"
        >
          {/* Decorative sparkles */}
          <div className="absolute top-4 right-4 opacity-20">
            <Sparkles className="w-24 h-24" />
          </div>
          <div className="absolute bottom-4 left-4 opacity-10">
            <Zap className="w-32 h-32" />
          </div>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-display font-bold mb-2">
                Not sure which service fits?
              </h3>
              <p className="text-white/85 max-w-xl">
                Let&apos;s talk about your idea. Free 30-min discovery call — I
                help you scope, plan, and estimate before you commit.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-primary font-bold shadow-lg hover:bg-secondary-100 hover:-translate-y-0.5 transition-all shrink-0"
            >
              <MessageCircle className="w-5 h-5" />
              Start a conversation
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  SERVICE CARD                                                              */
/* -------------------------------------------------------------------------- */
function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const Icon = ICON_MAP[service.icon as IconName];
  // Alternate primary / secondary accent for visual variety
  const isSecondary = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn(
        "group relative bg-white rounded-3xl border border-dark-100 p-6 sm:p-8",
        "shadow-soft hover:shadow-card-hover hover:-translate-y-2",
        "hover:border-primary/30 transition-all duration-400 overflow-hidden",
      )}
    >
      {/* Dots pattern reveal on hover */}
      <div className="absolute inset-0 bg-dots opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />

      {/* Corner gradient glow on hover */}
      <div
        className={cn(
          "absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
          isSecondary ? "bg-secondary-300/40" : "bg-primary/25",
        )}
      />

      {/* Big number badge */}
      <div className="absolute top-4 right-6 select-none pointer-events-none">
        <span
          className={cn(
            "font-display font-black text-6xl leading-none transition-colors duration-300",
            "text-dark-100 group-hover:text-primary/15",
          )}
        >
          {service.number}
        </span>
      </div>

      {/* CONTENT */}
      <div className="relative">
        {/* ICON */}
        <div
          className={cn(
            "relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6",
            "transition-all duration-400",
            isSecondary
              ? "bg-secondary-100 text-secondary-700 group-hover:bg-secondary-300 group-hover:text-dark-900"
              : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white",
            "group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg",
          )}
        >
          {Icon && <Icon className="w-8 h-8" />}
        </div>

        {/* TITLE + TAGLINE */}
        <h3 className="text-xl sm:text-2xl font-display font-bold text-dark-900 mb-1 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <p
          className={cn(
            "text-sm font-bold mb-4",
            isSecondary ? "text-secondary-700" : "text-primary",
          )}
        >
          {service.tagline}
        </p>

        {/* DESCRIPTION */}
        <p className="text-sm text-dark-500 mb-6 leading-relaxed">
          {service.description}
        </p>

        {/* FEATURES */}
        <ul className="space-y-2.5 mb-6">
          {service.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2.5 text-sm text-dark-700"
            >
              <div
                className={cn(
                  "mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                  isSecondary
                    ? "bg-secondary-100 text-secondary-700"
                    : "bg-primary/10 text-primary",
                )}
              >
                <Check className="w-3 h-3" strokeWidth={3} />
              </div>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* IDEAL FOR + DELIVERABLES */}
        <div className="pt-5 border-t border-dark-100 mb-5">
          <p className="text-xs text-dark-500 mb-3">
            <span className="font-bold text-dark-700">Ideal for:</span>{" "}
            {service.idealFor}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {service.deliverables && service.deliverables.map((d) => (
              <span
                key={d}
                className="text-xs bg-dark-50 text-dark-600 px-2 py-0.5 rounded-md font-semibold border border-dark-100"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className={cn(
            "inline-flex items-center gap-1.5 text-sm font-bold group/cta transition-colors",
            isSecondary ? "text-secondary-700 hover:text-secondary-800" : "text-primary hover:text-primary-700",
          )}
        >
          Discuss this project
          <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.article>
  );
}
