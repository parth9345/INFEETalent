import type { MetadataRoute } from 'next'

import { getSitemapEntries } from '@/lib/payload-queries'
import { absoluteUrl } from '@/lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getSitemapEntries()
  const pages = entries.pages.filter((page) => page.slug && !page.seo?.noIndex)
  const blogs = entries.blogs.filter((post) => post.slug && !post.seo?.noIndex)
  const services = entries.services.filter((service) => service.slug && !service.seo?.noIndex)
  const careers = entries.careers.filter((career) => career.slug && !career.seo?.noIndex)

  return [
    ...pages.map((page) => ({
      url: absoluteUrl(page.slug === 'home' ? '/' : `/${page.slug}`),
      lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: page.slug === 'home' ? 1 : 0.8,
    })),
    ...blogs.map((post) => ({
      url: absoluteUrl(`/blogs/${post.slug}`),
      lastModified: post.updatedAt ? new Date(post.updatedAt) : post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified: service.updatedAt ? new Date(service.updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...careers.map((career) => ({
      url: absoluteUrl(`/careers/${career.slug}`),
      lastModified: career.updatedAt ? new Date(career.updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ]
}
