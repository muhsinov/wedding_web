import type { StaticImageData } from "next/image";

export type ImageOrientation = "portrait" | "landscape" | "square";

export interface WeddingImage {
  id: string;
  src: StaticImageData;
  alt: string;
  caption: string;
  eyebrow?: string;
  orientation: ImageOrientation;
  focalPoint?: string;
}

export interface StoryBeat {
  id: string;
  year: string;
  title: string;
  body: string;
  imageId: string;
  quote?: string;
  align: "left" | "right";
}

export interface ScheduleEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  icon: "rings" | "dinner" | "dance";
}

export interface WeddingTheme {
  light: {
    background: string;
    surface: string;
    ink: string;
    muted: string;
    gold: string;
    blush: string;
  };
  dark: {
    background: string;
    surface: string;
    ink: string;
    muted: string;
    gold: string;
    blush: string;
  };
  typography: {
    display: string;
    body: string;
    accent: string;
  };
  motion: {
    intensity: "subtle" | "cinematic";
    petalCount: number;
  };
}

export interface WeddingConfig {
  identity: {
    partnerOne: string;
    partnerTwo: string;
    monogram: string;
    invitationLine: string;
  };
  event: {
    date: string;
    timezone: string;
    locale: string;
    displayDate: string;
  };
  navigation: Array<{ label: string; href: string }>;
  chapters: {
    opening: {
      eyebrow: string;
      action: string;
      skip: string;
      soundNote: string;
    };
    hero: {
      eyebrow: string;
      subtitle: string;
      scrollCue: string;
      countdownLabel: string;
    };
    story: {
      eyebrow: string;
      title: string;
      introduction: string;
      beats: StoryBeat[];
    };
    gallery: { eyebrow: string; title: string; introduction: string };
    schedule: {
      eyebrow: string;
      title: string;
      introduction: string;
      events: ScheduleEvent[];
    };
    venue: {
      eyebrow: string;
      title: string;
      name: string;
      address: string;
      description: string;
      mapEmbedUrl: string;
      directionsUrl: string;
      directionsLabel: string;
      revealMapLabel: string;
    };
    rsvp: {
      eyebrow: string;
      title: string;
      introduction: string;
      deadline: string;
      submitLabel: string;
      pendingLabel: string;
      labels: {
        name: string;
        phone: string;
        attending: string;
        guests: string;
        message: string;
        yes: string;
        no: string;
      };
      placeholders: { name: string; phone: string; message: string };
      maxGuests: number;
      success: { eyebrow: string; title: string; body: string; close: string };
    };
    closing: {
      eyebrow: string;
      title: string;
      body: string;
      replay: string;
      signature: string;
    };
  };
  gallery: WeddingImage[];
  music: {
    src: string;
    title: string;
    artist: string;
    creditUrl: string;
    defaultVolume: number;
    labels: {
      play: string;
      pause: string;
      mute: string;
      unmute: string;
      volume: string;
    };
  };
  contacts: Array<{ label: string; value: string; href: string }>;
  socials: Array<{ label: string; href: string }>;
  theme: WeddingTheme;
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
    imageAlt: string;
    keywords: string[];
  };
}
