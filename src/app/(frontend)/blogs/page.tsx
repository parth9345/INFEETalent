import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CMSPage } from '@/components/pages/CMSPage'
import { getPageBySlug } from '@/lib/payload-queries'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('blogs')

  if (!page) {
    notFound()
  }

  return buildMetadata(page, '/blogs')
}

export default function BlogsPage() {
  return <CMSPage slug="blogs" />
}
