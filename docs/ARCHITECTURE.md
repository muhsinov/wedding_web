# Architecture

## Rendering strategy

The application separates the first cinematic impression from the heavier invitation chapters.

1. `src/app/page.tsx` is a Server Component. It emits Event JSON-LD, configuration-derived theme variables, and the invitation shell.
2. `WeddingExperience` is the small client orchestrator for the ceremonial portal state.
3. `OpeningSequence` paints immediately and contains no Framer Motion dependency.
4. Breaking the gold seal starts audio, begins loading `InvitationChapters`, and keeps the suzani portal choreography in front while the chapter bundle becomes ready.
5. `InvitationChapters` is dynamically loaded after interaction and introduces the shared `MotionProvider`.
6. The gallery lightbox is split again and loaded only when a photograph is opened.
7. The Google Map iframe is created only after the visitor requests it.

This boundary is responsible for the fast initial prologue while keeping the full cinematic experience available after interaction.

## Feature boundaries

### Configuration

`src/config/wedding.config.ts` is the only source of event content and visual settings. It is validated at compile time with the `WeddingConfig` interface using `satisfies`, preserving literal inference without sacrificing structural checking.

### Scenes

`src/sections` contains narrative chapters rather than generic page blocks:

- `opening-sequence.tsx`
- `hero-section.tsx`
- `story-section.tsx`
- `gallery-section.tsx`
- `schedule-section.tsx`
- `venue-section.tsx`
- `rsvp-section.tsx`
- `closing-section.tsx`

Scenes own composition and choreography. Shared primitives own behavior that should remain consistent.

### Shared UI and ambience

`src/components/ui` contains reusable interaction patterns, headings, controls, and reveal behavior. `src/components/ambient` contains decorative effects that never intercept input and remain hidden from assistive technology.

### Providers

- `ThemeProvider` persists system, light, or dark mode.
- `AudioProvider` owns one persistent HTML audio element, playback state, smooth fading, mute, and saved volume.
- `MotionProvider` is deferred with the chapters and centralizes Framer Motion features and reduced-motion behavior.

### RSVP feature

`src/features/rsvp` contains the Server Action, Zod contract, and serializable action state. Supabase clients are separated by trust boundary:

- `client.ts`: optional browser client for future authenticated features
- `server.ts`: cookie-aware server client for future Supabase Auth
- `admin.ts`: server-only service-role client used by public RSVP submission

No UI component imports a service-role credential.

## Data flow

```text
Wedding configuration
        ↓
Server metadata and theme variables
        ↓
Scene props and local image imports

Guest form
        ↓
Shared Zod validation
        ↓
Next.js Server Action
        ↓
Phone normalization
        ↓
Server-only Supabase client
        ↓
Database constraints and unique phone key
```

Client validation improves feedback. Server validation is authoritative. The database unique constraint is the final race-condition guard.

## Motion system

Motion uses three distinct registers:

- Tactile: springs and restrained overshoot for controls, the seal, counters, and image entry.
- Cinematic: longer custom easing for scene reveals, paper unfolding, focus shifts, and shared geometry.
- Ambient: bounded petals, light, and parallax that never compete with content.

Reduced-motion mode keeps complete content and hierarchy while removing scroll scrubbing, large perspective travel, continuous rotation, and particle animation.

## Accessibility model

The opening is an accessible dialog with an immediate skip control. Once entered, the full invitation gains a skip link, semantic landmarks, and normal document navigation.

The lightbox traps focus, supports Escape and arrow navigation, restores the originating gallery trigger, and supports touch dragging. Form errors use explicit descriptions and live status roles. Audio always starts from a user gesture.

## Performance model

- Initial route: prologue only
- Deferred: Framer Motion and all chapters
- Further deferred: lightbox and map
- Local variable fonts with optional display and no unnecessary preload contention
- Next.js static image imports with blur placeholders
- Transform and opacity dominant animation
- No scroll-hijacking library
- No third-party analytics or runtime font requests
- Static metadata routes

## Adding a chapter

1. Add the chapter content to `WeddingConfig` and `wedding.config.ts`.
2. Create a scene under `src/sections`.
3. Compose it in `InvitationChapters`.
4. Add a navigation entry only if direct navigation improves the story.
5. Add reduced-motion and mobile composition intentionally.
6. Run `npm run check` and re-test Lighthouse.

## Enabling Supabase Auth later

The `user_id` column and cookie-aware server client are already present.

To enable authentication:

1. Configure a Supabase Auth provider.
2. Add session middleware following the current `@supabase/ssr` guidance.
3. Read the authenticated user through `createSupabaseServerClient`.
4. Store the user ID during RSVP creation.
5. Add narrowly scoped authenticated policies for reading or editing that user’s RSVP.
6. Keep the public Server Action and service role isolated if unauthenticated invitations remain supported.
