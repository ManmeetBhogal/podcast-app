"use client";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Podcast } from "../lib/types";

interface EpisodeCardsProps {
    podcast?: Podcast | null;
    error?: string | null;
}

// EpisodeCard now accepts podcast data as props
export function EpisodeCards({ podcast, error }:  EpisodeCardsProps) {
    console.log("Received podcast prop:", podcast); // log received podcast data
    // console.log("Received error prop:", error); // log received error message
    // Handle the case where podcast data is unavailable
    if (!podcast || !podcast.episodes || podcast.episodes.length === 0) {
        return (
            <div>
                {error ? (
                    <p>Error: {error}</p>
                ) : (
                    <p>No podcast data available. Please try again later.</p>
                )}
            </div>
        );
    }

    const episodes = podcast.episodes;

    return (
        <div>
            <BentoGrid className="max-w-5xl mx-auto">
                {episodes.map((episode, i: number) => (
                    <BentoGridItem
                        key={i}
                        title={episode.title ?? "No title available"}
                        description={
                            <span className="line-clamp-3">
                                {episode.description ?? "No description available"}
                            </span>
                        }
                        audioUrl={episode.url}
                        className={"md:col-span-1 lg:col-span-1"}
                    />
                ))}
            </BentoGrid>
        </div>
    );
}

// const Skeleton = () => (
//     <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
//   );
