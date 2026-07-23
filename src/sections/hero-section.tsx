"use client";

import Image from "next/image";
import { m, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { useCountdown } from "@/hooks/use-countdown";
import { weddingConfig } from "@/config/wedding.config";

function CountdownUnit({
  value,
  label,
}: {
  value: number | null;
  label: string;
}) {
  return (
    <div className="countdown__unit">
      <span
        className="countdown__number"
        aria-label={value === null ? undefined : `${value} ${label}`}
        aria-hidden={value === null}
      >
        {value === null ? "––" : String(value).padStart(2, "0")}
      </span>
      <span className="countdown__label">{label}</span>
    </div>
  );
}

function Countdown() {
  const value = useCountdown(weddingConfig.event.date);
  if (value?.complete)
    return <p className="countdown__complete">Today is the day.</p>;
  return (
    <div
      className="countdown"
      aria-label={weddingConfig.chapters.hero.countdownLabel}
      aria-live="off"
    >
      <CountdownUnit value={value?.days ?? null} label="Days" />
      <i aria-hidden="true" />
      <CountdownUnit value={value?.hours ?? null} label="Hours" />
      <i aria-hidden="true" />
      <CountdownUnit value={value?.minutes ?? null} label="Minutes" />
      <i aria-hidden="true" />
      <CountdownUnit value={value?.seconds ?? null} label="Seconds" />
    </div>
  );
}

export function HeroSection({ revealed }: { revealed: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);
  const copy = weddingConfig.chapters.hero;
  const heroImage = weddingConfig.gallery[0];

  return (
    <section
      ref={ref}
      id="invitation"
      className="hero"
      aria-labelledby="hero-title"
    >
      <m.div className="hero__image" style={{ y: imageY, scale: imageScale }}>
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 54vw"
          placeholder="blur"
          style={{ objectPosition: heroImage.focalPoint }}
        />
      </m.div>
      <div className="hero__wash" aria-hidden="true" />
      <div className="hero__paper" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="hero__content">
        <m.p
          className="eyebrow"
          initial={{ opacity: 0, y: 18 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.8 }}
        >
          <span aria-hidden="true" />
          {copy.eyebrow}
        </m.p>
        <h1
          id="hero-title"
          className="hero__names"
          aria-label={`${weddingConfig.identity.partnerOne} and ${weddingConfig.identity.partnerTwo}`}
        >
          <m.span
            initial={{ opacity: 0, y: 90, rotate: 1.5 }}
            animate={revealed ? { opacity: 1, y: 0, rotate: 0 } : {}}
            transition={{ delay: 0.1, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {weddingConfig.identity.partnerOne}
          </m.span>
          <m.em
            initial={{ opacity: 0, scale: 0.7 }}
            animate={revealed ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.75, duration: 0.8 }}
          >
            &amp;
          </m.em>
          <m.span
            initial={{ opacity: 0, y: 90, rotate: -1.5 }}
            animate={revealed ? { opacity: 1, y: 0, rotate: 0 } : {}}
            transition={{ delay: 0.45, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {weddingConfig.identity.partnerTwo}
          </m.span>
        </h1>
        <m.div
          className="hero__details"
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.05, duration: 0.9 }}
        >
          <p>{weddingConfig.event.displayDate}</p>
          <span aria-hidden="true">✦</span>
          <p>{copy.subtitle}</p>
        </m.div>
        <m.div
          className="hero__countdown-wrap"
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ delay: 1.35, duration: 1 }}
        >
          <p>{copy.countdownLabel}</p>
          <Countdown />
        </m.div>
      </div>
      <m.a
        className="hero__scroll"
        href="#story"
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 1 } : {}}
        transition={{ delay: 1.7 }}
      >
        <span>{copy.scrollCue}</span>
        <ArrowDown aria-hidden="true" size={16} />
      </m.a>
    </section>
  );
}
