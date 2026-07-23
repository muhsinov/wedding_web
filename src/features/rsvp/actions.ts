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
      message: "Iltimos, belgilangan ma’lumotlarni tekshiring.",
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
        "RSVP tayyor, ammo Supabase hali sozlanmagan. Hozircha yoshlar bilan bevosita bog‘laning.",
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
        "Bu telefon raqami orqali javob allaqachon yuborilgan. Uni o‘zgartirish uchun yoshlar bilan bog‘laning.",
      fieldErrors: {
        phone: ["Bu telefon raqami bilan javob allaqachon mavjud."],
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
      message: "Javobingiz yuborilmadi. Bir oz kutib, qayta urinib ko‘ring.",
    };
  }

  return { status: "success", guestName: parsed.data.guestName };
}
