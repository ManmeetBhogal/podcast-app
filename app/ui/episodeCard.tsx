"use client";
import React, { useEffect, useState, JSX } from "react";
import { fetchPodcastFeed } from "../lib/podcast";
// import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
// import {
//     IconArrowWaveRightUp,
//     IconBoxAlignRightFilled,
//     IconBoxAlignTopLeft,
//     IconClipboardCopy,
//     IconFileBroken,
//     IconSignature,
//     IconTableColumn,
// } from "@tabler/icons-react";

export async function getEpisodeData() {
    const { episodes } = await fetchPodcastFeed();
    return episodes;
}


export function EpisodeCards() {
    // const [episodes, setEpisodes] = useState<{ title: string | undefined; description: string | undefined; url: string | undefined; }[]>([]);

    // useEffect(() => {
    //     async function fetchData() {
    //         const episodesData = await getEpisodeData();
    //         setEpisodes(episodesData);
    //     }
    //     fetchData();
    // }, []);

    const [items, setItems] = useState<{ title: string | undefined; description: string | undefined; header: JSX.Element; }[]>([]);

    useEffect(() => {
        async function fetchItems() {
            const episodes = await getEpisodeData();
            console.log(episodes); // log fetched episodes
            const items = episodes.map((episode) => ({
                title: episode.title,
                description: episode.description,
                header: <Skeleton />,
                // icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />, // Replace with appropriate icon
            }));
            console.log(items); // log mapped items
            setItems(items);
        }
        fetchItems();
    }, []);

    return (
        <div>
            <BentoGrid className="max-w-5xl mx-auto">
                {items.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item.title}
                        description={<span className="line-clamp-3">{item.description}</span>}
                        className={"md:col-span-1 lg:col-span-1"}
                    />
                ))}
            </BentoGrid>
        </div>
    );
}

const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
  );
