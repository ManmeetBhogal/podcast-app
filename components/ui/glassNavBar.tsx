import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  animate,
  useScroll,
  useMotionValueEvent
} from "framer-motion";

/* ──────────────────────── TYPES ──────────────────────── */
export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type GlassNavBarProps = {
  brand?: React.ReactNode;
  items?: NavItem[];
  className?: string;
  fixed?: boolean;
  blurPx?: number;
};

/* ──────────────────────── COMPONENT ──────────────────────── */
const GlassNavBar: React.FC<GlassNavBarProps> = ({
  brand,
  items = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Episodes", href: "#episodes" },
  ],
  className = "",
  fixed = true,
  blurPx = 40,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  /* ── 1. Fade-to-glass on scroll ──
   * Below 80px (still in the hero): nav is fully transparent, blending into the aurora background.
   * Past 80px: transitions to the frosted-glass pill so it's readable over content. */
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  /* ── 2. Navigation helper ──
   * On the home page: smooth-scroll to the anchor.
   * On any other page: navigate to /#anchor and let the browser scroll on load. */
  const handleNav = (href: string) => {
    if (pathname === "/") {
      const target = document.querySelector(href) as HTMLElement;
      if (!target) return;
      const targetY = target.getBoundingClientRect().top + window.scrollY - 100;
      animate(window.scrollY, targetY, {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
        onUpdate: (value) => window.scrollTo(0, value),
      });
    } else {
      router.push(`/${href}`);
    }
  };

  return (
    /* Always visible — no slide-up/down. Positioning only. */
    <div
      className={[
        fixed ? "fixed top-6 inset-x-0 z-50" : "relative z-50",
        "flex justify-center pointer-events-none font-[Figtree,sans-serif]",
        className,
      ].join(" ")}
    >
      <div className="pointer-events-auto relative">
        {/* Outer glow — fades in with the glass pill once scrolled */}
        <div
          className="absolute -inset-1 rounded-full blur-lg transition-opacity duration-500"
          style={{ opacity: scrolled ? 0.4 : 0 }}
          aria-hidden
        >
          <div className="h-full w-full rounded-full bg-[radial-gradient(120%_180%_at_50%_-30%,rgba(255,255,255,0.15),transparent_60%)]" />
        </div>

        {/* Main Nav
         * At top of page:  transparent bg, invisible border, no shadow, no blur
         * After 80px scroll: full glass pill fades in via CSS transitions on each property */}
        <nav
          aria-label="Primary"
          className="relative flex items-center rounded-full w-[min(92vw,1100px)] h-14 px-6 transition-[background-color,border-color,box-shadow] duration-500"
          style={{
            backgroundColor: scrolled ? "rgba(255,255,255,0.05)" : "transparent",
            border: scrolled ? "0.5px solid rgba(255,255,255,0.35)" : "0.5px solid transparent",
            boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.25)" : "none",
            /* backdrop-filter can't be CSS-transitioned in all browsers, so we swap it discretely */
            WebkitBackdropFilter: scrolled ? `blur(${blurPx}px) saturate(1.3)` : "none",
            backdropFilter: scrolled ? `blur(${blurPx}px) saturate(1.3)` : "none",
          }}
        >
          {/* Brand */}
          {brand ?? (
            <button
              onClick={() => handleNav("#home")}
              className="cursor-pointer flex items-center"
              aria-label="Go to home"
            >
              <Image
                src="/BrainSTEM_Transparent_NoText.png"
                alt="brainSTEM logo"
                width={36}
                height={36}
                className="object-contain w-9 h-9"
              />
            </button>
          )}

          <div className="flex-1" />

          {/* Links */}
          <ul className="flex items-center gap-2">
            {items.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => {
                    if (item.external) window.open(item.href, "_blank");
                    else handleNav(item.href);
                  }}
                  className="rounded-full px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all active:scale-95"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          
          {/* Inner ring highlight — fades in with the glass */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full ring-[0.5px] ring-inset ring-white/30 transition-opacity duration-500"
            style={{
              opacity: scrolled ? 1 : 0,
            }}
          />
        </nav>
      </div>
    </div>
  );
};

export default GlassNavBar;