"use client";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { KOFI_URL } from "@/app/lib/donation";

/* ──────────────────────── DONATE BUTTON ────────────────────────
 * The one "filled" button on the site. Everything else is clear glass, so the
 * aurora gradient (same stops as AuroraBackground) makes it the obvious CTA
 * without introducing a new colour.
 *   • gradient fill at 70% so the background still reads through
 *   • hairline white/30 border + top specular highlight = liquid-glass edge
 *   • always links to the Ko-fi page (KOFI_URL) in a new tab
 *   • data-umami-* attributes let Umami count clicks per placement
 */
const SIZES = {
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
} as const;

interface DonateButtonProps {
  placement: string;
  /* Replaces the default heart icon */
  icon?: React.ReactNode;
  size?: keyof typeof SIZES;
  className?: string;
  children: React.ReactNode;
}

export function DonateButton({ placement, icon, size = "md", className, children }: DonateButtonProps) {
  const shared = {
    whileTap: { scale: 0.96 },
    "data-umami-event": "donate-click",
    "data-umami-event-placement": placement,
    className: cn(
      "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold text-white",
      "bg-gradient-to-r from-[#F566FF]/70 via-[#DC56E6]/70 to-[#6092E1]/70 backdrop-blur-xl",
      "border border-white/30 shadow-[0_8px_32px_rgba(220,86,230,0.35)]",
      "hover:shadow-[0_8px_40px_rgba(220,86,230,0.55)] hover:brightness-110",
      "transition-[box-shadow,filter] duration-300",
      SIZES[size],
      className,
    ),
  };

  const content = (
    <>
      {/* Specular highlight across the top half — the "liquid" in liquid glass */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent"
      />
      {icon ?? <Heart className="relative w-4 h-4 fill-white/90 transition-transform duration-300 group-hover:scale-110" />}
      <span className="relative">{children}</span>
    </>
  );

  return (
    <motion.a
      href={KOFI_URL}
      target="_blank"
      rel="noopener noreferrer"
      // Until NEXT_PUBLIC_KOFI_USERNAME is set, don't jump to "#"
      onClick={(e) => { if (KOFI_URL === "#") e.preventDefault(); }}
      {...shared}
    >
      {content}
    </motion.a>
  );
}
