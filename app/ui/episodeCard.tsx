"use client";
import React, { useEffect, useState, JSX } from "react";
import { fetchPodcastFeed } from "../lib/podcast";
import { GetServerSideProps } from "next";
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

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const podcastData = await fetchPodcastFeed();
        return {
            props: {
                podcast: podcastData,
            },
        };
    } catch (error) {
        return {
            props: {
                error: (error as Error).message,
            }
        };
    }
};


export function EpisodeCards() {

    const [items, setItems] = useState<{ title: string | undefined; description: string | undefined; header: JSX.Element; }[]>([]);

    useEffect(() => {
        async function fetchItems() {
            try {
                const podcastData = await fetchPodcastFeed();
                const episodes = podcastData.episodes;
                console.log(episodes); // log fetched episodes
                const items = episodes.map((episode) => ({
                    title: episode.title,
                    description: episode.description,
                    header: <Skeleton />,
                    // icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />, // Replace with appropriate icon
                }));
                console.log(items); // log mapped items
                setItems(items);
            } catch (error) {
                console.error("Failed to fetch episodes", error);
            }
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
