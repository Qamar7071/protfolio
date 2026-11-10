"use client";

import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";

import { FOOTER_LINKS, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { scrollToSection } from "@/lib/scroll";
import SocialLinks from "@/components/ui/SocialLinks";
import LocalTime from "@/components/fx/LocalTime";
import Magnetic from "@/components/fx/Magnetic";

const SOURCE_URL = "https://github.com/Qamar7071/protfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      <div className="container-custom pt-20 pb-12">
        <div className="grid lg:grid-cols-12 gap-14">
          {/* sign-off */}
          <div className="lg:col-span-5">
            <p className="font-display font-bold text-3xl sm:text-4xl tracking-[-0.03em] leading-[1.05] text-white">
              Have an idea?
              <br />
              <span className="accent text-gradient">Let&apos;s make it real.</span>
            </p>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="link-underline mt-6 text-lg text-white/80 hover:text-white break-all"
            >
              {SITE_CONFIG.email}
            </a>
            <div className="mt-8">
              <SocialLinks size="sm" />
            </div>
          </div>

          {/* link columns */}
          <nav aria-label="Footer" className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-[1fr_1fr_1.3fr] gap-10">
            <div>
              <h2 className="eyebrow">Sections</h2>
              <ul className="mt-5 space-y-2.5">
                {FOOTER_LINKS.navigate.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="link-underline text-sm text-white/60 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="eyebrow">Profiles</h2>
              <ul className="mt-5 space-y-2.5">
                {FOOTER_LINKS.work.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        {...(link.href.endsWith(".pdf") ? { download: SITE_CONFIG.resumeFileName } : {})}
                        className="link-underline text-sm text-white/60 hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h2 className="eyebrow">Contact</h2>
              <ul className="mt-5 space-y-2.5 text-sm text-white/60">
                <li>
                  <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-white">
                    WhatsApp {SITE_CONFIG.phoneDisplay}
                  </a>
                </li>
                <li>{SITE_CONFIG.location}</li>
                <li>
                  Local time <LocalTime className="text-white" />
                </li>
              </ul>
              <Magnetic className="mt-8">
                <button
                  type="button"
                  onClick={() => scrollToSection("#home")}
                  className="group grid place-items-center w-16 h-16 rounded-full border border-white/15 text-white hover:bg-secondary-300 hover:text-ink-950 hover:border-secondary-300 transition-colors duration-300"
                  aria-label="Back to top"
                >
                  <ArrowUp className="w-5 h-5 transition-transform duration-500 group-hover:-translate-y-1" aria-hidden="true" />
                </button>
              </Magnetic>
            </div>
          </nav>
        </div>
      </div>

      {/* giant name */}
      <div aria-hidden="true" className="relative select-none pointer-events-none overflow-hidden">
        <motion.p
          initial={{ y: "45%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -5% 0px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-center whitespace-nowrap leading-[0.78] tracking-[-0.06em] text-[15.5vw] bg-gradient-to-b from-white/[0.22] to-white/[0.02] bg-clip-text text-transparent -mb-[1.2vw]"
        >
          Qamar Abbas
        </motion.p>
      </div>

      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40 text-center sm:text-left">
          <p>
            © {year} {SITE_CONFIG.fullName}. Designed &amp; built in Islamabad.
          </p>
          <p>
            Next.js, Tailwind CSS, Framer Motion &amp; Lenis.{" "}
            <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" className="link-underline text-white/70 hover:text-white">
              Source
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
