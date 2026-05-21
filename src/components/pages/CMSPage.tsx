import { notFound } from 'next/navigation'

import { PageStructuredData } from '@/components/seo/PageStructuredData'
import { BlocksRenderer } from '@/components/sections/BlocksRenderer'
import { getPageBySlug } from '@/lib/payload-queries'
import type { PageContent } from '@/types/content'

type CMSPageProps = {
  page?: PageContent | null
  path?: string
  slug: string
}

export async function CMSPage({ page: providedPage, path, slug }: CMSPageProps) {
  const page = providedPage || await getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  const pagePath = path || (slug === 'home' ? '/' : `/${slug}`)

  return (
    <>
      <BlocksRenderer blocks={page.layout} variant={slug === 'home' ? 'home' : 'default'} />
      <PageStructuredData page={page} path={pagePath} />
    </>
  )
}
