"use client";
import { SlidersVertical, Headphones, Users } from "lucide-react";
import { SiKofi } from "react-icons/si";
import { DonateButton } from "@/components/donate/DonateButton";
import {
  FreeWaysToHelp,
  GlowCard,
  SupportHero,
  SupportShell,
  SupportUsesGrid,
  type SupportUse,
} from "@/components/donate/supportSections";

/* Hosting is free for us, so it isn't listed here. */
const SUPPORT_USES: SupportUse[] = [
  { icon: Headphones,      title: "Equipment",         body: "Mics and gear so guests sound as good as their science." },
  { icon: SlidersVertical, title: "Behind the scenes", body: "Supporting the small team that brings every episode to life." },
  { icon: Users,           title: "Guest travel",      body: "Helping experts and people with lived experience travel to join us in person." },
];

/* ──────────────────────── /support PAGE ────────────────────────
 * The ask, where money goes, and free ways to help for listeners who can't
 * give. Reached from the navbar "Support" pill. Ko-fi has no API for custom
 * checkout forms, so there's no amount picker here — donors choose the amount
 * and one-time vs monthly on Ko-fi.
 */
export default function SupportPage() {
  return (
    <SupportShell>
      <SupportHero />

      <GlowCard>
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="flex-1 flex flex-col gap-2">
            <p className="text-white/40 text-xs font-medium uppercase tracking-widest">Make a donation</p>
            <h2 className="text-white/90 text-2xl font-semibold leading-snug">Support brainSTEM</h2>
            <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed">
              Give once, or set up a monthly contribution.
            </p>
          </div>
          <DonateButton
            placement="support-page"
            icon={<SiKofi className="relative w-5 h-5 transition-transform duration-300 group-hover:scale-110" />}
            size="lg"
            className="w-full md:w-auto flex-shrink-0"
          >
            Donate on Ko-fi
          </DonateButton>
        </div>
      </GlowCard>

      <SupportUsesGrid items={SUPPORT_USES} />
      <FreeWaysToHelp />
    </SupportShell>
  );
}
