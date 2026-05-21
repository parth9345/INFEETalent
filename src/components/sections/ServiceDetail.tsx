import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Route } from 'next'

import { Container } from '@/components/ui/Container'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { RichText } from '@/components/ui/RichText'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { sectionClasses } from '@/lib/sections'
import type { ServiceItem } from '@/types/content'

export function ServiceDetail({ service }: { service: ServiceItem }) {
  return (
    <>
      <section className={sectionClasses({ background: 'cream', spacing: 'compact' }, { className: 'border-b border-neutral-border' })}>
        <Container className="grid gap-10 lg:grid-cols-[1fr_520px] lg:items-center">
          <div>
            <p className="text-body12 font-extrabold uppercase tracking-[3px] text-brand-primary">Services</p>
            <h1 className="mt-4 max-w-4xl text-h1 font-extrabold leading-[44px] text-neutral-dark">
              {service.title}
            </h1>
            <p className="mt-8 max-w-3xl text-body18 leading-[30px] text-neutral-muted">{service.summary}</p>
          </div>
          {service.featuredImage ? (
            <div className="relative min-h-[360px] overflow-hidden">
              <OptimizedImage media={service.featuredImage} altFallback={service.title} sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
            </div>
          ) : null}
        </Container>
      </section>
      <section className="bg-brand-background py-[80px] md:py-[120px]">
        <Container className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <article className="border border-neutral-border bg-neutral-white p-8 md:p-10">
            <RichText value={service.content} fallback={[service.summary]} />
          </article>
          <aside className="h-fit border border-neutral-border bg-neutral-white p-8">
            <SectionHeader title="Ready to scale delivery?" description="Tell us which recruitment workflows you want to strengthen and we will map the right support model." headingLevel="h3" />
            <Link href={'/contact' as Route} className="mt-8 inline-flex items-center gap-2 text-link14 font-extrabold uppercase tracking-[0.8px] text-brand-primary">
              Talk To Us <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </aside>
        </Container>
      </section>
    </>
  )
}
