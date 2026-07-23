import dance from "@/assets/images/dance.webp";
import garden from "@/assets/images/garden.webp";
import groom from "@/assets/images/groom.webp";
import hero from "@/assets/images/hero.webp";
import rings from "@/assets/images/rings.webp";
import table from "@/assets/images/table.webp";
import veil from "@/assets/images/veil.webp";
import venue from "@/assets/images/venue.webp";
import type { WeddingConfig } from "@/types/wedding";

export const weddingConfig = {
  identity: {
    partnerOne: "Amelia",
    partnerTwo: "Luca",
    monogram: "A · L",
    invitationLine:
      "Together with their families, invite you to witness the beginning of forever.",
  },
  event: {
    date: "2027-06-12T16:30:00+02:00",
    timezone: "Europe/Rome",
    locale: "en-US",
    displayDate: "12 · 06 · 2027",
  },
  navigation: [
    { label: "Story", href: "#story" },
    { label: "Gallery", href: "#gallery" },
    { label: "The day", href: "#schedule" },
    { label: "Venue", href: "#venue" },
    { label: "RSVP", href: "#rsvp" },
  ],
  chapters: {
    opening: {
      eyebrow: "A private invitation",
      action: "Open the invitation",
      skip: "Enter without the ceremony",
      soundNote: "Sound accompanies this experience",
    },
    hero: {
      eyebrow: "Florence · Summer MMXXVII",
      subtitle: "One afternoon. One promise. A lifetime unfolding.",
      scrollCue: "Follow our story",
      countdownLabel: "Until we meet beneath the Tuscan sun",
    },
    story: {
      eyebrow: "Chapter I · Our story",
      title: "Some stories arrive softly.",
      introduction:
        "Ours began with a borrowed umbrella, a rain-soaked street, and the curious feeling that we had met before.",
      beats: [
        {
          id: "first-light",
          year: "MMXXI",
          title: "A chance beginning",
          body: "A quiet café, a sudden summer storm, and a conversation that made the whole city disappear. We stayed until the chairs were turned over around us.",
          imageId: "garden",
          quote: "The rain stopped. We did not notice.",
          align: "left",
        },
        {
          id: "chosen-days",
          year: "MMXXIII",
          title: "A thousand ordinary miracles",
          body: "Morning coffee, long train rides, Sunday markets, and the kind of laughter that changes the shape of a room. Love became less a moment and more a way of seeing.",
          imageId: "rings",
          align: "right",
        },
        {
          id: "the-promise",
          year: "MMXXVI",
          title: "The easiest yes",
          body: "In a garden washed with evening light, the future became wonderfully simple. There was one question, one breath, and then every road ahead belonged to us both.",
          imageId: "veil",
          quote: "Wherever we go, we go together.",
          align: "left",
        },
      ],
    },
    gallery: {
      eyebrow: "Chapter II · Fragments",
      title: "A small museum of us.",
      introduction:
        "Eight studies in light, movement, and the beautiful spaces between words.",
    },
    schedule: {
      eyebrow: "Chapter III · The day",
      title: "From promise to midnight.",
      introduction:
        "Come for the vows. Stay for the candlelight, the music, and the stories we will tell for years.",
      events: [
        {
          id: "ceremony",
          time: "16:30",
          title: "The ceremony",
          description:
            "Vows in the rose garden as the late-afternoon light crosses the stone terrace.",
          location: "The Rose Court",
          icon: "rings",
        },
        {
          id: "dinner",
          time: "19:00",
          title: "Dinner beneath the olives",
          description:
            "A long Tuscan table, local wine, candlelight, and a menu made for lingering.",
          location: "The Olive Terrace",
          icon: "dinner",
        },
        {
          id: "dance",
          time: "22:00",
          title: "The night begins",
          description:
            "Our first dance, then yours. Comfortable shoes and beautiful chaos encouraged.",
          location: "The Lantern Courtyard",
          icon: "dance",
        },
      ],
    },
    venue: {
      eyebrow: "Chapter IV · Arrival",
      title: "Meet us where the roses climb the old stone.",
      name: "Villa Roseto",
      address: "Via delle Rose 12 · Firenze, Italia",
      description:
        "A private garden villa overlooking the Tuscan hills, twenty minutes from the heart of Florence. Transfers will leave from Piazza Santa Maria Novella at 15:30.",
      mapEmbedUrl:
        "https://www.google.com/maps?q=43.7696,11.2558&z=12&output=embed",
      directionsUrl:
        "https://www.google.com/maps/search/?api=1&query=43.7696,11.2558",
      directionsLabel: "Open in Google Maps",
      revealMapLabel: "Reveal the map",
    },
    rsvp: {
      eyebrow: "Chapter V · Your reply",
      title: "Will you share this day with us?",
      introduction:
        "Your place at our table is waiting. Kindly reply before the first day of May.",
      deadline: "Please reply by 01 May 2027",
      submitLabel: "Seal my reply",
      pendingLabel: "Sending your reply…",
      labels: {
        name: "Your full name",
        phone: "Phone number",
        attending: "Will you join us?",
        guests: "Number of guests",
        message: "A note for the couple",
        yes: "Joyfully accepting",
        no: "Regretfully declining",
      },
      placeholders: {
        name: "e.g. Sofia Bennett",
        phone: "+39 000 000 0000",
        message: "Your wishes, dietary notes, or anything we should know…",
      },
      maxGuests: 6,
      success: {
        eyebrow: "Your reply is on its way",
        title: "A place in our story.",
        body: "Thank you. We have received your reply and tucked it safely beside our invitation.",
        close: "Return to the invitation",
      },
    },
    closing: {
      eyebrow: "The final page",
      title: "Until then, with all our love.",
      body: "We cannot wait to stand beneath the summer sky with the people who made us who we are.",
      replay: "Open the invitation again",
      signature: "Amelia & Luca",
    },
  },
  gallery: [
    {
      id: "hero",
      src: hero,
      alt: "A couple walking through a rose garden",
      caption: "Where the story becomes a promise",
      eyebrow: "Florence, MMXXVII",
      orientation: "portrait",
      focalPoint: "50% 50%",
    },
    {
      id: "garden",
      src: garden,
      alt: "A couple walking away through an evening garden",
      caption: "The long way home",
      eyebrow: "Golden hour",
      orientation: "landscape",
      focalPoint: "52% 52%",
    },
    {
      id: "veil",
      src: veil,
      alt: "A bride beneath a translucent veil",
      caption: "A quiet breath before forever",
      eyebrow: "Study in ivory",
      orientation: "portrait",
      focalPoint: "50% 38%",
    },
    {
      id: "rings",
      src: rings,
      alt: "Two hands wearing simple gold wedding bands",
      caption: "Two promises, held close",
      eyebrow: "The vow",
      orientation: "landscape",
      focalPoint: "50% 58%",
    },
    {
      id: "groom",
      src: groom,
      alt: "A groom waiting beside a rose-covered stone wall",
      caption: "Waiting for the music to begin",
      eyebrow: "Before the ceremony",
      orientation: "portrait",
      focalPoint: "52% 50%",
    },
    {
      id: "table",
      src: table,
      alt: "An ivory place setting with a candle and blush rose",
      caption: "A seat saved for you",
      eyebrow: "After sunset",
      orientation: "portrait",
      focalPoint: "50% 52%",
    },
    {
      id: "venue",
      src: venue,
      alt: "A candlelit villa terrace prepared for dinner",
      caption: "When the garden turns to gold",
      eyebrow: "Villa Roseto",
      orientation: "landscape",
      focalPoint: "50% 58%",
    },
    {
      id: "dance",
      src: dance,
      alt: "A newlywed couple dancing on a candlelit terrace",
      caption: "And then, only music",
      eyebrow: "The first dance",
      orientation: "landscape",
      focalPoint: "50% 50%",
    },
  ],
  music: {
    src: "/audio/wedding-theme.mp3",
    title: "Starfield Romance",
    artist: "Yoiyami · CC0",
    creditUrl:
      "https://opengameart.org/content/starfield-romance-%E2%80%93-cc0-ambient-emotional-space-theme-yoiyami-blue-series-%E2%80%93-no3",
    defaultVolume: 0.36,
    labels: {
      play: "Play music",
      pause: "Pause music",
      mute: "Mute",
      unmute: "Unmute",
      volume: "Music volume",
    },
  },
  contacts: [
    {
      label: "Wedding concierge",
      value: "+39 000 000 0000",
      href: "tel:+390000000000",
    },
    {
      label: "Write to us",
      value: "hello@example.com",
      href: "mailto:hello@example.com",
    },
  ],
  socials: [{ label: "Instagram", href: "https://instagram.com/" }],
  theme: {
    light: {
      background: "#f7f3ec",
      surface: "#fffdf8",
      ink: "#201b18",
      muted: "#746a63",
      gold: "#815b2a",
      blush: "#d7a7a2",
    },
    dark: {
      background: "#171214",
      surface: "#211a1d",
      ink: "#f8f1e7",
      muted: "#b9aaa5",
      gold: "#d5ad6d",
      blush: "#b77e83",
    },
    typography: {
      display: "Bodoni Moda",
      body: "Manrope",
      accent: "Newsreader",
    },
    motion: { intensity: "cinematic", petalCount: 14 },
  },
  seo: {
    title: "Amelia & Luca · The Wedding Invitation",
    description:
      "Join Amelia and Luca for an unforgettable summer wedding beneath the Tuscan sun.",
    canonicalUrl: "https://example.com",
    imageAlt: "Amelia and Luca in a Tuscan rose garden",
    keywords: [
      "Amelia and Luca",
      "wedding invitation",
      "Florence wedding",
      "Villa Roseto",
    ],
  },
} satisfies WeddingConfig;

export type WeddingConfiguration = typeof weddingConfig;
