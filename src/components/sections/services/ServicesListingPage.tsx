import { Check } from 'lucide-react'
import Link from 'next/link'

import { AdvantageSection } from '@/components/sections/AdvantageSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { figmaAssets } from '@/lib/assets'
import type { PageBlock, PageContent, ServiceItem } from '@/types/content'

type HeroBlock = Extract<PageBlock, { blockType: 'hero' }>
type StatsBlock = Extract<PageBlock, { blockType: 'statsStrip' }>
type AdvantageBlock = Extract<PageBlock, { blockType: 'advantage' }>
type ContactBlock = Extract<PageBlock, { blockType: 'contact' }>

type ServicesListingPageProps = {
  page: PageContent
  services: ServiceItem[]
}

export function ServicesListingPage({ page, services }: ServicesListingPageProps) {
  const hero = page.layout?.find((block): block is HeroBlock => block.blockType === 'hero')
  const stats = page.layout?.find((block): block is StatsBlock => block.blockType === 'statsStrip')
  const advantage = page.layout?.find((block): block is AdvantageBlock => block.blockType === 'advantage')
  const contact = page.layout?.find((block): block is ContactBlock => block.blockType === 'contact')

  return (
    <>
      <ServicesHero hero={hero} services={services} />
      {stats ? <ServicesStats block={stats} /> : null}
      <ServicesRows services={services} />
      {advantage ? <AdvantageSection block={advantage} /> : null}
      {contact ? <ContactSection block={contact} isHomepage /> : null}
    </>
  )
}

