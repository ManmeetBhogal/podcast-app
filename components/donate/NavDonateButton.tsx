import Link from "next/link";

/* ──────────────────────── NAVBAR "SUPPORT" LINK ────────────────────────
 * Rendered in GlassNavBar's `cta` slot, so it's on every page that has the nav.
 * Plain text with exactly the same classes as the About / Episodes links.
 * (It's a route, not a #section anchor, so it can't go through `items`.)
 */
export default function NavDonateButton() {
  return (
    <Link
      href="/support"
      className="ml-2 rounded-full px-3 sm:px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all active:scale-95"
    >
      Support
    </Link>
  );
}
