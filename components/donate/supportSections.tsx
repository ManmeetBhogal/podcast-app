"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Share2, ArrowUpRight, Check, Heart, type LucideIcon } from "lucide-react";
import { SiApplepodcasts, SiSpotify } from "react-icons/si";
import GlassNavBar from "@/components/ui/glassNavBar";
import AuroraBackground from "@/components/ui/AuroraBackground";
import BlurText from "@/components/BlurText";
import NavDonateButton from "./NavDonateButton";

/* ──────────────────────── SHARED /support BUILDING BLOCKS ────────────────────────
 * The pieces of the /support page: page frame, hero, glowing ask card,
 * "where your support goes" grid and "free ways to help" list.
 */

/* Glass card class — identical to the cards on EpisodePage */
export const glass = "rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)]";

/* Staggered fade-up, continuing the EpisodePage rhythm (0.1s steps) */
export const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

/* Page frame: fixed aurora background, glass nav, back link */
export function SupportShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#060010] relative">
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#060010]">
        <AuroraBackground />
      </div>

      <GlassNavBar cta={<NavDonateButton />} />

      <main className="relative z-10 flex flex-col items-center px-4 pt-32 pb-20">
        <div className="w-full max-w-3xl flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}>
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-white/40 hover:text-white/80 transition-colors">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Home
            </Link>
          </motion.div>

          {children}

          <motion.p {...fadeUp(0.5)} className="flex items-center justify-center gap-1.5 text-center text-white/40 text-sm font-light pt-8">
            Thank you for listening · The brainSTEM team
            <Heart aria-hidden className="w-3.5 h-3.5 text-[#F566FF] fill-[#F566FF]/60" />
          </motion.p>
        </div>
      </main>
    </div>
  );
}

export function SupportHero() {
  return (
    <motion.div {...fadeUp(0.1)} className="flex flex-col gap-3">
      <BlurText
        text="Help us keep the conversation going"
        delay={120}
        animateBy="words"
        direction="top"
        className="text-white/90 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
      />
      <p className="text-white/60 text-base font-light leading-relaxed max-w-2xl">
        brainSTEM is made by a small team who believe evidence-based brain science should be open to
        everyone. The show is free to listen to, and listeners like you are what keep it that way.
      </p>
    </motion.div>
  );
}

/* Glass card with the aurora glow bleeding out behind it — used for "the ask" */
export function GlowCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div {...fadeUp(0.2)} className="relative">
      <div aria-hidden className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(60%_60%_at_15%_20%,rgba(245,102,255,0.2),transparent),radial-gradient(60%_60%_at_90%_90%,rgba(96,146,225,0.2),transparent)] blur-2xl" />
      <div className={`${glass} relative p-5 sm:p-8 flex flex-col gap-6 ${className}`}>{children}</div>
    </motion.div>
  );
}

export interface SupportUse {
  icon: LucideIcon;
  title: string;
  body: string;
}

export function SupportUsesGrid({ items }: { items: SupportUse[] }) {
  return (
    <motion.div {...fadeUp(0.3)} className="flex flex-col gap-3 pt-6">
      <p className="text-white/40 text-xs font-medium uppercase tracking-widest">Where your support goes</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map(({ icon: Icon, title, body }) => (
          <div key={title} className={`${glass} p-5 flex flex-col gap-3 hover:bg-white/10 hover:border-white/30 transition-all duration-300`}>
            <span className="grid place-items-center w-10 h-10 rounded-full bg-white/10 border border-white/10">
              <Icon className="w-4 h-4 text-white/70" />
            </span>
            <p className="text-white/90 font-semibold">{title}</p>
            <p className="text-white/60 text-sm font-light leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

const FREE_WAYS = [
  { icon: SiApplepodcasts, color: "#B150E2", title: "Rate & review", body: "Five stars on Apple Podcasts helps new listeners find us.", href: "https://podcasts.apple.com/us/podcast/brainstem/id1561056912" },
  { icon: SiSpotify,       color: "#1DB954", title: "Follow on Spotify", body: "Follows tell Spotify to recommend brainSTEM to others.", href: "https://open.spotify.com/show/2BRbrtuu5KouWZ6nCb9kDB" },
];

export function FreeWaysToHelp() {
  const [shared, setShared] = useState(false);

  const share = async () => {
    const url = window.location.origin;
    try {
      if (navigator.share) {
        await navigator.share({ title: "brainSTEM podcast", url });
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      /* user dismissed the share sheet */
    }
  };

  return (
    <motion.div {...fadeUp(0.4)} className="flex flex-col gap-3 pt-6">
      <p className="text-white/40 text-xs font-medium uppercase tracking-widest">Can&apos;t give right now? These help too</p>
      <div className={`${glass} divide-y divide-white/10`}>
        {FREE_WAYS.map(({ icon: Icon, color, title, body, href }) => (
          <a
            key={title}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-5 hover:bg-white/5 transition-colors first:rounded-t-2xl"
          >
            <Icon size={20} style={{ color }} className="flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-white/90 text-sm font-medium">{title}</p>
              <p className="text-white/50 text-sm font-light">{body}</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors" />
          </a>
        ))}
        <button onClick={share} className="group w-full text-left flex items-center gap-4 p-5 hover:bg-white/5 transition-colors rounded-b-2xl">
          <Share2 className="w-5 h-5 text-[#6092E1] flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-white/90 text-sm font-medium">{shared ? "Link copied!" : "Share the show"}</p>
            <p className="text-white/50 text-sm font-light">Send brainSTEM to a friend who&apos;d love it.</p>
          </div>
          {shared && <Check className="w-4 h-4 text-white/70" />}
        </button>
      </div>
    </motion.div>
  );
}
