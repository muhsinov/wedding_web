# The Unfolding Letter

A cinematic, configuration-driven wedding invitation built as an interactive short film rather than a conventional landing page.

The experience moves through a tactile envelope opening, editorial hero, scroll-directed love story, museum-style gallery, day-to-night schedule, venue arrival, secure RSVP ritual, and quiet final blessing. Every chapter has authored motion, responsive art direction, reduced-motion behavior, and graceful failure states.

## Quality snapshot

- Next.js 15 App Router and React 19
- Strict TypeScript and feature-based architecture
- Tailwind CSS 4 plus a bespoke editorial design system
- Framer Motion with deferred loading after the envelope interaction
- Supabase Server Action RSVP flow with database duplicate prevention
- Original local editorial imagery with responsive Next.js optimization
- Persistent, user-initiated background audio with fade and volume memory
- Light and candlelit dark themes
- Keyboard, touch, screen-reader, and reduced-motion support
- Metadata, Open Graph, Twitter cards, sitemap, robots, and Event JSON-LD
- Measured production Lighthouse: 97 Performance, 100 Accessibility, 100 Best Practices, 100 SEO
- Zero automated WCAG violations after entering the invitation
- Zero known production dependency vulnerabilities at final verification

## Quick start

### Prerequisites

- Node.js 20 or newer
- npm 10 or newer
- A Supabase project for persistent RSVP submissions

### Install

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

The invitation renders without Supabase credentials, but RSVP submissions return a clear configuration message until the environment is connected.

## Environment variables

Copy `.env.example` to `.env.local` and provide:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Security notes:

- `SUPABASE_SERVICE_ROLE_KEY` is server-only. Never prefix it with `NEXT_PUBLIC_`.
- The browser does not write directly to the RSVP table.
- Public submissions pass through a validated Next.js Server Action.
- Row-level security remains enabled even when Supabase Auth is not yet active.

See [docs/SUPABASE.md](docs/SUPABASE.md) for the complete setup and security model.

## Supabase setup

1. Create a Supabase project.
2. Open the SQL Editor.
3. Run `supabase/migrations/202607230001_create_rsvps.sql`.
4. Add the four environment variables above to `.env.local`.
5. Restart the development server.
6. Submit a test RSVP and confirm the row in `public.rsvps`.
7. Submit the same phone number again to verify duplicate protection.

The migration creates:

- UUID primary key
- Guest name
- Original and normalized phone numbers
- Attendance status
- Guest count
- Optional message
- Nullable future Auth user reference
- UTC creation timestamp
- Database constraints and unique phone index
- Row-level security with no anonymous direct-table policy

## Customize the wedding

All event-specific content is owned by one file:

```text
src/config/wedding.config.ts
```

Edit that file to replace:

- Couple names and monogram
- Invitation wording
- Date, locale, and timezone
- Chapter labels and navigation
- Story timeline
- Gallery captions, alt text, focal points, and image references
- Schedule entries
- Venue, map, and directions links
- RSVP wording and guest limit
- Music file, metadata, and default volume
- Contact and social links
- Light and dark colors
- Typography role labels
- Motion intensity and petal count
- SEO, canonical URL, keywords, and social preview copy

No wedding-specific copy or media path is hardcoded inside scene components.

For image dimensions, media replacement, theme tuning, typography, and motion guidance, see [docs/CUSTOMIZATION.md](docs/CUSTOMIZATION.md).

## Project structure

```text
wedding_web/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── CUSTOMIZATION.md
│   └── SUPABASE.md
├── public/
│   ├── audio/
│   │   └── wedding-theme.mp3
│   ├── images/
│   │   └── opening-texture.webp
│   └── icon.svg
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── manifest.ts
│   │   ├── opengraph-image.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── assets/
│   │   ├── fonts/
│   │   └── images/
│   ├── components/
│   │   ├── ambient/
│   │   ├── providers/
│   │   ├── ui/
│   │   ├── invitation-chapters.tsx
│   │   └── wedding-experience.tsx
│   ├── config/
│   │   └── wedding.config.ts
│   ├── features/
│   │   ├── gallery-lightbox.tsx
│   │   └── rsvp/
│   ├── hooks/
│   ├── lib/
│   │   └── supabase/
│   ├── sections/
│   ├── types/
│   └── __tests__/
└── supabase/
    └── migrations/
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for component boundaries and design decisions.

## Available commands

```bash
npm run dev        # Start Turbopack development mode
npm run lint       # Run Next.js ESLint rules
npm run typecheck  # Run strict TypeScript checks
npm run test       # Run Vitest tests
npm run build      # Build the production application
npm run start      # Serve the production build
npm run format     # Format the repository with Prettier
npm run check      # Run lint, types, tests, and production build
```

## Deploy to Vercel

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, choose **Add New → Project**.
3. Import this repository.
4. Keep the detected framework as **Next.js**.
5. Add all environment variables from `.env.example`.
6. Deploy.
7. Set the production URL as `NEXT_PUBLIC_SITE_URL` and redeploy so canonical and social metadata use the real domain.
8. Verify RSVP submission from the deployed domain.
9. Run Lighthouse against the deployed page after final photography or analytics changes.

No custom build command is required. Vercel uses `npm run build` automatically.

## Performance architecture

The first scene is intentionally tiny and immediately paintable. Framer Motion, gallery behavior, the map, and the complete chapter experience are deferred until the visitor opens or skips the envelope. This keeps the prologue responsive while preserving rich motion after interaction.

Additional safeguards include:

- Local variable fonts
- Static server-rendered metadata and structured data
- Responsive WebP and AVIF image delivery
- Blur placeholders and intrinsic dimensions
- Lazy gallery images
- On-demand lightbox and map
- Transform and opacity dominant animation
- Bounded particle counts
- Offscreen-friendly scene structure
- Native scrolling instead of scroll hijacking
- Stable countdown hydration

Lighthouse scores depend on the final hosting region, images, analytics, and third-party embeds. Re-test after customization.

## Accessibility

- Immediate ceremony-skip path
- Keyboard-operable navigation, gallery, audio, theme, map, and RSVP controls
- Lightbox focus trap, Escape and arrow navigation, and focus restoration
- Semantic headings and landmarks
- Live error and submission feedback
- High-contrast light and dark palettes
- `prefers-reduced-motion` choreography
- Meaningful image alternatives and captions
- Decorative ambience removed from the accessibility tree
- No audio before explicit visitor interaction

## Media license

The bundled music is **Starfield Romance** by Yoiyami, released under **CC0 1.0 Universal**. Attribution is not required, but the invitation includes a credit link in the closing scene.

The editorial wedding images were generated specifically for this project. Replace them with the couple’s licensed photography before a real launch.

## Production checklist

Before publishing a real invitation:

- Replace every placeholder identity, contact, venue, and social value.
- Replace example.com with the final canonical domain.
- Replace or approve all photography and music rights.
- Confirm the timezone and ISO offset in the event date.
- Verify the map and directions destinations.
- Apply the Supabase migration in production.
- Confirm Vercel environment variables.
- Test duplicate RSVP behavior.
- Test on iOS Safari, Android Chrome, macOS Safari, and desktop Chromium.
- Test keyboard and reduced-motion flows.
- Re-run Lighthouse after final media is uploaded.
- Submit a production RSVP and verify the database row.
