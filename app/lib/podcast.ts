import Parser from 'rss-parser';


const parser = new Parser();

export async function fetchPodcastFeed() {
    try {

        // environment variable for RSS Feed Url
        const podcastUrl = process.env.PODCAST_RSS_URL;
        // console.log("PODCAST RSS URL from env:", process.env.PODCAST_RSS_URL);

        if (!podcastUrl) {
            throw new Error('Podcast RSS URL is not defined in environment variables');
        }
        // Fetch the RSS XML using the WHATWG-compliant fetch() API,
        // then parse the string 
        const res = await fetch(podcastUrl);
        if (!res.ok) throw new Error(`Failed to fetch RSS feed: ${res.status}`);
        const xml = await res.text();
        const feed = await parser.parseString(xml);
        // console.log("Fetched Podcast Feed:", feed); // log the full feed response
        
        
        // if fetching the feed works, map the episodes
        const podcastEpisodes = feed.items.map(item => {
            const isVideoVersion = item.title?.includes("(Spotify Video Version)") ?? false;
            const cleanTitle = item.title?.replace(/\s*\(Spotify Video Version\)\s*$/i, "").trim();

            const episodeMatch = cleanTitle?.match(/^E(\d+)\s*[-–]\s*(.+)/);
            const episodeNum = episodeMatch ? episodeMatch[1] : null;

            return {
                title: cleanTitle || "No title available",
                description: item.contentSnippet || "No description available",
                pubDate: item.pubDate || "No publish date available",
                url: item.enclosure?.url || "#",
                episodeNum: episodeNum || "No episode number available",
                isVideoVersion,
            };
        });

        // Deduplicate: for episodes with both a video and audio version, keep the video version
        const episodeMap = new Map<string, typeof podcastEpisodes[0]>();
        for (const episode of podcastEpisodes) {
            const key = episode.episodeNum;
            const existing = episodeMap.get(key);
            if (!existing || episode.isVideoVersion) {
                episodeMap.set(key, episode);
            }
        }

        return {
            title: feed.title || "No title available",
            description: feed.description || "No description available",
            episodes: Array.from(episodeMap.values()),
        };

    } catch (error) {
        console.error('Error parsing RSS feed:', error);
        throw new Error('Failed to fetch podcast feed');
    }
}

