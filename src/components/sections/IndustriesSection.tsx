import { MapPin } from 'lucide-react'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/utils'
import type { PageBlock } from '@/types/content'

type IndustriesBlock = Extract<PageBlock, { blockType: 'industries' }>

export function IndustriesSection({ block, isHomepage = false }: { block: IndustriesBlock; isHomepage?: boolean }) {
  const midpoint = Math.ceil((block.items?.length || 0) / 2)
  const columns = [block.items?.slice(0, midpoint) || [], block.items?.slice(midpoint) || []]

  return (
    <section className={isHomepage ? 'bg-brand-background py-[72px]' : 'bg-brand-background py-[48px] md:py-[64px]'}>
      <div className={cn('mx-auto grid px-5 2xl:px-0', isHomepage ? 'max-w-[1152px] gap-[56px] px-[24px] lg:grid-cols-[486px_1fr] lg:gap-[104px] lg:px-[0px]' : 'max-w-[1500px] gap-10 lg:grid-cols-[1fr_1fr]')}>
        <div className={cn('flex flex-col justify-between', isHomepage ? 'min-h-[392px]' : 'min-h-[360px]')}>
          <SectionHeading
            eyebrow={block.eyebrow}
            title={block.heading}
            description={block.description}
            className={isHomepage ? 'space-y-[14px]' : undefined}
            eyebrowClassName={isHomepage ? 'text-body12 leading-[18px] tracking-[3px]' : undefined}
            headingClassName={isHomepage ? 'max-w-[486px] text-h2 leading-[38px] tracking-[0px] md:text-h2' : undefined}
            descriptionClassName={isHomepage ? 'max-w-[470px] text-body14 leading-[22px] tracking-[0px] md:text-body14' : undefined}
          />
          <div className={isHomepage ? 'mt-[38px] flex flex-wrap gap-[14px]' : 'mt-10 flex flex-wrap gap-4'}>
            {block.primaryAction?.url ? (
              <ButtonLink href={block.primaryAction.url} size={isHomepage ? 'sm' : 'md'} className={isHomepage ? 'min-w-[122px]' : undefined}>
                {block.primaryAction.label || 'Get Started'}
              </ButtonLink>
            ) : null}
            {block.secondaryAction?.url ? (
              <ButtonLink href={block.secondaryAction.url} variant="secondary" size={isHomepage ? 'sm' : 'md'} className={isHomepage ? 'min-w-[118px]' : undefined}>
                {block.secondaryAction.label || 'Learn More'}
              </ButtonLink>
            ) : null}
          </div>
        </div>
        <div className="grid border-l border-t border-neutral-border sm:grid-cols-2">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex}>
              {column.map((industry) => (
                <a
                  key={industry.label}
                  href={industry.url || '#'}
                  className={cn(
                    'flex items-center border-b border-r border-neutral-border bg-neutral-white/40 text-brand-primary transition hover:bg-neutral-white',
                    isHomepage ? 'h-[78px] gap-[18px] px-[28px]' : 'h-[82px] gap-4 px-7',
                  )}
                >
                  <MapPin size={isHomepage ? 18 : 19} aria-hidden="true" />
                  <span className={isHomepage ? 'text-body16 font-extrabold leading-[24px] tracking-[0px] text-neutral-dark' : 'text-body14 font-bold text-neutral-dark md:text-body16'}>{industry.label}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
