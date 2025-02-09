import { fetchPodcastFeed } from "./lib/podcast";
import { SparklesPreview } from "./ui/title";
import { EpisodeCards } from "./ui/episodeCard";
import { Podcast } from "./lib/types";

export default async function PodcastPage() {
  let podcastData: Podcast | null = null;
  let errorMessage: string | null = null;

  try {
    podcastData = await fetchPodcastFeed();
    // console.log("Podcast Data:", podcastData); // ensure data is fetched
  } catch (error) {
    // TypeScript-safe error handling
    if (error instanceof Error) {
      console.error("Error fetching podcast feed:", error.message);
      errorMessage = error.message;
    } else {
      console.error("Unknown error:", error);
      errorMessage = "An unknown error occurred";
    }
  }

  return (
    <div>
      <SparklesPreview />
      
      <EpisodeCards podcast={podcastData} error={errorMessage} />
    </div>
  );
};
