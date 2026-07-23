"use client";

import Image from "next/image";
import { Gem, Music2, UtensilsCrossed } from "lucide-react";
import { m, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { weddingConfig } from "@/config/wedding.config";

const icons = { rings: Gem, dinner: UtensilsCrossed, dance: Music2 };

export function ScheduleSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 70%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 75, damping: 24 });
  const copy = weddingConfig.chapters.schedule;
  const image = weddingConfig.gallery.find((item) => item.id === "dance")!;

  return (
    <section
      ref={ref}
      id="schedule"
      className="schedule"
      aria-labelledby="schedule-title"
    >
      <div className="schedule__image" aria-hidden="true">
        <Image src={image.src} alt="" fill sizes="100vw" placeholder="blur" />
      </div>
      <div className="schedule__veil" aria-hidden="true" />
      <div className="page-shell schedule__inner">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          introduction={copy.introduction}
          titleId="schedule-title"
          invert
        />
        <div className="schedule__timeline">
          <div className="schedule__track" aria-hidden="true">
            <m.span style={{ scaleY: progress }} />
          </div>
          {copy.events.map((event, index) => {
            const Icon = icons[event.icon];
            return (
              <m.article
                key={event.id}
                className="schedule-event"
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: index * 0.08 }}
              >
                <div className="schedule-event__time">{event.time}</div>
                <div className="schedule-event__marker">
                  <Icon aria-hidden="true" />
                </div>
                <div className="schedule-event__copy">
                  <p>{event.location}</p>
                  <h3>{event.title}</h3>
                  <span>{event.description}</span>
                </div>
              </m.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
