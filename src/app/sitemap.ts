import type { MetadataRoute } from "next";
import { resolverUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = resolverUrl();
  return [
    { url, changeFrequency: "weekly", priority: 1 },
    {
      url: `${url}/politica-de-privacidade`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
