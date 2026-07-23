"use client";

import { Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAudioPlayer } from "@/components/providers/audio-provider";
import { weddingConfig } from "@/config/wedding.config";

type OpeningPhase = "sealed" | "unsealing";

export function OpeningSequence({
  onStart,
  onComplete,
}: {
  onStart: () => void;
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<OpeningPhase>("sealed");
  const completionTimer = useRef<number | null>(null);
  const { start } = useAudioPlayer();
  const copy = weddingConfig.chapters.opening;
  const monogram = weddingConfig.identity.monogram.replace(" · ", "");

  useEffect(
    () => () => {
      if (completionTimer.current) window.clearTimeout(completionTimer.current);
    },
    [],
  );

  const open = () => {
    if (phase !== "sealed") return;

    setPhase("unsealing");
    onStart();
    void start();

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    completionTimer.current = window.setTimeout(
      onComplete,
      reduced ? 700 : 5_200,
    );
  };

  return (
    <div
      className={`opening opening--${phase} opening--${weddingConfig.theme.motion.intensity}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="opening-title"
    >
      <div className="opening__reveal" aria-hidden={phase === "sealed"}>
        <div className="opening__reveal-light" />
        <div className="opening__arch opening__arch--outer" />
        <div className="opening__arch opening__arch--inner" />
        <div className="opening__reveal-copy">
          <p>{copy.ritualLine}</p>
          <h1>
            <span>{weddingConfig.identity.partnerOne}</span>
            <i>&amp;</i>
            <span>{weddingConfig.identity.partnerTwo}</span>
          </h1>
          <div className="opening__reveal-date">
            <span />
            <time dateTime={weddingConfig.event.date}>
              {weddingConfig.event.displayDate}
            </time>
            <span />
          </div>
          <small>{copy.revealNote}</small>
        </div>
      </div>

      <div className="opening__portal" aria-hidden="true">
        <div className="opening__door opening__door--left" />
        <div className="opening__door opening__door--right" />
        <div className="opening__seam" />
      </div>

      <header className="opening__masthead">
        <p id="opening-title">{copy.eyebrow}</p>
        <span>{copy.yearMark}</span>
      </header>

      <button
        className="portal-seal"
        type="button"
        onClick={open}
        disabled={phase !== "sealed"}
        aria-describedby="opening-instruction"
        aria-label={copy.action}
      >
        <span className="portal-seal__orbit" aria-hidden="true" />
        <span className="portal-seal__face">
          <svg aria-hidden="true" viewBox="0 0 64 64">
            <path d="M32 8c8 0 13 4 16 9-2 3-4 5-7 6 6 3 9 8 9 15 0 11-8 18-18 18S14 49 14 38c0-7 3-12 9-15-3-1-5-3-7-6 3-5 8-9 16-9Z" />
            <path d="M26 18c2-4 4-6 6-8 2 2 4 4 6 8M23 29c5 1 8 4 9 9 1-5 4-8 9-9M32 38v12" />
          </svg>
          <strong>{monogram}</strong>
        </span>
        <span className="portal-seal__hint">{copy.action}</span>
      </button>

      <div className="opening__seal-fragments" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <i key={index} />
        ))}
      </div>

      <footer className="opening__footer">
        <div className="opening__invitation-cue" id="opening-instruction">
          <span />
          <p>{copy.instruction}</p>
          <span />
        </div>
        <p className="opening__sound">
          <Volume2 aria-hidden="true" size={13} />
          {copy.soundNote}
        </p>
        <button className="opening__skip" type="button" onClick={onComplete}>
          {copy.skip}
        </button>
      </footer>

      <div className="opening__grain" aria-hidden="true" />
      <div className="opening__vignette" aria-hidden="true" />
    </div>
  );
}
