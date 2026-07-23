import { describe, expect, it } from "vitest";
import { isPlausiblePhone, normalizePhone } from "@/lib/phone";

describe("phone normalization", () => {
  it("preserves an international prefix and removes formatting", () => {
    expect(normalizePhone(" +998 (90) 123-45-67 ")).toBe("+998901234567");
  });

  it("converts a double-zero prefix", () => {
    expect(normalizePhone("00998 90 123 45 67")).toBe("+998901234567");
  });

  it("rejects implausibly short or long phone values", () => {
    expect(isPlausiblePhone("123")).toBe(false);
    expect(isPlausiblePhone("+998 90 123 45 67")).toBe(true);
    expect(isPlausiblePhone("12345678901234567")).toBe(false);
  });
});
