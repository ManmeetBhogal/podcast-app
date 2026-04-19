"use client";

import { motion } from "framer-motion";
import {
  SiSpotify,
  SiApplepodcasts,
  SiPocketcasts,
  SiYoutube,
} from "react-icons/si";

const platforms = [
  { icon: SiSpotify,       name: "Spotify",        color: "#1DB954", href: "https://open.spotify.com/show/2BRbrtuu5KouWZ6nCb9kDB?si=cf5ce99de5fb4587" },
  { icon: SiApplepodcasts, name: "Apple Podcasts",  color: "#B150E2", href: "https://podcasts.apple.com/us/podcast/brainstem/id1561056912" },
  { icon: SiPocketcasts,   name: "Pocket Casts",    color: "#F43F00", href: "https://pocketcasts.com/podcast/brainstem/9cd82570-7498-0139-345d-0acc26574db2" },
  { icon: SiYoutube,       name: "YouTube",          color: "#FF0000", href: "https://www.youtube.com/@brainstempodcast" },
];

/* Shared fade-up transition — matches the motion.p in title.tsx */
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export default function PodcastPlatforms() {
  return (
    <section className="w-full py-5 sm:py-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Divider top — */}
        <div className="h-px bg-white/10 mb-4 sm:mb-5" />

        {/* Label — fades up once the hero description finishes (~3.3s) */}
        <motion.p
          {...fadeUp}
          transition={{ delay: 3.3, duration: 0.6, ease: "easeOut" }}
          className="text-center text-xs tracking-[0.2em] uppercase text-white/30 mb-6 sm:mb-8 font-light"
        >
          Listen on your favourite platform
        </motion.p>

        {/* Badges — fade up as one group slightly after the label (3.5s).
            Per-badge stagger replaced with a single entrance so the animation
            stays consistent with the rest of the site. whileHover is kept for
            interaction feedback only. */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 3.5, duration: 0.6, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-4 sm:gap-6"
        >
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const Tag = platform.href ? "a" : "div";
            return (
              <motion.div
                key={platform.name}
                whileHover={{ scale: 1.04 }}
              >
                <Tag
                  {...(platform.href ? { href: platform.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm cursor-pointer transition-colors duration-300 hover:border-white/20 hover:bg-white/10"
                >
                  <Icon
                    size={14}
                    style={{ color: platform.color }}
                    className="transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
                  />
                  <span className="text-xs sm:text-sm text-white/60 group-hover:text-white/90 transition-colors duration-300 font-light whitespace-nowrap">
                    {platform.name}
                  </span>
                </Tag>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Divider bottom */}
        <div className="h-px bg-white/10 mt-8 sm:mt-10" />

      </div>
    </section>
  );
}