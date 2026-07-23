"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      className="round-control"
      aria-label={dark ? "Yorug‘ mavzuga o‘tish" : "Tungi mavzuga o‘tish"}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      <span className="round-control__icon">
        {dark ? (
          <SunMedium aria-hidden="true" />
        ) : (
          <MoonStar aria-hidden="true" />
        )}
      </span>
    </button>
  );
}
