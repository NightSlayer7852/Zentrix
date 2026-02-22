import Firecrawl from '@mendable/firecrawl-js';

const firecrawl = new Firecrawl({ apiKey: process.env.FIRE_CRAWL_API_KEY! });
export default firecrawl;