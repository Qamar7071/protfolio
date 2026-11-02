import { ArrowUpRight, Download, MapPin } from "lucide-react";

import { EDUCATION, EXPERIENCE, SITE_CONFIG } from "@/lib/constants";
import BrandLogo from "@/components/ui/BrandLogo";
import SectionHeader from "@/components/ui/SectionHeader";

type Entry = {
  key: string;
  logo: string;
  title: string;
  org: string;
  link?: string;
  period: string;
  location: string;
  current?: boolean;
  facts?: string[];
  description: string;
  tags: readonly string[];
};

const ENTRIES: Entry[] = [
  {
    key: "education",
    logo: EDUCATION.logo,
    title: EDUCATION.degree,
    org: EDUCATION.school,
    period: EDUCATION.period,
    location: EDUCATION.location,
    current: true,
    facts: [EDUCATION.grade, EDUCATION.semester],
    description: EDUCATION.description,
    tags: EDUCATION.tags,
  },
  ...EXPERIENCE.map((e) => ({
    key: e.role,
    logo: e.logo,
    title: e.role,
    org: e.company,
    link: e.link,
    period: e.period,
    location: e.location,
    description: e.description,
    tags: e.tags,
  })),
];

const dash = (s: string) => s.replace("—", "–");

/* -------------------------------------------------------------------------- */
/*  EXPERIENCE & EDUCATION — timeline with organisation logos as the nodes    */
/* -------------------------------------------------------------------------- */
export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-dark-50">
      <div className="container-custom">
        <SectionHeader
          title="Experience and education"
          description="Where I study, and where I've been putting it to work."
        />

        <ol className="max-w-5xl">
          {ENTRIES.map((entry, i) => (
            <TimelineItem key={entry.key} entry={entry} last={i === ENTRIES.length - 1} />
          ))}
        </ol>

        {/* lines up with the cards: date column (10rem) + gap (2rem) + node (3.5rem) + gap */}
        <div className="mt-12 lg:pl-[17.5rem]">
          <a href={SITE_CONFIG.resumeUrl} download className="btn-outline">
            <Download className="w-4 h-4" aria-hidden="true" />
            Download full résumé
          </a>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ entry, last }: { entry: Entry; last: boolean }) {
  return (
    <li className="flex gap-8">
      {/* When / where — desktop */}
      <div className="hidden lg:block w-40 shrink-0 pt-4 text-right">
        <p className="font-display font-semibold text-dark-900">{dash(entry.period)}</p>
        <p className="mt-1 text-sm text-dark-500">{entry.location}</p>
      </div>

      {/* Node + rail */}
      <div className="hidden sm:flex flex-col items-center shrink-0">
        <div className="w-14 h-14 rounded-2xl bg-white border border-dark-200 shadow-soft flex items-center justify-center">
          <BrandLogo name={entry.logo} size={entry.logo === "STMU" ? 44 : 30} square />
        </div>
        {!last && <div className="flex-1 w-px bg-dark-300/70 my-2" aria-hidden="true" />}
      </div>

      {/* Card */}
      <article className={last ? "flex-1 min-w-0" : "flex-1 min-w-0 pb-6 sm:pb-10"}>
        <div className="rounded-2xl bg-white border border-dark-200 p-6 sm:p-7">
          <div className="sm:hidden mb-4 w-12 h-12 rounded-xl bg-white border border-dark-200 flex items-center justify-center">
            <BrandLogo name={entry.logo} size={entry.logo === "STMU" ? 38 : 26} square />
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="font-display text-xl font-bold tracking-tight text-dark-900">{entry.title}</h3>
            {entry.current && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 border border-green-200 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
                Currently enrolled
              </span>
            )}
          </div>

          {entry.link ? (
            <a
              href={entry.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-700"
            >
              {entry.org}
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          ) : (
            <p className="mt-1 font-semibold text-primary">{entry.org}</p>
          )}

          {/* When / where — mobile */}
          <p className="lg:hidden mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-dark-500">
            <span>{dash(entry.period)}</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              {entry.location}
            </span>
          </p>

          {entry.facts && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {entry.facts.map((f) => (
                <li key={f} className="rounded-lg bg-primary/5 border border-primary/15 px-2.5 py-1 text-sm font-semibold text-primary-800">
                  {f}
                </li>
              ))}
            </ul>
          )}

          <p className="mt-4 text-dark-600 leading-relaxed max-w-[68ch]">{entry.description}</p>

          <ul className="mt-5 pt-5 border-t border-dark-100 flex flex-wrap gap-2">
            {entry.tags.map((t) => (
              <li
                key={t}
                className="inline-flex items-center gap-1.5 rounded-lg border border-dark-200 bg-dark-50 px-2.5 py-1 text-sm text-dark-700"
              >
                <BrandLogo name={t} size={16} square />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </li>
  );
}
