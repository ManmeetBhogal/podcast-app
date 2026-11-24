"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Heart, Menu, X } from "lucide-react";
import { SITE_NAV_LINKS, useNavController } from "@/components/nav/navData";

export type GlassNavBarProps = {
  className?: string;
};

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

/* ──────────────────────── EDITORIAL MASTHEAD NAVBAR ────────────────────────
 * - Seamless two-layer surface: tall top Aurora scrim cross-fades into a frosted
 *   dark bar on scroll/open (no hard border seam over the Aurora hero).
 * - Desktop (md+): aligned to max-w-4xl with real <Link> routes, active white
 *   underline (including Home scroll-spy and /episode-*), and subtle Support pill.
 * - Mobile (< md): icon-only morphing hamburger/X toggle expands a smooth downward
 *   drawer while keeping page contents visible underneath (closes on scroll, tap
 *   outside, or Escape).
 */
const GlassNavBar: React.FC<GlassNavBarProps> = ({ className = "" }) => {
  const prefersReducedMotion = useReducedMotion();
  const { pathname, activeKey, handleLinkClick, handleBrandClick } = useNavController();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const openScrollYRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 64);
    /* Close drawer naturally if the user scrolls the visible page underneath */
    if (menuOpen && Math.abs(latest - openScrollYRef.current) > 16) {
      setMenuOpen(false);
    }
  });

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    openScrollYRef.current = window.scrollY;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const primaryLinks = SITE_NAV_LINKS.filter((l) => l.key !== "support");
  const supportLink = SITE_NAV_LINKS.find((l) => l.key === "support")!;
  const showSolid = scrolled || menuOpen;

  return (
    <>
      {/* Subtle scrim below header only so page content stays visible underneath */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            aria-hidden
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
            className="md:hidden fixed inset-0 z-40 bg-[#060010]/30"
          />
        )}
      </AnimatePresence>

      <header className={`fixed top-0 inset-x-0 z-50 font-[Figtree,sans-serif] ${className}`}>
        {/* Layer 1: Tall top Aurora scrim (extends past header so it never leaves a seam) */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#060010]/65 via-[#060010]/20 to-transparent bg-no-repeat transition-opacity duration-300 ${
            showSolid ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Layer 2: Continuous dark frosted surface for scrolled & open states */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 bg-[#060010]/[0.88] backdrop-blur-xl shadow-[0_12px_32px_-16px_rgba(0,0,0,0.85)] transition-opacity duration-300 ${
            showSolid ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Subtle faded bottom hairline only when scrolled or open */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent transition-opacity duration-300 ${
            showSolid ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Main 64px top bar */}
        <nav
          aria-label="Primary"
          className="relative z-10 mx-auto max-w-4xl h-16 px-5 sm:px-8 flex items-center justify-between gap-4"
        >
          <Link
            href="/"
            onClick={(e) => handleBrandClick(e, () => setMenuOpen(false))}
            className="inline-flex items-center gap-2.5 text-white hover:opacity-90 transition-opacity shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC56E6] rounded-md"
          >
            <Image
              src="/BrainSTEM_Transparent_NoText.png"
              alt=""
              width={30}
              height={30}
              className="object-contain w-7 h-7"
            />
            <span className="text-[15px] font-semibold tracking-tight text-white">
              brainSTEM
            </span>
          </Link>

          {/* Desktop Navigation (md+) */}
          <div className="hidden md:flex items-center gap-7">
            <ul className="flex items-center gap-6">
              {primaryLinks.map((link) => {
                const isActive = activeKey === link.key;
                return (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={(e) => handleLinkClick(e, link)}
                      className={`relative py-2 text-sm font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC56E6] rounded-sm ${
                        isActive ? "text-white" : "text-white/65 hover:text-white"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="masthead-active-underline"
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-white rounded-full"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href={supportLink.href}
              aria-current={activeKey === "support" ? "page" : undefined}
              onClick={(e) => handleLinkClick(e, supportLink)}
              className={[
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC56E6]",
                activeKey === "support"
                  ? "border-white/45 bg-white/10 text-white"
                  : "border-white/20 text-white/80 hover:border-white/45 hover:bg-white/[0.06] hover:text-white",
              ].join(" ")}
            >
              <Heart
                className={`w-3.5 h-3.5 transition-colors ${
                  activeKey === "support"
                    ? "text-[#F566FF] fill-[#F566FF]"
                    : "text-[#F566FF]/85"
                }`}
                aria-hidden
              />
              <span>Support</span>
            </Link>
          </div>

          {/* Mobile Icon-Only Morphing Toggle (< md) */}
          <button
            ref={triggerRef}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="masthead-drawer"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden relative inline-flex items-center justify-center w-11 h-11 -mr-2 rounded-full text-white/85 hover:bg-white/10 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC56E6]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                >
                  <X className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                >
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>

        {/* Mobile Smooth Downward Reveal Drawer (< md) */}
        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              id="masthead-drawer"
              initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : {
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { duration: 0.24, ease: EASE },
                        opacity: { duration: 0.14 },
                      },
                    }
              }
              transition={{ height: { duration: 0.3, ease: EASE }, opacity: { duration: 0.2 } }}
              className="md:hidden relative z-10 overflow-hidden"
            >
              <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain">
                <div className="mx-5 h-px bg-white/10" aria-hidden />
                <nav aria-label="Mobile" className="px-5 pt-1 pb-3">
                  <ul className="divide-y divide-white/[0.06]">
                    {SITE_NAV_LINKS.map((link, idx) => {
                      const isActive = activeKey === link.key;
                      const isSupport = link.key === "support";
                      return (
                        <motion.li
                          key={link.key}
                          initial={prefersReducedMotion ? false : { opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.18,
                            delay: prefersReducedMotion ? 0 : 0.03 + idx * 0.025,
                            ease: EASE,
                          }}
                        >
                          <Link
                            href={link.href}
                            aria-current={isActive ? "page" : undefined}
                            onClick={(e) => handleLinkClick(e, link, () => setMenuOpen(false))}
                            className={`flex items-center justify-start gap-2 min-h-11 py-2.5 text-[15px] leading-5 font-medium tracking-tight transition-colors ${
                              isActive ? "text-white" : "text-white/70 hover:text-white"
                            }`}
                          >
                            <span>{link.label}</span>
                            {isSupport ? (
                              <Heart
                                className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                                  isActive
                                    ? "text-[#F566FF] fill-[#F566FF]"
                                    : "text-[#F566FF]/85"
                                }`}
                                aria-hidden
                              />
                            ) : (
                              isActive && (
                                <span
                                  aria-hidden
                                  className="w-1.5 h-1.5 rounded-full bg-[#F566FF] shrink-0"
                                />
                              )
                            )}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default GlassNavBar;
