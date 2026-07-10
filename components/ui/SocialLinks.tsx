"use client";

import { SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Brand SVG icons (inline so nothing depends on missing icon packages)      */
/* -------------------------------------------------------------------------- */
function GmailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.909 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function FiverrIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M18.4 15.6c-.6 0-1.1.4-1.3.9h-2.5v-1c0-.4.2-.5.6-.5h.8v-1.8h-1.4c-1.5 0-2.4.9-2.4 2.4v.9h-1.7v-.9c0-.4.2-.5.6-.5h.5v-1.8h-1.3c-1.5 0-2.4.9-2.4 2.4v.9H6v1.8h1.5v3.9h2.1V19h1.7v3.9h2.1V19h2.5c.2.5.7.9 1.3.9.8 0 1.4-.6 1.4-1.4s-.6-1.4-1.4-1.4M11.3 12.4c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1"/>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Social item config                                                        */
/* -------------------------------------------------------------------------- */
type SocialItem = {
  name: string;
  href: string;
  Icon: (p: { className?: string }) => JSX.Element;
  brand: string; // hover brand color
};

const SOCIALS: SocialItem[] = [
  {
    name: "Gmail",
    // Opens Gmail compose (falls back to default mail app via mailto if you prefer)
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${SITE_CONFIG.email}`,
    Icon: GmailIcon,
    brand: "#ea4335",
  },
  {
    name: "WhatsApp",
    href: SOCIAL_LINKS.whatsapp,
    Icon: WhatsAppIcon,
    brand: "#25d366",
  },
  {
    name: "GitHub",
    href: SOCIAL_LINKS.github,
    Icon: GitHubIcon,
    brand: "#181717",
  },
  {
    name: "LinkedIn",
    href: SOCIAL_LINKS.linkedin,
    Icon: LinkedInIcon,
    brand: "#0a66c2",
  },
  {
    name: "Facebook",
    href: SOCIAL_LINKS.facebook,
    Icon: FacebookIcon,
    brand: "#1877f2",
  },
  {
    name: "Fiverr",
    href: SOCIAL_LINKS.fiverr,
    Icon: FiverrIcon,
    brand: "#1dbf73",
  },
];

/* -------------------------------------------------------------------------- */
/*  SocialLinks component                                                     */
/* -------------------------------------------------------------------------- */
export default function SocialLinks({
  className,
  iconClassName,
  size = "md",
}: {
  className?: string;
  iconClassName?: string;
  size?: "sm" | "md" | "lg";
}) {
  const boxSize =
    size === "sm" ? "w-9 h-9" : size === "lg" ? "w-12 h-12" : "w-11 h-11";
  const iconSize =
    size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {SOCIALS.map(({ name, href, Icon, brand }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          title={name}
          className={cn(
            "group inline-flex items-center justify-center rounded-xl",
            "bg-white border border-dark-200 text-dark-500 shadow-soft",
            "transition-all duration-200 hover:-translate-y-1 hover:shadow-card hover:border-transparent",
            boxSize,
          )}
          style={{ ["--brand" as string]: brand }}
        >
          <span
            className="flex items-center justify-center transition-colors duration-200 group-hover:text-[var(--brand)]"
          >
            <Icon className={cn(iconSize, iconClassName)} />
          </span>
        </a>
      ))}
    </div>
  );
}

/* Export individual icons in case they're needed elsewhere (footer, contact) */
export { GmailIcon, WhatsAppIcon, GitHubIcon, LinkedInIcon, FacebookIcon, FiverrIcon };