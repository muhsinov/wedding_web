import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { AppProviders } from "@/components/providers/app-providers";
import { weddingConfig } from "@/config/wedding.config";
import "./globals.css";

const display = localFont({
  src: "../assets/fonts/bodoni-moda.woff2",
  variable: "--font-display",
  weight: "400 900",
  display: "swap",
  preload: true,
});

const body = localFont({
  src: "../assets/fonts/manrope.woff2",
  variable: "--font-body",
  weight: "200 800",
  display: "swap",
  preload: true,
});

const accent = localFont({
  src: [
    {
      path: "../assets/fonts/newsreader.woff2",
      weight: "200 800",
      style: "normal",
    },
    {
      path: "../assets/fonts/newsreader-italic.woff2",
      weight: "200 800",
      style: "italic",
    },
  ],
  variable: "--font-accent",
  display: "optional",
  preload: false,
});

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? weddingConfig.seo.canonicalUrl;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: weddingConfig.seo.title,
  description: weddingConfig.seo.description,
  keywords: weddingConfig.seo.keywords,
  applicationName: `${weddingConfig.identity.partnerOne} & ${weddingConfig.identity.partnerTwo}`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: weddingConfig.seo.title,
    description: weddingConfig.seo.description,
    siteName: weddingConfig.seo.title,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: weddingConfig.seo.imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: weddingConfig.seo.title,
    description: weddingConfig.seo.description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f0e7" },
    { media: "(prefers-color-scheme: dark)", color: "#041219" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/uzbek-portal-desktop.webp"
          type="image/webp"
          media="(min-width: 721px)"
        />
        <link
          rel="preload"
          as="image"
          href="/images/uzbek-portal-mobile.webp"
          type="image/webp"
          media="(max-width: 720px)"
        />
      </head>
      <body
        className={`${display.variable} ${body.variable} ${accent.variable}`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
