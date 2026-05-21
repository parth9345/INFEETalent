import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { JsonLd } from '@/components/seo/JsonLd'
import { CareerDetail } from '@/components/sections/CareerDetail'
import { getCareerBySlug } from '@/lib/payload-queries'
import { buildMetadata, careerBreadcrumbSchema } from '@/lib/seo'
import type { PageContent } from '@/types/content'

export const revalidate = 60

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const career = await getCareerBySlug(slug)

  if (!career) {
    notFound()
  }

  return buildMetadata({ title: career.title, slug, seo: (career as PageContent).seo } as PageContent, `/careers/${slug}`, {
    description: career.summary,
  })
}

export default async function CareerDetailPage({ params }: PageProps) {
  const { slug } = await params
  const career = await getCareerBySlug(slug)

  if (!career) {
    notFound()
  }

  return (
    <>
      <CareerDetail career={career} />
      <JsonLd data={careerBreadcrumbSchema(career, `/careers/${slug}`)} />
    </>
  )
}
