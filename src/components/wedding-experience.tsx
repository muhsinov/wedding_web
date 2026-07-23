"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { OpeningSequence } from "@/sections/opening-sequence";

const InvitationChapters = dynamic(
  () =>
    import("@/components/invitation-chapters").then(
      (module) => module.InvitationChapters,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="chapters-loading" aria-label="Preparing the invitation" />
    ),
  },
);

export function WeddingExperience() {
  const [started, setStarted] = useState(false);
  const [opened, setOpened] = useState(false);

  const reveal = () => {
    setStarted(true);
    setOpened(true);
    window.setTimeout(
      () => window.scrollTo({ top: 0, behavior: "instant" }),
      20,
    );
  };

  const replay = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.setTimeout(() => {
      setOpened(false);
      setStarted(false);
    }, 500);
  };

  return (
    <>
      {!opened ? (
        <OpeningSequence onStart={() => setStarted(true)} onComplete={reveal} />
      ) : null}
      {started ? (
        <div inert={!opened} aria-hidden={!opened}>
          <InvitationChapters onReplay={replay} />
        </div>
      ) : null}
    </>
  );
}
