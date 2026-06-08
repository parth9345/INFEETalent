import type { Metadata } from 'next'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema, buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata(
  {
    title: 'Thank You',
    slug: 'thank-you',
    seo: {
      metaDescription: 'Thank you for contacting INFE Talent.',
      noIndex: true,
    },
  },
  '/thank-you',
)

export default function ThankYouPage() {
  return (
    <div className="page-thank-you">
      <section className="flex min-h-[60vh] items-center bg-brand-background thank-you-hero-section thank-you-content-section thank-you-cta-section anim-full-section anim-fade-down">
        <div className="mx-auto max-w-[900px] px-5 text-center anim-full-section anim-fade-up">
          <p className="text-body12 font-extrabold uppercase leading-[18px] tracking-[3px] text-brand-primary">Thank you</p>
          <h1 className="heading-section mt-4 text-h1 font-extrabold leading-[44px] text-neutral-dark">We received your request.</h1>
          <p className="mt-6 text-body18 leading-[30px] text-neutral-muted">
            The INFE Talent team will review it and get back to you within one business day.
          </p>
          <ButtonLink href="/" className="mt-8">
            Back Home
          </ButtonLink>
        </div>
      </section>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Thank You', path: '/thank-you' },
        ])}
      />
    </div>
  )
}
