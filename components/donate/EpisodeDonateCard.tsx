"use client";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { DonateButton } from "./DonateButton";

/* ──────────────────────── EPISODE PAGE DONATE CARD ────────────────────────
 * The button goes to the same Ko-fi page as /support.
 */
export default function EpisodeDonateCard({ episodeNum }: { episodeNum?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
      className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)] p-5 sm:p-6"
    >
      {/* Faint aurora wash in the corner so the card reads as "special" without shouting */}
      <div aria-hidden className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#DC56E6]/20 blur-3xl" />

      <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <span className="flex-shrink-0 grid place-items-center w-12 h-12 rounded-full bg-white/10 border border-white/20">
          <Heart className="w-5 h-5 text-[#F566FF] fill-[#F566FF]/60" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-white/90 font-semibold">Enjoyed this episode?</p>
          <p className="text-white/60 text-sm font-light leading-relaxed">
            A small donation helps us keep making episodes like this one.
          </p>
        </div>
        <DonateButton placement={`episode-${episodeNum ?? "unknown"}`} className="self-start sm:self-auto flex-shrink-0">
          Support the show
        </DonateButton>
      </div>
    </motion.div>
  );
}
