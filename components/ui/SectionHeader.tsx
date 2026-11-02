import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  SectionHeader — left-aligned heading with the brand's saffron full stop   */
/*  (same mark as the "Qamar." logo and the intro), description on the right  */
/*  on wide screens, hairline rule underneath.                                */
/* -------------------------------------------------------------------------- */
export default function SectionHeader({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description?: React.ReactNode;
  className?: string;
  /** optional controls that sit under the description (e.g. filters) */
  children?: React.ReactNode;
}) {
  return (
    <header
      className={cn(
        "grid gap-5 lg:grid-cols-12 lg:items-end pb-8 mb-10 lg:mb-14 border-b border-dark-200",
        className,
      )}
    >
      <h2 className="lg:col-span-7 font-display font-bold text-dark-900 text-[2.5rem] leading-[1.02] sm:text-5xl lg:text-[3.5rem] tracking-[-0.035em]">
        {title}
        <span className="text-secondary-400" aria-hidden="true">
          .
        </span>
      </h2>
      {description && (
        <div className="lg:col-span-5 lg:pb-2">
          <p className="text-base sm:text-lg text-dark-500 leading-relaxed max-w-[48ch]">
            {description}
          </p>
          {children}
        </div>
      )}
    </header>
  );
}
