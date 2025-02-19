export interface Episode {
    title: string | undefined;
    description: string | undefined;
    pubDate: string | undefined
    url: string | undefined;
    episodeNum: string | undefined;
}

export interface Podcast {
    title: string | undefined;
    description: string | undefined;
    episodes: Episode[];
}

export interface PageProps {
    params: {
        [key: string]: string | string[] | undefined;
    };
    searchParams?: { [key: string]: string | string[] | undefined };
}

// Updated EpisodePageProps to match Next.js requirements
export interface EpisodePageProps extends PageProps {
    params: {
        episodeNum: string;
    };
    // Make searchParams optional to match PageProps
    searchParams?: { [key: string]: string | string[] | undefined };
}