"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { m } from "framer-motion";
import { weddingConfig } from "@/config/wedding.config";
import { useAudioPlayer } from "@/components/providers/audio-provider";

function DoiraMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.25" />
      <path d="M12 3v4.75M12 16.25V21M3 12h4.75M16.25 12H21M5.64 5.64 9 9M15 15l3.36 3.36M18.36 5.64 15 9M9 15l-3.36 3.36" />
    </svg>
  );
}

export function MusicPlayer() {
  const {
    isPlaying,
    hasStarted,
    muted,
    volume,
    toggle,
    toggleMuted,
    setVolume,
  } = useAudioPlayer();
  const labels = weddingConfig.music.labels;

  return (
    <m.aside
      className="music-player"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: hasStarted ? 1 : 0.72, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      aria-label="Fon musiqasi boshqaruvi"
    >
      <button
        className="music-player__main"
        type="button"
        onClick={() => void toggle()}
        aria-label={isPlaying ? labels.pause : labels.play}
      >
        <span
          className={
            isPlaying ? "music-disc music-disc--playing" : "music-disc"
          }
        >
          <DoiraMark />
        </span>
        <span className="music-player__copy">
          <span>{isPlaying ? "Hozir yangramoqda" : "Oqshom kayfiyati"}</span>
          <strong>{weddingConfig.music.title}</strong>
        </span>
        {isPlaying ? (
          <Pause aria-hidden="true" size={15} fill="currentColor" />
        ) : (
          <Play aria-hidden="true" size={15} fill="currentColor" />
        )}
      </button>
      <div className="music-player__volume">
        <button
          type="button"
          className="music-player__mute"
          onClick={toggleMuted}
          aria-label={muted ? labels.unmute : labels.mute}
        >
          {muted || volume === 0 ? (
            <VolumeX aria-hidden="true" size={15} />
          ) : (
            <Volume2 aria-hidden="true" size={15} />
          )}
        </button>
        <input
          aria-label={labels.volume}
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
        />
      </div>
    </m.aside>
  );
}
