import { fetchPodcastFeed } from "./lib/podcast";
import { SparklesPreview } from "./ui/title";

const PodcastPage = async () => {
  // Fetch the podcast feed and episodes
  const { title, description, episodes } = await fetchPodcastFeed();

  return (
    <div>
      <SparklesPreview />
      <h1>{title}</h1>
      <p>{description}</p>
      <ul>
        {episodes.length > 0 ? (
          episodes.map((episode, index) => (
            <li key={index}>
              <h2>{episode.title}</h2>
              <p>{episode.description}</p>
              <a href={episode.url} target="_blank" rel="noopener noreferrer">
                Listen to Episode
              </a>
            </li>
          ))
        ) : (
          <p>No episodes available at the moment.</p>
        )}
      </ul>
    </div>
  );
};

export default PodcastPage;
