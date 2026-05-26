import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PageStructuredData } from '@/components/seo/PageStructuredData'
import { TestimonialsPage } from '@/components/sections/testimonials/TestimonialsPage'
import { getPageBySlug, getTestimonials } from '@/lib/payload-queries'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('testimonials')

  if (!page) {
    notFound()
  }

  return buildMetadata(page, '/testimonials')
}

export default async function TestimonialsRoute() {
  const [page, testimonials] = await Promise.all([getPageBySlug('testimonials'), getTestimonials(24)])

  if (!page) {
    notFound()
  }

  return (
    <>
      <TestimonialsPage page={page} testimonials={testimonials} />
      <PageStructuredData page={page} path="/testimonials" />
    </>
  )
}
