import type { Metadata } from 'next'

import { figmaAssets } from './assets'
import { getFAQs } from './payload-queries'
import { lexicalText } from './richText'
import { siteConfig } from './site'
import { absoluteUrl, relationItems, resolveMediaAlt, resolveMediaUrl } from './utils'
import type { BlogItem, CareerItem, FAQItem, MediaLike, PageBlock, PageContent, SEOFields, ServiceItem, SiteSettingsContent } from '@/types/content'

type MetadataOptions = {
  description?: string | null
  image?: MediaLike
  imageAlt?: string | null
  modifiedTime?: string | null
  publishedTime?: string | null
  title?: string | null
  type?: 'article' | 'website'
}

export type BreadcrumbItem = {
  name: string
  path: string
}

export type JsonLdObject = Record<string, unknown>

export const buildMetadata = (page: PageContent | null, path = '/', options: MetadataOptions = {}): Metadata => {
  const seo = page?.seo as SEOFields | undefined
  const title = seo?.metaTitle || options.title || page?.title || siteConfig.defaultTitle
  const description = seo?.metaDescription || options.description || siteConfig.defaultDescription
  const imageMedia = seo?.openGraphImage || options.image || figmaAssets.heroInterview
  const image = resolveMediaUrl(imageMedia, figmaAssets.heroInterview, ['og', 'hero', 'card'])
  const imageAlt = resolveMediaAlt(imageMedia, options.imageAlt || title)
  const keywords = seo?.keywords?.map((item) => item.keyword?.trim()).filter(Boolean) as string[] | undefined
  const canonical = resolveCanonicalUrl(seo?.canonicalUrl, path)
  const imageUrl = absoluteUrl(image)
  const isArticle = options.type === 'article'

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    keywords: keywords?.length ? keywords : undefined,
    alternates: {
      canonical,
    },
    robots: seo?.noIndex ? { index: false, follow: false, nocache: true } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt }],
      type: isArticle ? 'article' : 'website',
      ...(isArticle && options.publishedTime ? { publishedTime: options.publishedTime } : {}),
      ...(isArticle && options.modifiedTime ? { modifiedTime: options.modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: imageUrl, alt: imageAlt }],
    },
  }
}

export const organizationSchema = (settings?: SiteSettingsContent): JsonLdObject => {
  const footerContact = settings?.footer?.contact
  const legacyContact = settings?.contact
  const logo = resolveMediaUrl(settings?.header?.logo || settings?.footer?.logo || settings?.logo, figmaAssets.logo, ['og', 'hero', 'card'])
  const sameAs = (settings?.footer?.socialLinks?.length ? settings.footer.socialLinks : settings?.socialLinks)
    ?.map((link) => link.url)
    .filter(Boolean) || []
  const email = footerContact?.email || legacyContact?.email || siteConfig.contactEmail
  const usPhone = footerContact?.usPhone || footerContact?.phone || legacyContact?.usPhone || siteConfig.phones.us
  const ukPhone = footerContact?.ukPhone || footerContact?.phone || legacyContact?.ukPhone || siteConfig.phones.uk
  const ausPhone = footerContact?.ausPhone || footerContact?.phone || legacyContact?.ausPhone || siteConfig.phones.aus
  const address = footerContact?.address || legacyContact?.officeAddress || '2972 Westheimer Rd. Santa Ana, Illinois 85486'

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': absoluteUrl('/#organization'),
    name: settings?.brandName || siteConfig.name,
    url: absoluteUrl('/'),
    logo: absoluteUrl(logo),
    email,
    telephone: usPhone,
    sameAs,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: usPhone,
        contactType: 'sales',
        areaServed: 'US',
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: ukPhone,
        contactType: 'sales',
        areaServed: 'GB',
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: ausPhone,
        contactType: 'sales',
        areaServed: 'AU',
        availableLanguage: ['English'],
      },
    ],
  }
}

export const websiteSchema = (settings?: SiteSettingsContent): JsonLdObject => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': absoluteUrl('/#website'),
  name: settings?.brandName || siteConfig.name,
  url: absoluteUrl('/'),
  description: settings?.seo?.metaDescription || siteConfig.defaultDescription,
  inLanguage: 'en',
  publisher: {
    '@id': absoluteUrl('/#organization'),
  },
})

export const breadcrumbSchema = (items: BreadcrumbItem[]): JsonLdObject | null => {
  const validItems = items.filter((item) => item.name && item.path)

  if (validItems.length < 2) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: validItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export const blogPostingSchema = (post: BlogItem, path: string): JsonLdObject => {
  const seo = post.seo
  const image = resolveMediaUrl(seo?.openGraphImage || post.featuredImage, figmaAssets.heroInterview, ['og', 'hero', 'card'])

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: seo?.metaTitle || post.title,
    description: seo?.metaDescription || post.excerpt,
    image: [absoluteUrl(image)],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.authorName || siteConfig.name,
    },
    publisher: {
      '@id': absoluteUrl('/#organization'),
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(path),
    },
  }
}

export const serviceSchema = (service: ServiceItem, path: string): JsonLdObject => {
  const seo = service.seo
  const image = resolveMediaUrl(seo?.openGraphImage || service.featuredImage, figmaAssets.heroInterview, ['og', 'hero', 'card'])

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    description: seo?.metaDescription || service.summary,
    image: absoluteUrl(image),
    url: absoluteUrl(path),
    provider: {
      '@id': absoluteUrl('/#organization'),
    },
    areaServed: ['United States', 'United Kingdom', 'Australia', 'APAC'],
  }
}

export const careerBreadcrumbSchema = (career: CareerItem, path: string): JsonLdObject | null =>
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Careers', path: '/careers' },
    { name: career.title, path },
  ])

export const faqSchema = (items: FAQItem[]): JsonLdObject | null => {
  const mainEntity = items
    .map((item) => {
      const answer = lexicalText(item.answer).join(' ').trim()

      if (!item.question || !answer) {
        return null
      }

      return {
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      }
    })
    .filter(Boolean)

  if (!mainEntity.length) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  }
}

export const resolveFAQItemsFromBlocks = async (blocks?: PageBlock[]): Promise<FAQItem[]> => {
  const faqBlocks = (blocks || []).filter((block): block is Extract<PageBlock, { blockType: 'faq' }> => block.blockType === 'faq' && !block.settings?.hideBlock)

  if (!faqBlocks.length) {
    return []
  }

  const resolvedItems = await Promise.all(
    faqBlocks.map(async (block) => {
      const selected = relationItems<FAQItem>(block.items)

      return selected.length ? selected : await getFAQs(12)
    }),
  )
  const seen = new Set<string>()

  return resolvedItems
    .flat()
    .filter((item) => {
      const key = String(item.id || item.question)

      if (seen.has(key)) {
        return false
      }

      seen.add(key)
      return true
    })
}

const resolveCanonicalUrl = (canonicalUrl: string | null | undefined, path: string) => {
  const canonical = canonicalUrl?.trim()

  return canonical ? absoluteUrl(canonical) : absoluteUrl(path)
}