function ServicesHero({ hero, services }: { hero?: HeroBlock; services: ServiceItem[] }) {
  const heading = hero?.heading || 'Scalable Offshore Recruitment Services For Global Growth'
  const highlight = hero?.highlight || 'Scalable Offshore Recruitment'

  return (
    <section className="bg-[#FFF8EE] pb-[70px] pt-[92px] text-[#151515] lg:pb-[73px] lg:pt-[96px]">
      <Container className="max-w-[1500px] px-[24px] lg:px-[0px]">
        <div className="grid gap-[44px] lg:grid-cols-[760px_590px] lg:gap-[150px]">
          <h1 className="max-w-[760px] text-[40px] font-[800] leading-[52px] tracking-[0px] md:text-[50px] md:leading-[66px]">
            <HighlightedHeading heading={heading} highlight={highlight} />
          </h1>
          <div className="pt-[1px]">
            {hero?.description ? (
              <p className="max-w-[590px] text-[16px] font-[400] leading-[26px] tracking-[0px] text-[#555555] md:text-[18px] md:leading-[30px]">
                {hero.description}
              </p>
            ) : null}
            <div className="mt-[25px] flex flex-wrap gap-[15px]">
              {hero?.primaryAction?.url ? (
                <ButtonLink
                  href={hero.primaryAction.url}
                  newTab={hero.primaryAction.newTab}
                  className="h-[50px] min-w-[151px] rounded-[0px] border-[0px] bg-[#FCA62B] px-[24px] text-[13px] font-[800] uppercase leading-[16px] tracking-[0.5px] text-[#000D6B] hover:bg-[#E8951F]"
                >
                  {hero.primaryAction.label}
                </ButtonLink>
              ) : null}
              {hero?.secondaryAction?.url ? (
                <ButtonLink
                  href={hero.secondaryAction.url}
                  newTab={hero.secondaryAction.newTab}
                  variant="secondary"
                  className="h-[50px] min-w-[151px] rounded-[0px] border-[2px] border-[#000D6B] bg-transparent px-[24px] text-[13px] font-[800] uppercase leading-[16px] tracking-[0.5px] text-[#000D6B] hover:bg-[#000D6B] hover:text-[#FFFFFF]"
                >
                  {hero.secondaryAction.label}
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </div>

        {services.length ? (
          <div className="mt-[60px] flex flex-wrap gap-[12px]">
            {services.map((service) => (
              <Link
                key={service.slug || service.title}
                href={`/services/${service.slug}`}
                className="inline-flex h-[54px] items-center rounded-[27px] border border-[#D8D0C8] bg-[#FFF8EE] px-[26px] text-[14px] font-[800] leading-[18px] tracking-[0px] text-[#151515] transition duration-300 hover:border-[#2C368D] hover:bg-[#2C368D] hover:text-[#FFFFFF]"
              >
                {service.title}
              </Link>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  )
}

function ServicesStats({ block }: { block: StatsBlock }) {
  return (
    <section className="bg-[linear-gradient(108deg,#050948_0%,#121967_56%,#243C91_100%)] text-[#FFFFFF]">
      <div className="mx-auto grid max-w-[1920px] grid-cols-2 gap-y-[20px] px-[24px] py-[24px] md:grid-cols-4 md:px-[40px] lg:h-[146px] lg:px-[0px] lg:py-[0px]">
        {block.items?.slice(0, 4).map((item) => (
          <div key={`${item.value}-${item.label}`} className="flex items-center justify-center gap-[12px] lg:h-[146px]">
            <strong className="text-[36px] font-[800] leading-[44px] tracking-[0px] md:text-[50px] md:leading-[60px]">
              {item.value}
            </strong>
            <span className="text-[14px] font-[700] leading-[20px] tracking-[0px] md:text-[20px] md:leading-[28px]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function ServicesRows({ services }: { services: ServiceItem[] }) {
  return (
    <section className="bg-[#FFF8EE]">
      {services.map((service, index) => {
        const imageFirst = index % 2 === 0

        return (
          <article key={service.slug || service.title} className="grid border-b border-[#E2D8CC] lg:grid-cols-2">
            {imageFirst ? <ServiceImage service={service} /> : <ServiceCopy service={service} />}
            {imageFirst ? <ServiceCopy service={service} /> : <ServiceImage service={service} />}
          </article>
        )
      })}
    </section>
  )
}

function ServiceImage({ service }: { service: ServiceItem }) {
  return (
    <div className="relative h-[420px] overflow-hidden lg:h-[760px]">
      <OptimizedImage
        media={service.featuredImage}
        fallbackSrc={figmaAssets.heroInterview}
        altFallback={service.title}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  )
}

function ServiceCopy({ service }: { service: ServiceItem }) {
  const cta = service.cta?.url ? service.cta : { label: 'Talk To An Expert', url: '/contact' }
  const benefits = service.benefits?.filter((item) => item.label).slice(0, 6) || []

  return (
    <div className="flex min-h-[560px] items-center bg-[#FFF8EE] px-[24px] py-[72px] lg:min-h-[760px] lg:px-[120px] lg:py-[0px]">
      <div className="max-w-[620px]">
        <h2 className="text-[40px] font-[800] leading-[50px] tracking-[0px] text-[#151515] md:text-[50px] md:leading-[60px]">
          {service.title}
        </h2>
        <p className="mt-[28px] text-[15px] font-[400] leading-[24px] tracking-[0px] text-[#555555] md:text-[16px] md:leading-[26px]">
          {service.summary}
        </p>
        {benefits.length ? (
          <div className="mt-[54px]">
            <h3 className="text-[18px] font-[800] leading-[24px] tracking-[0px] text-[#151515]">
              We Specialise In:
            </h3>
            <ul className="mt-[20px] grid gap-x-[52px] gap-y-[16px] sm:grid-cols-2">
              {benefits.map((benefit) => (
                <li key={benefit.label} className="flex gap-[12px] text-[13px] font-[500] leading-[18px] tracking-[0px] text-[#151515]">
                  <Check size={14} strokeWidth={1.8} className="mt-[2px] shrink-0 text-[#000D6B]" aria-hidden="true" />
                  <span>{benefit.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {cta.url ? (
          <ButtonLink
            href={cta.url}
            newTab={cta.newTab}
            className="mt-[42px] h-[47px] min-w-[132px] rounded-[0px] border-[0px] bg-[#FCA62B] px-[20px] text-[11px] font-[800] uppercase leading-[14px] tracking-[0.5px] text-[#000D6B] hover:bg-[#E8951F]"
          >
            {cta.label || 'Talk To An Expert'}
          </ButtonLink>
        ) : null}
      </div>
    </div>
  )
}

function HighlightedHeading({ heading, highlight }: { heading: string; highlight?: string | null }) {
  if (!highlight || !heading.includes(highlight)) {
    return <>{heading}</>
  }

  const index = heading.indexOf(highlight)
  const before = heading.slice(0, index)
  const after = heading.slice(index + highlight.length)

  return (
    <>
      {before}
      <span className="relative inline">
        <span className="relative z-[1]">{highlight}</span>
        <span className="absolute bottom-[4px] left-[0px] h-[20px] w-full bg-[#FFF2A8]" aria-hidden="true" />
      </span>
      {after}
    </>
  )
}
