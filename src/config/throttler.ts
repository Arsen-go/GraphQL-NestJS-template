import { ThrottlerModuleOptions } from '@nestjs/throttler';

export const Throttler: ThrottlerModuleOptions = {
  throttlers: [
    {
      name: 'short', // Name for the throttling configuration
      ttl: 1, // Time to live (TTL) in seconds for the limit window
      limit: 10, // Maximum number of requests allowed in this TTL window
    },
    {
      name: 'medium', // A more lenient throttling configuration
      ttl: 10, // TTL of 10 seconds
      limit: 50, // Up to 50 requests allowed in this 10-second window
    },
    {
      name: 'long', // Long-term throttling configuration
      ttl: 60, // TTL of 1 minute
      limit: 300, // Allows up to 300 requests in a minute
    },
  ],
  ignoreUserAgents: [
    /googlebot/gi, // Ignore Google's web crawler bots from throttling
    new RegExp('bingbot', 'gi'), // Ignore Bing's web crawler bots from throttling
  ],
};
