import type { Metadata } from "next";
import { ArrowLeft, Download, Github, Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import { RESUME } from "@/lib/resume";
import { SITE_CONFIG } from "@/lib/constants";
import PrintButton from "./PrintButton";
import styles from "./resume.module.css";

export const metadata: Metadata = {
  title: "Resume",
  description: `One-page resume of ${SITE_CONFIG.fullName}, ${SITE_CONFIG.role} and Python developer in ${SITE_CONFIG.location}.`,
  alternates: { canonical: `${SITE_CONFIG.url}/resume` },
};

const ICONS = {
  email: Mail,
  phone: Phone,
  location: MapPin,
  web: Globe,
  github: Github,
  linkedin: Linkedin,
} as const;

/* newest certificate first */
const CERTS = [...RESUME.certifications].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export default function ResumePage() {
  return (
    <div className={styles.page}>
      {/* ---------- toolbar (screen only) ---------- */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarInner}>
          <a href="/" className={styles.back}>
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Portfolio
          </a>
          <PrintButton />
          <a
            href={SITE_CONFIG.resumeUrl}
            download={SITE_CONFIG.resumeFileName}
            className="btn-primary !px-4 !py-2.5 text-sm"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Download PDF
          </a>
        </div>
      </div>

      {/* ---------- A4 sheet ---------- */}
      <article className={styles.sheet} aria-label={`Resume of ${RESUME.name}`}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.name}>
              {RESUME.name}
              <span className={styles.dot}>.</span>
            </h1>
            <p className={styles.role}>{RESUME.role}</p>
          </div>
          <ul className={styles.contacts}>
            {RESUME.contacts.map((c) => {
              const Icon = ICONS[c.kind];
              const body = (
                <>
                  <Icon aria-hidden="true" />
                  <span>{c.label}</span>
                </>
              );
              return (
                <li key={c.kind} className={styles.contact}>
                  {"href" in c && c.href ? (
                    <a href={c.href} className={styles.contact}>
                      {body}
                    </a>
                  ) : (
                    body
                  )}
                </li>
              );
            })}
          </ul>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Summary</h2>
          <p className={styles.summary}>{RESUME.summary}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <ul className={styles.skills}>
            {RESUME.skills.map((s) => (
              <li key={s.label}>
                <strong>{s.label}:</strong> {s.value}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Projects</h2>
          {RESUME.projects.map((p) => (
            <div key={p.title} className={styles.item}>
              <div className={styles.itemHead}>
                <span className={styles.itemTitle}>{p.title}</span>
                <span className={styles.itemSub}>{p.subtitle}</span>
              </div>
              <p className={styles.itemLinks}>
                <span>{p.stack}</span>
                {p.links.map((l) => (
                  <a key={l.href} href={l.href}>
                    {l.label}
                  </a>
                ))}
              </p>
              <ul className={styles.bullets}>
                {p.bullets.map((b) => (
                  <li key={b.slice(0, 32)}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          {RESUME.experience.map((e) => (
            <div key={e.role} className={styles.item}>
              <div className={styles.itemHead}>
                <span className={styles.itemTitle}>{e.role}</span>
                <span className={styles.itemSub}>
                  {e.org}, {e.where}
                </span>
                <span className={styles.itemMeta}>{e.period}</span>
              </div>
              <ul className={styles.bullets}>
                {e.bullets.map((b) => (
                  <li key={b.slice(0, 32)}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <div className={styles.columns}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Education</h2>
            <div className={styles.itemHead}>
              <span className={styles.itemTitle}>{RESUME.education.degree}</span>
              <span className={styles.itemMeta}>{RESUME.education.period}</span>
            </div>
            <p className={styles.muted}>
              {RESUME.education.school}, {RESUME.education.where}
            </p>
            <p className={styles.muted} style={{ marginTop: "0.6mm" }}>
              {RESUME.education.details}
            </p>

            <h2 className={styles.sectionTitle} style={{ marginTop: "3.4mm" }}>
              Languages
            </h2>
            <p className={styles.muted}>{RESUME.languages}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Certifications</h2>
            <ul className={styles.certs}>
              {CERTS.map((c) => (
                <li key={c.href}>
                  <p className={styles.certTitle}>{c.title}</p>
                  <p className={styles.certMeta}>
                    {c.issuer}, Coursera, {c.date}.{" "}
                    <a href={c.href}>Verify</a>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </div>
  );
}
