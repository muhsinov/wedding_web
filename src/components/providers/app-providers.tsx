"use client";

import type { PropsWithChildren } from "react";
import { weddingConfig } from "@/config/wedding.config";
import { AudioProvider } from "./audio-provider";
import { ThemeProvider } from "./theme-provider";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <AudioProvider
        src={weddingConfig.music.src}
        defaultVolume={weddingConfig.music.defaultVolume}
      >
        {children}
      </AudioProvider>
    </ThemeProvider>
  );
}
