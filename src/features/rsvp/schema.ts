import { z } from "zod";
import { weddingConfig } from "@/config/wedding.config";
import { isPlausiblePhone } from "@/lib/phone";

export const rsvpSchema = z
  .object({
    guestName: z
      .string()
      .trim()
      .min(2, "Please enter your full name.")
      .max(100, "Please keep your name under 100 characters."),
    phone: z
      .string()
      .trim()
      .min(1, "Please enter a phone number.")
      .refine(isPlausiblePhone, "Please enter a valid phone number."),
    attendanceStatus: z.enum(["attending", "declining"], {
      required_error: "Please choose whether you can attend.",
    }),
    guestCount: z.coerce
      .number()
      .int()
      .min(0)
      .max(weddingConfig.chapters.rsvp.maxGuests),
    message: z
      .string()
      .trim()
      .max(600, "Please keep your note under 600 characters.")
      .optional()
      .or(z.literal("")),
    website: z.string().max(0).optional(),
  })
  .superRefine((value, context) => {
    if (value.attendanceStatus === "attending" && value.guestCount < 1) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["guestCount"],
        message: "Please include at least one guest.",
      });
    }
    if (value.attendanceStatus === "declining" && value.guestCount !== 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["guestCount"],
        message: "Guest count must be zero when declining.",
      });
    }
  });

export type RsvpInput = z.infer<typeof rsvpSchema>;
