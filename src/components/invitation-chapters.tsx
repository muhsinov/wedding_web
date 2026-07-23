"use client";

import { Petals } from "@/components/ambient/petals";
import { MotionProvider } from "@/components/providers/motion-provider";
import { MusicPlayer } from "@/components/ui/music-player";
import { SiteHeader } from "@/components/ui/site-header";
import { weddingConfig } from "@/config/wedding.config";
import { ClosingSection } from "@/sections/closing-section";
import { GallerySection } from "@/sections/gallery-section";
import { HeroSection } from "@/sections/hero-section";
import { RsvpSection } from "@/sections/rsvp-section";
import { ScheduleSection } from "@/sections/schedule-section";
import { StorySection } from "@/sections/story-section";
import { VenueSection } from "@/sections/venue-section";

export function InvitationChapters({ onReplay }: { onReplay: () => void }) {
  return (
    <MotionProvider>
      <div
        className="invitation-chapters"
        data-motion-intensity={weddingConfig.theme.motion.intensity}
      >
        <a className="skip-link" href="#story">
          Skip to the story
        </a>
        <SiteHeader visible />
        <div className="experience">
          <main>
            <HeroSection revealed />
            <StorySection />
            <GallerySection />
            <ScheduleSection />
            <VenueSection />
            <RsvpSection />
          </main>
          <ClosingSection onReplay={onReplay} />
        </div>
        <Petals className="petals--ambient" />
        <MusicPlayer />
      </div>
    </MotionProvider>
  );
}
