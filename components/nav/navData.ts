"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { animate } from "framer-motion";

export type NavKey = "about" | "episodes" | "support";

export interface SiteNavLink {
  key: NavKey;
  label: string;
  href: string;
  hash?: string;
}

export const SITE_NAV_LINKS: SiteNavLink[] = [
  { key: "about", label: "About", href: "/#about", hash: "#about" },
  { key: "episodes", label: "Episodes", href: "/#episodes", hash: "#episodes" },
  { key: "support", label: "Support", href: "/support" },
];

export function useNavController() {
  const pathname = usePathname();
  const router = useRouter();
  const [homeSection, setHomeSection] = useState<"about" | "episodes" | null>(null);

  /* Scroll-spy for About & Episodes sections when on the Home page */
  useEffect(() => {
    if (pathname !== "/") {
      setHomeSection(null);
      return;
    }

    const aboutEl = document.getElementById("about");
    const episodesEl = document.getElementById("episodes");
    if (!aboutEl && !episodesEl) return;

    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      if (scrollY < 260) {
        setHomeSection(null);
        return;
      }
      const episodesTop = episodesEl ? episodesEl.getBoundingClientRect().top : Infinity;
      const aboutTop = aboutEl ? aboutEl.getBoundingClientRect().top : Infinity;

      if (episodesTop <= 220) {
        setHomeSection("episodes");
      } else if (aboutTop <= 260) {
        setHomeSection("about");
      } else {
        setHomeSection(null);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [pathname]);

  const activeKey: NavKey | null = (() => {
    if (pathname === "/support") return "support";
    if (pathname.startsWith("/episode-")) return "episodes";
    if (pathname === "/") return homeSection;
    return null;
  })();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: SiteNavLink,
    onNavigate?: () => void,
  ) => {
    /* Preserve native browser behavior for modified clicks (cmd/ctrl/middle-click) */
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    onNavigate?.();

    if (link.hash && pathname === "/") {
      e.preventDefault();
      const target = document.querySelector(link.hash) as HTMLElement | null;
      if (!target) return;
      const targetY = target.getBoundingClientRect().top + window.scrollY - 96;
      animate(window.scrollY, targetY, {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (value) => window.scrollTo(0, value),
      });
    } else if (!link.hash && pathname === link.href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBrandClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    onNavigate?: () => void,
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    onNavigate?.();
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      e.preventDefault();
      router.push("/");
    }
  };

  return { pathname, activeKey, handleLinkClick, handleBrandClick };
}
