/* ──────────────────────── DONATION CONFIG ────────────────────────
 * Donations go through Ko-fi. Both donate buttons on the site (the /support
 * page and the card at the end of each episode page) link to KOFI_URL.
 */
export const KOFI_USERNAME = process.env.NEXT_PUBLIC_KOFI_USERNAME ?? "";
export const KOFI_URL = KOFI_USERNAME ? `https://ko-fi.com/${KOFI_USERNAME}` : "#";
