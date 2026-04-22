
# BrainSTEM Podcast Web App

A **Next.js 15** website that automatically pulls new episodes from the BrainSTEM podcast RSS feed and presents them with a custom glass morphism UI, WebGL aurora animations, and a hand-built audio player.

## Why it exists

The podcast team never has to touch the code to update the site. Whenever a new episode is published, the RSS feed updates and the episode card appears automatically on the next build.

## Demo

**Live Site:** <https://brainstempodcast.com/>

---

## Features

| Feature | Description |
| --- | --- |
| **Automatic Episode Updates** | Parses the RSS feed at build time — new episodes appear without any manual work |
| **Episode Cards** | Responsive grid of cards showing title, description, pub date, and inline audio player |
| **Episode Detail Pages** | Dedicated page per episode (`/episode-{num}`) with full description, custom audio player, and platform links |
| **Custom Audio Player** | Hand-built player with play/pause, scrubbing, time display, and playback speed control (0.75×–2×) |
| **Glass Morphism UI** | Frosted-glass cards and navbar styled after iOS liquid glass — `bg-white/5 backdrop-blur-xl` with hairline borders |
| **WebGL Aurora Background** | Full-screen animated aurora effect powered by `ogl` (WebGL) with an `IntersectionObserver` to pause rendering off-screen |
| **Plasma Background** | Particle-based animated background in the team section using `@tsparticles` |
| **Scroll-Aware Navbar** | Transparent at the top of the page; transitions to a frosted glass pill after 80px of scroll |
| **Team / About Section** | Profiles for each podcast team member with headshots, roles, and bios |
| **Platform Links** | Badges linking to Spotify, Apple Podcasts, Pocket Casts, and YouTube |
| **Responsive Design** | Mobile-first layout using Tailwind CSS breakpoints |
| **SEO Friendly** | Server-rendered HTML so search engines receive fully populated pages |
| **TypeScript** | Strong typing throughout for safety and editor intelligence |

---

## Tech Stack

| Category | Tool / Library | Purpose |
| --- | --- | --- |
| **Framework** | Next.js 15 | SSR + SSG + App Router |
| **Language** | TypeScript | Static typing |
| **UI** | React 19 + Tailwind CSS | Component-based UI and styling |
| **Animation** | Framer Motion | Page transitions, scroll animations, stagger effects |
| **WebGL** | `ogl` | Aurora background shader |
| **Particles** | `@tsparticles` | Plasma background effect |
| **RSS Parsing** | `rss-parser` | Fetches and parses the podcast RSS feed |
| **Icons** | `react-icons`, `lucide-react` | Platform icons and UI icons |
| **Deployment** | Vercel | Serverless hosting with automatic rebuilds |

---

## How it works

1. **RSS Fetch** — At build time, `fetchPodcastFeed()` in `app/lib/podcast.ts` reads `PODCAST_RSS_URL`, fetches the feed with the native `fetch()` API, and parses the XML with `rss-parser`.
2. **Data Transformation** — Each `<item>` is parsed for title, description, pubDate, audio URL, and episode number (extracted via regex from the title format `E{num} - {title}`).3. **Rendering** — `app/page.tsx` (a Server Component) calls `fetchPodcastFeed()` and passes the result as props to client components. No API routes, no database, no client-side fetching.
4. **Episode Detail Pages** — `app/(episode)/[episodeNum]/page.tsx` fetches the full feed, finds the episode by number, and renders a dedicated detail page.
5. **Rebuilds** — When a new episode is published, Vercel rebuilds the site and the new episode card appears automatically.

---

## Local Setup

**Requirements:**

| Tool | Minimum Version |
| --- | --- |
| Node.js | 20.x or newer |
| npm | 10.x |

**Tip:** Use `nvm` to manage Node versions.

```bash
# Clone the repository
git clone https://github.com/ManmeetBhogal/podcast-app.git
cd podcast-app

# Install dependencies
npm install

# Start the dev server
npm run dev   # http://localhost:3000
```

---

## Environment Variables

| Variable | Description | Required |
| --- | --- | --- |
| `PODCAST_RSS_URL` | Full URL of the podcast RSS feed | Yes |

Create a `.env.local` file for local development:

```
PODCAST_RSS_URL=https://anchor.fm/s/493495d8/podcast/rss
```

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
  lib/              # RSS parsing, types, shared utilities
  ui/               # App-specific components (episode cards, audio player, title)
  (episode)/        # Dynamic episode detail route
  page.tsx          # Home page (Server Component)
  layout.tsx        # Root layout

components/
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
