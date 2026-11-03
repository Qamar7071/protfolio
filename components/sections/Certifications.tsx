"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  ArrowUpRight,
  ExternalLink,
  Calendar,
  X,
  ShieldCheck,
  Eye,
  Trophy,
} from "lucide-react";

import { CERTIFICATES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/ui/SectionHeader";

type Certificate = (typeof CERTIFICATES)[number];

const verifiable = (c: Certificate) => Boolean(c.verifyUrl) && c.verifyUrl !== "#";

function StatusBadge({ cert }: { cert: Certificate }) {
  if (verifiable(cert)) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-600 text-white text-xs font-bold shadow-lg">
        <ShieldCheck className="w-3 h-3" aria-hidden="true" />
        Verified
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-dark-900/80 backdrop-blur text-white text-xs font-bold">
      {cert.kind === "award" ? (
        <Trophy className="w-3 h-3" aria-hidden="true" />
      ) : (
        <Award className="w-3 h-3" aria-hidden="true" />
      )}
      {cert.kind === "award" ? "Award" : "Course"}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Image candidates helper — same pattern as Projects                        */
/* -------------------------------------------------------------------------- */
function useImageCandidates(originalPath: string) {
  const candidates = (() => {
    if (!originalPath) return [];
    const lastDot = originalPath.lastIndexOf(".");
    const base = lastDot > 0 ? originalPath.slice(0, lastDot) : originalPath;
    return Array.from(
      new Set([
        originalPath,
        `${base}.png`,
        `${base}.jpg`,
        `${base}.jpeg`,
        `${base}.webp`,
      ]),
    );
  })();

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    setIdx(0);
  }, [originalPath]);

  return {
    src: idx >= candidates.length ? "" : candidates[idx],
    failed: idx >= candidates.length,
    next: () => setIdx((i) => i + 1),
  };
}

/* -------------------------------------------------------------------------- */
/*  CERTIFICATIONS SECTION                                                    */
/* -------------------------------------------------------------------------- */
export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section
      id="certifications"
      className="section-padding bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-radial-fade pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeader
          title="Certifications"
          description="Courses and awards I've earned. The four Coursera certificates carry a verification link you can check yourself."
        />

        {/* CARDS GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATES.map((cert, i) => (
            <CertificateCard
              key={cert.id}
              cert={cert}
              index={i}
              onView={() => setSelectedCert(cert)}
            />
          ))}
        </div>
      </div>

      {/* MODAL */}
      <CertificateModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  CERTIFICATE CARD                                                          */
/* -------------------------------------------------------------------------- */
function CertificateCard({
  cert,
  index,
  onView,
}: {
  cert: Certificate;
  index: number;
  onView: () => void;
}) {
  const pdfUrl = "pdfUrl" in cert ? cert.pdfUrl : undefined;
  const img = useImageCandidates(cert.image);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group bg-white rounded-2xl border border-dark-100 overflow-hidden shadow-soft hover:shadow-card-hover hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 flex flex-col"
    >
      {/* Certificate thumbnail */}
      <div
        className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-dark-50 to-dark-100 cursor-pointer"
        onClick={onView}
      >
        {cert.image && !img.failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img.src}
            alt={cert.title}
            loading="lazy"
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            onError={img.next}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6">
            <Award className="w-14 h-14 text-primary/40" />
            <p className="text-sm font-semibold text-primary/60 text-center">
              {pdfUrl ? "PDF Certificate" : cert.provider}
            </p>
          </div>
        )}

        {/* Status badge — "Verified" only where a verification link exists */}
        <div className="absolute top-3 left-3">
          <StatusBadge cert={cert} />
        </div>

        {/* View overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 via-dark-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-sm font-semibold inline-flex items-center gap-1.5">
            <Eye className="w-4 h-4" aria-hidden="true" />
            View certificate
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Provider */}
        <p className="text-sm mb-2">
          <span className="font-semibold text-primary">{cert.provider}</span>
          <span className="text-dark-500">, {cert.platform}</span>
        </p>

        {/* Title */}
        <h3 className="font-display font-bold text-dark-900 mb-3 leading-snug line-clamp-2 min-h-[3rem]">
          {cert.title}
        </h3>

        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs text-dark-500 mb-4">
          <Calendar className="w-3.5 h-3.5" />
          <span className="font-medium">Issued {cert.date}</span>
        </div>

        {/* Skills earned */}
        {cert.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {cert.skills.slice(0, 3).map((s) => (
              <span
                key={s}
                className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-md font-semibold"
              >
                {s}
              </span>
            ))}
            {cert.skills.length > 3 && (
              <span className="text-xs text-dark-500 px-2 py-0.5">
                +{cert.skills.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto flex items-center gap-2 pt-3 border-t border-dark-100">
          {verifiable(cert) && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              Verify on Coursera
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </a>
          )}
          <button
            type="button"
            onClick={onView}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-dark-700 border border-dark-200 rounded-lg hover:border-primary hover:text-primary transition-colors",
              !verifiable(cert) && "flex-1",
            )}
          >
            <Eye className="w-3.5 h-3.5" />
            View
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*  CERTIFICATE MODAL                                                         */
/* -------------------------------------------------------------------------- */
function CertificateModal({
  cert,
  onClose,
}: {
  cert: Certificate | null;
  onClose: () => void;
}) {
  const pdfUrl = cert && "pdfUrl" in cert ? cert.pdfUrl : undefined;
  const img = useImageCandidates(cert?.image ?? "");

  useEffect(() => {
    if (!cert) return;
    document.body.style.overflow = "hidden";
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
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
          className="fixed inset-0 z-50 bg-dark-900/70 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl"
          >
            {/* Cert image full */}
            <div className="relative bg-dark-50 min-h-[12rem]">
              {cert.image && !img.failed ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img.src}
                  alt={cert.title}
                  className="w-full h-auto"
                  onError={img.next}
                />
              ) : (
                <div className="aspect-[4/3] flex items-center justify-center">
                  <Award className="w-24 h-24 text-primary/40" />
                </div>
              )}

              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur shadow-soft flex items-center justify-center hover:bg-white hover:scale-110 transition-all"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-dark-700" />
              </button>

              <div className="absolute top-4 left-4">
                <StatusBadge cert={cert} />
              </div>
            </div>

            {/* Info */}
            <div className="p-6 sm:p-8">
              <p className="text-sm mb-2">
                <span className="font-semibold text-primary">{cert.provider}</span>
                <span className="text-dark-500">, {cert.platform}</span>
              </p>

              <h2 className="text-xl sm:text-2xl font-display font-bold text-dark-900 mb-3">
                {cert.title}
              </h2>

              <div className="flex items-center gap-1.5 text-sm text-dark-500 mb-6">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">Issued {cert.date}</span>
              </div>

              {/* Skills */}
              {cert.skills.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-dark-900 mb-3">Skills covered</h3>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-dark-100">
                {verifiable(cert) && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                    Verify on Coursera
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                )}
                {pdfUrl && (
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    Open certificate PDF
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
