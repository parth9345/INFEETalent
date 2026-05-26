import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PageStructuredData } from '@/components/seo/PageStructuredData'
import { ServicesListingPage } from '@/components/sections/services/ServicesListingPage'
import { getPageBySlug, getServices } from '@/lib/payload-queries'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('services')

  if (!page) {
    notFound()
  }

  return buildMetadata(page, '/services')
}

export default async function ServicesPage() {
  const [page, services] = await Promise.all([getPageBySlug('services'), getServices(12)])

  if (!page) {
    notFound()
  }

  return (
    <>
      <ServicesListingPage page={page} services={services} />
      <PageStructuredData page={page} path="/services" />
    </>
  )
}
