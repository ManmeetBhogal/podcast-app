import { Episode } from '@/app/lib/types';
import { fetchPodcastFeed } from '@/app/lib/podcast';
import EpisodePage from './EpisodePage';

// Define Params as a Promise type
type Params = Promise<{ episodeNum: string }>;

async function getEpisodeData(episodeNum: string): Promise<Episode | null> {
  try {
    const podcast = await fetchPodcastFeed(); // Fetch the podcast data from the feed
    if (!podcast) {
      throw new Error('Podcast data is missing');
    }

    // Find the episode that matches the episodeNum from the URL params
    const foundEpisode = podcast.episodes.find(
      (ep: Episode) => `episode-${ep.episodeNum}` === episodeNum
    );

    return foundEpisode || null;
  } catch (error) {
    console.error('Error in getEpisodeData:', error);
    return null;
  }
}

export default async function Page({ params }: { params: Params }) {
  const { episodeNum } = await params; // Await params correctly

  const episode = await getEpisodeData(episodeNum);

  if (!episode) {
    return <div>Episode not found</div>;
  }

  return <EpisodePage episode={episode} />;
}
