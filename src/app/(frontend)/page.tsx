import type { Metadata } from 'next'

import { CMSPage } from '@/components/pages/CMSPage'
import { homePageFallback } from '@/lib/default-content'
import { getPageBySlug } from '@/lib/payload-queries'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 60

const getHomePage = async () => (await getPageBySlug('home')) || homePageFallback

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage()

  return buildMetadata(page, '/')
}

export default async function HomePage() {
  const page = await getHomePage()

  return <CMSPage page={page} slug="home" path="/" />
}
