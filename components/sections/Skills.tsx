import { SKILL_CATEGORIES } from "@/lib/constants";
import { getLogo } from "@/lib/logos";
import BrandLogo from "@/components/ui/BrandLogo";
import SectionHeader from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/fx/Reveal";
import { cn } from "@/lib/utils";

const withLogo = (level: "core" | "learning") =>
  SKILL_CATEGORIES.filter((c) => c.level === level)
    .flatMap((c) => [...c.skills])
    .filter((s) => getLogo(s));

const CORE_TOOLS = withLogo("core");
const LEARNING_TOOLS = withLogo("learning");

/* -------------------------------------------------------------------------- */
/*  SKILLS — two endless logo strips (opposite directions) + category cards   */
/* -------------------------------------------------------------------------- */
export default function Skills() {
  return (
    <section id="skills" className="relative section-padding overflow-hidden">
      <div className="container-custom">
        <SectionHeader
          index="02"
          label="Skills"
          title="Skills & *tools*"
          description="Tools I use every week, and the ones I'm still learning. I only list what I can explain in an interview."
        />
      </div>

      <div className="space-y-4">
        <LogoStrip items={CORE_TOOLS} />
        <LogoStrip items={LEARNING_TOOLS} reverse learning />
      </div>

      <div className="container-custom mt-20 grid lg:grid-cols-3 gap-4">
        {SKILL_CATEGORIES.map((cat, i) => {
          const learning = cat.level === "learning";
          return (
            <Reveal key={cat.title} delay={i * 0.1} className="spotlight card-dark p-7 lg:p-8 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm text-white/35">0{i + 1}</span>
                <span className="chip">
                  <span
                    className={cn("w-1.5 h-1.5 rounded-full", learning ? "bg-secondary-300" : "bg-emerald-400")}
                    aria-hidden="true"
                  />
                  {learning ? "Learning" : "Daily use"}
                </span>
              </div>
              <h3 className="mt-10 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {cat.title}
              </h3>
              <p className="mt-2 text-sm text-white/55 leading-relaxed">{cat.blurb}</p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <li key={s} className="chip !py-1.5 !text-[13px]">
                    {getLogo(s) && (
                      <span className="grid place-items-center w-5 h-5 rounded-full bg-white">
                        <BrandLogo name={s} size={12} square />
                      </span>
                    )}
                    {s.replace(" (Basic)", "")}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function LogoStrip({
  items,
  reverse = false,
  learning = false,
}: {
  items: string[];
  reverse?: boolean;
  learning?: boolean;
}) {
  // repeat short lists so one copy is always wider than the screen
  const list = items.length < 12 ? [...items, ...items] : items;

  return (
    <div className="marquee-viewport marquee-mask group overflow-hidden">
      <div
        className={cn(
          "marquee-track flex w-max group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
        style={{ animationDuration: `${list.length * 3.2}s` }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
            className={cn("flex gap-4 pr-4", copy === 1 && "marquee-dup")}
          >
            {list.map((name, i) => (
              <li
                key={`${name}-${i}`}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border pl-2.5 pr-5 py-2.5 transition-colors duration-300 hover:border-secondary-300/60",
                  learning ? "border-dashed border-white/15 bg-transparent" : "border-white/10 bg-white/[0.03]",
                )}
              >
                <span className="grid place-items-center w-11 h-11 rounded-xl bg-white">
                  <BrandLogo name={name} size={26} square />
                </span>
                <span className="font-display text-lg text-white/85 whitespace-nowrap">
                  {name.replace(" (Basic)", "")}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
