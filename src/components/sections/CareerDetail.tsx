import { BriefcaseBusiness, MapPin } from 'lucide-react'

import { CareerForm } from '@/components/forms/CareerForm'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { RichText } from '@/components/ui/RichText'
import type { CareerItem } from '@/types/content'

export function CareerDetail({ career }: { career: CareerItem }) {
  return (
    <>
      <section className="border-b border-neutral-border bg-brand-background py-[48px]">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-body12 font-extrabold uppercase tracking-[3px] text-brand-primary">
              home / careers / {career.slug}
            </p>
            <h1 className="mt-4 text-h1 font-extrabold leading-[44px] text-neutral-dark">
              {career.title}
            </h1>
            <div className="mt-8 flex flex-wrap gap-8 text-body18 text-neutral-muted">
              <span className="inline-flex items-center gap-3">
                <MapPin className="text-brand-primary" aria-hidden="true" /> {career.location}
              </span>
              {career.experience ? (
                <span className="inline-flex items-center gap-3">
                  <BriefcaseBusiness className="text-brand-primary" aria-hidden="true" /> {career.experience}
                </span>
              ) : null}
            </div>
          </div>
          <ButtonLink href="#apply">
            Apply Now
          </ButtonLink>
        </Container>
      </section>
      <Container as="section" className="grid gap-16 bg-brand-background py-[80px] lg:grid-cols-[1fr_577px]">
        <div className="border-l border-t border-neutral-border">
          <DetailPanel title="Job Title" text={career.title} />
          <DetailPanel title="Reports To" text="Team Leader / Assistant Operations Manager" />
          {career.jobDetails?.map((detail) => (
            <div key={detail.heading} className="border-b border-r border-neutral-border bg-neutral-white/30 p-8">
              <h2 className="text-h3 font-extrabold text-neutral-dark">{detail.heading}</h2>
              <div className="mt-4">
                <RichText value={detail.content} fallback={typeof detail.content === 'string' ? [detail.content] : []} />
              </div>
            </div>
          ))}
        </div>
        <CareerForm careerId={career.id} />
      </Container>
    </>
  )
}

function DetailPanel({ title, text }: { title: string; text: string }) {
  return (
    <div className="border-b border-r border-neutral-border bg-neutral-white/30 p-8">
      <h2 className="text-h3 font-extrabold text-neutral-dark">{title}</h2>
      <p className="mt-4 text-body18 leading-[30px] text-neutral-muted">{text}</p>
    </div>
  )
}
