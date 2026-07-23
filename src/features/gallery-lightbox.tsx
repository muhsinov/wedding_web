"use client";

import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { WeddingImage } from "@/types/wedding";

interface GalleryLightboxProps {
  images: WeddingImage[];
  activeIndex: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}

export function GalleryLightbox({
  images,
  activeIndex,
  onChange,
  onClose,
}: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog = dialogRef.current;
    window.setTimeout(() => dialog?.focus(), 20);

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight")
        onChange((activeIndex + 1) % images.length);
      if (event.key === "ArrowLeft")
        onChange((activeIndex - 1 + images.length) % images.length);
      if (event.key === "Tab" && dialog) {
        const controls = Array.from(
          dialog.querySelectorAll<HTMLElement>(
            "button, [href], [tabindex]:not([tabindex='-1'])",
          ),
        );
        const first = controls[0];
        const last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeIndex, images.length, onChange, onClose]);

  return (
    <AnimatePresence>
      {activeImage && activeIndex !== null ? (
        <m.div
          ref={dialogRef}
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${activeIndex + 1} of ${images.length}: ${activeImage.caption}`}
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <button
            className="lightbox__close"
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
          >
            <X aria-hidden="true" />
          </button>
          <p className="lightbox__counter">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span> /{" "}
            {String(images.length).padStart(2, "0")}
          </p>
          <m.figure
            className="lightbox__figure"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70)
                onChange((activeIndex + 1) % images.length);
              if (info.offset.x > 70)
                onChange((activeIndex - 1 + images.length) % images.length);
            }}
          >
            <m.div
              className="lightbox__image"
              layoutId={`gallery-${activeImage.id}`}
            >
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                priority
                sizes="95vw"
                style={{ objectFit: "contain" }}
              />
            </m.div>
            <figcaption>
              <span>{activeImage.eyebrow}</span>
              <strong>{activeImage.caption}</strong>
            </figcaption>
          </m.figure>
          <div className="lightbox__navigation">
            <button
              type="button"
              onClick={() =>
                onChange((activeIndex - 1 + images.length) % images.length)
              }
              aria-label="Previous image"
            >
              <ArrowLeft aria-hidden="true" />
              <span>Previous</span>
            </button>
            <i aria-hidden="true" />
            <button
              type="button"
              onClick={() => onChange((activeIndex + 1) % images.length)}
              aria-label="Next image"
            >
              <span>Next</span>
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
