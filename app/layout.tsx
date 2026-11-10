import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, Space_Grotesk } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";

import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import Chatbot from "@/components/ui/Chatbot";

/* -------------------------------------------------------------------------- */
/*  FONTS                                                                     */
/* -------------------------------------------------------------------------- */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-serif",
  display: "swap",
});

/* -------------------------------------------------------------------------- */
/*  METADATA                                                                  */
/* -------------------------------------------------------------------------- */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.fullName} — ${SITE_CONFIG.title}`,
    template: `%s | ${SITE_CONFIG.fullName}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Qamar Abbas",
    "AI Engineer",
    "ML Engineer",
    "Python Developer",
    "Data Scientist",
    "Machine Learning",
    "Deep Learning",
    "AI Agents",
    "Portfolio",
    "Islamabad",
    "Pakistan",
    "Freelance Developer",
  ],
  authors: [{ name: SITE_CONFIG.fullName, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.fullName,
  publisher: SITE_CONFIG.fullName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.fullName,
    title: `${SITE_CONFIG.fullName} — ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.fullName} — ${SITE_CONFIG.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.fullName} — ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  category: "technology",
};

/* -------------------------------------------------------------------------- */
/*  VIEWPORT                                                                  */
/* -------------------------------------------------------------------------- */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#05050a" },
    { media: "(prefers-color-scheme: dark)", color: "#05050a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* -------------------------------------------------------------------------- */
/*  JSON-LD STRUCTURED DATA                                                   */
/* -------------------------------------------------------------------------- */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_CONFIG.fullName,
  jobTitle: SITE_CONFIG.title,
  url: SITE_CONFIG.url,
  image: `${SITE_CONFIG.url}/avatar-full.webp`,
  email: SITE_CONFIG.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Islamabad",
    addressCountry: "PK",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Shifa Tameer-e-Millat University",
  },
  sameAs: [
    SOCIAL_LINKS.github,
    SOCIAL_LINKS.linkedin,
    SOCIAL_LINKS.facebook,
    SOCIAL_LINKS.fiverr,
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Python",
    "scikit-learn",
    "TensorFlow",
    "Keras",
    "Flask",
    "Prompt Engineering",
  ],
};

/* Runs before first paint: play the page intro only on the home page, on the
   first visit of a session, and never for people who prefer reduced motion. */
const INTRO_SCRIPT = `try{if(location.pathname==="/"&&!sessionStorage.getItem("intro-seen")&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.setAttribute("data-intro","on")}}catch(e){}`;

/* -------------------------------------------------------------------------- */
/*  ROOT LAYOUT                                                               */
/* -------------------------------------------------------------------------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className="min-h-screen bg-ink-950 text-white/90 font-sans antialiased">
        {/* Skip-to-content for accessibility */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50
                     focus:bg-secondary-300 focus:text-ink-950 focus:px-4 focus:py-2 focus:rounded-full"
        >
          Skip to main content
        </a>

        {/* Page content */}
        <main id="main" className="relative">
          {children}
        </main>

        {/* Global chatbot widget */}
        <Chatbot />

        {/* Global toast notifications (top-right to avoid overlap with chatbot) */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#13141f",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "14px",
              padding: "12px 16px",
              fontSize: "14px",
              fontWeight: 500,
              boxShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.7)",
            },
            success: {
              iconTheme: {
                primary: "#ffd166",
                secondary: "#05050a",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}