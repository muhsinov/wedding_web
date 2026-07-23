import { describe, expect, it } from "vitest";
import { isPlausiblePhone, normalizePhone } from "@/lib/phone";

describe("phone normalization", () => {
  it("preserves an international prefix and removes formatting", () => {
    expect(normalizePhone(" +39 (055) 123-4567 ")).toBe("+390551234567");
  });

  it("converts a double-zero prefix", () => {
    expect(normalizePhone("0039 055 123 4567")).toBe("+390551234567");
  });

  it("rejects implausibly short or long phone values", () => {
    expect(isPlausiblePhone("123")).toBe(false);
    expect(isPlausiblePhone("+39 055 123 4567")).toBe(true);
    expect(isPlausiblePhone("12345678901234567")).toBe(false);
  });
});
