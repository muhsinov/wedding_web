import { describe, expect, it } from "vitest";
import { rsvpSchema } from "@/features/rsvp/schema";

describe("RSVP validation", () => {
  it("accepts a valid attending reply", () => {
    const result = rsvpSchema.safeParse({
      guestName: "Sofia Bennett",
      phone: "+39 055 123 4567",
      attendanceStatus: "attending",
      guestCount: "2",
      message: "Vegetarian, please.",
      website: "",
    });
    expect(result.success).toBe(true);
  });

  it("requires at least one guest when attending", () => {
    const result = rsvpSchema.safeParse({
      guestName: "Sofia Bennett",
      phone: "+39 055 123 4567",
      attendanceStatus: "attending",
      guestCount: "0",
      message: "",
      website: "",
    });
    expect(result.success).toBe(false);
  });

  it("requires zero guests when declining", () => {
    const result = rsvpSchema.safeParse({
      guestName: "Sofia Bennett",
      phone: "+39 055 123 4567",
      attendanceStatus: "declining",
      guestCount: "1",
      message: "",
      website: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects bot honeypot submissions", () => {
    const result = rsvpSchema.safeParse({
      guestName: "Sofia Bennett",
      phone: "+39 055 123 4567",
      attendanceStatus: "declining",
      guestCount: "0",
      message: "",
      website: "spam.example",
    });
    expect(result.success).toBe(false);
  });
});
