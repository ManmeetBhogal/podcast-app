"use client"

import { useEffect } from "react";

// Next.js Error boundary for the app route segment.
// Shown only when a page throws and no cached ISR fallback exists.

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Page error boundary caught:", error);
    }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 p-8 text-center">
        <h2 className="text-white/90 text-xl font-semibold mb-2">
          Couldn&apos;t load episodes right now
        </h2>
        <p className="text-white/60 text-sm mb-6">
          The podcast feed might be temporarily unavailable. Please try again in a moment.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2 text-sm font-medium text-white/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </main>
  );
}