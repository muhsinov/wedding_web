"use client";

import { m } from "framer-motion";
import { weddingConfig } from "@/config/wedding.config";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader({ visible }: { visible: boolean }) {
  return (
    <m.header
      className="site-header"
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : -18,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={{ duration: 0.7 }}
    >
      <a
        href="#invitation"
        className="site-header__monogram"
        aria-label="Boshiga qaytish"
      >
        {weddingConfig.identity.monogram}
      </a>
      <nav aria-label="Taklifnoma bo‘limlari">
        {weddingConfig.navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <ThemeToggle />
    </m.header>
  );
}
