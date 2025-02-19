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
        // try to fetch podcast feed
        const feed = await parser.parseURL(podcastUrl);
        // console.log("Fetched Podcast Feed:", feed); // log the full feed response
        
        
        // if fetching the feed works, map the episodes
        const podcastEpisodes = feed.items.map(item => {

            const episodeMatch = item.title?.match(/^E(\d+)\s*[-–]\s*(.+)/);
            const episodeNum = episodeMatch ? episodeMatch[1] : null;
            // console.log("Episode Number: ", episodeNum)

            return {
                title: item.title || "No title available",
                description: item.contentSnippet || "No description available",
                pubDate: item.pubDate || "No publish date available",
                url: item.enclosure?.url || "#",
                episodeNum: episodeNum || "No episode number available"
            };
        });

        return {
            title: feed.title || "No title available",
            description: feed.description || "No description available",
            episodes: podcastEpisodes,
        };

    } catch (error) {
        console.error('Error parsing RSS feed:', error);
        throw new Error('Failed to fetch podcast feed');
    }
}

