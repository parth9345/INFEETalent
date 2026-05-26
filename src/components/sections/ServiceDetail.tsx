import { Check, ArrowRight } from 'lucide-react'

import { ServiceCard } from '@/components/cards/ServiceCard'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { RichText } from '@/components/ui/RichText'
import { figmaAssets } from '@/lib/assets'
import type { ServiceItem } from '@/types/content'

type ServiceDetailProps = {
  relatedServices?: ServiceItem[]
  service: ServiceItem
}

export function ServiceDetail({ service, relatedServices = [] }: ServiceDetailProps) {
  const benefits = service.benefits?.filter((item) => item.label) || []
  const steps = service.process?.filter((item) => item.title) || []
  const cta = service.cta?.url ? service.cta : { label: 'Talk To An Expert', url: '/contact' }

  return (
    <>
      <section className="bg-[#FFF8EE] pb-[72px] pt-[92px] text-[#151515] lg:pb-[96px] lg:pt-[112px]">
        <Container className="grid max-w-[1500px] gap-[56px] px-[24px] lg:grid-cols-[760px_620px] lg:gap-[120px] lg:px-[0px]">
          <div>
            <p className="text-[12px] font-[800] uppercase leading-[16px] tracking-[6px] text-[#2C368D]">
              Services
            </p>
            <h1 className="mt-[18px] max-w-[760px] text-[42px] font-[800] leading-[52px] tracking-[0px] text-[#151515] md:text-[58px] md:leading-[70px]">
              {service.title}
            </h1>
            <p className="mt-[28px] max-w-[680px] text-[18px] font-[400] leading-[30px] tracking-[0px] text-[#555555]">
              {service.summary}
            </p>
            {cta.url ? (
              <ButtonLink
                href={cta.url}
                newTab={cta.newTab}
                className="mt-[40px] h-[50px] min-w-[151px] rounded-[0px] border-[0px] bg-[#FCA62B] px-[24px] text-[13px] font-[800] uppercase leading-[16px] tracking-[0.5px] text-[#000D6B] hover:bg-[#E8951F]"
              >
                {cta.label || 'Talk To An Expert'}
              </ButtonLink>
            ) : null}
          </div>
          <div className="relative h-[420px] overflow-hidden lg:h-[520px]">
            <OptimizedImage
              media={service.featuredImage}
              fallbackSrc={figmaAssets.heroInterview}
              altFallback={service.title}
              sizes="(min-width: 1024px) 620px, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="bg-[#FFF8EE] py-[72px] lg:py-[104px]">
        <Container className="grid max-w-[1500px] gap-[48px] px-[24px] lg:grid-cols-[900px_420px] lg:gap-[180px] lg:px-[0px]">
          <article className="border border-[#D8D0C8] bg-[#FFFFFF] p-[28px] md:p-[44px]">
            <h2 className="text-[34px] font-[800] leading-[44px] tracking-[0px] text-[#151515] md:text-[44px] md:leading-[56px]">
              Service Overview
            </h2>
            <div className="mt-[28px] text-[18px] font-[400] leading-[30px] tracking-[0px] text-[#555555]">
              <RichText value={service.content} fallback={[service.summary]} />
            </div>
          </article>

          {benefits.length ? (
            <aside className="h-fit border border-[#D8D0C8] bg-[#FFFFFF] p-[28px] md:p-[36px]">
              <h2 className="text-[28px] font-[800] leading-[36px] tracking-[0px] text-[#151515]">
                Key Benefits
              </h2>
              <ul className="mt-[26px] space-y-[16px]">
                {benefits.map((benefit) => (
                  <li key={benefit.label} className="flex gap-[12px] text-[16px] font-[500] leading-[24px] text-[#151515]">
                    <Check size={18} strokeWidth={1.8} className="mt-[2px] shrink-0 text-[#2C368D]" aria-hidden="true" />
                    <span>{benefit.label}</span>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </Container>
      </section>

      {steps.length ? (
        <section className="bg-[#EAEBF4] py-[72px] lg:py-[104px]">
          <Container className="max-w-[1500px] px-[24px] lg:px-[0px]">
            <h2 className="max-w-[760px] text-[40px] font-[800] leading-[52px] tracking-[0px] text-[#151515] md:text-[50px] md:leading-[66px]">
              How We Work
            </h2>
            <div className="mt-[48px] grid border-l border-t border-[#CCCCCC] md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <article key={`${step.title}-${index}`} className="min-h-[280px] border-b border-r border-[#CCCCCC] bg-[#EAEBF4] p-[32px] transition duration-300 hover:bg-[#FFFFFF]">
                  <p className="text-[44px] font-[800] leading-[52px] text-[#2C368D]">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-[24px] text-[22px] font-[800] leading-[30px] text-[#151515]">
                    {step.title}
                  </h3>
                  {step.description ? (
                    <p className="mt-[14px] text-[16px] font-[400] leading-[26px] text-[#555555]">
                      {step.description}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {relatedServices.length ? (
        <section className="bg-[#FFF8EE] py-[72px] lg:py-[104px]">
          <Container className="max-w-[1500px] px-[24px] lg:px-[0px]">
            <div className="flex flex-wrap items-end justify-between gap-[24px]">
              <h2 className="max-w-[760px] text-[40px] font-[800] leading-[52px] tracking-[0px] text-[#151515] md:text-[50px] md:leading-[66px]">
                Related Services
              </h2>
              <ButtonLink
                href="/services"
                variant="secondary"
                className="h-[50px] rounded-[0px] border-[2px] border-[#000D6B] bg-transparent px-[24px] text-[13px] font-[800] uppercase leading-[16px] tracking-[0.5px] text-[#000D6B] hover:bg-[#000D6B] hover:text-[#FFFFFF]"
                rightIcon={<ArrowRight size={16} aria-hidden="true" />}
              >
                View All Services
              </ButtonLink>
            </div>
            <div className="mt-[48px] grid border-l border-t border-[#CCCCCC] md:grid-cols-3">
              {relatedServices.slice(0, 3).map((related) => (
                <ServiceCard key={related.slug || related.title} service={related} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  )
}
