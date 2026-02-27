import React, { useState } from "react";
import { 
  animate, 
  motion, 
  useScroll, 
  useMotionValueEvent 
} from "framer-motion";

/* ──────────────────────── CONSTANTS ──────────────────────── */
const NAV_HEIGHT = 56; 

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
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  /* ── 1. Smart Hide/Show Logic ── */
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide if scrolling down and past the hero
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      // Show if scrolling up
      setHidden(false);
    }
  });

  /* ── 2. Robust Scroll Helper ── */
  const scrollToTarget = (href: string) => {
    const target = document.querySelector(href) as HTMLElement;
    if (!target) return;

    // Get the absolute position of the element on the page
    const targetY = target.getBoundingClientRect().top + window.scrollY - 100;

    animate(window.scrollY, targetY, {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9], // High-end cubic bezier
      onUpdate: (value) => window.scrollTo(0, value),
    });
  };

  return (
    <motion.div
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -NAV_HEIGHT - 40, opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={[
        fixed ? "fixed top-6 inset-x-0 z-50" : "relative z-50",
        "flex justify-center pointer-events-none font-[Figtree,sans-serif]",
        className,
      ].join(" ")}
    >
      <div className="pointer-events-auto relative">
        {/* Outer Glow */}
        <div className="absolute -inset-1 rounded-full blur-lg opacity-40" aria-hidden>
          <div className="h-full w-full rounded-full bg-[radial-gradient(120%_180%_at_50%_-30%,rgba(255,255,255,0.15),transparent_60%)]" />
        </div>

        {/* Main Nav */}
        <nav
          aria-label="Primary"
          className="relative flex items-center rounded-full border-[rgba(255,255,255,0.35)] border-[0.5px] bg-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl w-[min(92vw,1100px)] h-14 px-6"
          style={{
            WebkitBackdropFilter: `blur(${blurPx}px) saturate(1.3)`,
            backdropFilter: `blur(${blurPx}px) saturate(1.3)`,
          }}
        >
          {/* Brand */}
          {brand ?? (
            <button
              onClick={() => scrollToTarget("#home")}
              className="text-lg font-semibold tracking-tight text-white/85 hover:text-white transition-colors cursor-pointer"
            >
              brainSTEM
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
                    else scrollToTarget(item.href);
                  }}
                  className="rounded-full px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all active:scale-95"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          
          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full ring-[0.5px] ring-inset ring-[rgba(255,255,255,0.3)]" />
        </nav>
      </div>

      <style jsx>{`
        .liquid-sheen {
          background: 
            radial-gradient(40% 60% at 0% 50%, rgba(255,255,255,0.25), transparent 60%),
            radial-gradient(60% 40% at 100% 50%, rgba(255,255,255,0.1), transparent 60%),
            conic-gradient(from 90deg at 50% 50%, rgba(255,255,255,0.1), rgba(255,255,255,0.0) 30%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0.0) 85%);
          filter: blur(20px) saturate(1.1);
          animation: drift 14s ease-in-out infinite alternate;
        }
        @keyframes drift {
          0% { transform: translateX(-8%) translateY(-6%) rotate(0deg); }
          100% { transform: translateX(8%) translateY(6%) rotate(6deg); }
        }
      `}</style>
    </motion.div>
  );
};

export default GlassNavBar;