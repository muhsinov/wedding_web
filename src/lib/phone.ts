export function normalizePhone(input: string): string {
  const trimmed = input.trim();
  const withInternationalPrefix = trimmed.startsWith("00")
    ? `+${trimmed.slice(2)}`
    : trimmed;
  const digits = withInternationalPrefix.replace(/\D/g, "");
  return withInternationalPrefix.startsWith("+") ? `+${digits}` : digits;
}

export function isPlausiblePhone(input: string): boolean {
  const digits = normalizePhone(input).replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}
