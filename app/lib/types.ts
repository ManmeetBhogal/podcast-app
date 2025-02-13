export interface Episode {
    title: string | undefined;
    description: string | undefined;
    pubDate: string | undefined
    url: string | undefined;
}

export interface Podcast {
    title: string | undefined;
    description: string | undefined;
    episodes: Episode[];
}