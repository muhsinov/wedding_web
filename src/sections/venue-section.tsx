"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { weddingConfig } from "@/config/wedding.config";

export function VenueSection() {
  const [showMap, setShowMap] = useState(false);
  const copy = weddingConfig.chapters.venue;
  const image = weddingConfig.gallery.find((item) => item.id === "venue")!;

  return (
    <section id="venue" className="venue" aria-labelledby="venue-title">
      <div className="page-shell venue__heading">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          titleId="venue-title"
        />
      </div>
      <div className="venue__stage">
        <m.div
          className="venue__image"
          initial={{ clipPath: "inset(8% 12% 8% 12%)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            placeholder="blur"
          />
        </m.div>
        <div className="venue__info">
          <MapPin aria-hidden="true" />
          <p>{copy.name}</p>
          <address>{copy.address}</address>
          <span>{copy.description}</span>
          <div className="venue__actions">
            <a
              href={copy.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.directionsLabel}
              <ArrowUpRight aria-hidden="true" />
            </a>
            <button type="button" onClick={() => setShowMap(true)}>
              {copy.revealMapLabel}
            </button>
          </div>
        </div>
      </div>
      {showMap ? (
        <m.div
          className="venue__map page-shell"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <iframe
            title={`${copy.name} manzili xaritasi`}
            src={copy.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </m.div>
      ) : null}
    </section>
  );
}
