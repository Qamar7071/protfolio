import { ArrowUpRight, Bot, Brain, Download, GraduationCap, MapPin, Rocket } from "lucide-react";

import { ABOUT, CERTIFICATES, EDUCATION, PROJECTS, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import BrandLogo from "@/components/ui/BrandLogo";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollWords from "@/components/fx/ScrollWords";
import Counter from "@/components/fx/Counter";
import Magnetic from "@/components/fx/Magnetic";
import { Reveal } from "@/components/fx/Reveal";

const KEY_POINT_ICONS = [Brain, Bot, Rocket, GraduationCap];

/* Verified online certificates only (they have a real verify link), oldest first */
const LEARNING_PATH = CERTIFICATES.filter((c) => c.verifyUrl !== "#")
  .map((c) => ({ ...c, time: new Date(c.date).getTime() }))
  .sort((a, b) => a.time - b.time);

const LIVE_APPS = PROJECTS.filter((p) => p.liveUrl && (p.liveUrl as string) !== "#").length;

const STATS = [
  { value: PROJECTS.length, label: "Projects built and documented" },
  { value: LIVE_APPS, label: "Live apps anyone can open" },
  { value: LEARNING_PATH.length, label: "Verified Coursera certificates" },
  { value: 8, label: "Specialist AI agents in Raahi" },
];

/* -------------------------------------------------------------------------- */
/*  ABOUT                                                                     */
/* -------------------------------------------------------------------------- */
export default function About() {
  return (
    <section id="about" className="relative section-padding overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.14),transparent_65%)] pointer-events-none"
      />

      <div className="container-custom relative">
        <SectionHeader
          index="01"
          label="About"
          title="About *me*"
          description="How I got into machine learning, what I've been certified in, and how I work."
        />

        <div className="grid lg:grid-cols-12 gap-14 lg:gap-16">
          {/* ============ STORY ============ */}
          <div className="lg:col-span-7 xl:col-span-8">
            <ScrollWords
              text={ABOUT.intro}
              className="font-display font-medium text-white text-[clamp(1.6rem,3.4vw,2.9rem)] leading-[1.18] tracking-[-0.025em]"
            />

            <div className="mt-12 space-y-5 text-white/60 leading-[1.8] max-w-[64ch]">
              {ABOUT.paragraphs.map((p, i) => (
                <Reveal key={p.slice(0, 24)} delay={i * 0.08}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 flex flex-wrap gap-3">
              <Magnetic>
                <a href="#contact" className="btn-light">
                  Start a project
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={SITE_CONFIG.resumeUrl} download={SITE_CONFIG.resumeFileName} className="btn-secondary">
                  <Download className="w-4 h-4" aria-hidden="true" />
                  Download résumé
                </a>
              </Magnetic>
            </Reveal>
          </div>

          {/* ============ SIDEBAR ============ */}
          <aside className="lg:col-span-5 xl:col-span-4 space-y-5">
            <Reveal className="spotlight card-dark p-6 sm:p-7">
              <h3 className="eyebrow">Profile</h3>
              <ul className="mt-5 divide-y divide-white/10">
                <ProfileRow
                  media={<BrandLogo name={EDUCATION.logo} size={36} />}
                  title={EDUCATION.degree}
                  subtitle={EDUCATION.school}
                  meta={`${EDUCATION.period.replace("—", "–")}, ${EDUCATION.grade}`}
                />
                <ProfileRow
                  media={<BrandLogo name="Fiverr" size={26} square />}
                  title="Freelance developer"
                  subtitle="Python, machine learning and prompt engineering"
                  href={SOCIAL_LINKS.fiverr}
                  linkLabel="Fiverr profile"
                />
                <ProfileRow
                  media={<MapPin className="w-5 h-5 text-primary-600" aria-hidden="true" />}
                  title={SITE_CONFIG.location}
                  subtitle="Open to remote work with clients anywhere"
                />
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="spotlight card-dark p-6 sm:p-7">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="eyebrow">Learning path</h3>
                <span className="text-xs text-white/45">{LEARNING_PATH.length} verified</span>
              </div>

              <ol className="mt-6 relative space-y-6 before:absolute before:left-[1.4rem] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                {LEARNING_PATH.map((c) => (
                  <li key={c.id} className="relative flex gap-4">
                    <div className="relative z-10 w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0 ring-4 ring-ink-900">
                      <BrandLogo name={c.provider} size={26} square />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white leading-snug">{c.title}</p>
                      <p className="mt-1 text-xs text-white/45">
                        {c.provider}, {c.date}
                      </p>
                      <a
                        href={c.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline mt-1.5 text-xs font-semibold text-secondary-300"
                      >
                        Verify certificate
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </aside>
        </div>

        {/* ============ STATS ============ */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className="py-8 lg:py-12 pr-4 lg:pl-8 lg:first:pl-0 border-b border-white/10 lg:border-b-0 lg:border-l lg:first:border-l-0 even:pl-4 lg:even:pl-8"
            >
              <Counter
                to={s.value}
                className="block font-display font-bold tracking-[-0.05em] text-white text-6xl sm:text-7xl lg:text-8xl leading-none"
              />
              <p className="mt-3 text-sm text-white/50 max-w-[22ch]">{s.label}</p>
            </Reveal>
          ))}
        </div>

        {/* ============ KEY POINTS ============ */}
        <ul className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ABOUT.keyPoints.map((kp, i) => {
            const Icon = KEY_POINT_ICONS[i] ?? Brain;
            return (
              <Reveal as="li" key={kp.title} delay={i * 0.08} className="spotlight card-dark p-6 lg:p-7 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="grid place-items-center w-12 h-12 rounded-2xl bg-primary-500/15 text-primary-300 border border-primary-400/20">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm text-white/30">0{i + 1}</span>
                </div>
                <h3 className="mt-8 font-display text-xl font-semibold text-white">{kp.title}</h3>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">{kp.desc}</p>
              </Reveal>
            );
          })}
        </ul>
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
      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0">{media}</div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-white leading-snug">{title}</p>
        <p className="text-sm text-white/50 leading-snug">{subtitle}</p>
        {meta && <p className="mt-0.5 text-sm text-white/50">{meta}</p>}
      </div>
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={linkLabel ?? title}
          className="w-9 h-9 rounded-full grid place-items-center text-white/50 border border-white/10 hover:text-ink-950 hover:bg-secondary-300 hover:border-secondary-300 transition-colors shrink-0"
        >
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </a>
      )}
    </li>
  );
}
