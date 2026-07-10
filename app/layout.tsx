import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";

import { SITE_CONFIG } from "@/lib/constants";
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
    "Java Developer",
    "Full-Stack Developer",
    "Next.js Developer",
    "Spring Boot Developer",
    "Portfolio",
    "Rawalpindi",
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
    creator: "@qamar",
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
  manifest: "/site.webmanifest",
  category: "technology",
};

/* -------------------------------------------------------------------------- */
/*  VIEWPORT                                                                  */
/* -------------------------------------------------------------------------- */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)",  color: "#ffffff" },
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
  image: `${SITE_CONFIG.url}/avatar.png`,
  email: SITE_CONFIG.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rawalpindi",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  sameAs: [
    "https://github.com/qamar",
    "https://linkedin.com/in/qamar",
    "https://twitter.com/qamar",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Python",
    "Java",
    "Full-Stack Development",
    "Next.js",
    "Spring Boot",
  ],
};

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
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className="min-h-screen bg-white text-dark-900 font-sans antialiased">
        {/* Skip-to-content for accessibility */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50
                     focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
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
              background: "#0f172a",
              color: "#ffffff",
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "14px",
              fontWeight: 500,
              boxShadow: "0 10px 30px -6px rgba(72, 84, 217, 0.35)",
            },
            success: {
              iconTheme: {
                primary: "#4854d9",
                secondary: "#ffffff",
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