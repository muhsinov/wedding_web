"use server";

import { normalizePhone } from "@/lib/phone";
import { createAdminClient } from "@/lib/supabase/admin";
import { rsvpSchema } from "./schema";
import type { RsvpActionState } from "./state";

export async function submitRsvp(
  _: RsvpActionState,
  formData: FormData,
): Promise<RsvpActionState> {
  const raw = {
    guestName: formData.get("guestName"),
    phone: formData.get("phone"),
    attendanceStatus: formData.get("attendanceStatus"),
    guestCount: formData.get("guestCount"),
    message: formData.get("message"),
    website: formData.get("website"),
  };

  const parsed = rsvpSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review the highlighted details.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (parsed.data.website)
    return { status: "success", guestName: parsed.data.guestName };

  const supabase = createAdminClient();
  if (!supabase) {
    return {
      status: "error",
      message:
        "RSVP is ready but Supabase has not been configured. Please contact the couple directly for now.",
    };
  }

  const { error } = await supabase.from("rsvps").insert({
    guest_name: parsed.data.guestName,
    phone: parsed.data.phone,
    phone_normalized: normalizePhone(parsed.data.phone),
    attendance_status: parsed.data.attendanceStatus,
    guest_count:
      parsed.data.attendanceStatus === "declining" ? 0 : parsed.data.guestCount,
    message: parsed.data.message || null,
  });

  if (error?.code === "23505") {
    return {
      status: "duplicate",
      message:
        "We already have a reply for this phone number. Contact the couple if you need to change it.",
      fieldErrors: {
        phone: ["A reply using this phone number already exists."],
      },
    };
  }

  if (error) {
    console.error("RSVP submission failed", {
      code: error.code,
      details: error.details,
    });
    return {
      status: "error",
      message:
        "Your reply could not be sent. Please wait a moment and try again.",
    };
  }

  return { status: "success", guestName: parsed.data.guestName };
}
