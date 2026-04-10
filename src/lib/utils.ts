/**
 * Convert a form checkbox value to a SQLite integer boolean (0 or 1).
 * Checkboxes send "1" when checked, null when unchecked.
 */
export function formBool(val: FormDataEntryValue | null): number {
  return val === "1" ? 1 : 0;
}
