import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_CONFIG.fullName} — ${SITE_CONFIG.title}`,
    short_name: SITE_CONFIG.fullName,
    description: SITE_CONFIG.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4854d9",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
