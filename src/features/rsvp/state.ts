export interface RsvpActionState {
  status: "idle" | "success" | "error" | "duplicate";
  message?: string;
  guestName?: string;
  fieldErrors?: Partial<
    Record<
      "guestName" | "phone" | "attendanceStatus" | "guestCount" | "message",
      string[]
    >
  >;
}

export const initialRsvpState: RsvpActionState = { status: "idle" };
