import { Mail, MapPin, Phone } from "lucide-react";

import { FOOTER_LINKS, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import SocialLinks from "@/components/ui/SocialLinks";

const SOURCE_URL = "https://github.com/Qamar7071/protfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 text-white">
      <div className="container-custom pt-16 pb-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Sign-off */}
          <div className="lg:col-span-5">
            <p className="font-display font-bold text-3xl sm:text-4xl tracking-[-0.03em] leading-[1.05]">
              {SITE_CONFIG.fullName}
              <span className="text-secondary-300" aria-hidden="true">.</span>
            </p>
            <p className="mt-3 text-dark-300 leading-relaxed max-w-[40ch]">
              {SITE_CONFIG.role} and Python developer. {SITE_CONFIG.tagline}
            </p>
            <div className="mt-6">
              <SocialLinks size="sm" />
            </div>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer" className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-[1fr_1fr_1.35fr] gap-8">
            <div>
              <h2 className="text-sm font-semibold text-white">Sections</h2>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_LINKS.navigate.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-sm text-dark-300 hover:text-secondary-300 transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">Resume and profiles</h2>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_LINKS.work.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        {...(link.href.endsWith(".pdf") ? { download: SITE_CONFIG.resumeFileName } : {})}
                        className="text-sm text-dark-300 hover:text-secondary-300 transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-sm font-semibold text-white">Contact</h2>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="flex items-start gap-2 text-sm text-dark-300 hover:text-secondary-300 transition-colors"
                  >
                    <Mail className="w-4 h-4 mt-0.5 shrink-0 text-primary-300" aria-hidden="true" />
                    <span className="break-words">{SITE_CONFIG.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-dark-300 hover:text-secondary-300 transition-colors"
                  >
                    <Phone className="w-4 h-4 shrink-0 text-primary-300" aria-hidden="true" />
                    <span>{SITE_CONFIG.phoneDisplay}</span>
                  </a>
                </li>
                <li className="flex items-center gap-2 text-sm text-dark-300">
                  <MapPin className="w-4 h-4 shrink-0 text-primary-300" aria-hidden="true" />
                  <span>{SITE_CONFIG.location}</span>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-dark-400 text-center sm:text-left">
          <p>
            © {year} {SITE_CONFIG.fullName}
          </p>
          <p>
            Built with Next.js, Tailwind CSS and Framer Motion.{" "}
            <a
              href={SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-200 hover:text-secondary-300 underline-offset-4 hover:underline"
            >
              Source on GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
