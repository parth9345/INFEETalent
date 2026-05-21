import { JsonLd } from './JsonLd'
import { breadcrumbSchema, faqSchema, resolveFAQItemsFromBlocks } from '@/lib/seo'
import type { BreadcrumbItem } from '@/lib/seo'
import type { PageContent } from '@/types/content'

type PageStructuredDataProps = {
  breadcrumbs?: BreadcrumbItem[]
  page: PageContent
  path: string
}

export async function PageStructuredData({ breadcrumbs, page, path }: PageStructuredDataProps) {
  const faqItems = await resolveFAQItemsFromBlocks(page.layout)
  const pageBreadcrumbs =
    breadcrumbs ||
    (path === '/'
      ? []
      : [
          { name: 'Home', path: '/' },
          { name: page.title, path },
        ])

  return <JsonLd data={[breadcrumbSchema(pageBreadcrumbs), faqSchema(faqItems)]} />
}
