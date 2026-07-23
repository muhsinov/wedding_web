import type { MetadataRoute } from "next";
import { weddingConfig } from "@/config/wedding.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: weddingConfig.seo.title,
    short_name: weddingConfig.identity.monogram,
    description: weddingConfig.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: weddingConfig.theme.light.background,
    theme_color: weddingConfig.theme.light.background,
  };
}
