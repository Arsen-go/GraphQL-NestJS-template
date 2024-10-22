import helmet from 'helmet';

export function configureHelmet() {
  return helmet({
    // Configure HTTP Strict Transport Security (HSTS) for secure connections
    hsts: {
      maxAge: 31536000, // Set HSTS max age to 1 year (in seconds)
      includeSubDomains: true, // Apply HSTS to all subdomains
      preload: true, // Allow this site to be included in browsers' HSTS preload lists
    },

    // Define Content Security Policy (CSP) to control resource loading
    contentSecurityPolicy: {
      directives: {
        // Allow scripts only from the site's own origin ('self') and certain trusted sources
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],

        // Allow images only from the site's own origin ('self'), data URIs, and specific CDN
        imgSrc: ["'self'", "'data:'", 'https://cdn.jsdelivr.net'],
      },
    },
  });
}
