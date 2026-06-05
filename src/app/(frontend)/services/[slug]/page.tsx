import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { JsonLd } from '@/components/seo/JsonLd'
import { ServiceDetail } from '@/components/sections/ServiceDetail'
import { getServiceBySlug, getServices } from '@/lib/payload-queries'
import { breadcrumbSchema, buildMetadata, serviceSchema } from '@/lib/seo'
import { relationItems } from '@/lib/utils'
import type { PageContent } from '@/types/content'

export const revalidate = 60

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  return buildMetadata({ title: service.title, slug, seo: service.seo } as PageContent, `/services/${slug}`, {
    description: service.summary,
    image: service.featuredImage,
    imageAlt: service.title,
  })
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const [service, services] = await Promise.all([getServiceBySlug(slug), getServices(12)])

  if (!service) {
    notFound()
  }

  const cmsRelated = relationItems<typeof service>(service.relatedServices)
  const relatedServices = cmsRelated.length
    ? cmsRelated
    : services.filter((item) => item.slug !== service.slug).slice(0, 3)

  return (
    <div className="page-service-detail">
      <ServiceDetail service={service} relatedServices={relatedServices} />
      <JsonLd
        data={[
          serviceSchema(service, `/services/${slug}`),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.title, path: `/services/${slug}` },
          ]),
        ]}
      />
    </div>
  )
}
