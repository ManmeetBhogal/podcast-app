import Parser from 'rss-parser'; 


const parser = new Parser();

export async function fetchPodcastFeed() {
    try {

        // environment variable for RSS Feed Url
        const podcastUrl = process.env.NEXT_PUBLIC_PODCAST_RSS_URL;
        if (!podcastUrl) {
            throw new Error('Podcast RSS URL is not defined in environment variables');
        }
        // try to fetch podcast feed
        const feed = await parser.parseURL(podcastUrl);
        
        // if fetching the feed works, fetch the episodes
        const podcastEpisodes = feed.items.map(item => {
            return {
                title: item.title, // episode title
                description: item.contentSnippet, //episode description
                url: item.link, // episode URL
            };
        });

        return {
            title: feed.title,
            description: feed.description,
            episodes: podcastEpisodes,
        };

    } catch (error) {
        console.error('Error parsing RSS feed:', error);
        throw new Error('Failed to fetch podcast feed');
    }
}

