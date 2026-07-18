"use client";

import { Mail, Phone, MapPin, Heart, ArrowUpRight, Download } from "lucide-react";
import { SITE_CONFIG, SOCIAL_LINKS, FOOTER_LINKS } from "@/lib/constants";
import SocialLinks from "@/components/ui/SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 text-white relative overflow-hidden">
      <div className="border-b border-white/10">
        <div className="container-custom py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-bold">
                Have an AI project in mind?
              </h3>
              <p className="text-sm text-dark-300 mt-1">
                Let&apos;s turn your idea into a deployed reality.
              </p>
            </div>
            <a href="#contact" className="btn-primary shrink-0">
              Start a project
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <a href="#home" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-display font-black text-lg shadow-button">
                Q
              </div>
              <div>
                <p className="font-display font-black text-lg leading-none">
                  {SITE_CONFIG.name}<span className="text-secondary-300">.</span>
                </p>
                <p className="text-xs text-dark-400 mt-0.5">AI/ML · Full-Stack</p>
              </div>
            </a>
            <p className="text-sm text-dark-400 leading-relaxed mb-4">
              {SITE_CONFIG.tagline}
            </p>
            <SocialLinks size="sm" />
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-white">
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.navigate.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-dark-400 hover:text-secondary-300 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-white">
              Services
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-dark-400 hover:text-secondary-300 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-white">
              Get in touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-start gap-2 text-sm text-dark-400 hover:text-secondary-300 transition-colors group">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-primary group-hover:text-secondary-300" />
                  <span className="break-all">{SITE_CONFIG.email}</span>
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-dark-400 hover:text-secondary-300 transition-colors group">
                  <Phone className="w-4 h-4 shrink-0 text-primary group-hover:text-secondary-300" />
                  <span>{SITE_CONFIG.phone}</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-sm text-dark-400">
                  <MapPin className="w-4 h-4 shrink-0 text-primary" />
                  <span>{SITE_CONFIG.location}</span>
                </div>
              </li>
              <li className="pt-2">
                <a href={SITE_CONFIG.resumeUrl} download className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary-300 hover:text-secondary-400 transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  Download Resume
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-dark-400 text-center sm:text-left">
            © {year} {SITE_CONFIG.fullName}. All rights reserved.
          </p>
          <p className="text-xs text-dark-400 flex items-center gap-1.5 flex-wrap justify-center">
            Built with <Heart className="w-3 h-3 fill-red-500 text-red-500" /> using
            <span className="text-white font-semibold">Next.js</span>·
            <span className="text-white font-semibold">Tailwind CSS</span>·
            <span className="text-white font-semibold">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
