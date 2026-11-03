import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_CONFIG.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_CONFIG.url}/resume`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
