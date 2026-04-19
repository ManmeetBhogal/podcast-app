"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SPEEDS = [0.75, 1, 1.25, 1.5, 2];

interface AudioPlayerProps {
  src: string;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds === 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => { if (!isDragging) setCurrentTime(audio.currentTime); };
    const onDurationChange = () => { if (!isNaN(audio.duration)) setDuration(audio.duration); };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => { setIsPlaying(false); setCurrentTime(0); };
    const onCanPlay = () => setIsLoading(false);
    const onWaiting = () => setIsLoading(true);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("loadedmetadata", onDurationChange);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("waiting", onWaiting);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("loadedmetadata", onDurationChange);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("waiting", onWaiting);
    };
  }, [isDragging]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); } else { audio.play(); }
  };

  const changeSpeed = (s: number) => {
    setSpeed(s);
    if (audioRef.current) audioRef.current.playbackRate = s;
  };

  const seek = useCallback((clientX: number) => {
    const bar = progressBarRef.current;
    const audio = audioRef.current;
    if (!bar || !audio || !duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newTime = ratio * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }, [duration]);

  const onMouseDown = (e: React.MouseEvent) => { setIsDragging(true); seek(e.clientX); };

  useEffect(() => {
    if (!isDragging) return;
    const onMouseMove = (e: MouseEvent) => seek(e.clientX);
    const onMouseUp = () => setIsDragging(false);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, seek]);

  const onTouchStart = (e: React.TouchEvent) => { setIsDragging(true); seek(e.touches[0].clientX); };

  useEffect(() => {
    if (!isDragging) return;
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); seek(e.touches[0].clientX); };
    const onTouchEnd = () => setIsDragging(false);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDragging, seek]);

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex flex-col gap-4">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Row: play button + progress bar + time + speed */}
      <div className="flex items-center gap-3">

        {/* Play/pause button */}
        <motion.button
          onClick={togglePlay}
          whileTap={{ scale: 0.88 }}
          className="flex-shrink-0 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white/70 animate-spin"
              />
            ) : isPlaying ? (
              <motion.svg
                key="pause"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
                className="text-white"
              >
                <rect x="6" y="4" width="4" height="16" rx="1.5" />
                <rect x="14" y="4" width="4" height="16" rx="1.5" />
              </motion.svg>
            ) : (
              <motion.svg
                key="play"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
                className="text-white ml-0.5"
              >
                <path d="M8 5v14l11-7z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Progress bar — tall hit area for easy touch targeting */}
        <div
          ref={progressBarRef}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          className="relative flex items-center flex-1 h-6 cursor-pointer group"
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={currentTime}
        >
          <div className="absolute inset-x-0 h-1 rounded-full bg-white/10">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-white/50 group-hover:bg-white/70 transition-colors duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <motion.div
            className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            style={{ left: `calc(${progress}% - 6px)` }}
            animate={{ scale: isDragging ? 1.4 : 1 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          />
        </div>

        {/* Time + speed */}
        <div className="flex-shrink-0 flex items-center gap-2 tabular-nums select-none">
          <span className="text-xs text-white/40 font-light">
            <span className="text-white/70">{formatTime(currentTime)}</span>
            <span className="mx-0.5">/</span>
            <span>{formatTime(duration)}</span>
          </span>
          <motion.button
            onClick={() => changeSpeed(SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length])}
            whileTap={{ scale: 0.88 }}
            className="px-2.5 py-1 rounded-full text-xs font-light bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/80 transition-colors duration-200"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={speed}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="block"
              >
                {speed === 1 ? "1x" : `${speed}x`}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
