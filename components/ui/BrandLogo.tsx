/* eslint-disable @next/next/no-img-element */
import { getLogo } from "@/lib/logos";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  BrandLogo — local logo for a tool / organisation by name.                 */
/*  Renders nothing when no logo is known, so callers can fall back to text.  */
/*  Decorative by default (the name is always printed next to it).            */
/* -------------------------------------------------------------------------- */
export default function BrandLogo({
  name,
  size = 32,
  square = false,
  className,
  alt = "",
}: {
  name: string;
  /** height in px for square marks */
  size?: number;
  /** fit wordmarks (IBM, Fiverr) inside a square slot instead of growing wide */
  square?: boolean;
  className?: string;
  alt?: string;
}) {
  const logo = getLogo(name);
  if (!logo) return null;

  const w = logo.wide ? Math.round(size * (square ? 1.5 : 2.2)) : size;
  const h = logo.wide && square ? Math.round(size * 0.7) : size;

  return (
    <img
      src={logo.src}
      alt={alt}
      width={w}
      height={h}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={cn("object-contain shrink-0 select-none", className)}
      style={{ width: w, height: h }}
    />
  );
}

export { getLogo };
