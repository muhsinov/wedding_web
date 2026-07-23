"use client";

/* The tiny eager texture is intentionally native so it can become the first visual paint. */
/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight, Volume2 } from "lucide-react";
import { useState } from "react";
import { useAudioPlayer } from "@/components/providers/audio-provider";
import { weddingConfig } from "@/config/wedding.config";

type OpeningPhase = "sealed" | "opening";

export function OpeningSequence({
  onStart,
  onComplete,
}: {
  onStart: () => void;
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<OpeningPhase>("sealed");
  const { start } = useAudioPlayer();
  const copy = weddingConfig.chapters.opening;

  const open = () => {
    setPhase("opening");
    onStart();
    void start();
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.setTimeout(onComplete, reduced ? 350 : 2_850);
  };

  return (
    <div
      className={`opening opening--${phase} opening--${weddingConfig.theme.motion.intensity}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="opening-title"
    >
      <img
        className="opening__texture"
        src="/images/opening-texture.webp"
        alt="An ivory invitation surface washed with soft blush light"
        width="1200"
        height="900"
        loading="eager"
        fetchPriority="high"
      />
      <div className="opening__light" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="opening__content">
        <p id="opening-title" className="eyebrow opening__eyebrow">
          <span aria-hidden="true" />
          {copy.eyebrow}
        </p>
        <div className="envelope-stage" aria-hidden="true">
          <div className="envelope-shadow" />
          <div className="envelope">
            <div className="envelope__back" />
            <div className="letter">
              <div className="letter__border" />
              <span className="letter__monogram">
                {weddingConfig.identity.monogram}
              </span>
              <span className="letter__date">
                {weddingConfig.event.displayDate}
              </span>
            </div>
            <div className="envelope__pocket envelope__pocket--left" />
            <div className="envelope__pocket envelope__pocket--right" />
            <div className="envelope__pocket envelope__pocket--front" />
            <div className="envelope__flap" />
            <div className="wax-seal">
              <span>{weddingConfig.identity.monogram.replace(" · ", "")}</span>
            </div>
          </div>
        </div>
        <div className="opening__actions">
          <button
            className="magnetic-button magnetic-button--dark"
            type="button"
            onClick={open}
            disabled={phase === "opening"}
          >
            <span>{copy.action}</span>
            <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
          </button>
          <button className="opening__skip" type="button" onClick={onComplete}>
            {copy.skip}
          </button>
        </div>
        <p className="opening__sound">
          <Volume2 aria-hidden="true" size={14} />
          {copy.soundNote}
        </p>
      </div>
      <div className="opening-petals" aria-hidden="true">
        {Array.from({ length: 8 }, (_, index) => (
          <i key={index} />
        ))}
      </div>
    </div>
  );
}
