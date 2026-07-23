import { NoScriptInvitation } from "@/components/no-script-invitation";
import { WeddingExperience } from "@/components/wedding-experience";
import { weddingConfig } from "@/config/wedding.config";

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${weddingConfig.identity.partnerOne} & ${weddingConfig.identity.partnerTwo} nikoh oqshomi`,
    description: weddingConfig.seo.description,
    startDate: weddingConfig.event.date,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: weddingConfig.chapters.venue.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: weddingConfig.chapters.venue.address,
      },
    },
    image: weddingConfig.gallery.map(
      (image) => `${weddingConfig.seo.canonicalUrl}${image.src.src}`,
    ),
    organizer: {
      "@type": "Person",
      name: `${weddingConfig.identity.partnerOne} & ${weddingConfig.identity.partnerTwo}`,
    },
    url: weddingConfig.seo.canonicalUrl,
  };

  const themeCss = `:root{--paper:${weddingConfig.theme.light.background};--surface:${weddingConfig.theme.light.surface};--ink:${weddingConfig.theme.light.ink};--muted:${weddingConfig.theme.light.muted};--gold:${weddingConfig.theme.light.gold};--blush:${weddingConfig.theme.light.blush}}[data-theme="dark"]{--paper:${weddingConfig.theme.dark.background};--surface:${weddingConfig.theme.dark.surface};--ink:${weddingConfig.theme.dark.ink};--muted:${weddingConfig.theme.dark.muted};--gold:${weddingConfig.theme.dark.gold};--blush:${weddingConfig.theme.dark.blush}}`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: themeCss }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <NoScriptInvitation />
      <WeddingExperience />
    </>
  );
}
