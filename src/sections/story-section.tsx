"use client";

import Image from "next/image";
import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { weddingConfig } from "@/config/wedding.config";
import { getImageById } from "@/lib/utils";
import type { StoryBeat } from "@/types/wedding";

function StoryScene({ beat, index }: { beat: StoryBeat; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const image = getImageById(weddingConfig.gallery, beat.imageId);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-45, 45]);
  const copyY = useTransform(scrollYProgress, [0, 1], [35, -20]);

  return (
    <article ref={ref} className={`story-scene story-scene--${beat.align}`}>
      <m.figure className="story-scene__visual" style={{ y: imageY }}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 90vw, 55vw"
          placeholder="blur"
          style={{ objectPosition: image.focalPoint }}
        />
        <figcaption>{image.caption}</figcaption>
      </m.figure>
      <m.div className="story-scene__copy" style={{ y: copyY }}>
        <span className="story-scene__number" aria-hidden="true">
          0{index + 1}
        </span>
        <p className="story-scene__year">{beat.year}</p>
        <h3>{beat.title}</h3>
        <p>{beat.body}</p>
        {beat.quote ? <blockquote>{beat.quote}</blockquote> : null}
      </m.div>
    </article>
  );
}

export function StorySection() {
  const copy = weddingConfig.chapters.story;
  return (
    <section id="story" className="story" aria-labelledby="story-title">
      <div className="story__opening page-shell">
        <Reveal>
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
            introduction={copy.introduction}
            titleId="story-title"
          />
        </Reveal>
        <Reveal delay={0.2} className="story__aside">
          <span>Uch muhim lahza</span>
          <i aria-hidden="true" />
          <span>Bir umrga yoyilgan hikoya</span>
        </Reveal>
      </div>
      <div className="story__scenes page-shell">
        {copy.beats.map((beat, index) => (
          <StoryScene key={beat.id} beat={beat} index={index} />
        ))}
      </div>
    </section>
  );
}
