import type { MetadataRoute } from 'next'

import { siteConfig } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/api/media/file/', '/media/'],
      disallow: ['/admin/', '/api/', '/graphql', '/graphql-playground', '/thank-you'],
    },
    host: siteConfig.url,
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
