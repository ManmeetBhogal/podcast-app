import { fetchPodcastFeed } from "./lib/podcast";
import { EpisodeCards } from "./ui/episodeCard";
import { Title } from "./ui/title";
import { Description } from "./ui/description";
import PodcastTicker from "@/components/PodcastPlatforms";




export default async function PodcastPage() {
  /* Intentionally do not catch RSS fetch errors here. 
     If a background ISR refresh fails, letting this throw tells Next.js
     to keep serving the last good cached page instead of caching an error screen.
     If no cached page exists yet, app/error.tsx catches it and renders a retry UI. */

  const podcastData = await fetchPodcastFeed();

  return (
    <div>
      <Title />

      <PodcastTicker />

      <Description />

      <EpisodeCards podcast={podcastData} />
    </div>
  );
}
