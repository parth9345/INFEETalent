import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { CMSPage } from '@/components/pages/CMSPage'
import { getPageBySlug } from '@/lib/payload-queries'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 60

type PageProps = {
  params: Promise<{ slug: string[] }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const pageSlug = slug.join('/')
  const page = await getPageBySlug(pageSlug)

  if (!page) {
    notFound()
  }

  return buildMetadata(page, `/${pageSlug}`)
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  const pageSlug = slug.join('/')
  const page = await getPageBySlug(pageSlug)

  if (!page) {
    notFound()
  }

  return <CMSPage page={page} slug={pageSlug} path={`/${pageSlug}`} />
}
