"use client";

import { useEffect, useMemo, useState } from "react";

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  complete: boolean;
}

function calculate(target: number): CountdownValue {
  const difference = Math.max(0, target - Date.now());
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
    complete: difference === 0,
  };
}

export function useCountdown(date: string) {
  const target = useMemo(() => new Date(date).getTime(), [date]);
  const [value, setValue] = useState<CountdownValue | null>(null);

  useEffect(() => {
    const tick = () => setValue(calculate(target));
    tick();
    const timer = window.setInterval(tick, 1_000);
    return () => window.clearInterval(timer);
  }, [target]);

  return value;
}
