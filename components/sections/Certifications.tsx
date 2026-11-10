"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Award, Calendar, ExternalLink, ShieldCheck, Trophy, X } from "lucide-react";

import { CERTIFICATES } from "@/lib/constants";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import BrandLogo from "@/components/ui/BrandLogo";
import SectionHeader from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/fx/Reveal";

type Certificate = (typeof CERTIFICATES)[number];

const verifiable = (c: Certificate) => Boolean(c.verifyUrl) && c.verifyUrl !== "#";
const VERIFIED = CERTIFICATES.filter(verifiable);
const OTHERS = CERTIFICATES.filter((c) => !verifiable(c));

/* Try the given image, then the same name with other extensions */
function useImageCandidates(originalPath: string) {
  const lastDot = originalPath.lastIndexOf(".");
  const base = lastDot > 0 ? originalPath.slice(0, lastDot) : originalPath;
  const candidates = originalPath
    ? Array.from(new Set([originalPath, `${base}.webp`, `${base}.png`, `${base}.jpg`]))
    : [];

  const [idx, setIdx] = useState(0);
  useEffect(() => setIdx(0), [originalPath]);

  return {
    src: idx >= candidates.length ? "" : candidates[idx],
    failed: idx >= candidates.length,
    next: () => setIdx((i) => i + 1),
  };
}

/* -------------------------------------------------------------------------- */
/*  CERTIFICATIONS                                                            */
/* -------------------------------------------------------------------------- */
export default function Certifications() {
  const [selected, setSelected] = useState<Certificate | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="certifications" className="relative section-padding overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/3 w-[620px] h-[620px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.12),transparent_65%)] pointer-events-none"
      />
      <div className="container-custom relative">
        <SectionHeader
          index="04"
          label="Certifications"
          title="Proof of *learning*"
          description="Courses and awards I've earned. The four Coursera certificates carry a verification link you can check yourself."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VERIFIED.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 0.08} className="h-full">
              <VerifiedCard cert={cert} onView={() => setSelected(cert)} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24">
          <h3 className="eyebrow mb-6">School courses & awards</h3>
        </Reveal>
        <ul className="border-t border-white/10">
          {OTHERS.map((cert, i) => (
            <Reveal as="li" key={cert.id} delay={i * 0.05} y={20} className="border-b border-white/10">
              <AwardRow cert={cert} onView={() => setSelected(cert)} />
            </Reveal>
          ))}
        </ul>
      </div>

      <CertificateModal cert={selected} onClose={close} />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  VERIFIED CARD                                                             */
/* -------------------------------------------------------------------------- */
function VerifiedCard({ cert, onView }: { cert: Certificate; onView: () => void }) {
  const img = useImageCandidates(cert.image);

  return (
    <article className="group spotlight card-dark overflow-hidden h-full flex flex-col">
      <button
        type="button"
        onClick={onView}
        data-cursor="view"
        aria-label={`View certificate: ${cert.title}`}
        className="relative block w-full aspect-[4/3] overflow-hidden bg-ink-800"
      >
        {!img.failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img.src}
            alt=""
            loading="lazy"
            onError={img.next}
            className="w-full h-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]"
          />
        ) : (
          <span className="w-full h-full grid place-items-center">
            <Award className="w-14 h-14 text-white/20" aria-hidden="true" />
          </span>
        )}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-emerald-400 text-ink-950 text-xs font-bold px-2.5 py-1">
          <ShieldCheck className="w-3 h-3" aria-hidden="true" />
          Verified
        </span>
      </button>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2.5">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-white shrink-0">
            <BrandLogo name={cert.provider} size={20} square />
          </span>
          <span className="text-sm text-white/60">{cert.provider}</span>
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold text-white leading-snug">{cert.title}</h3>
        <p className="mt-2 text-xs text-white/45">Issued {cert.date}</p>
        <a
          href={cert.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline self-start mt-auto pt-6 text-sm font-semibold text-secondary-300"
        >
          Verify on Coursera
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  AWARD ROW — hover list                                                    */
/* -------------------------------------------------------------------------- */
function AwardRow({ cert, onView }: { cert: Certificate; onView: () => void }) {
  const img = useImageCandidates(cert.image);
  const Icon = cert.kind === "award" ? Trophy : Award;

  return (
    <button
      type="button"
      onClick={onView}
      data-cursor="view"
      className="group w-full grid grid-cols-[4.5rem_1fr_auto] sm:grid-cols-[6rem_1fr_auto_auto] items-center gap-4 sm:gap-8 py-5 text-left"
    >
      <span className="relative block aspect-[4/3] rounded-xl overflow-hidden bg-ink-800 border border-white/10">
        {!img.failed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img.src}
            alt=""
            loading="lazy"
            onError={img.next}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
      </span>
      <span className="min-w-0">
        <span className="block font-display text-lg sm:text-2xl font-semibold tracking-tight text-white transition-all duration-500 group-hover:text-secondary-300 group-hover:translate-x-2">
          {cert.title}
        </span>
        <span className="mt-1 flex items-center gap-1.5 text-sm text-white/45">
          <Icon className="w-3.5 h-3.5" aria-hidden="true" />
          {cert.provider}, {cert.platform}
        </span>
      </span>
      <span className="hidden sm:block text-sm text-white/45 tabular-nums">{cert.date}</span>
      <span className="grid place-items-center w-10 h-10 rounded-full border border-white/15 text-white/70 transition-all duration-500 group-hover:bg-secondary-300 group-hover:text-ink-950 group-hover:border-secondary-300 group-hover:-rotate-45">
        <ArrowUpRight className="w-4 h-4 rotate-45" aria-hidden="true" />
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  CERTIFICATE MODAL                                                         */
/* -------------------------------------------------------------------------- */
function CertificateModal({ cert, onClose }: { cert: Certificate | null; onClose: () => void }) {
  const pdfUrl = cert && "pdfUrl" in cert ? cert.pdfUrl : undefined;
  const img = useImageCandidates(cert?.image ?? "");

  useEffect(() => {
    if (!cert) return;
    lockScroll();
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onEsc);
    };
  }, [cert, onClose]);

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          data-lenis-prevent
          className="fixed inset-0 z-[80] bg-ink-950/80 backdrop-blur-md flex items-end sm:items-center justify-center sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.97 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-t-[2rem] sm:rounded-[2rem] border border-white/10 bg-ink-900 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]"
          >
            <div className="relative bg-ink-800 min-h-[12rem]">
              {cert.image && !img.failed ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img.src} alt={cert.title} className="w-full h-auto" onError={img.next} />
              ) : (
                <div className="aspect-[4/3] grid place-items-center">
                  <Award className="w-24 h-24 text-white/20" aria-hidden="true" />
                </div>
              )}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 grid place-items-center w-11 h-11 rounded-full bg-ink-950/70 backdrop-blur border border-white/15 text-white hover:bg-secondary-300 hover:text-ink-950 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-9">
              <p className="text-sm">
                <span className="font-semibold text-secondary-300">{cert.provider}</span>
                <span className="text-white/50">, {cert.platform}</span>
              </p>
              <h2 id="cert-modal-title" className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {cert.title}
              </h2>
              <p className="mt-3 flex items-center gap-1.5 text-sm text-white/50">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                Issued {cert.date}
              </p>

              {cert.skills.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {cert.skills.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {(verifiable(cert) || pdfUrl) && (
                <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-3">
                  {verifiable(cert) && (
                    <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="btn-light">
                      <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                      Verify on Coursera
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                  {pdfUrl && (
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                      Open certificate PDF
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
