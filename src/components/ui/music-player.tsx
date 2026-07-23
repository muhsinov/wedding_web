"use client";

import { Disc3, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { m } from "framer-motion";
import { weddingConfig } from "@/config/wedding.config";
import { useAudioPlayer } from "@/components/providers/audio-provider";

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
      aria-label="Background music controls"
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
          <Disc3 aria-hidden="true" />
        </span>
        <span className="music-player__copy">
          <span>{isPlaying ? "Now playing" : "A little atmosphere"}</span>
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
