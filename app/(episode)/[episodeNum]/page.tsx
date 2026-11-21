import { notFound } from 'next/navigation';
import { Episode } from '@/app/lib/types';
import { fetchPodcastFeed } from '@/app/lib/podcast';
import EpisodePage from './EpisodePage';

// Define Params as a Promise type
type Params = Promise<{ episodeNum: string }>;

async function getEpisodeData(episodeNum: string): Promise<Episode | null> {
  // Let RSS fetch errors throw so outages hit app/error.tsx (500)
  // rather than being misreported as a 404 "episode not found".
  const podcast = await fetchPodcastFeed();

  const foundEpisode = podcast.episodes.find(
    (ep: Episode) => `episode-${ep.episodeNum}` === episodeNum
  );

  return foundEpisode || null;
}

export default async function Page({ params }: { params: Params }) {
  const { episodeNum } = await params; // Await params correctly

  const episode = await getEpisodeData(episodeNum);

  if (!episode) {
    // Sends a HTTP 404 status instead of rendering an error string with 200 OK
    notFound();
  }

  return <EpisodePage episode={episode} />;
}
