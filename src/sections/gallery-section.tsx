"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { m, useMotionValue, useSpring } from "framer-motion";
import { Expand } from "lucide-react";
import { useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { weddingConfig } from "@/config/wedding.config";
import type { WeddingImage } from "@/types/wedding";

const GalleryLightbox = dynamic(
  () =>
    import("@/features/gallery-lightbox").then(
      (module) => module.GalleryLightbox,
    ),
  { ssr: false },
);

function GalleryArtwork({
  image,
  index,
  onOpen,
  buttonRef,
}: {
  image: WeddingImage;
  index: number;
  onOpen: () => void;
  buttonRef: (element: HTMLButtonElement | null) => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imageX = useSpring(x, { stiffness: 90, damping: 18 });
  const imageY = useSpring(y, { stiffness: 90, damping: 18 });

  return (
    <m.button
      ref={buttonRef}
      type="button"
      className={`gallery-artwork gallery-artwork--${index + 1}`}
      onClick={onOpen}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(((event.clientX - rect.left) / rect.width - 0.5) * 14);
        y.set(((event.clientY - rect.top) / rect.height - 0.5) * 14);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      initial={{ opacity: 0, y: 65 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.9,
        delay: (index % 3) * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-label={`Open image: ${image.caption}`}
    >
      <m.span
        className="gallery-artwork__image"
        layoutId={`gallery-${image.id}`}
        style={{ x: imageX, y: imageY }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 680px) 88vw, (max-width: 1024px) 48vw, 36vw"
          placeholder="blur"
          style={{ objectPosition: image.focalPoint }}
        />
      </m.span>
      <span className="gallery-artwork__shade" aria-hidden="true" />
      <span className="gallery-artwork__index">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="gallery-artwork__caption">
        <small>{image.eyebrow}</small>
        <strong>{image.caption}</strong>
      </span>
      <span className="gallery-artwork__expand">
        <Expand aria-hidden="true" />
      </span>
    </m.button>
  );
}

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const copy = weddingConfig.chapters.gallery;
  const close = () => {
    const previous = activeIndex;
    setActiveIndex(null);
    window.setTimeout(() => {
      if (previous !== null) triggerRefs.current[previous]?.focus();
    }, 120);
  };

  return (
    <section id="gallery" className="gallery" aria-labelledby="gallery-title">
      <div className="page-shell gallery__heading">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          introduction={copy.introduction}
          titleId="gallery-title"
          invert
        />
      </div>
      <div className="gallery__grid page-shell">
        {weddingConfig.gallery.map((image, index) => (
          <GalleryArtwork
            key={image.id}
            image={image}
            index={index}
            onOpen={() => setActiveIndex(index)}
            buttonRef={(element) => {
              triggerRefs.current[index] = element;
            }}
          />
        ))}
      </div>
      <div className="gallery__footer page-shell">
        <span>Private collection</span>
        <i aria-hidden="true" />
        <span>Eight photographs</span>
      </div>
      <GalleryLightbox
        images={weddingConfig.gallery}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
        onClose={close}
      />
    </section>
  );
}
