"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import GlassNavBar from "@/components/ui/glassNavBar";
import AuroraBackground from "@/components/ui/AuroraBackground";
import { GUEST_FORM_URL } from "@/app/lib/guest";
import {
  GUEST_COPY,
  GUEST_QA,
  PERSPECTIVES,
  PROCESS_STEPS,
} from "@/components/guest/guestContent";

function GuestVoicesTabs() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasSwitched, setHasSwitched] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const active = PERSPECTIVES[activeIndex] ?? PERSPECTIVES[0];

  const selectTab = (idx: number) => {
    if (idx === activeIndex) return;
    setHasSwitched(true);
    setActiveIndex(idx);
  };

  const handleTabKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let nextIdx: number | null = null;
    if (e.key === "ArrowRight") {
      nextIdx = (idx + 1) % PERSPECTIVES.length;
    } else if (e.key === "ArrowLeft") {
      nextIdx = (idx - 1 + PERSPECTIVES.length) % PERSPECTIVES.length;
    } else if (e.key === "Home") {
      nextIdx = 0;
    } else if (e.key === "End") {
      nextIdx = PERSPECTIVES.length - 1;
    }

    if (nextIdx !== null) {
      e.preventDefault();
      selectTab(nextIdx);
      tabRefs.current[nextIdx]?.focus();
    }
  };

  return (
    <div className="md:col-span-8 flex flex-col gap-5 min-w-0">
      {/* Subtle active pills below sm (safe when wrapping); crisp white underline at sm+ */}
      <LayoutGroup id="guest-tabs">
        <div
          className="flex flex-wrap items-center gap-2 sm:gap-x-6 sm:gap-y-0 sm:border-b sm:border-white/15"
          role="tablist"
          aria-label="Voices we welcome"
        >
          {PERSPECTIVES.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                id={`guest-tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`guest-panel-${item.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectTab(idx)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={[
                  "relative min-h-[44px] flex items-center text-sm font-medium whitespace-nowrap transition-colors cursor-pointer",
                  "rounded-full border px-3.5 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:pb-2.5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC56E6] sm:focus-visible:rounded-sm",
                  isActive
                    ? "bg-white/15 border-white/30 text-white"
                    : "bg-white/[0.03] border-white/15 text-white/60 hover:text-white/90 sm:text-white/55 sm:hover:text-white/90",
                ].join(" ")}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="guest-tab-underline"
                    style={{ borderRadius: 9999 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
                    }
                    className="hidden sm:block absolute inset-x-0 -bottom-px h-[2px] bg-white"
                  />
                )}
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      {/* CSS Grid sizer prevents vertical jump when switching tabs */}
      <div className="grid">
        {PERSPECTIVES.map((item) => (
          <div
            key={`sizer-${item.id}`}
            aria-hidden
            className="col-start-1 row-start-1 invisible select-none pointer-events-none flex flex-col gap-4"
          >
            <p className="text-base font-light leading-relaxed">{item.summary}</p>
            <div className="flex flex-wrap gap-2">
              {item.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-xl sm:rounded-full border border-transparent px-3 py-1 text-xs font-light"
                >
                  {topic}
                </span>
              ))}
            </div>
            <p className="text-xs font-light">{item.uploadNote}</p>
          </div>
        ))}

        <div
          id={`guest-panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`guest-tab-${active.id}`}
          className="col-start-1 row-start-1"
        >
          <motion.div
            key={active.id}
            initial={prefersReducedMotion || !hasSwitched ? false : { opacity: 0.72, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.16, ease: [0.33, 1, 0.68, 1] }
            }
            className="flex flex-col gap-4"
          >
            <p className="text-base text-white/80 font-light leading-relaxed">
              {active.summary}
            </p>

            <div className="flex flex-wrap gap-2">
              {active.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-xl sm:rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs text-white/70 font-light"
                >
                  {topic}
                </span>
              ))}
            </div>

            <p className="text-xs text-white/55 font-light">
              {active.uploadNote}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function GuestQaList() {
  const prefersReducedMotion = useReducedMotion();
  const [openQa, setOpenQa] = useState<number | null>(null);

  return (
    <div className="md:col-span-8 divide-y divide-white/10">
      {GUEST_QA.map((item, idx) => {
        const isOpen = openQa === idx;
        const answerId = `guest-qa-answer-${idx}`;
        return (
          <div key={item.q}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() => setOpenQa(isOpen ? null : idx)}
              className={`w-full min-h-11 py-4 ${
                idx === 0 ? "md:pt-0" : ""
              } flex items-start justify-between gap-4 text-left group cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC56E6] focus-visible:text-white`}
            >
              <span className="text-sm sm:text-base font-medium text-white/90 group-hover:text-white transition-colors">
                {item.q}
              </span>
              <span className="mt-0.5 text-white/55 group-hover:text-white transition-colors flex-shrink-0">
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={answerId}
                  initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="overflow-hidden"
                >
                  <p className="pb-4 pr-8 text-sm text-white/65 font-light leading-relaxed">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function BeAGuestPage() {
  return (
    <div className="min-h-screen w-full bg-[#060010] text-white relative overflow-x-clip">
      {/* Top-only faded Aurora matching /, /support, and /episode-* */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] overflow-hidden opacity-75"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        }}
      >
        <AuroraBackground />
      </div>

      <GlassNavBar />

      <main className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8 pt-24 sm:pt-32 pb-24">
        <div className="inline-block animate-guest-slide-x motion-reduce:animate-none print:animate-none">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white/55 hover:text-white transition-colors"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>
        </div>

        {/* Hero + Single Central CTA */}
        <header className="pt-6 sm:pt-8 pb-10 sm:pb-12 border-b border-white/10">
          <h1
            style={{ animationDelay: "60ms" }}
            className="text-[2.125rem] sm:text-5xl md:text-[3.5rem] font-bold tracking-tight text-white leading-[1.08] max-w-3xl text-balance animate-guest-rise motion-reduce:animate-none print:animate-none"
          >
            {GUEST_COPY.headline}
          </h1>
          <p
            style={{ animationDelay: "130ms" }}
            className="mt-5 text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-2xl animate-guest-rise motion-reduce:animate-none print:animate-none"
          >
            {GUEST_COPY.lead}
          </p>

          {/* Animate the row wrapper (never the <a>) so button hover/active transforms stay intact */}
          <div
            style={{ animationDelay: "200ms" }}
            className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-6 animate-guest-rise-sm motion-reduce:animate-none print:animate-none"
          >
            <a
              href={GUEST_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { if (GUEST_FORM_URL === "#") e.preventDefault(); }}
              data-umami-event="guest-interest-click"
              data-umami-event-placement="be-a-guest-hero"
              className="group inline-flex min-h-12 py-3 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-6 sm:px-7 text-sm sm:text-base font-semibold text-[#060010] text-center shadow-[0_0_0_1px_rgba(255,255,255,0.25)] transition-[background-color,transform,box-shadow] duration-200 ease-out hover:bg-[#F3E4FF] hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.65),0_12px_36px_-6px_rgba(220,86,230,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC56E6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060010] active:translate-y-0 active:scale-[0.97] motion-reduce:transition-none motion-reduce:hover:translate-y-0 flex-shrink-0 cursor-pointer"
            >
              <span>{GUEST_COPY.ctaLabel}</span>
              <ArrowUpRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none" />
            </a>
            <p className="text-xs sm:text-sm text-white/60 font-light">
              {GUEST_COPY.ctaMeta}
            </p>
          </div>
        </header>

        {/* Voices we welcome */}
        <section
          aria-labelledby="guest-voices-heading"
          style={{ animationDelay: "270ms" }}
          className="py-10 sm:py-12 border-b border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 animate-guest-rise-sm motion-reduce:animate-none print:animate-none"
        >
          <div className="md:col-span-4">
            <h2
              id="guest-voices-heading"
              className="text-xl font-semibold text-white/95 leading-snug"
            >
              Voices we welcome
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/55 font-light leading-relaxed">
              Everyone uses the same form above.
            </p>
          </div>

          <GuestVoicesTabs />
        </section>

        {/* Process steps: visually straight into 01 / 02 / 03, sr-only heading for screen readers */}
        <section
          aria-labelledby="guest-process-heading"
          style={{ animationDelay: "330ms" }}
          className="py-10 sm:py-12 border-b border-white/10 animate-guest-fade motion-reduce:animate-none print:animate-none"
        >
          <h2 id="guest-process-heading" className="sr-only">
            How it works
          </h2>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
            {PROCESS_STEPS.map((step) => (
              <li
                key={step.num}
                className="grid grid-cols-[2.25rem_1fr] md:flex md:flex-col gap-x-2 gap-y-1 md:gap-1.5 items-baseline"
              >
                <span className="text-xs font-mono text-white/55">{step.num}</span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold text-white/95">{step.title}</h3>
                  <p className="text-sm text-white/65 font-light leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Quick Q&A */}
        <section
          aria-labelledby="guest-qa-heading"
          style={{ animationDelay: "330ms" }}
          className="py-10 sm:py-12 border-b border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 animate-guest-fade motion-reduce:animate-none print:animate-none"
        >
          <div className="md:col-span-4">
            <h2
              id="guest-qa-heading"
              className="text-xl font-semibold text-white/95 leading-snug"
            >
              Quick Q&amp;A
            </h2>
          </div>

          <GuestQaList />
        </section>

        {/* Closing note, warm sign-off, and tracked secondary CTA */}
        <footer
          style={{ animationDelay: "330ms" }}
          className="pt-10 flex flex-col gap-6 animate-guest-fade motion-reduce:animate-none print:animate-none"
        >
          <p className="text-xs sm:text-sm text-white/55 font-light leading-relaxed max-w-2xl">
            {GUEST_COPY.disclaimer}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <p className="text-sm text-white/80 font-light">
              Warmly, Dr. Hilary Marusak &amp; the brainSTEM team
            </p>

            <a
              href={GUEST_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { if (GUEST_FORM_URL === "#") e.preventDefault(); }}
              data-umami-event="guest-interest-click"
              data-umami-event-placement="be-a-guest-footer"
              className="group inline-flex min-h-11 py-2.5 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/25 px-5 text-sm font-medium text-white/90 text-center transition-[background-color,border-color,color] duration-200 hover:border-[#DC56E6]/70 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC56E6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060010] cursor-pointer"
            >
              <span>{GUEST_COPY.ctaLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
