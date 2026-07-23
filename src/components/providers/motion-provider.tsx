"use client";

import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import type { PropsWithChildren } from "react";

export function MotionProvider({ children }: PropsWithChildren) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.9 }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
