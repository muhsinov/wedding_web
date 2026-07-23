import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function getImageById<T extends { id: string }>(
  images: T[],
  id: string,
): T {
  const image = images.find((item) => item.id === id);
  if (!image) throw new Error(`Missing configured image: ${id}`);
  return image;
}
