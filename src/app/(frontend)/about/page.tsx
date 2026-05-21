import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CMSPage } from '@/components/pages/CMSPage'
import { getPageBySlug } from '@/lib/payload-queries'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('about')

  if (!page) {
    notFound()
  }

  return buildMetadata(page, '/about')
}

export default function AboutPage() {
  return <CMSPage slug="about" />
}
