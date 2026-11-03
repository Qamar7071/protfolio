import {
  ArrowUpRight,
  Bot,
  Brain,
  Download,
  GraduationCap,
  MapPin,
  Rocket,
} from "lucide-react";

import { ABOUT, CERTIFICATES, EDUCATION, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import BrandLogo from "@/components/ui/BrandLogo";
import SectionHeader from "@/components/ui/SectionHeader";

const KEY_POINT_ICONS = [Brain, Bot, Rocket, GraduationCap];

/* Verified online certificates only (have a real verify link) — oldest first */
const LEARNING_PATH = CERTIFICATES.filter((c) => c.verifyUrl !== "#")
  .map((c) => ({ ...c, time: new Date(c.date).getTime() }))
  .sort((a, b) => a.time - b.time);

/* -------------------------------------------------------------------------- */
/*  ABOUT                                                                     */
/* -------------------------------------------------------------------------- */
export default function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader
          title="About me"
          description="How I got into machine learning, what I've been certified in, and how I work."
        />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* ============ STORY ============ */}
          <div className="lg:col-span-7">
            <p className="font-display text-xl sm:text-2xl lg:text-[1.75rem] leading-[1.4] tracking-[-0.015em] text-dark-900 max-w-[34ch]">
              {ABOUT.intro}
            </p>

            <div className="mt-8 space-y-5 text-dark-600 leading-[1.75] max-w-[65ch]">
              {ABOUT.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <dl className="mt-12 pt-10 border-t border-dark-200 grid sm:grid-cols-2 gap-x-10 gap-y-8">
              {ABOUT.keyPoints.map((kp, i) => {
                const Icon = KEY_POINT_ICONS[i] ?? Brain;
                return (
                  <div key={kp.title}>
                    <dt className="flex items-center gap-2.5 font-display font-semibold text-dark-900">
                      <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                      {kp.title}
                    </dt>
                    <dd className="mt-2 text-sm text-dark-500 leading-relaxed">{kp.desc}</dd>
                  </div>
                );
              })}
            </dl>

            <div className="mt-12 flex flex-wrap gap-3">
              <a href="#contact" className="btn-primary">
                Start a project
              </a>
              <a href={SITE_CONFIG.resumeUrl} download={SITE_CONFIG.resumeFileName} className="btn-secondary">
                <Download className="w-4 h-4" aria-hidden="true" />
                Download résumé
              </a>
            </div>
          </div>

          {/* ============ SIDEBAR ============ */}
          <aside className="lg:col-span-5 space-y-6">
            {/* Profile */}
            <div className="rounded-3xl bg-dark-50 border border-dark-100 p-6 sm:p-7">
              <h3 className="font-display font-semibold text-lg text-dark-900">Profile</h3>
              <ul className="mt-4 divide-y divide-dark-200">
                <ProfileRow
                  media={<BrandLogo name={EDUCATION.logo} size={40} />}
                  title={EDUCATION.degree}
                  subtitle={EDUCATION.school}
                  meta={`${EDUCATION.period.replace("—", "–")}, ${EDUCATION.grade}`}
                />
                <ProfileRow
                  media={<BrandLogo name="Fiverr" size={28} square />}
                  title="Freelance developer"
                  subtitle="Python, machine learning and prompt engineering"
                  href={SOCIAL_LINKS.fiverr}
                  linkLabel="Fiverr profile"
                />
                <ProfileRow
                  media={<MapPin className="w-5 h-5 text-primary" aria-hidden="true" />}
                  title={SITE_CONFIG.location}
                  subtitle="Open to remote work with clients anywhere"
                />
              </ul>
            </div>

            {/* Learning path */}
            <div className="rounded-3xl border border-dark-200 p-6 sm:p-7">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display font-semibold text-lg text-dark-900">Learning path</h3>
                <span className="text-sm text-dark-500">
                  {LEARNING_PATH.length} verified on Coursera
                </span>
              </div>

              <ol className="mt-5 space-y-5">
                {LEARNING_PATH.map((c) => (
                  <li key={c.id} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-dark-200 flex items-center justify-center shrink-0">
                      <BrandLogo name={c.provider} size={28} square />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-dark-900 leading-snug">{c.title}</p>
                      <p className="mt-1 text-xs text-dark-500">
                        {c.provider}, {c.date}
                      </p>
                      <a
                        href={c.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-700 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                      >
                        Verify certificate
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </li>
                ))}
              </ol>

              <a
                href="#certifications"
                className="mt-6 inline-flex text-sm font-semibold text-dark-700 hover:text-primary transition-colors"
              >
                See all {CERTIFICATES.length} certificates and awards
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ProfileRow({
  media,
  title,
  subtitle,
  meta,
  href,
  linkLabel,
}: {
  media: React.ReactNode;
  title: string;
  subtitle: string;
  meta?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <li className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
      <div className="w-14 h-14 rounded-2xl bg-white border border-dark-100 flex items-center justify-center shrink-0">
        {media}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-dark-900 leading-snug">{title}</p>
        <p className="text-sm text-dark-500 leading-snug">{subtitle}</p>
        {meta && <p className="mt-0.5 text-sm text-dark-500">{meta}</p>}
      </div>
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={linkLabel ?? title}
          className="w-9 h-9 rounded-full flex items-center justify-center text-dark-500 hover:text-primary hover:bg-white transition-colors shrink-0"
        >
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </a>
      )}
    </li>
  );
}
