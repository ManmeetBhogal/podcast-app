
# BrainSTEM Podcast Web App

A lightweight, **Next.js**-powered website that automatically pulls new episodes from the BrainSTEM podcast RSS feed and displays them in episode cards.

## Why it exists

The podcast owner never has to touch the code to manually update the website. Whenever a new episode is published, the RSS feed updates and the section for the site regenerates the episode card, with the newest content appearing instantly.

## Demo

**Live Site** : <https://podcast-app-kappa-two.vercel.app/> | <https://brainstempodcast.com/>

## Features

| Feature               | Description                                                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Automatic Updates** | Parses the RSS feed at build time; any new episode triggers a rebuild automatically                                                |
| **Episode Cards**     | Title, description, MP3 player                                                                                                     |
| **Responsive Design** | Mobile-first layout that looks great on all screen sizes                                                                           |
| **SEO Friendly**      | Pre-renders pages either at build (SSG) or on each request (SSR) so search engines receive fully populated HTML ready for crawling |
| **TypeScript**        | Strong typing for safety and editor intelligence                                                                                   |
| **Tailwind CSS**      | Rapid UI building and easy theming                                                                                                 |

## Tech Stack

| Category       | Tool / Library      | Purpose                     |
| -------------- | ------------------- | --------------------------- |
| **Framework**  | Next.js 14          | SSR + SSG + SEO             |
| **Language**   | TypeScript          | Static typing               |
| **UI**         | React + TailwindCSS | Component-based UI          |
| **RSS Parser** | `rss-parser`        | Fetches and parses RSS Feed |
| **Deployment** | Vercel              | Serverless hosting          |

## How it works

1. **RSS Feed Fetch** - During the build (`next build`), `rss-parser` pulls the feed from the URL in .env file with `PODCAST_RSS_URL`
2. **Data Transformation** - Each `<item>` is parsed for title, description, pubDate, url and episodeNum.
3. **Rendering** - each episode is mapped and iterated through to render title, description, and audioUrl
4. **Rebuilds** - When a new episode is published to the RSS feed, a new `episodeCard` appears automatically.

## Local Deployment

| Tool           | Minimum Version | Why                 |
| -------------- | --------------- | ------------------- |
| Node.js        | 20.x or newer   | Runtime for Next.js |
| npm            | 10.x            | Package manager     |
| (optional) Git | Any             | Version Control     |

**Tip:** Use `nvm` to manage Node versions.

## Installation

```bash
# Clone the repository
git clone https://github.com/ManmeetBhogal/podcast-app.git
cd podcast-app

# Install dependencies
npm install   

# Verify the project works locally
npm run dev   # opens http://localhost:3000
```

Open your browser at <http://localhost:3000>. Every time you modify the feed
URL or episode data, restart the dev server to see changes

## Environment Variables

| Veriable          | Descripition             | Required |
| ----------------- | ------------------------ | -------- |
| `PODCAST_RSS_URL` | Full URL of the RSS feed | Yes      |

Add a `.env.local` file for local development: (example)

```
PODCAST_RSS_URL=https://anchor.fm/s/493495d8/podcast/rss
```

## Development

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Development server with HMR |
| `build` | `next build` | Generate static assets |
| `start` | `next start` | Run the production build locally |
| `lint` | `next lint` | Run ESLint & Prettier |
| `format` | `prettier --write .` | Auto‑format source files |

## Acknowledgements

- [Next.js](https://nextjs.org) – The framework that powers this app.
- [rss-parser](https://github.com/rbren/rss-parser) – Simple RSS parsing.
- [Tailwind CSS](https://tailwindcss.com) – Rapid styling.
- [Framer Motion](https://motion.dev/) - A production grade animation library for the web.
