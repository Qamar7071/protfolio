import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely (handles conflicts + conditional classes).
 * Usage: cn("px-2", condition && "text-red-500", "px-4") -> "text-red-500 px-4"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Smooth-scroll to an element by id (with fixed-navbar offset).
 */
export function scrollToId(id: string, offset = 80) {
  const el = document.getElementById(id.replace("#", ""));
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

/**
 * Format a year range for experience/timeline.
 */
export function formatPeriod(start: string, end?: string) {
  return end ? `${start} — ${end}` : `${start} — Present`;
}
