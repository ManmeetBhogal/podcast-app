"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Podcast } from "../lib/types";

interface EpisodeCardsProps {
    podcast?: Podcast | null;
    error?: string | null;
}

// EpisodeCards accepts podcast data as props from the server component (app/page.tsx).
export function EpisodeCards({ podcast, error }: EpisodeCardsProps) {
    // Graceful fallback when RSS feed is unavailable or empty
    if (!podcast || !podcast.episodes || podcast.episodes.length === 0) {
        return (
            <div className="flex justify-center py-20">
                <p className="text-white/50 text-sm">
                    {error ? `Error: ${error}` : "No episodes available. Please try again later."}
                </p>
            </div>
        );
    }

    const episodes = podcast.episodes;

    return (
        /* ── Section anchor used by the glass nav "Episodes" link ── */
        <section id="episodes" className="w-full px-4 py-12">

            {/* ── Section heading — fades up on scroll into view ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
                className="max-w-7xl mx-auto mb-10 flex flex-col items-center text-center"
            >
                {/* Eyebrow label — small muted uppercase tag above the heading */}
                <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-2">
                    All Episodes
                </p>

                {/* Primary heading */}
                <h2 className="text-white/90 text-3xl md:text-4xl font-bold leading-tight">
                    Listen &amp; Explore
                </h2>

                {/* Thin accent line underneath, matching the glass border style */}
                <div className="mt-3 h-px w-16 bg-white/20 rounded-full" />
            </motion.div>

            {/* ── Responsive grid: 1 col → 2 col (md) → 3 col (lg) ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
                {episodes.map((episode, i: number) => (
                    /* Each card fades up on scroll. Delay is staggered by position within
                     * its row (i % 3) so cards in the same row cascade left-to-right
                     * rather than all appearing at once. 0.1s between each card feels
                     * snappy without drawing attention to the animation itself. */

                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                            delay: (i % 3) * 0.1, // stagger within each row
                        }}
                        className="h-full" // stretch to fill the grid cell so inner card can match row height
                    >
                    {/*
                     * Glass card — mirrors the liquid-glass iOS aesthetic of GlassNavBar:
                     *   • bg-white/5        very-translucent white fill
                     *   • backdrop-blur-xl  frosted-glass blur
                     *   • border white/20   subtle hairline border
                     *   • shadow            soft depth layer
                     * hover:bg-white/10 lifts the card slightly on interaction.
                     */}
                    <div
                        className={[
                            "relative flex flex-col gap-3 rounded-2xl p-5 h-full",
                            "bg-white/5 backdrop-blur-xl",
                            "border border-white/20",
                            "shadow-[0_8px_32px_rgba(0,0,0,0.25)]",
                            "hover:bg-white/10 hover:border-white/30",
                            "transition-all duration-300",
                        ].join(" ")}
                    >
                        {/* ── Episode number badge (shown only when episodeNum is available) ── */}
                        {episode.episodeNum && (
                            <span className="self-start rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium text-white/60 tracking-wide">
                                EP {episode.episodeNum}
                            </span>
                        )}

                        {/* ── Episode title ── */}
                        <h3 className="text-white/90 font-semibold text-base leading-snug line-clamp-2">
                            {episode.title ?? "Untitled Episode"}
                        </h3>

                        {/* ── Pub date (formatted for readability) ── */}
                        {episode.pubDate && (
                            <p className="text-white/40 text-xs">
                                {new Date(episode.pubDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </p>
                        )}

                        {/* ── Truncated description ── */}
                        <p className="text-white/60 text-sm leading-relaxed line-clamp-3 flex-1">
                            {episode.description ?? "No description available."}
                        </p>

                        {/* ── Native audio player  ── */}
                        {episode.url && (
                            <audio
                                controls
                                className="w-full h-9 mt-1 rounded-lg opacity-80 hover:opacity-100 transition-opacity"
                                style={{ colorScheme: "dark" }} // forces dark track/controls in supporting browsers
                            >
                                <source src={episode.url} type="audio/mpeg" />
                            </audio>
                        )}

                        {/* ── "Full episode" link → dynamic route /episode-{num} ── */}
                        {episode.episodeNum && (
                            <Link
                                href={`/episode-${episode.episodeNum}`}
                                /*
                                 * Inset overlay so the entire card is clickable without
                                 * nesting interactive elements (audio sits above via z-10).
                                 * The link itself stays visually at the bottom.
                                 */
                                className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-white/50 hover:text-white/90 transition-colors"
                            >
                                View episode page
                                {/* Right-arrow chevron */}
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        )}
                    </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}