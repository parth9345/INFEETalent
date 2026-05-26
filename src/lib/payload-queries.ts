import { unstable_cache } from 'next/cache'

import { primaryNavigation } from './default-content'
import { getPayload } from '@/payload/getPayload'
import { siteConfig } from '@/lib/site'
import type {
  BlogItem,
  CareerItem,
  FAQItem,
  PageContent,
  ServiceItem,
  SiteSettingsContent,
  TeamMemberItem,
  TestimonialItem,
} from '@/types/content'

const collectionLimit = 100
const shouldLogPayloadErrors = process.env.NODE_ENV !== 'production'

const logPayloadQueryError = (context: string, error: unknown) => {
  if (!shouldLogPayloadErrors) {
    return
  }

  if (error instanceof Error) {
    console.error(`[Payload query] ${context}`, {
      message: error.message,
      name: error.name,
      stack: error.stack,
    })
    return
  }

  console.error(`[Payload query] ${context}`, error)
}

const getDefaultSiteSettings = (): SiteSettingsContent => ({
  brandName: siteConfig.name,
  header: {
    navigation: primaryNavigation,
    stickyEnabled: true,
  },
  footer: {
    navigationColumns: [
      {
        title: 'Quick Links',
        links: primaryNavigation,
      },
    ],
    contact: {
      address: '2972 Westheimer Rd. Santa Ana, Illinois 85486',
      ukPhone: siteConfig.phones.uk,
      usPhone: siteConfig.phones.us,
      ausPhone: siteConfig.phones.aus,
      email: siteConfig.contactEmail,
    },
    copyright: `Copyright 2026 ${siteConfig.name}. All rights reserved.`,
  },
  primaryNavigation,
  footerNavigation: primaryNavigation,
  contact: {
    officeAddress: '2972 Westheimer Rd. Santa Ana, Illinois 85486',
    ukPhone: siteConfig.phones.uk,
    usPhone: siteConfig.phones.us,
    ausPhone: siteConfig.phones.aus,
    email: siteConfig.contactEmail,
  },
})

const findPublishedBySlug = async <T>({
  collection,
  slug,
  depth = 3,
}: {
  collection: 'blogs' | 'careers' | 'pages' | 'services'
  depth?: number
  slug: string
}): Promise<T | null> => {
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection,
      depth,
      draft: false,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    return (result.docs[0] as T | undefined) || null
  } catch (error) {
    logPayloadQueryError(`find ${collection} by slug "${slug}"`, error)
    return null
  }
}

const findPublished = async <T>({
  collection,
  depth = 2,
  limit = collectionLimit,
  sort,
}: {
  collection: 'blogs' | 'careers' | 'faqs' | 'pages' | 'services' | 'team-members' | 'testimonials'
  depth?: number
  limit?: number
  sort?: string
}): Promise<T[]> => {
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection,
      depth,
      draft: false,
      limit,
      sort,
    })

    return result.docs as T[]
  } catch (error) {
    logPayloadQueryError(`find ${collection} list`, error)
    return []
  }
}

export const getPageBySlug = unstable_cache(
  async (slug: string): Promise<PageContent | null> => findPublishedBySlug<PageContent>({ collection: 'pages', slug }),
  ['page-by-slug'],
  { revalidate: 60 },
)

export const getPages = unstable_cache(
  async (): Promise<PageContent[]> => findPublished<PageContent>({ collection: 'pages', depth: 1, limit: collectionLimit, sort: 'slug' }),
  ['pages'],
  { revalidate: 60 },
)

export const getBlogs = unstable_cache(
  async (limit = 12): Promise<BlogItem[]> => findPublished<BlogItem>({ collection: 'blogs', limit, sort: '-publishedAt' }),
  ['blogs'],
  { revalidate: 60 },
)

export const getFeaturedBlogs = unstable_cache(
  async (limit = 5): Promise<BlogItem[]> => {
    try {
      const payload = await getPayload()
      const result = await payload.find({
        collection: 'blogs',
        depth: 2,
        draft: false,
        limit,
        sort: '-publishedAt',
        where: {
          featured: {
            equals: true,
          },
        },
      })

      return result.docs as BlogItem[]
    } catch (error) {
      logPayloadQueryError('find featured blogs list', error)
      return []
    }
  },
  ['featured-blogs'],
  { revalidate: 60 },
)

