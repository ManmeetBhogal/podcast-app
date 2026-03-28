"use client";
import { Episode } from "@/app/lib/types";
import GlassNavBar from "@/components/ui/glassNavBar";
import AuroraBackground from "@/components/ui/AuroraBackground";
import { motion } from "framer-motion";
import Link from "next/link";

interface EpisodePageProps {
  episode: Episode | null;
}

export default function EpisodePage({ episode }: EpisodePageProps) {
  if (!episode) {
    return (
      <div className="min-h-screen bg-[#060010] flex items-center justify-center">
        <p className="text-white/50">Episode not found.</p>
      </div>
    );
  }

  const pubDate = episode.pubDate
    ? new Date(episode.pubDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen w-full bg-[#060010] relative">

      {/* ── Aurora background — same as the home page hero ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AuroraBackground />
      </div>

      {/* ── Navbar ── */}
      <GlassNavBar />

      {/* ── Main content ── */}
      <main className="relative z-10 flex flex-col items-center px-4 pt-32 pb-20">
        <div className="w-full max-w-3xl flex flex-col gap-6">

          {/* ── Back link ── */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Link
              href="/#episodes"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white/40 hover:text-white/80 transition-colors"
            >
              {/* Left-arrow chevron */}
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              All Episodes
            </Link>
          </motion.div>

          {/* ── Episode metadata ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            {/* Episode number badge */}
            {episode.episodeNum && (
              <span className="self-start rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium text-white/60 tracking-wide">
                EP {episode.episodeNum}
              </span>
            )}

            {/* Title */}
            <h1 className="text-white/90 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              {episode.title}
            </h1>

            {/* Pub date */}
            {pubDate && (
              <p className="text-white/40 text-sm">{pubDate}</p>
            )}
          </motion.div>

          {/* ── Audio player — glass card ── */}
          {episode.url && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)] p-5"
            >
              <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-3">
                Listen
              </p>
              <audio
                controls
                className="w-full rounded-lg"
                style={{ colorScheme: "dark" }}
              >
                <source src={episode.url} type="audio/mpeg" />
              </audio>
            </motion.div>
          )}

          {/* ── Description — glass card ── */}
          {episode.description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)] p-5"
            >
              <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-3">
                About this episode
              </p>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                {episode.description}
              </p>
            </motion.div>
          )}

        </div>
      </main>
    </div>
  );
}
