# BrainSTEM Podcast Web App

A **Next.js 15** website that automatically pulls new episodes from the BrainSTEM podcast RSS feed and presents them with a custom glass morphism UI, WebGL aurora animations, and a hand-built audio player.

## Why it exists

The podcast team never has to touch the code or redeploy Vercel to update the site. Whenever a new episode is published, the RSS feed updates and the site automatically refreshes its cached episodes in the background via Next.js Incremental Static Regeneration (ISR) — with an optional webhook endpoint for instant updates on demand.

## Demo

**Live Site:** <https://brainstempodcast.com/>

---

## Features

| Feature | Description |
| --- | --- |
| **Automatic Episode Updates (ISR)** | Caches the RSS feed for 15 minutes and refreshes automatically in the background — no manual Vercel redeploys needed |
| **On-Demand Cache Revalidation** | Protected `POST /api/revalidate` endpoint to refresh the RSS cache immediately after publishing |
| **Resilient Error Handling** | Keeps serving the last working cached homepage if the RSS host temporarily goes down, with `app/error.tsx` as a fallback |
| **Episode Cards** | Responsive grid of cards showing title, description, pub date, and inline audio player |
| **Episode Detail Pages** | Dedicated page per episode (`/episode-{num}`) with full description, custom audio player, platform links, and proper HTTP `404` handling |
| **Custom Audio Player** | Hand-built player with play/pause, scrubbing, time display, and playback speed control (0.75×–2×) |
| **Support / Donations Page** | Dedicated `/support` page and episode donate cards powered by Ko-fi |
| **Be a Guest Page** | Dedicated `/be-a-guest` guest interest page linking to Wayne State Qualtrics |
| **Glass Morphism UI** | Frosted-glass episode and support cards using `bg-white/5 backdrop-blur-xl` with hairline borders |
| **WebGL Aurora Background** | Full-screen animated aurora effect powered by `ogl` (WebGL) with an `IntersectionObserver` to pause rendering off-screen |
| **Plasma Background** | Particle-based animated background in the team section using `@tsparticles` |
| **Scroll-Aware Masthead Navbar** | Fixed top editorial masthead with a soft top scrim over the hero, transitioning to a frosted dark bar after 64px of scroll, with active route/scroll-spy indicators on desktop and a smooth downward reveal drawer on mobile |
| **Team / About Section** | Profiles for each podcast team member with headshots, roles, and bios |
| **Platform Links** | Badges linking to Spotify, Apple Podcasts, Pocket Casts, and YouTube |
| **Privacy-Friendly Analytics** | Optional Umami analytics script proxied through `/stats/*` when `UMAMI_URL` is configured |
| **Responsive & SEO Friendly** | Mobile-first Tailwind CSS layout with server-rendered HTML |
| **TypeScript** | Strong typing throughout for safety and editor intelligence |

---

## Tech Stack

| Category | Tool / Library | Purpose |
| --- | --- | --- |
| **Framework** | Next.js 15 | App Router, Server Components, ISR, and Route Handlers |
| **Language** | TypeScript | Static typing |
| **UI** | React 19 + Tailwind CSS | Component-based UI and styling |
| **Animation** | Framer Motion | Page transitions, scroll animations, stagger effects |
| **WebGL** | `ogl` | Aurora background shader |
| **Particles** | `@tsparticles` | Plasma background effect |
| **RSS Parsing** | `rss-parser` | Fetches and parses the podcast RSS feed |
| **Icons** | `react-icons`, `lucide-react` | Platform icons and UI icons |
| **Deployment** | Vercel | Serverless hosting with ISR caching & on-demand revalidation |

---

## How it works

1. **RSS Fetch & Caching (ISR)** — `fetchPodcastFeed()` in `app/lib/podcast.ts` reads `PODCAST_RSS_URL`, fetches the feed with an 8-second timeout (`AbortSignal.timeout(8000)`), and caches the response using Next.js ISR (`next: { revalidate: 900, tags: ['podcast-feed'] }`).
2. **Data Transformation & Deduplication** — Each `<item>` is parsed for title, description, pubDate, audio URL, and episode number (extracted via regex from `E{num} - {title}`). Episodes published with both an audio and `(Spotify Video Version)` entry are deduplicated, keeping the video version.
3. **Rendering & Error Resilience** — `app/page.tsx` (a Server Component) fetches the feed and passes it to client components. Fetch errors are intentionally allowed to throw rather than being swallowed — if the RSS host fails during a background refresh, Next.js discards the failed attempt and keeps serving the last good cached homepage instead of caching an error screen. When no cached page exists, `app/error.tsx` renders a retry fallback.
4. **Episode Detail Pages** — `app/(episode)/[episodeNum]/page.tsx` reuses the cached feed, finds the matching episode, and calls Next.js's `notFound()` for missing episodes so they return a proper HTTP `404`.
5. **Automatic & On-Demand Updates** — New episodes appear automatically within 15 minutes without rebuilding or redeploying Vercel. For instant updates, `POST /api/revalidate` verifies the `x-revalidate-secret` header using constant-time comparison (`crypto.timingSafeEqual`) and calls `revalidateTag('podcast-feed')`.

