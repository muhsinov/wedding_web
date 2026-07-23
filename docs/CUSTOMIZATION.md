# Customization guide

## One configuration source

Edit `src/config/wedding.config.ts`. Scene components contain no event-specific names, story copy, dates, venue data, media paths, or contact details.

The file is checked against `WeddingConfig`, so missing or malformed values fail TypeScript before deployment.

## Couple identity

Update:

```ts
identity: {
  partnerOne: "Amelia",
  partnerTwo: "Luca",
  monogram: "A · L",
  invitationLine: "...",
}
```

Short first names produce the strongest hero composition. For long names, verify the 390 px and 1440 px layouts.

## Date and timezone

Use an ISO date that includes the venue’s UTC offset:

```ts
event: {
  date: "2027-06-12T16:30:00+02:00",
  timezone: "Europe/Rome",
  locale: "en-US",
  displayDate: "12 · 06 · 2027",
}
```

The ISO offset prevents countdown drift for visitors in other timezones. Update both `date` and `timezone` when changing the venue.

## Chapter copy and order

All chapter headings, introductions, button labels, form labels, success copy, and final blessing live under `chapters`.

Navigation is a separate ordered array. Keep labels short enough for the desktop header. Mobile intentionally uses the narrative scroll rather than compressing the header into a menu.

## Story timeline

Each story beat has:

- Stable ID
- Display year
- Title
- Body
- Configured image ID
- Optional quote
- Left or right alignment

Use three to five beats. Too many similar scenes weaken the pacing.

## Photography

Source images live in `src/assets/images` and are statically imported by the configuration.

Recommended source sizes:

- Portrait: at least 1600 × 2000
- Landscape: at least 2000 × 1300
- WebP quality: 82–88
- Avoid embedded text and logos
- Keep the primary subject away from extreme edges

Every gallery entry provides:

```ts
{
  id: "hero",
  src: hero,
  alt: "A useful visual description",
  caption: "Editorial caption",
  eyebrow: "Small context label",
  orientation: "portrait",
  focalPoint: "50% 50%",
}
```

`focalPoint` maps to CSS `object-position`. Adjust it when a mobile crop cuts into the subject.

Keep all image IDs unique. Story beats reference these IDs.

## Opening texture

`public/images/opening-texture.webp` is a tiny, eager editorial background used to make the first scene paint immediately. Keep this file lightweight and opaque. A large photographic replacement will lower Lighthouse performance.

## Music

Replace:

```text
public/audio/wedding-theme.mp3
```

Then update the `music` configuration:

- `src`
- `title`
- `artist`
- `creditUrl`
- `defaultVolume`
- Accessible control labels

Recommended delivery:

- MP3 or AAC with broad browser support
- 96–128 kbps for ambient playback
- 60–120 second clean loop
- Gentle fade at loop boundaries
- Under 2 MB when possible

Audio starts only after the envelope click. Never attempt unmuted autoplay before visitor interaction.

## Venue and map

Update the name, address, arrival instructions, directions URL, and map URL under `chapters.venue`.

The current embed format is:

```text
https://www.google.com/maps?q=LATITUDE,LONGITUDE&z=12&output=embed
```

The iframe is not created until the visitor chooses “Reveal the map,” protecting initial performance and reducing unnecessary third-party requests.

## RSVP wording and limits

Update all labels and the maximum guest count under `chapters.rsvp`.

If `maxGuests` changes, also update the SQL `guest_count` constraint in the migration before creating a new production database. For an existing database, add a new migration rather than editing a migration that has already been applied.

## Theme

The config contains light and dark tokens for:

- Background
- Surface
- Ink
- Muted text
- Gold accent
- Blush accent

These values are emitted as CSS variables by `src/app/page.tsx`. Verify contrast after changing them. Small uppercase gold labels require at least 4.5:1 contrast against their background.

## Typography

Local variable font files live in `src/assets/fonts` and are configured with `next/font/local` in `src/app/layout.tsx`.

To replace a font:

1. Add licensed WOFF2 variable files.
2. Update the matching `localFont` source.
3. Preserve the three semantic roles: display, body, and accent.
4. Update `theme.typography` names for documentation and design-system clarity.
5. Re-check line breaks at 390, 768, 1024, and 1440 px.
6. Re-run Lighthouse because font preload and file size can change LCP.

## SEO and domain

Before launch, change:

- `seo.title`
- `seo.description`
- `seo.canonicalUrl`
- `seo.imageAlt`
- `seo.keywords`
- `NEXT_PUBLIC_SITE_URL`

The Open Graph image is generated in `src/app/opengraph-image.tsx`. It uses the configured names and date.

## Responsive review checklist

- 390 × 844 mobile
- 768 × 1024 tablet
- 1024 × 768 landscape tablet
- 1440 × 900 desktop
- 1920 × 1080 large desktop
- Keyboard-only navigation
- iOS Safari audio start and volume behavior
- Android Chrome gallery swiping
- Reduced-motion operating-system preference
- Light and dark themes

## Final verification

```bash
npm run check
```

Then measure the deployed URL, because hosting latency, final media, analytics, and map behavior can differ from local production results.
