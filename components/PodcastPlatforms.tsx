"use client";

import { motion } from "framer-motion";
import {
  SiSpotify,
  SiApplepodcasts,
  SiAmazonmusic,
  SiAudible,
  SiCastbox,
  SiPocketcasts,
  SiIheartradio,
} from "react-icons/si";

const platforms = [
  { icon: SiSpotify,       name: "Spotify",        color: "#1DB954" },
  { icon: SiApplepodcasts, name: "Apple Podcasts",  color: "#B150E2" },
  { icon: SiAmazonmusic,   name: "Amazon Music",    color: "#00A8E1" },
  { icon: SiAudible,       name: "Audible",         color: "#F8991D" },
  { icon: SiCastbox,       name: "Castbox",         color: "#F55B23" },
  { icon: SiPocketcasts,   name: "Pocket Casts",    color: "#F43F00" },
  { icon: SiIheartradio,   name: "iHeartRadio",     color: "#C6002B" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function PodcastPlatforms() {
  return (
    <section className="w-full mb-16 py-10 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Divider top */}
        <div className="h-px bg-white/10 mb-8 sm:mb-10" />

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs tracking-[0.2em] uppercase text-white/30 mb-6 sm:mb-8 font-light"
        >
          Listen on your favourite platform
        </motion.p>

        {/* Badges */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <motion.div
                key={platform.name}
                variants={itemVariants}
                whileHover={{ scale: 1.04 }}
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