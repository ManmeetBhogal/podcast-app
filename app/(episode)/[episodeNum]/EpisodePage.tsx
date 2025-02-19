"use client"
import { Episode } from '@/app/lib/types';
import Image from 'next/image'

interface EpisodePageProps {
  episode: Episode | null;
}

export default function EpisodePage({ episode }: EpisodePageProps) {
  // Handle the case where episode data is not found
  if (!episode) {
    return <p>Episode not found.</p>;
  }

  return (
    <div>
    <header className="bg-black text-white flex flex-col items-center justify-center">
        <Image src="/BrainSTEM_Transparent_NoText.png" alt="brainSTEM Podcast Logo" width={200} height={200} />
        <div className="container mx-auto p-4">
            <h1 className="text-4xl sm:text-xl md:text-4xl lg:text-4xl font-bold text-center">brainSTEM Podcast</h1>
        </div>
    </header>
    <div className="episode-page flex flex-col text-white bg-black">
      <h1 className="text-center">{episode.title}</h1>
      {/* <p><strong>Episode Number:</strong> {episode.episodeNum}</p> */}
      <p className="text-center pb-5"><strong>Published:</strong> {new Date(episode.pubDate ?? '').toLocaleDateString()}</p>
      <div className="description p-10">
        <p>{episode.description}</p>
      </div>
      <audio controls>
        <source src={episode.url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
    </div>
  );
}