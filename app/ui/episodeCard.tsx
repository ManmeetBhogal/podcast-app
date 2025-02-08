"use client";
import React, { useEffect, useState } from "react";
import { fetchPodcastFeed } from "../lib/podcast";

export async function getEpisodeData() {
    const { episodes } = await fetchPodcastFeed();
    return episodes;
}


export function EpisodeCards() {
    const [episodes, setEpisodes] = useState<{ title: string | undefined; description: string | undefined; url: string | undefined; }[]>([]);

    useEffect(() => {
        async function fetchData() {
            const episodesData = await getEpisodeData();
            setEpisodes(episodesData);
        }
        fetchData();
    }, []);

    return (
        <div className="container mx-auto px-4">
            {episodes.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {episodes.map((episode, index) => (
                        <li key={index} className="bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-xl font-bold mb-2">{episode.title}</h2>
                            <p className="text-gray-700 line-clamp-2">{episode.description}</p>
                            <a href={episode.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                Listen to Episode
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No episodes available at the moment.</p>
            )}
        </div>
    );
}