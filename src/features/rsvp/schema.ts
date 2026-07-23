import { z } from "zod";
import { weddingConfig } from "@/config/wedding.config";
import { isPlausiblePhone } from "@/lib/phone";

export const rsvpSchema = z
  .object({
    guestName: z
      .string()
      .trim()
      .min(2, "Iltimos, ism-familiyangizni kiriting.")
      .max(100, "Ism-familiya 100 belgidan oshmasin."),
    phone: z
      .string()
      .trim()
      .min(1, "Iltimos, telefon raqamingizni kiriting.")
      .refine(isPlausiblePhone, "Telefon raqamini to‘g‘ri kiriting."),
    attendanceStatus: z.enum(["attending", "declining"], {
      required_error: "Iltimos, marosimga kelishingizni belgilang.",
    }),
    guestCount: z.coerce
      .number()
      .int()
      .min(0)
      .max(weddingConfig.chapters.rsvp.maxGuests),
    message: z
      .string()
      .trim()
      .max(600, "Tilagingiz 600 belgidan oshmasin.")
      .optional()
      .or(z.literal("")),
    website: z.string().max(0).optional(),
  })
  .superRefine((value, context) => {
    if (value.attendanceStatus === "attending" && value.guestCount < 1) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["guestCount"],
        message: "Kamida bitta mehmonni kiriting.",
      });
    }
    if (value.attendanceStatus === "declining" && value.guestCount !== 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["guestCount"],
        message: "Bormasangiz, mehmonlar soni nol bo‘lishi kerak.",
      });
    }
  });

export type RsvpInput = z.infer<typeof rsvpSchema>;
