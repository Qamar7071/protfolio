import { cn } from "@/lib/utils";
import { LineReveal, Reveal, SplitText } from "@/components/fx/Reveal";

/* -------------------------------------------------------------------------- */
/*  SectionHeader — "(01) ── About" index line, a big title whose words      */
/*  slide up out of a mask (wrap a word in *asterisks* for the serif accent), */
/*  and an optional description on the right.                                 */
/* -------------------------------------------------------------------------- */
export default function SectionHeader({
  index,
  label,
  title,
  description,
  className,
  children,
}: {
  index: string;
  label: string;
  title: string;
  description?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className={cn("mb-14 lg:mb-20", className)}>
      <Reveal y={16} className="eyebrow mb-6 sm:mb-8">
        <span className="text-secondary-300">({index})</span>
        <span className="h-px w-10 bg-white/25" aria-hidden="true" />
        <span>{label}</span>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <SplitText
          as="h2"
          text={title}
          className="lg:col-span-8 font-display font-bold text-white text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.92] tracking-[-0.045em]"
        />
        {description && (
          <Reveal delay={0.25} className="lg:col-span-4 lg:pb-3">
            <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-[46ch]">{description}</p>
            {children}
          </Reveal>
        )}
      </div>

      <LineReveal className="mt-10 lg:mt-14" delay={0.2} />
    </header>
  );
}
