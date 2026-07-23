"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { weddingConfig } from "@/config/wedding.config";

export function ClosingSection({ onReplay }: { onReplay: () => void }) {
  const copy = weddingConfig.chapters.closing;
  const image = weddingConfig.gallery.find((item) => item.id === "garden")!;
  return (
    <footer className="closing" aria-labelledby="closing-title">
      <Image src={image.src} alt="" fill sizes="100vw" placeholder="blur" />
      <div className="closing__wash" aria-hidden="true" />
      <m.div
        className="closing__content"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1 }}
      >
        <p className="eyebrow">
          <span aria-hidden="true" />
          {copy.eyebrow}
        </p>
        <h2 id="closing-title">{copy.title}</h2>
        <p>{copy.body}</p>
        <div className="closing__seal" aria-hidden="true">
          {weddingConfig.identity.monogram.replace(" · ", "")}
        </div>
        <strong>{copy.signature}</strong>
        <button type="button" onClick={onReplay}>
          <RotateCcw aria-hidden="true" />
          {copy.replay}
        </button>
      </m.div>
      <div className="closing__meta">
        <span>{weddingConfig.event.displayDate}</span>
        <a
          href={weddingConfig.music.creditUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Music: {weddingConfig.music.artist}
        </a>
      </div>
    </footer>
  );
}