export const getBlogBySlug = unstable_cache(
  async (slug: string): Promise<BlogItem | null> => findPublishedBySlug<BlogItem>({ collection: 'blogs', slug }),
  ['blog-by-slug'],
  { revalidate: 60 },
)

export const getRelatedBlogs = unstable_cache(
  async (slug: string, category?: string, limit = 3): Promise<BlogItem[]> => {
    try {
      const payload = await getPayload()
      const result = await payload.find({
        collection: 'blogs',
        depth: 2,
        draft: false,
        limit: collectionLimit,
        sort: '-publishedAt',
      })
      const normalizedCategory = category?.trim().toLowerCase()
      const docs = (result.docs as BlogItem[]).filter((post) => post.slug !== slug)
      const sameCategory = normalizedCategory
        ? docs.filter((post) => post.category?.trim().toLowerCase() === normalizedCategory)
        : []

      return (sameCategory.length ? sameCategory : docs).slice(0, limit)
    } catch (error) {
      logPayloadQueryError(`find related blogs for "${slug}"`, error)
      return []
    }
  },
  ['related-blogs'],
  { revalidate: 60 },
)

export const getServices = unstable_cache(
  async (limit = 12): Promise<ServiceItem[]> => findPublished<ServiceItem>({ collection: 'services', limit, sort: 'title' }),
  ['services'],
  { revalidate: 60 },
)

export const getServiceBySlug = unstable_cache(
  async (slug: string): Promise<ServiceItem | null> => findPublishedBySlug<ServiceItem>({ collection: 'services', slug }),
  ['service-by-slug'],
  { revalidate: 60 },
)

export const getCareers = unstable_cache(
  async (limit = 12): Promise<CareerItem[]> => findPublished<CareerItem>({ collection: 'careers', limit, sort: '-updatedAt' }),
  ['careers'],
  { revalidate: 60 },
)

export const getCareerBySlug = unstable_cache(
  async (slug: string): Promise<CareerItem | null> => findPublishedBySlug<CareerItem>({ collection: 'careers', slug }),
  ['career-by-slug'],
  { revalidate: 60 },
)

export const getTestimonials = unstable_cache(
  async (limit = 6): Promise<TestimonialItem[]> => findPublished<TestimonialItem>({ collection: 'testimonials', limit, sort: '-featured' }),
  ['testimonials'],
  { revalidate: 60 },
)

export const getFAQs = unstable_cache(
  async (limit = 12): Promise<FAQItem[]> => findPublished<FAQItem>({ collection: 'faqs', depth: 1, limit, sort: 'order' }),
  ['faqs'],
  { revalidate: 60 },
)

export const getTeamMembers = unstable_cache(
  async (limit = 12): Promise<TeamMemberItem[]> => findPublished<TeamMemberItem>({ collection: 'team-members', limit, sort: 'order' }),
  ['team-members'],
  { revalidate: 60 },
)

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettingsContent> => {
    try {
      const payload = await getPayload()
      const settings = (await payload.findGlobal({ slug: 'site-settings', depth: 2 })) as SiteSettingsContent | null | undefined
      return settings || getDefaultSiteSettings()
    } catch (error) {
      logPayloadQueryError('find global site-settings', error)
      return getDefaultSiteSettings()
    }
  },
  ['site-settings'],
  { revalidate: 60 },
)

export const getNavigation = unstable_cache(
  async () => {
    const settings = await getSiteSettings()
    if (settings.header?.navigation?.length) {
      return settings.header.navigation
    }

    return settings.primaryNavigation?.length ? settings.primaryNavigation : primaryNavigation
  },
  ['navigation'],
  { revalidate: 60 },
)

export const getFooterNavigation = unstable_cache(
  async () => {
    const settings = await getSiteSettings()
    const firstFooterColumn = settings.footer?.navigationColumns?.find((column) => column.links?.length)

    if (firstFooterColumn?.links?.length) {
      return firstFooterColumn.links
    }

    return settings.footerNavigation?.length ? settings.footerNavigation : await getNavigation()
  },
  ['footer-navigation'],
  { revalidate: 60 },
)

export const getSitemapEntries = unstable_cache(
  async () => {
    const [pages, latestBlogs, latestServices, latestCareers] = await Promise.all([
      getPages(),
      getBlogs(collectionLimit),
      getServices(collectionLimit),
      getCareers(collectionLimit),
    ])

    return { pages, blogs: latestBlogs, services: latestServices, careers: latestCareers }
  },
  ['sitemap-entries'],
  { revalidate: 300 },
)
