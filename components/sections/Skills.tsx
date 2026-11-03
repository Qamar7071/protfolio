"use client";

import { MotionConfig, motion, type Variants } from "framer-motion";

import { SKILL_CATEGORIES } from "@/lib/constants";
import { getLogo } from "@/lib/logos";
import BrandLogo from "@/components/ui/BrandLogo";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

type Category = (typeof SKILL_CATEGORIES)[number];

/* Tiles assemble once, row by row, the first time the section is seen */
const GRID: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
};
const TILE: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

/* -------------------------------------------------------------------------- */
/*  SKILLS                                                                    */
/* -------------------------------------------------------------------------- */
export default function Skills() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="skills" className="section-padding bg-dark-50">
        <div className="container-custom">
          <SectionHeader
            title="Skills and tools"
            description="Tools I use every week, and the ones I'm still learning. I only list what I can explain in an interview."
          />

          <div className="divide-y divide-dark-200">
            {SKILL_CATEGORIES.map((cat) => (
              <CategoryRow key={cat.title} category={cat} />
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

function CategoryRow({ category }: { category: Category }) {
  const learning = category.level === "learning";
  const tools = category.skills.filter((s) => getLogo(s));
  const methods = category.skills.filter((s) => !getLogo(s));

  return (
    <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 py-10 first:pt-0 last:pb-0">
      {/* Label column */}
      <div className="lg:col-span-3">
        <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-dark-900">
          {category.title}
        </h3>
        <p className="mt-2 text-sm text-dark-500 leading-relaxed max-w-[32ch]">{category.blurb}</p>
        <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-dark-700">
          <span
            className={cn("w-2 h-2 rounded-full", learning ? "bg-secondary-400" : "bg-primary")}
            aria-hidden="true"
          />
          <span>
            {learning ? "Learning" : "Daily use"}
            <span className="text-dark-500 font-normal">
              , {tools.length} {tools.length === 1 ? "tool" : "tools"}
            </span>
          </span>
        </p>
      </div>

      {/* Tools + methods */}
      <div className="lg:col-span-9">
        <motion.ul
          variants={GRID}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-7 gap-3"
        >
          {tools.map((tool) => (
            <motion.li
              key={tool}
              variants={TILE}
              className={cn(
                "flex flex-col items-center justify-center gap-3 rounded-2xl px-2 py-5 text-center",
                learning
                  ? "bg-white/60 border border-dashed border-dark-300"
                  : "bg-white border border-dark-200 shadow-[0_1px_0_rgba(15,23,42,0.04)]",
              )}
            >
              <BrandLogo name={tool} size={38} square />
              <span className="text-xs sm:text-[13px] font-semibold text-dark-800 leading-tight">
                {tool.replace(" (Basic)", "")}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        {methods.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-sm text-dark-500 mr-1">
              {learning ? "Also practising" : "Methods"}
            </span>
            {methods.map((m) => (
              <span
                key={m}
                className="rounded-lg bg-white border border-dark-200 px-2.5 py-1 text-sm text-dark-700"
              >
                {m}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
