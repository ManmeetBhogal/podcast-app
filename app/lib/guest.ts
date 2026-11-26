/* ──────────────────────── GUEST FORM CONFIG ────────────────────────
 * Guest interest submissions go through Wayne State University's Qualtrics form.
 * Mirrors app/lib/donation.ts: configured via NEXT_PUBLIC_GUEST_FORM_URL in
 * .env.local and Vercel so the URL stays out of source control and builds still
 * succeed locally when unset.
 */
export const GUEST_FORM_URL =
  process.env.NEXT_PUBLIC_GUEST_FORM_URL?.trim() || "#";
