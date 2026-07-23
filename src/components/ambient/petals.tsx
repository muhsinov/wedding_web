"use client";

import { m, useReducedMotion } from "framer-motion";
import { weddingConfig } from "@/config/wedding.config";

const petals = [
  { left: "7%", delay: 0.1, duration: 13, size: 12, drift: 48, rotate: 240 },
  { left: "17%", delay: 3.4, duration: 16, size: 9, drift: -32, rotate: -180 },
  { left: "29%", delay: 1.7, duration: 14, size: 14, drift: 26, rotate: 300 },
  { left: "41%", delay: 6.2, duration: 17, size: 8, drift: -40, rotate: 160 },
  { left: "54%", delay: 2.9, duration: 15, size: 11, drift: 52, rotate: -260 },
  { left: "66%", delay: 0.8, duration: 18, size: 10, drift: -22, rotate: 210 },
  { left: "78%", delay: 5.3, duration: 14, size: 13, drift: 34, rotate: -220 },
  { left: "91%", delay: 2.1, duration: 16, size: 8, drift: -48, rotate: 180 },
  { left: "12%", delay: 8.2, duration: 18, size: 7, drift: 24, rotate: -160 },
  { left: "24%", delay: 10.1, duration: 15, size: 10, drift: -38, rotate: 230 },
  { left: "37%", delay: 7.4, duration: 19, size: 8, drift: 44, rotate: -280 },
  { left: "59%", delay: 9.6, duration: 17, size: 7, drift: -28, rotate: 190 },
  { left: "72%", delay: 11.2, duration: 16, size: 9, drift: 36, rotate: -210 },
  { left: "86%", delay: 7.9, duration: 18, size: 7, drift: -46, rotate: 250 },
];

export function Petals({
  active = true,
  className = "",
}: {
  active?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (!active || reduced) return null;

  return (
    <div className={`petals ${className}`} aria-hidden="true">
      {petals
        .slice(0, weddingConfig.theme.motion.petalCount)
        .map((petal, index) => (
          <m.i
            key={index}
            style={{
              left: petal.left,
              width: petal.size,
              height: petal.size * 1.35,
            }}
            initial={{ y: "-10vh", x: 0, rotate: 0, opacity: 0 }}
            animate={{
              y: "110vh",
              x: [0, petal.drift, petal.drift * -0.35, 0],
              rotate: petal.rotate,
              opacity: [0, 0.75, 0.6, 0],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
    </div>
  );
}
