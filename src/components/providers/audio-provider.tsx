"use client";

import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface AudioContextValue {
  isPlaying: boolean;
  hasStarted: boolean;
  muted: boolean;
  volume: number;
  start: () => Promise<void>;
  toggle: () => Promise<void>;
  toggleMuted: () => void;
  setVolume: (volume: number) => void;
}

const AudioPlayerContext = createContext<AudioContextValue | null>(null);
const VOLUME_KEY = "wedding-invitation-volume";

export function AudioProvider({
  children,
  src,
  defaultVolume,
}: PropsWithChildren<{ src: string; defaultVolume: number }>) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolumeState] = useState(defaultVolume);

  useEffect(() => {
    const stored = Number(window.localStorage.getItem(VOLUME_KEY));
    if (Number.isFinite(stored) && stored >= 0 && stored <= 1)
      setVolumeState(stored);
  }, []);

  const fade = useCallback((target: number, duration = 900) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    const startedAt = performance.now();
    const initial = audio.volume;
    const step = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      audio.volume = initial + (target - initial) * eased;
      if (progress < 1) frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);
  }, []);

  const start = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    audio.muted = false;
    setMuted(false);
    try {
      await audio.play();
      setHasStarted(true);
      setIsPlaying(true);
      fade(volume, 1_600);
    } catch {
      setIsPlaying(false);
    }
  }, [fade, volume]);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await start();
      return;
    }
    fade(0, 450);
    window.setTimeout(() => {
      audio.pause();
      audio.volume = volume;
      setIsPlaying(false);
    }, 460);
  }, [fade, start, volume]);

  const setVolume = useCallback((next: number) => {
    const bounded = Math.min(1, Math.max(0, next));
    setVolumeState(bounded);
    window.localStorage.setItem(VOLUME_KEY, String(bounded));
    if (audioRef.current) audioRef.current.volume = bounded;
  }, []);

  const toggleMuted = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  }, []);

  useEffect(
    () => () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  const value = useMemo(
    () => ({
      isPlaying,
      hasStarted,
      muted,
      volume,
      start,
      toggle,
      toggleMuted,
      setVolume,
    }),
    [
      isPlaying,
      hasStarted,
      muted,
      volume,
      start,
      toggle,
      toggleMuted,
      setVolume,
    ],
  );

  return (
    <AudioPlayerContext.Provider value={value}>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context)
    throw new Error("useAudioPlayer must be used within AudioProvider");
  return context;
}