---

## Local Setup

**Requirements:**

| Tool | Version |
| --- | --- |
| Node.js | `24.x` (pinned in `.nvmrc`) |
| npm | `10.x` or newer |

**Tip:** Use `nvm` to automatically match the Node version in `.nvmrc`.

```bash
# Clone the repository
git clone https://github.com/ManmeetBhogal/podcast-app.git
cd podcast-app

# Switch to the Node version in .nvmrc
nvm use

# Install dependencies
npm install

# Start the dev server
npm run dev   # http://localhost:3000
```

> **Note:** To test ISR caching and `/api/revalidate` locally, run a production build (`npm run build && npm run start`) rather than `npm run dev`, since dev mode bypasses most Next.js caching.

---

## Environment Variables

| Variable | Description | Required |
| --- | --- | --- |
| `PODCAST_RSS_URL` | Full URL of the podcast RSS feed | Yes |
| `REVALIDATE_SECRET` | Secret token required in the `x-revalidate-secret` header for `POST /api/revalidate` | For on-demand webhook |
| `NEXT_PUBLIC_KOFI_USERNAME` | Ko-fi username used for donation links on `/support` and episode pages | No |
| `NEXT_PUBLIC_GUEST_FORM_URL` | Full URL of the guest interest form linked from `/be-a-guest` | No |
| `UMAMI_URL` | Base URL for Umami analytics proxied at `/stats/:path*` (skipped cleanly when unset) | No |

Create a `.env.local` file for local development:

```env
PODCAST_RSS_URL=https://anchor.fm/s/493495d8/podcast/rss
REVALIDATE_SECRET=your-local-test-secret
NEXT_PUBLIC_KOFI_USERNAME=
NEXT_PUBLIC_GUEST_FORM_URL=
UMAMI_URL=
```

### Triggering On-Demand Revalidation

To immediately refresh the cached RSS feed without waiting for the 15-minute ISR window (either manually or from an RSS automation such as Make, IFTTT, or Zapier):

```bash
curl -X POST https://brainstempodcast.com/api/revalidate \
  -H "x-revalidate-secret: YOUR_REVALIDATE_SECRET"
```

A successful request returns HTTP `200` with `{"revalidated":true,"tag":"podcast-feed","timestamp":"..."}`.

---

## Scripts

| Script | Command | Description |
| --- | --- | --- |
| `dev` | `next dev --turbopack` | Dev server with Turbopack HMR |
| `build` | `next build` | Production build |
| `start` | `next start` | Run the production build locally |
| `lint` | `next lint` | ESLint checks |

---

## Project Structure

```
app/
  api/
    revalidate/
      route.ts      # POST /api/revalidate on-demand ISR cache invalidation
  (episode)/
    [episodeNum]/   # Dynamic episode detail route (/episode-{num})
  be-a-guest/       # /be-a-guest guest interest page
  lib/              # RSS fetching/parsing, donation & guest config, types, shared utilities
  support/          # /support donation page
  ui/               # App-specific components (episode cards, audio player, title)
  error.tsx         # Route Error Boundary fallback
  layout.tsx        # Root layout & optional Umami script
  page.tsx          # Home page (Server Component with ISR)

components/
  donate/           # Ko-fi donation buttons and support page sections
  guest/            # /be-a-guest page copy and structured content
  nav/              # Shared navigation routes and scroll-spy controller
  ui/               # Reusable UI (AuroraBackground, GlassNavBar, PlasmaBackground)
  TeamMember.tsx    # Team section
  PodcastPlatforms.tsx  # Platform badge row
  BlurText.tsx      # Animated text reveal

public/
  team/             # Team member headshots
```

---

## Acknowledgements

- [Next.js](https://nextjs.org) — Framework
- [rss-parser](https://github.com/rbren/rss-parser) — RSS parsing
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Framer Motion](https://motion.dev/) — Animations
- [ogl](https://github.com/oframe/ogl) — WebGL aurora effect
- [tsParticles](https://particles.js.org/) — Plasma particle effect
- [Vercel](https://vercel.com) — Hosting
